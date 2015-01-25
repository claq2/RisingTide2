/// <reference path="../RisingTideApp.ts" />
/// <reference path='../../typings/angularjs/angular.d.ts'/>
/// <reference path='../../typings/angularjs/angular-resource.d.ts'/>

interface IDataService {
    getScheduledPayments: (successCallback: (p: Array<ScheduledPayment>) => any) => void;
    getScheduledPayment: (id: string, successCallback: (p: ScheduledPayment) => any) => void;
    getUpcomingPaymentsWithBalance: (startDate: Date, startingBalance: number, successCallback: (p: Array<UpcomingPayment>) => any) => void;
    client: any;
    saveScheduledPayment: (payment: ScheduledPayment, successCallback: (p: ScheduledPayment) => any, errorCallback: Function) => void;
    addScheduledPayment: (payment: ScheduledPayment, successCallback: (p: ScheduledPayment) => any, errorCallback: Function) => void;
    getRecurrences: (successCallback: (p: Array<string>) => any) => void;
    deleteScheduledPayment: (id: string, successCallback: Function, errorCallback: Function) => void;
    getProjectionData: (startDate: Date, numberOfDays: number, initialBalance: number, successCallback: (p: Array<CalendarDay>) => any) => void;
}

interface ILoginService {
    loginWithMicrosoft: (successCallback: Function) => any;
    loginWithGoogle: (successCallback: Function) => any;
    isSignedIn: boolean;
}

enum PaymentType {
    credit, debit
}

class ScheduledPayment {
    subject: string;
    amount: number;
    paymentType: PaymentType;
    userId: string;
    includeInCashFlowAnalysis: boolean;
    recurrence: string;
    dueDate: Date;
    id: string;
    static paymentsFromJson(json: Array<any>): Array<ScheduledPayment> {
        var result: Array<ScheduledPayment> = [];
        for (var i = 0; i < json.length; i++) {
            result.push(ScheduledPayment.paymentFromJson(json[i]));
        }

        return result;
    }

    static paymentFromJson(json: any): ScheduledPayment {
        var result: ScheduledPayment;
        result = {
            subject: json.subject,
            amount: json.amount,
            paymentType: json.paymentType,
            userId: json.userId,
            includeInCashFlowAnalysis: json.includeInCashFlowAnalysis,
            recurrence: json.recurrence,
            dueDate: new Date(json.dueDate),
            id: json.id
        };

        return result;
    }
}

class UpcomingPayment {
    subject: string;
    amount: number;
    paymentType: PaymentType;
    dueDate: Date;
    scheduledPaymentId: string;
    balance: number;

    static paymentsFromJson(json: Array<any>): Array<UpcomingPayment> {
        var result: Array<UpcomingPayment> = [];
        for (var i = 0; i < json.length; i++) {
            result.push(UpcomingPayment.paymentFromJson(json[i]));
        }

        return result;
    }

    static paymentFromJson(json: any): UpcomingPayment {
        var result: UpcomingPayment;
        result = {
            subject: json.subject,
            amount: json.amount,
            paymentType: json.paymentType,
            dueDate: new Date(json.dueDate),
            balance: json.balance,
            scheduledPaymentId: json.scheduledPaymentId
        };

        return result;
    }
}

class SinglePayment {
    subject: string;
    amount: number;
    paymentType: PaymentType;
    scheduledPaymentId: string;
    includeInCashFlowAnalysis: boolean;
    static singlePaymentsFromJson(json: Array<any>): SinglePayment[] {
        var result: Array<SinglePayment> = [];
        for (var i = 0; i < json.length; i++) {
            result.push(SinglePayment.singlePaymentFromJson(json[i]));
        }

        return result;
    }

    static singlePaymentFromJson(json: any): SinglePayment {
        var result: SinglePayment;
        result = {
            subject: json.subject,
            amount: json.amount,
            paymentType: json.paymentType,
            scheduledPaymentId: json.scheduledPaymentId,
            includeInCashFlowAnalysis: json.includeInCashFlowAnalysis
        };

        return result;
    }
}

class CalendarDay {
    date: Date;
    endOfDayBalance: number;
    payments: SinglePayment[];
    static calendayDaysFromJson(json: Array<any>): CalendarDay[] {
        var result: Array<CalendarDay> = [];
        for (var i = 0; i < json.length; i++) {
            result.push(CalendarDay.calendayDayFromJson(json[i]));
        }

        return result;
    }

    static calendayDayFromJson(json: any): CalendarDay {
        var result: CalendarDay;
        result = {
            date: new Date(json.date),
            endOfDayBalance: json.endOfDayBalance,
            payments: SinglePayment.singlePaymentsFromJson(json.payments)
        };

        return result;
    }
}
