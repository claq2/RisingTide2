/// <reference path="../RisingTideApp.ts" />
/// <reference path='../../typings/angularjs/angular.d.ts'/>
/// <reference path='../../typings/angularjs/angular-resource.d.ts'/>

class AzureNetLoginService implements ILoginService {
    static serviceId: string = "LoginService";
    client;
    isSignedIn: boolean = false;

    constructor(private $timeout: ng.ITimeoutService, private dataService: IDataService) {
    }

    loginWithMicrosoft(successCallback: Function) {
        this.client = new WindowsAzure.MobileServiceClient('https://risingtide-testnet.azure-mobile.net/', '0000000044112CA5');
        this.dataService.client = this.client;
        this.client.login("microsoftaccount").then(() => {
            this.isSignedIn = true;
            this.$timeout(() => {
                successCallback(this.client.currentUser.userId)
                });
        }, (error) => {
                console.error(error);
            });
    }

    loginWithGoogle(successCallback: Function) {
        this.client = new WindowsAzure.MobileServiceClient('https://risingtide-testnet.azure-mobile.net/', '642356303291.apps.googleusercontent.com');
        this.dataService.client = this.client;
        this.client.login("google").then(() => {
            this.isSignedIn = true;
            this.$timeout(() => {
                successCallback(this.client.currentUser.userId)
                });
        }, (error) => {
                console.error(error);
            });
    }
}

RisingTideApp.factory(AzureNetLoginService.serviceId, ['$timeout', 'DataService', ($timeout, dataService) =>
    new AzureNetLoginService($timeout, dataService)
]);
