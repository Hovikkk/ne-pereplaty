/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />
/// <reference path="../../../typings/angular-translate/angular-translate.d.ts" />
var nepereplaty;
(function (nepereplaty) {
    var car;
    (function (car_1) {
        var InsuracneCompany = (function () {
            function InsuracneCompany() {
            }
            return InsuracneCompany;
        })();
        car_1.InsuracneCompany = InsuracneCompany;
        var AdditionalOption = (function () {
            function AdditionalOption() {
            }
            return AdditionalOption;
        })();
        car_1.AdditionalOption = AdditionalOption;
        var CarInsuracneOffer = (function () {
            function CarInsuracneOffer() {
                this.AdditionalOptions = [];
                this.IsShown = false;
            }
            return CarInsuracneOffer;
        })();
        car_1.CarInsuracneOffer = CarInsuracneOffer;
        var CarInsuranceOffers = (function () {
            function CarInsuranceOffers() {
            }
            return CarInsuranceOffers;
        })();
        car_1.CarInsuranceOffers = CarInsuranceOffers;
        var CarOfferController = (function () {
            function CarOfferController($state, $q, car) {
                this.$state = $state;
                this.$q = $q;
                this.car = car;
                this.offers = this.car.getOffers();
            }
            return CarOfferController;
        })();
        car_1.CarOfferController = CarOfferController;
        angular.module('nepereplaty').controller('nepereplaty.car.CarOfferController', CarOfferController);
    })(car = nepereplaty.car || (nepereplaty.car = {}));
})(nepereplaty || (nepereplaty = {}));
