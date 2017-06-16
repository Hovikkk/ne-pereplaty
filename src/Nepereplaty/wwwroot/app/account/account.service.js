/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />
/// <reference path="../../../typings/angular-translate/angular-translate.d.ts" />
var nepereplaty;
(function (nepereplaty) {
    var account;
    (function (account_1) {
        var AccountService = (function () {
            function AccountService($q, $http, auth) {
                this.$q = $q;
                this.$http = $http;
                this.auth = auth;
                this.accountData = null;
            }
            /**
             * Load account data from server
             * @returns {IPromise<T>}
             */
            AccountService.prototype.load = function () {
                var defer = this.$q.defer();
                this.$http
                    .get('api/account/profile')
                    .success(function (account) {
                    console.log(account);
                    defer.resolve(account);
                })
                    .error(function () {
                    defer.reject();
                });
                return defer.promise;
            };
            /**
             * Retrieve account from service. If no account information, load id from server
             * @returns {IPromise<T>}
             */
            AccountService.prototype.getAccount = function () {
                var _this = this;
                var defer = this.$q.defer();
                if (this.accountData !== null) {
                    // Data is already loaded
                    defer.resolve(this.accountData);
                }
                else {
                    this
                        .load()
                        .then(function (data) {
                        // Resolve loaded account data
                        _this.accountData = data;
                        defer.resolve(_this.accountData);
                    })
                        .catch(function () {
                        defer.reject();
                    });
                }
                return defer.promise;
            };
            AccountService.prototype.editAccount = function (data) {
                var _this = this;
                var defer = this.$q.defer();
                this.$http
                    .put('api/account', data)
                    .success(function (account) {
                    if (account.IsSuccessful) {
                        _this.accountData = data;
                        defer.resolve(account);
                    }
                    else {
                        defer.reject(account);
                    }
                })
                    .error(function () {
                    defer.reject();
                });
                return defer.promise;
            };
            AccountService.prototype.changePassword = function (data) {
                var defer = this.$q.defer();
                this.$http
                    .put('api/account/changepassword', data)
                    .success(function (account) {
                    if (account.IsSuccessful) {
                        defer.resolve(account);
                    }
                    else {
                        defer.resolve(account);
                    }
                })
                    .error(function () {
                    defer.reject();
                });
                return defer.promise;
            };
            return AccountService;
        })();
        account_1.AccountService = AccountService;
        angular.module('nepereplaty').service('account', AccountService);
    })(account = nepereplaty.account || (nepereplaty.account = {}));
})(nepereplaty || (nepereplaty = {}));
