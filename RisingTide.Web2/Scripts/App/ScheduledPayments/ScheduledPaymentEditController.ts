/// <reference path="../RisingTideApp.ts" />
/// <reference path='../../typings/angularjs/angular.d.ts'/>
/// <reference path='../../typings/angularjs/angular-resource.d.ts'/>

interface IScheduledPaymentEditControllerScope extends ng.IScope {
    vm: ScheduledPaymentEditController;
}

interface IScheduledPaymentEditController {
    scheduledPayment: ScheduledPayment;
    saveScheduledPayment: () => void;
    recurrences: string[];
    errorMessage: string;
    updateStatus: boolean;
}

interface IEditRouteParams extends ng.route.IRouteParamsService {
    id: string;
}

class ScheduledPaymentEditController implements IScheduledPaymentEditController {
    static controllerId: string = "ScheduledPaymentEditController";
    scheduledPayment: ScheduledPayment = new ScheduledPayment();
    recurrences: string[] = [];
    errorMessage: string = "";
    updateStatus: boolean = false;
    id: string = "";

    constructor(private $routeParams: IEditRouteParams,
        private dataService: IDataService,
        private logger: ILoggerService) {
        this.id = (this.$routeParams.id) ? this.$routeParams.id : "00000000-0000-0000-0000-000000000000";
        dataService.getRecurrences((recurrencesFromApi) => {
            this.processRecurrences(recurrencesFromApi);
        });

        if (this.id === "00000000-0000-0000-0000-000000000000") {
            // create a new item
            this.scheduledPayment.id = this.id;
            this.scheduledPayment.includeInCashFlowAnalysis = true;
            this.scheduledPayment.paymentType = PaymentType.debit;
            this.scheduledPayment.dueDate = new Date();
        } else {
            // load existing
            dataService.getScheduledPayment(this.id,(result) => {
                this.scheduledPayment = result;
            });
        }
    }

    private processRecurrences(recurrences: string[]) {
        this.recurrences = this.recurrences.concat(recurrences);
        if (this.id === "00000000-0000-0000-0000-000000000000") {
            this.scheduledPayment.recurrence = this.recurrences[0];
        }
    }

    private processSuccess(payment: ScheduledPayment) {
        this.scheduledPayment.id = payment.id;
        this.id = payment.id;
        this.logger.logSuccess("Success");
        this.updateStatus = true;
        this.errorMessage = "";
    }

    private processError(error: any) {
        this.logger.logError("Failed. Message was: " + error.Message);
        this.updateStatus = false;
        this.errorMessage = (error.Message) ? error.Message : "Error saving.";
    }

    saveScheduledPayment() {
        if (this.scheduledPayment.id === "00000000-0000-0000-0000-000000000000") {
            this.dataService.addScheduledPayment(this.scheduledPayment,
                (newPayment) => { this.processSuccess(newPayment); },
                (error) => {
                    this.processError(error);
                });
        } else {
            this.dataService.saveScheduledPayment(this.scheduledPayment,
                (updatedPayment) => { this.processSuccess(updatedPayment); },
                (error) => { this.processError(error); });
        }
    }
}

RisingTideApp.controller(ScheduledPaymentEditController.controllerId,
    ["$routeParams", "DataService", "LoggerService",
        function ($routeParams, dataService, LoggerService) {
            return new ScheduledPaymentEditController($routeParams, dataService, LoggerService);
        }]);
