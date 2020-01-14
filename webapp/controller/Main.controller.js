sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
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
				targetPlatformLink = sRunOnPlatform
			}
			this.oModel = new sap.ui.model.json.JSONModel(targetPlatformLink);
			/*this.oModel.attachRequestCompleted(function() {
		        console.log(that.oModel.getData());
		    });*/
		    this.getView().setModel(this.oModel,"azure");
			
			/*var url = "/azure/manual/paths/invoke";
			$.ajax({
				type : 'GET',
				url: url,
		        success: function(data){
		            console.log(data);
		        }
			});*/
		}
	});
});