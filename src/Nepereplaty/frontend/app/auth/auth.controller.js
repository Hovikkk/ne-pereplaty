/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var auth;
    (function (auth_1) {
        var AuthController = (function () {
            // @ngInject
            function AuthController($http, $state, $q, $timeout, auth, $scope, $rootScope, ModalService) {
                var _this = this;
                this.$http = $http;
                this.$state = $state;
                this.$q = $q;
                this.$timeout = $timeout;
                this.auth = auth;
                this.$scope = $scope;
                this.$rootScope = $rootScope;
                this.ModalService = ModalService;
                this.isAuthenticated = false;
                this.fullName = '';
                this.openLogin = false;
                this.openTelephone = false;
                auth.checkUser().then(function (value) {
                    _this.isAuthenticated = value.IsSuccessful;
                    _this.fullName = auth.getFullName();
                });
            }
            AuthController.prototype.updata = function () {
                this.$rootScope.openLogin = this.openLogin;
            };
            /**
             * Forget user
             */
            AuthController.prototype.logout = function () {
                var _this = this;
                this.$http
                    .post('api/account/logout', {})
                    .success(function (response) {
                    _this.$state.go('home');
                    window.location.reload();
                });
            };
            AuthController.prototype.update = function () {
                var _this = this;
                this.isAuthenticated = false;
                this.fullName = '';
                this.auth.checkUser().then(function (value) {
                    _this.isAuthenticated = value.IsSuccessful;
                    _this.fullName = _this.auth.getFullName();
                });
            };
            AuthController.prototype.login = function () {
                var _this = this;
                this.$rootScope.isModalShown = true;
                this.ModalService.showModal({
                    templateUrl: 'app/auth/login.html',
                    controller: 'LoginModalController',
                    controllerAs: 'loginModalCtrl',
                    inputs: {
                        name: 'auth'
                    }
                }).then(function (modal) {
                    modal.close.then(function (result) {
                        if (result === 'register') {
                            _this.register();
                        }
                        else {
                            if (result === 'logedin') {
                                _this.isAuthenticated = true;
                                _this.fullName = _this.auth.getFullName();
                            }
                            _this.$rootScope.isModalShown = false;
                        }
                        // Reset user password
                        //this.credentials.password = '';
                    });
                });
            };
            AuthController.prototype.register = function () {
                var _this = this;
                this.$rootScope.isModalShown = true;
                this.ModalService.showModal({
                    templateUrl: 'app/auth/register.html',
                    controller: 'RegisterModalController',
                    controllerAs: 'registerModalCtrl',
                    inputs: {
                        name: 'auth'
                    }
                }).then(function (modal) {
                    modal.close.then(function (result) {
                        if (result === 'login') {
                            _this.login();
                        }
                        else {
                            if (result === 'registered') {
                                _this.isAuthenticated = true;
                                _this.auth.checkUser().then(function (value) {
                                    _this.fullName = _this.auth.getFullName();
                                });
                            }
                            _this.$rootScope.isModalShown = false;
                        }
                        // Reset user password
                        //this.credentials.password = '';
                    });
                });
            };
            return AuthController;
        })();
        auth_1.AuthController = AuthController;
        angular.module('nepereplaty').controller('AuthController', AuthController);
    })(auth = nepereplaty.auth || (nepereplaty.auth = {}));
})(nepereplaty || (nepereplaty = {}));
