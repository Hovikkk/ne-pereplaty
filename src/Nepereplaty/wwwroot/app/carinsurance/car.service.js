/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />
/// <reference path="../../../typings/angular-translate/angular-translate.d.ts" />
var nepereplaty;
(function (nepereplaty) {
    var car;
    (function (car) {
        var CarService = (function () {
            // @ngInject
            function CarService($http, $q, $timeout) {
                this.$http = $http;
                this.$q = $q;
                this.$timeout = $timeout;
            }
            CarService.prototype.loadOffers = function (request) {
                var _this = this;
                return this.$http.post('api/car/insuranceoffer', request)
                    .success(function (response) {
                    _this.offers = response;
                });
            };
            CarService.prototype.getOffers = function () {
                return this.offers;
            };
            return CarService;
        })();
        car.CarService = CarService;
        angular.module('nepereplaty').service('car', CarService);
    })(car = nepereplaty.car || (nepereplaty.car = {}));
})(nepereplaty || (nepereplaty = {}));
