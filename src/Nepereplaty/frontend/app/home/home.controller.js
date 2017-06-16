/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var home;
    (function (home) {
        var HomeController = (function () {
            function HomeController($state, $scope, $rootScope, ModalService) {
                this.$state = $state;
                this.$scope = $scope;
                this.$rootScope = $rootScope;
                this.ModalService = ModalService;
                this.$rootScope.showFooter = false;
            }
            HomeController.prototype.carModal = function () {
                var _this = this;
                this.$rootScope.isModalShown = true;
                this.ModalService.showModal({
                    templateUrl: 'app/home/car.modal.html',
                    controller: 'CarModalController',
                    controllerAs: 'carModalCtrl',
                    inputs: {}
                }).then(function (modal) {
                    modal.close.then(function (result) {
                        if (result === 'casco') {
                            _this.$state.go('casco');
                        }
                        if (result === 'osago') {
                            _this.$state.go('osago');
                        }
                        _this.$rootScope.isModalShown = false;
                        // Reset user password
                        //this.credentials.password = '';
                    });
                });
            };
            HomeController.prototype.gotoTraveling = function () {
                this.$state.go('traveling');
            };
            HomeController.prototype.appartment = function () {
                var _this = this;
                this.$rootScope.isModalShown = true;
                this.ModalService.showModal({
                    templateUrl: 'app/home/appartment.modal.html',
                    controller: 'AppartmentController',
                    controllerAs: 'appartmentCtrl',
                    inputs: {}
                }).then(function (modal) {
                    modal.close.then(function (result) {
                        if (result === 'house') {
                            _this.$state.go('house');
                        }
                        if (result === 'apartment') {
                            _this.$state.go('apartment');
                        }
                        _this.$rootScope.isModalShown = false;
                        // Reset user password
                        //this.credentials.password = '';
                    });
                });
            };
            HomeController.prototype.health = function () {
                var _this = this;
                this.$rootScope.isModalShown = true;
                this.ModalService.showModal({
                    templateUrl: 'app/home/health.modal.html',
                    controller: 'HealthController',
                    controllerAs: 'healthCtrl',
                    inputs: {}
                }).then(function (modal) {
                    modal.close.then(function (result) {
                        if (result === 'accident') {
                            _this.$state.go('accident');
                        }
                        if (result === 'medical') {
                            _this.$state.go('medical');
                        }
                        _this.$rootScope.isModalShown = false;
                        // Reset user password
                        //this.credentials.password = '';
                    });
                });
            };
            return HomeController;
        })();
        home.HomeController = HomeController;
        angular.module('nepereplaty').controller('nepereplaty.home.HomeController', HomeController);
    })(home = nepereplaty.home || (nepereplaty.home = {}));
})(nepereplaty || (nepereplaty = {}));
