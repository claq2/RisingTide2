/// <reference path="../RisingTideApp.ts" />
/// <reference path='../../typings/angularjs/angular.d.ts'/>
/// <reference path='../../typings/angularjs/angular-resource.d.ts'/>

interface IScheduledPaymentsControllerScope extends ng.IScope {
    vm: ScheduledPaymentsController;
}

interface IScheduledPaymentsController {
    scheduledPayments: ScheduledPayment[];
    navigate: (url: string) => void;
    deleteScheduledPayment: (subject: string) => void;
}

class ScheduledPaymentsController implements IScheduledPaymentsController {
    static controllerId: string = "ScheduledPaymentsController";
    scheduledPayments: ScheduledPayment[] = [];

    constructor(private dataService: IDataService,
        private $location: ng.ILocationService,
        private logger: ILoggerService,
        private modal: IBootstrapDialog) {
        dataService.getScheduledPayments((payments) => {
            console.log("payments: " + payments.length);
            this.scheduledPayments = this.scheduledPayments.concat(payments);
            this.logger.logSuccess("Loaded payments");
        });
    }

    navigate(url: string) {
        this.$location.path(url);
    }

    deleteScheduledPayment(id: string) {
        var itemSubject;
        for (var i = 0; i < this.scheduledPayments.length; i++) {
            if (this.scheduledPayments[i].id === id) {
                itemSubject = this.scheduledPayments[i].subject;
                break;
            }
        };

        this.modal.deleteDialog(itemSubject).then((result) => {
            this.dataService.deleteScheduledPayment(id,
                () => {
                    for (var i = 0; i < this.scheduledPayments.length; i++) {
                        if (this.scheduledPayments[i].id === id) {
                            this.scheduledPayments.splice(i, 1);
                            break;
                        }
                    };
                    this.logger.logSuccess("Deleted payment");
                }
                ,
                (error) => {
                    this.logger.logError("Failed to delete. Error was: " + error);
                });
        });
    }
}

RisingTideApp.controller(ScheduledPaymentsController.controllerId,
    ["DataService", "$location", "LoggerService", "modalService",
        (dataService, $location, loggerService, modalService) => {
            return new ScheduledPaymentsController(dataService, $location, loggerService, modalService);
        }]);
