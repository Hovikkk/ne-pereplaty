/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />
/// <reference path="../../../typings/angular-translate/angular-translate.d.ts" />
var nepereplaty;
(function (nepereplaty) {
    var auth;
    (function (auth_1) {
        var RegisterCredentials = (function () {
            function RegisterCredentials(login, password, confirmPassword, name, surname, isAgreed) {
                if (login === void 0) { login = ''; }
                if (password === void 0) { password = ''; }
                if (confirmPassword === void 0) { confirmPassword = ''; }
                if (name === void 0) { name = ''; }
                if (surname === void 0) { surname = ''; }
                if (isAgreed === void 0) { isAgreed = false; }
                this.login = login;
                this.password = password;
                this.confirmPassword = confirmPassword;
                this.name = name;
                this.surname = surname;
                this.isAgreed = isAgreed;
            }
            return RegisterCredentials;
        })();
        auth_1.RegisterCredentials = RegisterCredentials;
        var RegisterModalController = (function () {
            // @ngInject
            function RegisterModalController(close, $scope, auth, $q, $timeout) {
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
                this.credentials = new RegisterCredentials();
                this.emailExists = false;
                this.unknownError = false;
            }
            /**
             * Register user, after successful redirect to home page
             */
            RegisterModalController.prototype.register = function () {
                var _this = this;
                if (this.$scope.form.$valid &&
                    this.credentials.password == this.credentials.confirmPassword &&
                    this.credentials.isAgreed) {
                    this.auth
                        .register(this.credentials)
                        .success(function (respone) {
                        if (respone.IsSuccessful) {
                            _this.$scope.dismissModal('registered');
                        }
                        else {
                            if (respone.Error == 'EmailExiststs') {
                                _this.emailExists = true;
                            }
                            if (respone.Error == 'Unknown') {
                                _this.unknownError = true;
                            }
                        }
                    })
                        .error(function () {
                        console.error('Server communication problem');
                    });
                }
            };
            return RegisterModalController;
        })();
        auth_1.RegisterModalController = RegisterModalController;
        angular.module('nepereplaty').controller('RegisterModalController', RegisterModalController);
    })(auth = nepereplaty.auth || (nepereplaty.auth = {}));
})(nepereplaty || (nepereplaty = {}));
