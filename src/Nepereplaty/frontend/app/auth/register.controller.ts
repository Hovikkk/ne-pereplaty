/// <reference path="../app.ts" />

module nepereplaty.auth {
	
    export class RegisterCredentials {
        login: string;
        password: string;
        confirmPassword: string;
        name: string;
        surname: string;
        isAgreed: boolean;

        constructor(
            login: string = '',
            password: string = '',
            confirmPassword: string = '',
            name: string = '',
            surname: string = '',
            isAgreed: boolean = false) {

            this.login = login;
            this.password = password;
            this.confirmPassword = confirmPassword;
            this.name = name;
            this.surname = surname;
            this.isAgreed = isAgreed;
        }
    }

    export class RegisterModalController {
        credentials: RegisterCredentials;
        emailExists: boolean;
        unknownError: boolean;
        /**
         * Register user, after successful redirect to home page
         */
        register(): void {
            if (this.$scope.form.$valid && 
                this.credentials.password === this.credentials.confirmPassword &&
                this.credentials.isAgreed) {

                this.auth
                    .register(this.credentials)
                    .success((respone: nepereplaty.auth.IRegisterResponse): void => {
                        if (respone.IsSuccessful) {
                            this.$scope.dismissModal('registered');
                        } else {
                            if (respone.Error === 'EmailExiststs') {
                                this.emailExists = true;
                            }
                            if (respone.Error === 'Unknown') {
                                this.unknownError = true;
                            }
                        }
                    })
                    .error((): void => {
                        console.error('Server communication problem');
                    });
            }
        }

		// @ngInject
        constructor(
            private close: any,
            private name: any,
            private $scope: IAuthModalScope,
            private auth: nepereplaty.auth.IAuthService,
            private $q: angular.IQService,
            private $timeout: angular.ITimeoutService) {

            $scope.vm = this;
            
            $scope.dismissModal = function (result: string = '') {

                console.log(this.registerModalCtrl.name);
                console.log(result);
                if (result !== 'registered' && result !== 'login') {
                    if (this.registerModalCtrl.name !== 'auth') {
                        this.$state.go(this.registerModalCtrl.name + '.offer');
                    };
                }

                close(result);
            };
            this.credentials = new RegisterCredentials();
            this.emailExists = false;
            this.unknownError = false;
		}
	}
	
    angular.module('nepereplaty').controller('RegisterModalController', RegisterModalController);
	
}