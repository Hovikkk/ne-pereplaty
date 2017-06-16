/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var account;
    (function (account_1) {
        var ACCOUNTform = (function () {
            function ACCOUNTform() {
                this.TelCode1 = { text: '--', value: null };
                this.TelCode2 = { text: '--', value: null };
            }
            return ACCOUNTform;
        })();
        account_1.ACCOUNTform = ACCOUNTform;
        var AccountData = (function () {
            function AccountData() {
            }
            return AccountData;
        })();
        account_1.AccountData = AccountData;
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
                    console.log(this.accountData);
                    defer.resolve(this.accountData);
                }
                else {
                    this
                        .load()
                        .then(function (data) {
                        // Resolve loaded account data
                        _this.accountData = data;
                        if (_this.accountData.PassportnNumber) {
                            _this.accountData.PassportnNumber = parseInt(_this.accountData.PassportnNumber.toString(), 0);
                        }
                        if (_this.accountData.PassportSerial) {
                            _this.accountData.PassportSerial = parseInt(_this.accountData.PassportSerial.toString(), 0);
                        }
                        if (_this.accountData.PassportIssued) {
                            _this.accountData.PassportIssued = parseInt(_this.accountData.PassportIssued.toString(), 0);
                        }
                        if (_this.accountData.Telephone) {
                            _this.accountData.Telephone = parseInt(_this.accountData.Telephone.toString(), 0);
                        }
                        if (_this.accountData.Mobile) {
                            _this.accountData.Mobile = parseInt(_this.accountData.Mobile.toString(), 0);
                        }
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
