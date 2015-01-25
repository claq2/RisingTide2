/// <reference path="../RisingTideApp.ts" />
/// <reference path='../../typings/angularjs/angular.d.ts'/>
/// <reference path='../../typings/toastr/toastr.d.ts'/>

interface ILoggerService {
    logSuccess: (message: string) => void;
    logError: (message: string) => void;
}

class LoggerService implements ILoggerService {
    public static serviceId = "LoggerService";
    constructor(private $log: ng.ILogService) {

    }

    logSuccess(message: string) {
        this.$log.info(message);
        toastr.success(message);
    }

    logError(message: string) {
        this.$log.error(message);
        toastr.error(message);
    }

}

RisingTideApp.factory(LoggerService.serviceId, ["$log", ($log) => {
    return new LoggerService($log);
}]);
