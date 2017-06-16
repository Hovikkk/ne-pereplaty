/// <reference path="../app.ts" />

module nepereplaty.auth {
    
    export interface IAuthModalScope extends angular.IScope {
        vm: any;
        dismissModal: any;
        form?: any;
    }

    export interface IAuthController {
        login(): void;
        logout(): void;
        register(): void;
        update(): void;
	}

    export class AuthController implements IAuthController {
        isAuthenticated: boolean;
        fullName: string;
        openLogin: boolean;
        openTelephone: boolean;
        // @ngInject
        constructor(private $http: angular.IHttpService,
                    private $state: angular.ui.IStateService,
                    private $q: angular.IQService,
                    private $timeout: angular.ITimeoutService,
                    private auth: nepereplaty.auth.IAuthService,
                    private $scope: angular.IScope,
                    private $rootScope: any,
                    private ModalService: any) {
            this.isAuthenticated = false;
            this.fullName = '';
            this.openLogin = false;
            this.openTelephone = false;
            auth.checkUser().then((value: ILoginResponse) => {
                this.isAuthenticated = value.IsSuccessful;
                this.fullName = auth.getFullName();
                
            });
		}

        updata(): void {
            this.$rootScope.openLogin = this.openLogin;
        }
        /**
         * Forget user
         */
        logout(): void {
            this.$http
                .post('api/account/logout', {})
                .success((response: any) => {
                    this.$state.go('home');
                    window.location.reload();
                });
                
        }
        update(): void {
            this.isAuthenticated = false;
            this.fullName = '';
            this.auth.checkUser().then((value: ILoginResponse) => {
                this.isAuthenticated = value.IsSuccessful;
                this.fullName = this.auth.getFullName();
            });
        }
        login(): void {
            this.$rootScope.isModalShown = true;
            this.ModalService.showModal({
                templateUrl: 'app/auth/login.html',
                controller: 'LoginModalController',
                controllerAs: 'loginModalCtrl',
                inputs: {
                    name: 'auth'
                }
            }).then((modal): void => {
                modal.close.then((result: string): void => {
                    if (result === 'register') {
                        this.register();
                    } else {
                        if (result === 'logedin') {
                            this.isAuthenticated = true;
                            this.fullName = this.auth.getFullName();
                        }
                        this.$rootScope.isModalShown = false;
                    }
                    // Reset user password
                    //this.credentials.password = '';
                });
            });
        }

        register(): void {
            this.$rootScope.isModalShown = true;
            this.ModalService.showModal({
                templateUrl: 'app/auth/register.html',
                controller: 'RegisterModalController',
                controllerAs: 'registerModalCtrl',
                inputs: {
                    name: 'auth'
                }
            }).then((modal): void => {
                modal.close.then((result: string): void => {
                    if (result === 'login') {
                        this.login();
                    } else {
                        if (result === 'registered') {
                            this.isAuthenticated = true;
                            this.auth.checkUser().then((value: ILoginResponse) => {
                                this.fullName = this.auth.getFullName();
                            });
                        }
                        this.$rootScope.isModalShown = false;
                    }
                    // Reset user password
                    //this.credentials.password = '';
                });
            });
        }
	}

    angular.module('nepereplaty').controller('AuthController', AuthController);
}