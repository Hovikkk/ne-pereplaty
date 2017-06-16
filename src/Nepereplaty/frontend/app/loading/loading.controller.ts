/// <reference path="../app.ts" />

module nepereplaty.loading {
    export class LoadingModalController {
        constructor(
           
            private close: any,
            private auth: nepereplaty.auth.IAuthService,
            private $q: angular.IQService,
            private $timeout: angular.ITimeoutService,
            private $rootScope: any) {

            $rootScope.dismissModal = function (result: string = '') { close(result); };
        }
    }
    angular.module('nepereplaty').controller('LoadingModalController', LoadingModalController);
}