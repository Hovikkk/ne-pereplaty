/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var casco;
    (function (casco) {
        var CASCOCompareController = (function () {
            function CASCOCompareController($state, $q, CASCOService) {
                this.$state = $state;
                this.$q = $q;
                this.CASCOService = CASCOService;
                console.log('++++++++++++++++++____');
                this.offers = this.CASCOService.getOffers();
                if (this.offers.Offers[0].AdditionalOptions.length > this.offers.Offers[1].AdditionalOptions.length) {
                    this.AdditionalOptions = this.offers.Offers[0].AdditionalOptions;
                }
                else {
                    this.AdditionalOptions = this.offers.Offers[1].AdditionalOptions;
                }
                console.log('++++++++++++++++++____');
            }
            CASCOCompareController.prototype.back = function () {
                console.log('________________________________===================');
                this.$state.go('casco.offer');
            };
            ;
            return CASCOCompareController;
        })();
        casco.CASCOCompareController = CASCOCompareController;
        angular.module('nepereplaty').controller('nepereplaty.casco.CASCOCompareController', CASCOCompareController);
    })(casco = nepereplaty.casco || (nepereplaty.casco = {}));
})(nepereplaty || (nepereplaty = {}));
