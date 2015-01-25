/// <reference path="../RisingTideApp.ts" />
/// <reference path='../../typings/angularjs/angular.d.ts'/>
/// <reference path='../../typings/angularjs/angular-resource.d.ts'/>

declare var WindowsAzure;

class AzureDataService implements IDataService {
    static serviceId: string = "DataService";
    client;

    constructor(private $http: ng.IHttpService) {
    }

    getRecurrences(successCallback: (p: Array<string>) => any): void {
        console.log(this.client.currentUser.userId + ' about to getRecurrences');
        this.$http.get<Array<string>>(this.client.applicationUrl + 'api/recurrences')
            .success(s=> successCallback(s))
            .error(e=> console.error('Azure getRecurrences error: ' + e));
    }

    saveScheduledPayment(payment: ScheduledPayment, successCallback: (p: ScheduledPayment) => any, errorCallback: Function): void {
        payment.userId = this.client.currentUser.userId;
        var config: ng.IRequestShortcutConfig = {
            headers: {
                'X-ZUMO-AUTH': this.client.currentUser.mobileServiceAuthenticationToken,
            },
            cache: false
        };

        this.$http.put<any>(this.client.applicationUrl + 'api/scheduledpayments', payment, config)
            .success(s => successCallback(ScheduledPayment.paymentFromJson(s)))
            .error(e => {
                console.error('Azure saveScheduledPayment error: ' + e.code + ' ' + e.error);
                errorCallback(e);
            });
    }

    addScheduledPayment(payment: ScheduledPayment, successCallback: (p: ScheduledPayment) => any, errorCallback: Function): void {
        payment.userId = this.client.currentUser.userId;

        var config: ng.IRequestShortcutConfig = {
            headers: {
                'X-ZUMO-AUTH': this.client.currentUser.mobileServiceAuthenticationToken,
            },
            cache: false
        };

        this.$http.post<any>(this.client.applicationUrl + 'api/scheduledpayments', payment, config)
            .success(s => successCallback(ScheduledPayment.paymentFromJson(s)))
            .error(e => {
                console.error('Azure addScheduledPayment error: ' + e.code + ' ' + e.error);
                errorCallback(e);
            });
    }

    deleteScheduledPayment(id: string, successCallback: Function, errorCallback: Function) {
        console.log(this.client.currentUser.userId + ' about to getScheduledPayments');

        var config: ng.IRequestShortcutConfig = {
            headers: {
                'X-ZUMO-AUTH': this.client.currentUser.mobileServiceAuthenticationToken,
            },
            cache: false,
            params: { id: id }
        };

        this.$http.delete<any>(this.client.applicationUrl + 'api/scheduledpayments', config)
            .success(() => successCallback())
            .error(e => {
                console.error('Azure deleteScheduledPayment error: ' + e.code + ' ' + e.error);
                errorCallback(e);
            });
    }

    getScheduledPayments(successCallback: (p: Array<ScheduledPayment>) => any): void {
        var config = {
            headers: {
                'X-ZUMO-AUTH': this.client.currentUser.mobileServiceAuthenticationToken,
            },
            cache: false
        };

        this.$http.get<Array<any>>(this.client.applicationUrl + 'api/scheduledpayments', config)
            .success(s => successCallback(ScheduledPayment.paymentsFromJson(s)))
            .error(e => console.error('Azure getScheduledPayments error: ' + e.code + ' ' + e.error));
    }

    getUpcomingPaymentsWithBalance(startDate: Date, startingBalance: number, successCallback: (p: Array<UpcomingPayment>) => any): void {
        console.log(this.client.currentUser.userId + ' about to getUpcomingPayments');

        var config: ng.IRequestShortcutConfig = {
            headers: {
                'X-ZUMO-AUTH': this.client.currentUser.mobileServiceAuthenticationToken,
            },
            cache: false,
            params: { startDate: startDate.toISOString(), startingBalance: startingBalance }
        };

        this.$http.get<Array<any>>(this.client.applicationUrl + 'api/upcomingpayments', config)
            .success(s => successCallback(UpcomingPayment.paymentsFromJson(s)))
            .error(e => console.error('Azure getUpcomingPayments error: ' + e.code + ' ' + e.error));
    }

    getScheduledPayment(id: string, successCallback: (p: ScheduledPayment) => any): void {
        console.log(this.client.currentUser.userId + ' about to getScheduledPayment');

        var config: ng.IRequestShortcutConfig = {
            headers: {
                'X-ZUMO-AUTH': this.client.currentUser.mobileServiceAuthenticationToken,
            },
            cache: false,
            params: { id: id }
        };

        this.$http.get<any>(this.client.applicationUrl + 'api/scheduledpayments', config)
            .success(s=> successCallback(ScheduledPayment.paymentFromJson(s)))
            .error(e => console.error('Azure getScheduledPayment error: ' + e.code + ' ' + e.error));
    }

    getProjectionData(startDate: Date, numberOfDays: number, initialBalance: number, successCallback: (p: Array<CalendarDay>) => any): void {
        console.log(this.client.currentUser.userId + ' about to getProjectionData');

        var config: ng.IRequestShortcutConfig = {
            headers: {
                'X-ZUMO-AUTH': this.client.currentUser.mobileServiceAuthenticationToken,
            },
            cache: false,
            params: { numberOfDays: numberOfDays, initialBalance: initialBalance, startDate: startDate }
        };

        this.$http.get<Array<any>>(this.client.applicationUrl + 'api/projection', config)
            .success(s => successCallback(CalendarDay.calendayDaysFromJson(s)))
            .error(e => console.error('Azure getProjectionData error: ' + e.code + ' ' + e.error));
    }
}

// Update the app1 variable name to be that of your module variable
RisingTideApp.factory(AzureDataService.serviceId, ['$http', function ($http) {
    return new AzureDataService($http);
}]);
