/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var osago;
    (function (osago) {
        var OSAGOPaymentController = (function () {
            function OSAGOPaymentController($state, $q, OSAGOService) {
                this.$state = $state;
                this.$q = $q;
                this.OSAGOService = OSAGOService;
                if (this.OSAGOService.getOffers() == null) {
                    this.$state.go('home');
                }
                this.offers = this.OSAGOService.getOffers();
                this.logoUrl = this.offers.Offers[this.OSAGOService.offerIndex].Company.Logo;
                this.offer = this.offers.Offers[this.OSAGOService.offerIndex];
                console.log(this.offer);
                this.startData = this.offers.startData;
                this.endData = this.offers.endData;
            }
            ;
            OSAGOPaymentController.prototype.pay = function () {
                this.$state.go('osago.finish');
            };
            return OSAGOPaymentController;
        })();
        osago.OSAGOPaymentController = OSAGOPaymentController;
        angular.module('nepereplaty').controller('nepereplaty.osago.OSAGOPaymentController', OSAGOPaymentController);
    })(osago = nepereplaty.osago || (nepereplaty.osago = {}));
})(nepereplaty || (nepereplaty = {}));
