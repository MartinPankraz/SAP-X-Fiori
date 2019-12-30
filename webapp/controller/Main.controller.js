sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("azure.sap-x-app.controller.Main", {
		onInit: function () {
			var that = this;
			this.oModel = new sap.ui.model.json.JSONModel("/azure/manual/paths/invoke");
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