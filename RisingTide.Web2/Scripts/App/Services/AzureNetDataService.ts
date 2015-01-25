/// <reference path="../RisingTideApp.ts" />
/// <reference path='../../typings/angularjs/angular.d.ts'/>
/// <reference path='../../typings/angularjs/angular-resource.d.ts'/>

declare var WindowsAzure;

class AzureNetDataService implements IDataService {
    static serviceId: string = "DataService";
    client;

    constructor(private $timeout: ng.ITimeoutService, private $q: ng.IQService) {
    }

    getRecurrences(successCallback: Function): void {
        console.log(this.client.currentUser.userId + ' about to getRecurrences');
        this.client.invokeApi('recurrences', { method: 'GET' }).done((results) => {
            this.$timeout(() => {
                console.log(results.result[0]);
                successCallback(results.result);
            });
        }, (error) => {
                console.error('Azure getRecurrences error: ' + error);
            });
    }

    saveScheduledPayment(payment: ScheduledPayment, successCallback: Function, errorCallback: Function): void {
        payment.userId = this.client.currentUser.userId;
        console.log(this.client.currentUser.userId + ' about to saveScheduledPayment');
        this.client.invokeApi('scheduledpayments', { method: 'PUT', body: payment }).done((results) => {
            this.$timeout(() => {
                successCallback(results.result);
            });
        }, (error) => {
                console.error('Azure saveScheduledPayments error: ' + error);
                this.$timeout(() => {
                    errorCallback(error);
                });
            });
    }

    addScheduledPayment(payment: ScheduledPayment, successCallback: Function, errorCallback: Function): void {
        payment.userId = this.client.currentUser.userId;
        console.log(this.client.currentUser.userId + ' about to addScheduledPayment');
        this.client.invokeApi('scheduledpayments', { method: 'POST', body: payment }).done((results) => {
            this.$timeout(() => {
                successCallback(results.result);
            });
        }, (error) => {
                console.error('Azure saveScheduledPayments error: ' + error);
                this.$timeout(() => {
                    errorCallback(error);
                });
            });
    }

    deleteScheduledPayment(id: string, successCallback: Function, errorCallback: Function) {
        console.log(this.client.currentUser.userId + ' about to getScheduledPayments');
        this.client.invokeApi('scheduledpayments', { method: 'DELETE', parameters: { id: id } }).done((results) => {
            this.$timeout(() => {
                successCallback(results.result);
            });
        }, (error) => {
                console.error('Azure getScheduledPayments error: ' + error);
                this.$timeout(() => {
                    errorCallback(error);
                });
            });
    }

    getScheduledPayments(successCallback: Function): void {
        console.log(this.client.currentUser.userId + ' about to getScheduledPayments');
        this.client.invokeApi('scheduledpayments', { method: 'GET' }).done((results) => {
            this.$timeout(() => {
                if (results.result && results.result.length > 0) {
                    console.log(results.result[0].Subject);
                }
                else {
                    console.log("No items found");
                }

                successCallback(results.result);
            })
        }, function (error) {
                console.error('Azure getScheduledPayments error: ' + error);
            });
    }

    getUpcomingPayments(startDate: Date, successCallback: Function): void {
        console.log(this.client.currentUser.userId + ' about to getUpcomingPayments');
        this.client.invokeApi('upcomingpayments', { method: 'GET', parameters: { startDate: startDate.toISOString() } }).done((results) => {
            this.$timeout(() => {
                if (results.result && results.result.length > 0) {
                    console.log(results.result[0].Subject);
                }
                else {
                    console.log("No items found");
                }

                successCallback(results.result);
            })
        }, function (error) {
                console.error('Azure getUpcomingPayments error: ' + error);
            });
    }

    getUpcomingPaymentsWithBalance(startDate: Date, startingBalance: number, successCallback: Function): void {
        console.log(this.client.currentUser.userId + ' about to getUpcomingPayments');
        this.client.invokeApi('upcomingpayments', { method: 'GET', parameters: { startDate: startDate.toISOString(), startingBalance: startingBalance } }).done((results) => {
            this.$timeout(() => {
                if (results.result && results.result.length > 0) {
                    console.log(results.result[0].Subject);
                }
                else {
                    console.log("No items found");
                }

                successCallback(results.result);
            })
        }, function (error) {
                console.error('Azure getUpcomingPayments error: ' + error);
            });
    }

    getScheduledPayment(id: string, successCallback: Function): void {
        console.log(this.client.currentUser.userId + ' about to getScheduledPayment');
        this.client.invokeApi('scheduledpayments', { method: 'GET', parameters: { id: id } }).done((results) => {
            console.log(results.result.Subject);
            this.$timeout(() => {
                successCallback(results.result);
            });
        }, function (error) {
                console.error('Azure getScheduledPayment error: ' + error);
            });
    }

    getProjectionData(startDate: Date, numberOfDays: number, initialBalance: number, successCallback: Function): void {
        console.log(this.client.currentUser.userId + ' about to getProjectionData');
        this.client.invokeApi('projection', { method: 'GET', parameters: { startDate: startDate.toISOString(), numberOfDays: numberOfDays, initialBalance: initialBalance } }).done((results) => {
            console.log(results.result.Subject);
            this.$timeout(() => {
                successCallback(results.result);
            });
        }, function (error) {
                console.error('Azure getScheduledPayment error: ' + error);
            });
    }
}

// Update the app1 variable name to be that of your module variable
RisingTideApp.factory(AzureNetDataService.serviceId, ['$timeout', '$q', function ($timeout, $q) {
    return new AzureNetDataService($timeout, $q);
}]);
