/// <reference path="../RisingTideApp.ts" />
/// <reference path='../../typings/angularjs/angular.d.ts'/>
/// <reference path='../../typings/angularjs/angular-resource.d.ts'/>

interface ILoginControllerScope extends ng.IScope {
    vm: LoginController;
}

interface ILoginController {
    loginWithMicrosoft: () => void;
    loginWithGoogle: () => void;
}

class LoginController implements ILoginController {
    static controllerId: string = "LoginController";

    constructor(private $location: ng.ILocationService, private loginService: ILoginService) {
    }

    loginWithMicrosoft() {
        this.loginService.loginWithMicrosoft((userId) => this.loggedIn(userId));
    }

    loginWithGoogle() {
        this.loginService.loginWithGoogle((userId) => this.loggedIn(userId));
    }

    private loggedIn(userId: string) {
        console.log(userId + ' is logged in');
        this.$location.path('/scheduledPayments');
    }
}

RisingTideApp.controller(LoginController.controllerId, ['$location', 'LoginService', ($location, loginService) => {
    return new LoginController($location, loginService);
}]);
