/// <reference path="../RisingTideApp.ts" />
/// <reference path='../../typings/angularjs/angular.d.ts'/>
/// <reference path='../../typings/angularjs/angular-resource.d.ts'/>
var ScheduledPaymentEditController = (function () {
    function ScheduledPaymentEditController($routeParams, dataService, logger) {
        var _this = this;
        this.$routeParams = $routeParams;
        this.dataService = dataService;
        this.logger = logger;
        this.scheduledPayment = new ScheduledPayment();
        this.recurrences = [];
        this.errorMessage = "";
        this.updateStatus = false;
        this.id = "";
        this.id = (this.$routeParams.id) ? this.$routeParams.id : "00000000-0000-0000-0000-000000000000";
        dataService.getRecurrences(function (recurrencesFromApi) {
            _this.processRecurrences(recurrencesFromApi);
        });
        if (this.id === "00000000-0000-0000-0000-000000000000") {
            // create a new item
            this.scheduledPayment.id = this.id;
            this.scheduledPayment.includeInCashFlowAnalysis = true;
            this.scheduledPayment.paymentType = 1 /* debit */;
            this.scheduledPayment.dueDate = new Date();
        }
        else {
            // load existing
            dataService.getScheduledPayment(this.id, function (result) {
                _this.scheduledPayment = result;
            });
        }
    }
    ScheduledPaymentEditController.prototype.processRecurrences = function (recurrences) {
        this.recurrences = this.recurrences.concat(recurrences);
        if (this.id === "00000000-0000-0000-0000-000000000000") {
            this.scheduledPayment.recurrence = this.recurrences[0];
        }
    };
    ScheduledPaymentEditController.prototype.processSuccess = function (payment) {
        this.scheduledPayment.id = payment.id;
        this.id = payment.id;
        this.logger.logSuccess("Success");
        this.updateStatus = true;
        this.errorMessage = "";
    };
    ScheduledPaymentEditController.prototype.processError = function (error) {
        this.logger.logError("Failed. Message was: " + error.Message);
        this.updateStatus = false;
        this.errorMessage = (error.Message) ? error.Message : "Error saving.";
    };
    ScheduledPaymentEditController.prototype.saveScheduledPayment = function () {
        var _this = this;
        if (this.scheduledPayment.id === "00000000-0000-0000-0000-000000000000") {
            this.dataService.addScheduledPayment(this.scheduledPayment, function (newPayment) {
                _this.processSuccess(newPayment);
            }, function (error) {
                _this.processError(error);
            });
        }
        else {
            this.dataService.saveScheduledPayment(this.scheduledPayment, function (updatedPayment) {
                _this.processSuccess(updatedPayment);
            }, function (error) {
                _this.processError(error);
            });
        }
    };
    ScheduledPaymentEditController.controllerId = "ScheduledPaymentEditController";
    return ScheduledPaymentEditController;
})();
RisingTideApp.controller(ScheduledPaymentEditController.controllerId, ["$routeParams", "DataService", "LoggerService", function ($routeParams, dataService, LoggerService) {
    return new ScheduledPaymentEditController($routeParams, dataService, LoggerService);
}]);
//# sourceMappingURL=ScheduledPaymentEditController.js.map