/// <reference path="../RisingTideApp.ts" />
/// <reference path='../../typings/angularjs/angular.d.ts'/>
/// <reference path='../../typings/angularjs/angular-resource.d.ts'/>

interface IUpcomingPaymentsControllerScope extends ng.IScope {
    vm: UpcomingPaymentsController;
}

interface IUpcomingPaymentsController {
    upcomingPayments: UpcomingPayment[];
    asOfDate: Date;
    startingBalance: number;
    update: () => void;
}

class UpcomingPaymentsController implements IUpcomingPaymentsController {
    static controllerId: string = "UpcomingPaymentsController";
    upcomingPayments: UpcomingPayment[] = [];
    asOfDate: Date = new Date();
    startingBalance: number = 0;

    constructor(private dataService: IDataService) {
        dataService.getUpcomingPaymentsWithBalance(this.asOfDate, this.startingBalance, (results) => this.processUpcomingPayments(results));
    }

    update() {
        this.dataService.getUpcomingPaymentsWithBalance(
            this.asOfDate,
            this.startingBalance,
            (results) => this.processUpcomingPayments(results));
    }

    private processUpcomingPayments(payments: any) {
        console.log("Upcoming payments length: " + payments.length);
        this.upcomingPayments.length = 0;
        this.upcomingPayments = this.upcomingPayments.concat(payments);
    }
}

RisingTideApp.controller(UpcomingPaymentsController.controllerId, ["DataService", function (dataService) {
    return new UpcomingPaymentsController(dataService);
}]);
