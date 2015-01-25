/// <reference path="../typings/angularjs/angular.d.ts"/>
/// <reference path="../typings/angularjs/angular-resource.d.ts"/>
/// <reference path="../typings/angularjs/angular-route.d.ts"/>

interface IRisingTideApp extends ng.IModule { }

interface IRisingTideRoute extends ng.route.IRoute {
    requireAuthentication: boolean
}

// Create the module and define its dependencies.
var RisingTideApp: IRisingTideApp = angular.module("RisingTideApp", [
// Angular modules 
    "ngRoute",           // routing

// Custom modules 

// 3rd Party Modules
    "ui.bootstrap",
    "wc.directives",
]);

RisingTideApp.config(["$routeProvider", function ($routeProvider: ng.route.IRouteProvider) {
    var loginRoute: IRisingTideRoute = {
        templateUrl: "Scripts/App/Login/Login.html", requireAuthentication: false
    };
    var upcomingPaymentsRoute: IRisingTideRoute = {
        templateUrl: "Scripts/App/UpcomingPayments/UpcomingPayments.html",
        requireAuthentication: true
    };
    var scheduledPaymentsRoute: IRisingTideRoute = {
        templateUrl: "Scripts/App/ScheduledPayments/ScheduledPayments.html", requireAuthentication: true
    };
    var cashFlowRoute: IRisingTideRoute = {
        templateUrl: "Scripts/App/CashFlow/CashFlow.html", requireAuthentication: true
    };
    var paymentEditRoute: IRisingTideRoute = {
        templateUrl: "Scripts/App/ScheduledPayments/ScheduledPaymentEdit.html", requireAuthentication: true
    };
    $routeProvider
        .when("/login", loginRoute)
        .when("/upcomingPayments", upcomingPaymentsRoute)
        .when("/scheduledPayments", scheduledPaymentsRoute)
        .when("/cashFlow", cashFlowRoute)
        .when("/scheduledpaymentedit/:id", paymentEditRoute)
        .when("/scheduledpaymentedit", paymentEditRoute)
        .otherwise({ redirectTo: "/login" });

    // Configure Toastr
    toastr.options.timeOut = 4000;
    toastr.options.positionClass = "toast-bottom-right";
}]);

RisingTideApp.value("config", { useAzure: false });

// Execute bootstrapping code and any dependencies.
RisingTideApp.run(["$q", "$rootScope", "$location", "LoginService",
    function ($q, $rootScope, $location, loginService) {
        $rootScope.$on("$routeChangeStart", function (event, next, current) {
            if (!loginService.isSignedIn && next.requireAuthentication === true) {
                $location.path("/login");
            }
        });
    }]);
