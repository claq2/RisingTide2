﻿/// <reference path="../risingtideapp.ts" />
/// <reference path='../../typings/angularjs/angular.d.ts'/>
/// <reference path="../../typings/flot/jquery.flot.d.ts" />

interface Ichart extends ng.IDirective {
}

interface IchartScope extends ng.IScope {
}

class Chart implements Ichart {
    static directiveId: string = "chart";
    restrict: string = "E";

    constructor(private $window: ng.IWindowService) {
    }

    link(scope: IchartScope, element, attrs) {
        var chart: jquery.flot.plot = null;
        var chartOptions: jquery.flot.plotOptions = {};
        chartOptions.xaxis = { mode: "time" };
        chartOptions.yaxis = {
            tickFormatter: (val) => { return "$" + val; }
        };
        chartOptions.grid = { hoverable: true, borderWidth: 1 };
        chartOptions.series = {
            points: { show: true },
            lines: { show: true }
        };

        scope.$watch("vm.calendarDays", function (values: CalendarDay[]) {
            if (values && values.length > 0) {
                var rawData = [];
                for (var i = 0; i < values.length; i++) {
                    var d = values[i];
                    rawData.push([d.date, d.endOfDayBalance]);
                }

                if (!chart) {
                    chart = $.plot(element, [rawData], chartOptions);
                    element.show();
                } else {
                    chart.setData([rawData]);
                    chart.setupGrid();
                    chart.draw();
                }
            }
        }, true);

        function showTooltip(x, y, contents) {
            $("<div id='tooltip'>" + contents + "</div>").css({
                position: "absolute",
                display: "none",
                top: y + 5,
                left: x + 5,
                border: "1px solid #fdd",
                padding: "2px",
                "background-color": "#fee",
                opacity: 0.80
            }).appendTo("body").fadeIn(200);
        }

        var previousPoint = null;
        $(element).bind({
            plothover: function (event, pos, item) {
                $("#x").text(pos.x.toFixed(2));
                $("#y").text(pos.y.toFixed(2));

                if (item) {
                    if (previousPoint !== item.dataIndex) {
                        previousPoint = item.dataIndex;

                        $("#tooltip").remove();
                        var x = item.datapoint[0],
                            y = item.datapoint[1].toFixed(2);
                        var xAsDate = new Date(x);
                        var day = xAsDate.getDate();
                        var month = xAsDate.getMonth() + 1;
                        var year = xAsDate.getFullYear();
                        showTooltip(item.pageX, item.pageY,
                            day + "/" + month + "/" + year + " = $" + y);
                    }
                } else {
                    $("#tooltip").remove();
                }
            }
        });
    }
}

RisingTideApp.directive(Chart.directiveId, ["$window", $window =>
    new Chart($window)
]);
