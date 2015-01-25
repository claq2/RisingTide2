/// <reference path="DataService.ts" />
/// <reference path="../RisingTideApp.ts" />
/// <reference path='../../typings/angularjs/angular.d.ts'/>
/// <reference path='../../typings/angularjs/angular-resource.d.ts'/>

class LocalDataService implements IDataService {
    static serviceId: string = "DataService";
    client;

    constructor(private $http: ng.IHttpService) {
    }

    getRecurrences(successCallback: (p: Array<string>) => any): void {
        this.$http.get<Array<string>>('/risingtide.api2/api/Recurrences')
            .success((results) => {
                console.log('Got ' + results.length + ' recurrences');
                successCallback(results);
            });
    }

    saveScheduledPayment(payment: ScheduledPayment, successCallback: (p: ScheduledPayment) => any, errorCallback: Function): void {
        payment.userId = this.client.userId;
        this.$http.put<any>('/risingtide.api2/api/ScheduledPayments', payment)
            .success((result) => {
                console.log('Payment subject:' + result.subject);
                var scheduledPayment = ScheduledPayment.paymentFromJson(result);
                successCallback(scheduledPayment);
            })
            .error((error) => errorCallback(error));
    }

    addScheduledPayment(payment: ScheduledPayment, successCallback: (p: ScheduledPayment) => any, errorCallback: Function): void {
        payment.userId = this.client.userId;
        this.$http.post<any>('/risingtide.api2/api/ScheduledPayments', payment)
            .success((result) => {
                console.log('New payment ID:' + result.id);
                var scheduledPayment = ScheduledPayment.paymentFromJson(result);
                successCallback(scheduledPayment);
            })
            .error((error) => errorCallback(error));
    }

    deleteScheduledPayment(id: string, successCallback: Function, errorCallback: Function) {
        this.$http.delete('/risingtide.api2/api/ScheduledPayments/?userId=' + this.client.userId + '&id=' + id)
            .success(() => {
                console.log('Deleted ' + id);
                successCallback();
            })
            .error((error, x, y) => {
                console.log('Error while deleting: ' + error);
                errorCallback(error);
            });
    }

    getScheduledPayments(successCallback: (p: Array<ScheduledPayment>) => any): void {
        this.$http.get<Array<any>>('/risingtide.api2/api/ScheduledPayments/?userId=' + this.client.userId)
            .success(results => {
                var scheduledPayments: ScheduledPayment[] = ScheduledPayment.paymentsFromJson(results);
                successCallback(scheduledPayments);
            });
    }

    getScheduledPayment(id: string, successCallback: (p: ScheduledPayment) => any): void {
        this.$http.get<any>('/risingtide.api2/api/ScheduledPayments/?userId=' + this.client.userId + '&id=' + id)
            .success((result) => {
                console.log('Payment subject:' + result.subject);
                var scheduledPayment = ScheduledPayment.paymentFromJson(result);
                successCallback(scheduledPayment);
            });
    }

    getUpcomingPaymentsWithBalance(startDate: Date, startingBalance: number, successCallback: (p: Array<UpcomingPayment>) => any): void {
        this.$http.get<Array<any>>('/risingtide.api2/api/UpcomingPayments/?userId=' + this.client.userId + '&startdate=' + startDate.toISOString() + '&startingBalance=' + startingBalance)
            .success((results) => {
                console.log('First upcoming payment subject:' + results[0].subject);
                successCallback(UpcomingPayment.paymentsFromJson(results));
            });
    }

    getProjectionData(startDate: Date, numberOfDays: number, initialBalance: number, successCallback: (p: Array<CalendarDay>) => any): void {
        this.$http.get<Array<any>>('/risingtide.api2/api/Projection/?userId=' + this.client.userId + '&startdate=' + startDate.toISOString() + '&numberOfDays=' + numberOfDays + '&initialBalance=' + initialBalance)
            .success((s) => {
                console.log('First upcoming payment subject:' + s[0].endOfDayBalance);
                successCallback(CalendarDay.calendayDaysFromJson(s));
            });
    }
}

RisingTideApp.factory(LocalDataService.serviceId, ['$http', ($http) => {
    return new LocalDataService($http)
}]);
