/// <reference path="../app.ts" />

module nepereplaty.auth {

    export interface ILoginResponse {
        IsSuccessful: boolean;
        Name: string;
        Surname: string;
        Id: string;
    }

    export interface IRegisterResponse {
        IsSuccessful: boolean;
        Error: string;
    }

    export interface IAuthService {
        isAuthorized: boolean;
        authenticate(credentials: UserCredentials): angular.IPromise<any>;
        checkUser(): angular.IPromise<ILoginResponse>;
        logout(): angular.IPromise<{}>;
        isAuthenticated(): angular.IPromise<boolean>;
        register(credentials: UserCredentials): angular.IHttpPromise<IRegisterResponse>;
        getUserId(): string;
        getFullName(): string;
    }

    export class AuthService implements IAuthService {
        public isAuthorized: boolean;
        private userId: string;
        private userName: string;
        private userSurname: string;

        // @ngInject
        constructor(private $http: angular.IHttpService,
                    private $q: angular.IQService,
                    private $timeout: angular.ITimeoutService) {
            this.isAuthorized = false;
            this.userId = null;
            this.userName = '';
            this.userSurname = '';
        }

        checkUser(): angular.IPromise<ILoginResponse> {
            var defer = this.$q.defer();

            this.$http
                .get('api/account')
                .success((response: ILoginResponse) => {
                    if (response.IsSuccessful) {
                        this.isAuthorized = true;
                        this.userId = response.Id;
                        this.userName = response.Name;
                        this.userSurname = response.Surname;
                        defer.resolve(response);
                    } else {
                        defer.reject(null);
                    }
                })
                .error((): void => {
                    defer.reject(null);
                });

            return defer.promise;
        }

        /**
         * Authenticate user on server and in client app
         * @param credentials
         * @returns {IPromise<T>}
         */
        authenticate(credentials: UserCredentials): angular.IPromise<any> {
            var defer = this.$q.defer();

            this.$http
                .post('api/account/login', { Email: credentials.login, Password: credentials.password })
                .success((response: ILoginResponse) => {
                    if (response.IsSuccessful) {
                        this.isAuthorized = true;
                        this.userId = response.Id;
                        this.userName = response.Name;
                        this.userSurname = response.Surname;
                        defer.resolve(response.Id);
                    } else {
                        defer.reject(null);
                    }
                })
                .error((): void => {
                    defer.reject(null);
                });

            return defer.promise;
        }

        /**
         * Send register request
         * @param credentials
         * @returns {IHttpPromise<T>}
         */
        register(credentials: RegisterCredentials): angular.IHttpPromise<IRegisterResponse> {
            return this.$http
                .post('api/account/register',
                {
                    Email: credentials.login,
                    Password: credentials.password,
                    ConfirmPassword: credentials.confirmPassword,
                    Name: credentials.name,
                    Surname: credentials.surname,
                    IsAgreed: credentials.isAgreed
                });
        }

        /**
         * Logout user. Clean all data on client side
         * @returns {IPromise<T>}
         */
        logout(): angular.IPromise<{}> {
            var defer = this.$q.defer();
            this.$http
                .post('api/account/logout', {})
                .success((response: ILoginResponse) => {
                    console.log('api/account/logout');
                    //window.location.reload();
                })
                .error((): void => {
                    defer.reject(null);
                });

            return defer.promise;
        }

        /**
         * Check if user is authenticated
         * @returns {boolean|function(): boolean}
         */
        isAuthenticated(): angular.IPromise<boolean> {
            var defer = this.$q.defer();

            if (this.userId !== null) {
                this.isAuthorized = true;
                defer.resolve(true);
            } else {
                this.isAuthorized = false;
                defer.reject(false);
            }

            return defer.promise;
        }

        /**
         *
         * @returns {string}
         */
        getUserId(): string {
            return this.userId;
        }

        getFullName(): string {
            return this.userName + ' ' + this.userSurname;
        }
    }

    angular.module('nepereplaty').service('auth', AuthService);
}