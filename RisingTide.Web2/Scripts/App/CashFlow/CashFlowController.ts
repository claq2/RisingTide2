/// <reference path="../RisingTideApp.ts" />
/// <reference path='../../typings/angularjs/angular.d.ts'/>
/// <reference path='../../typings/angularjs/angular-resource.d.ts'/>

interface ICashFlowControllerScope extends ng.IScope {
    vm: CashFlowController;
}

class Cashpoint {
    x: Date;
    y: number;
}

interface ICashFlowController {
    calendarDays: CalendarDay[];
    data: Cashpoint[];
    options: any;
    asOfDate: Date;
    startingBalance: number;
    update: () => void;
}

class CashFlowController implements ICashFlowController {
    static controllerId: string = "CashFlowController";
    calendarDays: CalendarDay[] = [];
    asOfDate: Date = new Date();
    startingBalance: number = 0;
    data: Cashpoint[] = [];
    options: any = {
        axes: {
            x: {
                type: "date",
                key: "x"
            },
            y: { type: "linear" }
        },
        series: [
            {
                y: "y",
                label: "Cash Flow",
                color: "greenyellow",
                type: "line",
                thickness: "3px"
            }
        ],
        lineMode: "linear",
        tension: 0.7,
    };

    constructor(private dataService: IDataService) {
        dataService.getProjectionData(this.asOfDate, 90, this.startingBalance, (results) => this.processProjectionData(results));
    }

    update() {
        this.dataService.getProjectionData(this.asOfDate, 90, this.startingBalance, (results) => this.processProjectionData(results));
    }

    private processProjectionData(days: any) {
        console.log("Upcoming payments length: " + days.length);
        this.calendarDays.length = 0;
        this.calendarDays = this.calendarDays.concat(days);
        console.log("data at 10: " + this.calendarDays[10].date + " " + this.calendarDays[10].endOfDayBalance);
    }
}

RisingTideApp.controller(CashFlowController.controllerId,
            ["DataService",
    function (dataService) {
        return new CashFlowController(dataService);
}]);
