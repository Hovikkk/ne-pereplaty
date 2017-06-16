/// <reference path='../app.ts' />

module admin.menu {
    export interface ILoginResponse {
        IsSuccessful: boolean;
        Name: string;
        Surname: string;
        Id: string;
    }
    export class MenuController {
        constructor(private $http: angular.IHttpService,
            private $state: angular.ui.IStateService,
            private $q: angular.IQService,
            private $timeout: angular.ITimeoutService,
            private $scope: angular.IScope,
            private $rootScope: any,
            private ModalService: any) {
            var defer = this.$q.defer();
            this.$http
                .get('../api/account/admin')
                .success((response: ILoginResponse) => {
                    if (response.IsSuccessful) {
                        defer.resolve(response);
                    } else {
                        this.ModalService.showModal({
                            templateUrl: 'login/login.html',
                            controller: 'LoginModalController',
                            controllerAs: 'loginModalCtrl',
                            inputs: {

                            }
                        });
                        defer.reject(null);
                    }
                })
                .error((): void => {
                    this.ModalService.showModal({
                        templateUrl: 'login/login.html',
                        controller: 'LoginModalController',
                        controllerAs: 'loginModalCtrl',
                        inputs: {

                        }
                    });
                    defer.reject(null);
                });
           
        }

        gotoPage(url: string): void {
            console.log(url);
            this.$state.go(url);
        }  
        
    }
    angular.module('admin').controller('admin.menu.MenuController', MenuController);
}