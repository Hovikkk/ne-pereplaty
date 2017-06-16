/// <reference path="../app.ts" />

module nepereplaty.home {

    export interface IModalScope extends angular.IScope {
        vm: any;
        dismissModal: any;
    }

    export class CarModalController {

		// @ngInject
        constructor(
            private close: any,
            private $scope: IModalScope,
            private auth: nepereplaty.auth.IAuthService,
            private $q: angular.IQService,
            private $timeout: angular.ITimeoutService,
            private $rootScope: any) {

            $scope.vmm = this;
            $rootScope.mod = 'mod';
            $scope.dismissModal = function (result: string = '') {
                console.log(result);
                close(result);
                $rootScope.mod = '';
            };
		}
	}
	
    angular.module('nepereplaty').controller('CarModalController', CarModalController);
	
}