/// <reference path="../RisingTideApp.ts" />
/// <reference path='../../typings/angularjs/angular.d.ts'/>
/// <reference path='../../typings/angularjs/angular-resource.d.ts'/>
var Cashpoint = (function () {
    function Cashpoint() {
    }
    return Cashpoint;
})();
var CashFlowController = (function () {
    function CashFlowController(dataService) {
        var _this = this;
        this.dataService = dataService;
        this.calendarDays = [];
        this.asOfDate = new Date();
        this.startingBalance = 0;
        this.data = [];
        this.options = {
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
        dataService.getProjectionData(this.asOfDate, 90, this.startingBalance, function (results) { return _this.processProjectionData(results); });
    }
    CashFlowController.prototype.update = function () {
        var _this = this;
        this.dataService.getProjectionData(this.asOfDate, 90, this.startingBalance, function (results) { return _this.processProjectionData(results); });
    };
    CashFlowController.prototype.processProjectionData = function (days) {
        console.log("Upcoming payments length: " + days.length);
        this.calendarDays.length = 0;
        this.calendarDays = this.calendarDays.concat(days);
        console.log("data at 10: " + this.calendarDays[10].date + " " + this.calendarDays[10].endOfDayBalance);
    };
    CashFlowController.controllerId = "CashFlowController";
    return CashFlowController;
})();
RisingTideApp.controller(CashFlowController.controllerId, ["DataService", function (dataService) {
    return new CashFlowController(dataService);
}]);
//# sourceMappingURL=CashFlowController.js.map