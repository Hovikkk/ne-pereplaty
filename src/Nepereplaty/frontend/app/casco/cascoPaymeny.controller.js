/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var casco;
    (function (casco) {
        var CASCOPaymentController = (function () {
            function CASCOPaymentController($state, $q, CASCOService) {
                this.$state = $state;
                this.$q = $q;
                this.CASCOService = CASCOService;
                if (this.CASCOService.getOffers() == null) {
                    this.$state.go('home');
                }
                this.offers = this.CASCOService.getOffers();
                this.offer = this.offers.Offers[this.CASCOService.offerIndex];
                this.osagoOffer = this.stringtoNumber(this.offer.osagoPrice);
                this.osagoInclude = false;
                this.updata();
                this.logoUrl = this.offers.Offers[this.CASCOService.offerIndex].Company.Logo;
                this.osagoOfferString = this.osagoOffer.toFixed(3);
                var scapeIndex = (this.osagoOffer / 1000).toFixed(0).length;
                this.osagoOfferString = this.osagoOfferString.slice(0, scapeIndex) + ' ' +
                    this.osagoOfferString.slice(scapeIndex, this.osagoOfferString.length - 1);
                this.startData = this.offers.startData;
                this.endData = this.endData = this.offers.endData;
            }
            ;
            CASCOPaymentController.prototype.updata = function () {
                if (this.osagoInclude) {
                    this.puymentCost = this.stringtoNumber(this.offer.Price) + this.osagoOffer;
                }
                else {
                    this.puymentCost = this.stringtoNumber(this.offer.Price);
                }
                this.puymentString = this.puymentCost.toFixed(3);
                var scapeIndex = (this.puymentCost / 1000).toFixed(0).length;
                this.puymentString = this.puymentString.slice(0, scapeIndex) + ' '
                    + this.puymentString.slice(scapeIndex, this.puymentString.length - 1);
            };
            ;
            CASCOPaymentController.prototype.stringtoNumber = function (s) {
                var result = 0;
                var step1 = s.replace(',', '.');
                var step2 = step1.replace(/ /g, '');
                var step3 = step2.replace(' ', '').replace(String.fromCharCode(160), '');
                result = parseFloat(step3);
                return result;
            };
            CASCOPaymentController.prototype.pay = function () {
                if (this.osagoInclude) {
                    this.CASCOService.totoalPrice = this.osagoOffer + this.stringtoNumber(this.offer.Price);
                }
                else {
                    this.CASCOService.totoalPrice = this.stringtoNumber(this.offer.Price);
                }
                this.$state.go('casco.finish');
            };
            return CASCOPaymentController;
        })();
        casco.CASCOPaymentController = CASCOPaymentController;
        angular.module('nepereplaty').controller('nepereplaty.casco.CASCOPaymentController', CASCOPaymentController);
    })(casco = nepereplaty.casco || (nepereplaty.casco = {}));
})(nepereplaty || (nepereplaty = {}));
