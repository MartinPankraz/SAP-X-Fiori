sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/ui/core/Fragment',
	'sap/m/MessageToast'
], function (Controller, Fragment, MessageToast) {
	"use strict";

	return Controller.extend("azure.sap-x-app.controller.Main", {
		onInit: function () {
			var that = this;
			//check plain URL query string
			var sRunOnPlatform = jQuery.sap.getUriParameters().get("platform");
			//check fiori specific setup
			var oComponentData = "";
			if(this.getOwnerComponent().getComponentData()){
				oComponentData = this.getOwnerComponent().getComponentData().startupParameters["platform"][0];
			}
			var targetPlatformLink = "";
			if(sRunOnPlatform == "scp" || oComponentData == "scp"){
				targetPlatformLink = "/azure/manual/paths/invoke";
			}else {
				//must be Azure then
				targetPlatformLink = sRunOnPlatform;
			}
			
			/*this.oModel.attachRequestCompleted(function() {
		        console.log(that.oModel.getData());
		    });*/
			that.oModel = new sap.ui.model.json.JSONModel();
    		that.oModelDetail = new sap.ui.model.json.JSONModel();
    		
			this.synch();
			
    		that.getView().setModel(that.oModel,"azure");
    		that.getView().setModel(that.oModelDetail,"detail");
		},
		
		onExit : function () {
			if (this._oPopover) {
				this._oPopover.destroy();
			}
		},
		
		synch: function(){
			var url = "/azure/manual/paths/invoke";
			var that = this;
			$.ajax({
				type : 'GET',
				url: url,
		        success: function(data){
		            var sapTable = data[0];
		            var sentimentTable = data[1];
		            for(var i=0;i< sapTable.value.length;i++){
		            	var item = sapTable.value[i];
		            	var result = sentimentTable.value.filter(obj => {
						  return obj.RowKey == item.RowKey;
						});
						var averageScore = -1;
						var sum = 0;
		            	for(var j=0;j<result.length;j++){
		            		sum += result[j].score;
		            	}
		            	averageScore = sum / result.length;
		            	//enrich model with sentiment from twitter table, join by RowKey (AirlineCode)
		            	item.sentiment = averageScore;
		            }
		    		that.oModel.setData(sapTable);
		    		that.oModelDetail.setData(sentimentTable);
		        }
			});
		},
		
		myItemPress: function(oEvent){
			var navCon = this.byId("parentNavContainer");
			var oContext = oEvent.getParameter("listItem").getBindingContext("azure");
			var path = oContext.getPath();
			var airlineCode = oContext.getModel().getProperty(path).RowKey;
			
			var oBinding = this.byId("idDetailsTable").getBinding("items");
			oBinding.filter(new sap.ui.model.Filter("RowKey", "EQ", airlineCode ));
			
			navCon.to(this.byId("detail"));
		},
		
		onDetailPress:function(oEvent){
			var oItem = oEvent.getSource();
			var oContext = oItem.getBindingContext("detail");
			var path = oContext.getPath();
			this.myObject = oContext.getModel().getProperty(path);
			// create popover
			if (!this._oPopover) {
				Fragment.load({
					name: "azure.sap-x-app.view.Popover",
					controller: this
				}).then(function(pPopover) {
					this._oPopover = pPopover;
					this.getView().addDependent(this._oPopover);
					this._oPopover.openBy(oItem);
				}.bind(this));
			} else {
				this._oPopover.openBy(oItem);
			}
		},
		
		createTaskinDyn365: function(payload){
			var url = "/azure/task";
			var that = this;
			//retrieve user input to send to dynamics
			payload.title = this._oPopover.getContent()[0].getValue();
			$.ajax({
				type : 'POST',
				url: url,
				data: JSON.stringify(payload),
				contentType: "application/json",
		        success: function(data){
		        	MessageToast.show("Task in Dyn365 has been created!");
		        },
		        error: function(data){
		        	MessageToast.show("Could not create task in Dyn365.");
		        }
			});
		},
		
		handleItemPress:function(oEvent){
			this._oPopover.close();
			
			this.createTaskinDyn365(this.myObject);
		},
		
		handleCancelPress: function(oEvent){
			this._oPopover.close();
		},
		
		navBackPress:function(oEvent){
			var navCon = this.byId("parentNavContainer");
			navCon.back();
		},
		
		statusColor: function(sNumber){
			var result = "None";
			if(sNumber < 0.4){
				result = "Error";
			}else if(sNumber < 0.6){
				result = "Warning";
			}else if(sNumber <= 1.0){
				result = "Success";
			}else{
				result = "None";
			}
			return result;
		}
	});
});