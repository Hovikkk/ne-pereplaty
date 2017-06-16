/// <reference path="../app.ts" />

module admin.login {
    export interface ILoginResponse {
        IsSuccessful: boolean;
        Name: string;
        Surname: string;
        Id: string;
    }
    export class LoginModalController {
        password: any;
        userName: any;
        constructor(

            private close: any,
            private $q: angular.IQService,
            private $timeout: angular.ITimeoutService,
            private $rootScope: any,
        private $http: angular.IHttpService) {
            console.log('ligin Controller ');
            $rootScope.dismissModal = function (result: string = '') { close(result); };
        }

        login(): void {
            console.log('Ade hly hoooooooooop');
            var defer = this.$q.defer();
            this.$http
                .post('../api/account/loginadmin', { Email: this.userName, Password: this.password })
                .success((response: ILoginResponse) => {
                    if (response.IsSuccessful) {
                        defer.resolve(response.Id);
                        this.$rootScope.dismissModal();
                        window.location.reload();
                    } else {
                        defer.reject(null);
                    }
                })
                .error((): void => {
                    defer.reject(null);
                });
            
        }
    }
    angular.module('admin').controller('LoginModalController', LoginModalController);
}