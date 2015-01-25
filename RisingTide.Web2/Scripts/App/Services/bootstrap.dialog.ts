// Install the angularjs.TypeScript.DefinitelyTyped NuGet package to resolve the reference paths,
// then adjust the path value to be relative to this file
/// <reference path="../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts"/>
"use strict";

interface IBootstrapDialog {
    deleteDialog: (itemName: string) => ng.IPromise<any>;
    confirmationDialog: (title: string, message: string, okText?: string, cancelText?: string) => ng.IPromise<any>;
}

class BootstrapDialog implements IBootstrapDialog {
    public static serviceId: string = "modalService";

    constructor(private $templateCache: ng.ITemplateCacheService, private $modal: ng.ui.bootstrap.IModalService) {
        this.setTemplate();
    }

    public deleteDialog(itemName: string) {
        var title = "Confirm Delete";
        itemName = itemName || "item";
        var deleteMessage = "Delete " + itemName + "?";

        return this.confirmationDialog(title, deleteMessage);
    }

    public confirmationDialog(title: string, message: string, okText?: string, cancelText?: string) {
        var modalOptions = {
            templateUrl: "modalDialog.tpl.html",
            controller: [
                "$scope", "$modalInstance", "options",
                ($scope, $modalInstance, options) => new ModalController($scope, $modalInstance, options)],

            keyboard: true,
            resolve: {
                options: () => {
                    return {
                        title: title,
                        message: message,
                        okText: okText,
                        cancelText: cancelText
                    };
                }
            }
        };

        return this.$modal.open(modalOptions).result;
    }

    private setTemplate(): void {
        this.$templateCache.put("modalDialog.tpl.html",
"<div>" +
"    <div class='modal-header'>" +
"        <button type='button' class='close' data-dismiss='modal' aria-hidden='true' data-ng-click='cancel()'>&times;</button>" +
"        <h3>{{title}}</h3>" +
"    </div>" +
"    <div class='modal-body'>" +
"        <p>{{message}}</p>" +
"    </div>" +
"    <div class='modal-footer'>" +
"        <button class='btn btn-primary' data-ng-click='ok()'>{{okText}}</button>" +
"        <button class='btn btn-info' data-ng-click='cancel()'>{{cancelText}}</button>" +
"    </div>" +
"</div>");
    }

}

interface IModalOptions {
    title: string;
    message: string;
    okText: string;
    cancelText: string;
}

interface IModalScopex extends ng.ui.bootstrap.IModalScope {
    title: string;
    message: string;
    okText: string;
    cancelText: string;
    ok: () => void;
    cancel: () => void;
}

class ModalController {
    constructor($scope: IModalScopex, $modalInstance: ng.ui.bootstrap.IModalServiceInstance, options: IModalOptions) {
        $scope.title = options.title || "Title";
        $scope.message = options.message || "";
        $scope.okText = options.okText || "OK";
        $scope.cancelText = options.cancelText || "Cancel";
        $scope.ok = () => { $modalInstance.close("ok"); };
        $scope.cancel = () => { $modalInstance.dismiss("cancel"); };
    }
}

// Create the service and define its dependencies.
RisingTideApp.service(BootstrapDialog.serviceId,
    ["$templateCache", "$modal",
     ($templateCache,   $modal) => {
         return new BootstrapDialog($templateCache, $modal);
}]);
