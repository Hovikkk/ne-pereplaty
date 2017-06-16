/// <reference path="../app.ts" />

module nepereplaty.auth {

    export class UserCredentials {
        login: string;
        password: string;

        constructor(login: string = '', password: string = '') {
            this.login = login;
            this.password = password;
        }
    }

    export class LoginModalController {
        credentials: UserCredentials;
        isUnSuccessful: boolean;
        
        /**
         * Try authenticate user, if success redirect him to home page
         */
        login(): void {

            // Check if user pass valid credentials
            if (this.$scope.form.$valid) {
                this.auth
                    .authenticate(this.credentials)
                    .then((user): void => {
                        this.$scope.dismissModal('logedin');
                    })
                    .catch((): void => {
                        this.isUnSuccessful = true;
                    });
            }
        }
        step: number;
        closeResult: string;
		// @ngInject
        constructor(
            private close: any,
            private name:any,
            private $scope: IAuthModalScope,
            private auth: nepereplaty.auth.IAuthService,
            private $q: angular.IQService,
            private $state: angular.ui.IStateService,
            private $timeout: angular.ITimeoutService,
            private $rootScope: any) {

            $scope.vm = this;
            this.step = 0;
            console.log(this.name);
            this.closeResult = this.name;
            $scope.dismissModal = function (result: string = '') {
                console.log(this.loginModalCtrl.name);
                console.log(result);
                if (result !== 'logedin' && result !== 'register') {
                    if (this.loginModalCtrl.name !== 'auth') {
                        this.$state.go(this.loginModalCtrl.name + '.offer');
                    };
                }
                close(result);
            };

            this.credentials = new UserCredentials();
            this.isUnSuccessful = false;
        }
        chackSendMail(): void {
            if (this.$scope.form.email.$invalid) {
                return;
            }
            this.step = 2;
        }
	}
	
    angular.module('nepereplaty').controller('LoginModalController', LoginModalController);
	
}