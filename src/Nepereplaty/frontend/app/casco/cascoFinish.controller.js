/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var casco;
    (function (casco) {
        var CASCOFinishController = (function () {
            function CASCOFinishController($http, $state, $q, CASCOService) {
                this.$http = $http;
                this.$state = $state;
                this.$q = $q;
                this.CASCOService = CASCOService;
                if (this.CASCOService.getOffers() == null) {
                    this.$state.go('home');
                }
                this.offer = this.CASCOService.getOffers().Offers[this.CASCOService.offerIndex];
                this.data = this.CASCOService.buyerInfo;
                this.age = this.CASCOService.getOffers().DriversMinAge;
                this.orderNumber = this.CASCOService.offerId;
                this.startData = this.CASCOService.getOffers().startData;
                this.endData = this.CASCOService.getOffers().endData;
                this.price = this.CASCOService.totoalPrice;
                this.DriversCount = this.CASCOService.getOffers().DriversCount;
                this.priceString = this.price.toFixed(3);
                var scapeIndex = (this.price / 1000).toFixed(0).length;
                this.priceString = this.priceString.slice(0, scapeIndex) + ' ' +
                    this.priceString.slice(scapeIndex, this.priceString.length - 1);
                this.$http.get('../api/admin/purchas/' + this.CASCOService.offerId + '/'
                    + this.CASCOService.totoalPrice).success(function (response) {
                    console.log(response);
                });
            }
            CASCOFinishController.prototype.downloadPdf = function () {
                window.open('../../p/example.pdf');
            };
            ;
            return CASCOFinishController;
        })();
        casco.CASCOFinishController = CASCOFinishController;
        angular.module('nepereplaty').controller('nepereplaty.casco.CASCOFinishController', CASCOFinishController);
    })(casco = nepereplaty.casco || (nepereplaty.casco = {}));
})(nepereplaty || (nepereplaty = {}));
