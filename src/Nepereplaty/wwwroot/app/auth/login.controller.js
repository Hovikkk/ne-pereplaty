/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />
/// <reference path="../../../typings/angular-translate/angular-translate.d.ts" />
var nepereplaty;
(function (nepereplaty) {
    var auth;
    (function (auth_1) {
        var UserCredentials = (function () {
            function UserCredentials(login, password) {
                if (login === void 0) { login = ''; }
                if (password === void 0) { password = ''; }
                this.login = login;
                this.password = password;
            }
            return UserCredentials;
        })();
        auth_1.UserCredentials = UserCredentials;
        var LoginModalController = (function () {
            // @ngInject
            function LoginModalController(close, $scope, auth, $q, $timeout) {
                this.close = close;
                this.$scope = $scope;
                this.auth = auth;
                this.$q = $q;
                this.$timeout = $timeout;
                $scope.vm = this;
                $scope.dismissModal = function (result) {
                    if (result === void 0) { result = ''; }
                    close(result);
                };
                this.credentials = new UserCredentials();
                this.isUnSuccessful = false;
            }
            /**
             * Try authenticate user, if success redirect him to home page
             */
            LoginModalController.prototype.login = function () {
                var _this = this;
                // Check if user pass valid credentials
                if (this.$scope.form.$valid) {
                    this.auth
                        .authenticate(this.credentials)
                        .then(function (user) {
                        _this.$scope.dismissModal('logedin');
                    })
                        .catch(function () {
                        _this.isUnSuccessful = true;
                    });
                }
            };
            return LoginModalController;
        })();
        auth_1.LoginModalController = LoginModalController;
        angular.module('nepereplaty').controller('LoginModalController', LoginModalController);
    })(auth = nepereplaty.auth || (nepereplaty.auth = {}));
})(nepereplaty || (nepereplaty = {}));
