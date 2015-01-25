/// <reference path="../RisingTideApp.ts" />
/// <reference path='../../typings/angularjs/angular.d.ts'/>

class LocalhostLoginService implements ILoginService {
    static serviceId: string = "LoginService";
    client;
    isSignedIn: boolean = false;

    constructor(private dataService: IDataService) {
    }

    loginWithMicrosoft(successCallback: Function) {
        this.isSignedIn = true;
        this.dataService.client = { userId: "MicrosoftUser:123" };
        successCallback(this.dataService.client.userId);
    }

    loginWithGoogle(successCallback: Function) {
        this.isSignedIn = true;
        this.dataService.client = { userId: "GoogleUser:123" };
        successCallback(this.dataService.client.userId);
    }
}

RisingTideApp.factory(LocalhostLoginService.serviceId, ['DataService', (dataService) =>
    new LocalhostLoginService(dataService)
]);
