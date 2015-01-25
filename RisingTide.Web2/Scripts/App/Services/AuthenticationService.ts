/// <reference path="../RisingTideApp.ts" />
/// <reference path='../../typings/angularjs/angular.d.ts'/>
/// <reference path='../../typings/angularjs/angular-resource.d.ts'/>

interface IAuthenticationService {
    loginWithMicrosoft: () => void;
    isSignedIn: boolean;
    client: any;
}

declare var WindowsAzure;

class AuthenticationService implements IAuthenticationService {
    static serviceId: string = "AuthenticationService";
    isSignedIn = false;
    client;
    constructor() {
        this.client = new WindowsAzure.MobileServiceClient('https://cashflow.azure-mobile.net/', '00000000401282D4');
    }

    loginWithMicrosoft() {
        this.client.login("microsoftaccount").then(() => this.loggedIn(this.client.currentUser.userId), function (error) {
            alert(error);
        });
    }

    private loggedIn(userId: string) {
        alert(userId);
        this.isSignedIn = true;
    }
}

RisingTideApp.factory(AuthenticationService.serviceId, [function () {
    return new AuthenticationService();
}]);
