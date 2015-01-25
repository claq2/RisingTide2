/// <reference path="../typings/angularjs/angular.d.ts"/>
/// <reference path="../typings/angularjs/angular-resource.d.ts"/>
/// <reference path="../typings/angularjs/angular-route.d.ts"/>
// Create the module and define its dependencies.
var RisingTideApp = angular.module("RisingTideApp", [
    "ngRoute",
    "ui.bootstrap",
    "wc.directives",
]);
RisingTideApp.config(["$routeProvider", function ($routeProvider) {
    var loginRoute = {
        templateUrl: "Scripts/App/Login/Login.html",
        requireAuthentication: false
    };
    var upcomingPaymentsRoute = {
        templateUrl: "Scripts/App/UpcomingPayments/UpcomingPayments.html",
        requireAuthentication: true
    };
    var scheduledPaymentsRoute = {
        templateUrl: "Scripts/App/ScheduledPayments/ScheduledPayments.html",
        requireAuthentication: true
    };
    var cashFlowRoute = {
        templateUrl: "Scripts/App/CashFlow/CashFlow.html",
        requireAuthentication: true
    };
    var paymentEditRoute = {
        templateUrl: "Scripts/App/ScheduledPayments/ScheduledPaymentEdit.html",
        requireAuthentication: true
    };
    $routeProvider.when("/login", loginRoute).when("/upcomingPayments", upcomingPaymentsRoute).when("/scheduledPayments", scheduledPaymentsRoute).when("/cashFlow", cashFlowRoute).when("/scheduledpaymentedit/:id", paymentEditRoute).when("/scheduledpaymentedit", paymentEditRoute).otherwise({ redirectTo: "/login" });
    // Configure Toastr
    toastr.options.timeOut = 4000;
    toastr.options.positionClass = "toast-bottom-right";
}]);
RisingTideApp.value("config", { useAzure: false });
// Execute bootstrapping code and any dependencies.
RisingTideApp.run(["$q", "$rootScope", "$location", "LoginService", function ($q, $rootScope, $location, loginService) {
    $rootScope.$on("$routeChangeStart", function (event, next, current) {
        if (!loginService.isSignedIn && next.requireAuthentication === true) {
            $location.path("/login");
        }
    });
}]);
//# sourceMappingURL=RisingTideApp.js.map