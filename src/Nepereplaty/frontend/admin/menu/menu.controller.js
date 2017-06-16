/// <reference path='../app.ts' />
var admin;
(function (admin) {
    var menu;
    (function (menu) {
        var MenuController = (function () {
            function MenuController($http, $state, $q, $timeout, $scope, $rootScope, ModalService) {
                var _this = this;
                this.$http = $http;
                this.$state = $state;
                this.$q = $q;
                this.$timeout = $timeout;
                this.$scope = $scope;
                this.$rootScope = $rootScope;
                this.ModalService = ModalService;
                var defer = this.$q.defer();
                this.$http
                    .get('../api/account/admin')
                    .success(function (response) {
                    if (response.IsSuccessful) {
                        defer.resolve(response);
                    }
                    else {
                        _this.ModalService.showModal({
                            templateUrl: 'login/login.html',
                            controller: 'LoginModalController',
                            controllerAs: 'loginModalCtrl',
                            inputs: {}
                        });
                        defer.reject(null);
                    }
                })
                    .error(function () {
                    _this.ModalService.showModal({
                        templateUrl: 'login/login.html',
                        controller: 'LoginModalController',
                        controllerAs: 'loginModalCtrl',
                        inputs: {}
                    });
                    defer.reject(null);
                });
            }
            MenuController.prototype.gotoPage = function (url) {
                console.log(url);
                this.$state.go(url);
            };
            return MenuController;
        })();
        menu.MenuController = MenuController;
        angular.module('admin').controller('admin.menu.MenuController', MenuController);
    })(menu = admin.menu || (admin.menu = {}));
})(admin || (admin = {}));
