/// <reference path="../app.ts" />
var admin;
(function (admin) {
    var login;
    (function (login) {
        var LoginModalController = (function () {
            function LoginModalController(close, $q, $timeout, $rootScope, $http) {
                this.close = close;
                this.$q = $q;
                this.$timeout = $timeout;
                this.$rootScope = $rootScope;
                this.$http = $http;
                console.log('ligin Controller ');
                $rootScope.dismissModal = function (result) {
                    if (result === void 0) { result = ''; }
                    close(result);
                };
            }
            LoginModalController.prototype.login = function () {
                var _this = this;
                console.log('Ade hly hoooooooooop');
                var defer = this.$q.defer();
                this.$http
                    .post('../api/account/loginadmin', { Email: this.userName, Password: this.password })
                    .success(function (response) {
                    if (response.IsSuccessful) {
                        defer.resolve(response.Id);
                        _this.$rootScope.dismissModal();
                        window.location.reload();
                    }
                    else {
                        defer.reject(null);
                    }
                })
                    .error(function () {
                    defer.reject(null);
                });
            };
            return LoginModalController;
        })();
        login.LoginModalController = LoginModalController;
        angular.module('admin').controller('LoginModalController', LoginModalController);
    })(login = admin.login || (admin.login = {}));
})(admin || (admin = {}));
