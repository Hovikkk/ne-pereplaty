/// <reference path="../app.ts" />
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
            function LoginModalController(close, name, $scope, auth, $q, $state, $timeout, $rootScope) {
                this.close = close;
                this.name = name;
                this.$scope = $scope;
                this.auth = auth;
                this.$q = $q;
                this.$state = $state;
                this.$timeout = $timeout;
                this.$rootScope = $rootScope;
                $scope.vm = this;
                this.step = 0;
                console.log(this.name);
                this.closeResult = this.name;
                $scope.dismissModal = function (result) {
                    if (result === void 0) { result = ''; }
                    console.log(this.loginModalCtrl.name);
                    console.log(result);
                    if (result !== 'logedin' && result !== 'register') {
                        if (this.loginModalCtrl.name !== 'auth') {
                            this.$state.go(this.loginModalCtrl.name + '.offer');
                        }
                        ;
                    }
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
            LoginModalController.prototype.chackSendMail = function () {
                if (this.$scope.form.email.$invalid) {
                    return;
                }
                this.step = 2;
            };
            return LoginModalController;
        })();
        auth_1.LoginModalController = LoginModalController;
        angular.module('nepereplaty').controller('LoginModalController', LoginModalController);
    })(auth = nepereplaty.auth || (nepereplaty.auth = {}));
})(nepereplaty || (nepereplaty = {}));
