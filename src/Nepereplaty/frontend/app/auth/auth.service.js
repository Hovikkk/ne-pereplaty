/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var auth;
    (function (auth) {
        var AuthService = (function () {
            // @ngInject
            function AuthService($http, $q, $timeout) {
                this.$http = $http;
                this.$q = $q;
                this.$timeout = $timeout;
                this.isAuthorized = false;
                this.userId = null;
                this.userName = '';
                this.userSurname = '';
            }
            AuthService.prototype.checkUser = function () {
                var _this = this;
                var defer = this.$q.defer();
                this.$http
                    .get('api/account')
                    .success(function (response) {
                    if (response.IsSuccessful) {
                        _this.isAuthorized = true;
                        _this.userId = response.Id;
                        _this.userName = response.Name;
                        _this.userSurname = response.Surname;
                        defer.resolve(response);
                    }
                    else {
                        defer.reject(null);
                    }
                })
                    .error(function () {
                    defer.reject(null);
                });
                return defer.promise;
            };
            /**
             * Authenticate user on server and in client app
             * @param credentials
             * @returns {IPromise<T>}
             */
            AuthService.prototype.authenticate = function (credentials) {
                var _this = this;
                var defer = this.$q.defer();
                this.$http
                    .post('api/account/login', { Email: credentials.login, Password: credentials.password })
                    .success(function (response) {
                    if (response.IsSuccessful) {
                        _this.isAuthorized = true;
                        _this.userId = response.Id;
                        _this.userName = response.Name;
                        _this.userSurname = response.Surname;
                        defer.resolve(response.Id);
                    }
                    else {
                        defer.reject(null);
                    }
                })
                    .error(function () {
                    defer.reject(null);
                });
                return defer.promise;
            };
            /**
             * Send register request
             * @param credentials
             * @returns {IHttpPromise<T>}
             */
            AuthService.prototype.register = function (credentials) {
                return this.$http
                    .post('api/account/register', {
                    Email: credentials.login,
                    Password: credentials.password,
                    ConfirmPassword: credentials.confirmPassword,
                    Name: credentials.name,
                    Surname: credentials.surname,
                    IsAgreed: credentials.isAgreed
                });
            };
            /**
             * Logout user. Clean all data on client side
             * @returns {IPromise<T>}
             */
            AuthService.prototype.logout = function () {
                var defer = this.$q.defer();
                this.$http
                    .post('api/account/logout', {})
                    .success(function (response) {
                    console.log('api/account/logout');
                    //window.location.reload();
                })
                    .error(function () {
                    defer.reject(null);
                });
                return defer.promise;
            };
            /**
             * Check if user is authenticated
             * @returns {boolean|function(): boolean}
             */
            AuthService.prototype.isAuthenticated = function () {
                var defer = this.$q.defer();
                if (this.userId !== null) {
                    this.isAuthorized = true;
                    defer.resolve(true);
                }
                else {
                    this.isAuthorized = false;
                    defer.reject(false);
                }
                return defer.promise;
            };
            /**
             *
             * @returns {string}
             */
            AuthService.prototype.getUserId = function () {
                return this.userId;
            };
            AuthService.prototype.getFullName = function () {
                return this.userName + ' ' + this.userSurname;
            };
            return AuthService;
        })();
        auth.AuthService = AuthService;
        angular.module('nepereplaty').service('auth', AuthService);
    })(auth = nepereplaty.auth || (nepereplaty.auth = {}));
})(nepereplaty || (nepereplaty = {}));
