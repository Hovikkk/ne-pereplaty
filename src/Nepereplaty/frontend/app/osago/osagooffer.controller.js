/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var osago;
    (function (osago) {
        var OSAGOOfferController = (function () {
            function OSAGOOfferController($state, $q, OSAGOService, $rootScope) {
                this.$state = $state;
                this.$q = $q;
                this.OSAGOService = OSAGOService;
                this.$rootScope = $rootScope;
                if (this.OSAGOService.getOffers() == null) {
                    this.$state.go('home');
                }
                this.offers = this.OSAGOService.getOffers();
                this.startData = this.offers.startData;
                this.endData = this.offers.endData;
                this.showMargin = $rootScope.isMobile;
            }
            OSAGOOfferController.prototype.buyOffer = function (index) {
                this.OSAGOService.offerIndex = index;
                console.log(this.OSAGOService.offerIndex);
                this.$state.go('osago.details');
            };
            ;
            return OSAGOOfferController;
        })();
        osago.OSAGOOfferController = OSAGOOfferController;
        angular.module('nepereplaty').controller('nepereplaty.osago.OSAGOOfferController', OSAGOOfferController);
    })(osago = nepereplaty.osago || (nepereplaty.osago = {}));
})(nepereplaty || (nepereplaty = {}));
