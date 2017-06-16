/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var casco;
    (function (casco) {
        var CASCOOfferController = (function () {
            function CASCOOfferController($state, $q, CASCOService, $rootScope) {
                this.$state = $state;
                this.$q = $q;
                this.CASCOService = CASCOService;
                this.$rootScope = $rootScope;
                if (this.CASCOService.getOffers() == null) {
                    this.$state.go('home');
                }
                this.offers = this.CASCOService.getOffers();
                this.canCompare = false;
                this.startData = this.offers.startData;
                this.endData = this.offers.endData;
                this.showMargin = $rootScope.isMobile;
            }
            CASCOOfferController.prototype.buyOffer = function (index) {
                this.CASCOService.offerIndex = index;
                this.$state.go('casco.details');
            };
            ;
            CASCOOfferController.prototype.onClickCompareChackBox = function () {
                var indexes = [];
                var index = 0;
                var offer;
                for (var i = 0; i < this.offers.Offers.length; ++i) {
                    offer = this.offers.Offers[i];
                    if (offer.isCompair) {
                        indexes.push(index);
                    }
                    index++;
                }
                if (indexes.length === 2) {
                    this.canCompare = true;
                }
                else {
                    this.canCompare = false;
                }
                console.log(this.canCompare);
            };
            ;
            CASCOOfferController.prototype.compare = function () {
                if (this.canCompare) {
                    this.$state.go('casco.compare');
                }
            };
            ;
            return CASCOOfferController;
        })();
        casco.CASCOOfferController = CASCOOfferController;
        angular.module('nepereplaty').controller('nepereplaty.casco.CASCOOfferController', CASCOOfferController);
    })(casco = nepereplaty.casco || (nepereplaty.casco = {}));
})(nepereplaty || (nepereplaty = {}));
