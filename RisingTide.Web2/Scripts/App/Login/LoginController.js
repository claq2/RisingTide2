/// <reference path="../RisingTideApp.ts" />
/// <reference path='../../typings/angularjs/angular.d.ts'/>
/// <reference path='../../typings/angularjs/angular-resource.d.ts'/>
var LoginController = (function () {
    function LoginController($location, loginService) {
        this.$location = $location;
        this.loginService = loginService;
    }
    LoginController.prototype.loginWithMicrosoft = function () {
        var _this = this;
        this.loginService.loginWithMicrosoft(function (userId) { return _this.loggedIn(userId); });
    };
    LoginController.prototype.loginWithGoogle = function () {
        var _this = this;
        this.loginService.loginWithGoogle(function (userId) { return _this.loggedIn(userId); });
    };
    LoginController.prototype.loggedIn = function (userId) {
        console.log(userId + ' is logged in');
        this.$location.path('/scheduledPayments');
    };
    LoginController.controllerId = "LoginController";
    return LoginController;
})();
RisingTideApp.controller(LoginController.controllerId, ['$location', 'LoginService', function ($location, loginService) {
    return new LoginController($location, loginService);
}]);
//# sourceMappingURL=LoginController.js.map