/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var traveling;
    (function (traveling) {
        var TRAVELINGPaymentController = (function () {
            function TRAVELINGPaymentController($state, $q, TRAVELINGService) {
                this.$state = $state;
                this.$q = $q;
                this.TRAVELINGService = TRAVELINGService;
                this.content = new traveling.TRAVELINGOffer();
                this.additianalPay = [
                    {
                        b: false,
                        c: 1000,
                        s: '1 000'
                    },
                    {
                        b: false,
                        c: 500,
                        s: '500'
                    },
                    {
                        b: false,
                        c: 2000,
                        s: '2 000'
                    }
                ];
                if (this.TRAVELINGService.getOffers() == null) {
                    this.$state.go('home');
                }
                this.content = this.TRAVELINGService.getOffers();
                this.offer = this.content.Offers[this.TRAVELINGService.offerIndex];
                this.logoUrl = this.content.Offers[this.TRAVELINGService.offerIndex].Company.Logo;
                var priceString = this.content.Offers[this.TRAVELINGService.offerIndex].Total_SP.toFixed(3);
                var scapeIndex = (this.content.Offers[this.TRAVELINGService.offerIndex].Total_SP / 1000).toFixed(0).length;
                priceString = priceString.slice(0, scapeIndex) + ' ' +
                    priceString.slice(scapeIndex, priceString.length - 1);
                this.content.Price = this.content.Offers[this.TRAVELINGService.offerIndex].Total_SP.toFixed(3);
                this.content.priceString = priceString;
                this.startData = this.content.startData;
                this.endData = this.content.endData;
                this.updata();
            }
            ;
            TRAVELINGPaymentController.prototype.updata = function () {
                var total = 0;
                for (var i = 0; i < 3; ++i) {
                    if (this.additianalPay[i].b) {
                        total += this.additianalPay[i].c;
                    }
                }
                if (total > 0) {
                    this.add = true;
                    this.puymentCost = this.stringtoNumber(this.offer.Price) + total;
                }
                else {
                    this.add = false;
                    this.puymentCost = this.stringtoNumber(this.offer.Price);
                }
                this.puymentString = this.puymentCost.toFixed(3);
                var scapeIndex = Math.floor(this.puymentCost / 1000).toFixed(0).length;
                this.puymentString = this.puymentString.slice(0, scapeIndex) + ' '
                    + this.puymentString.slice(scapeIndex, this.puymentString.length - 1);
                if (total > 1000) {
                    this.additianalPayString = total.toFixed(3);
                    scapeIndex = (total / 1000).toFixed(0).length;
                    this.additianalPayString = this.additianalPayString.slice(0, scapeIndex) + ' '
                        + this.additianalPayString.slice(scapeIndex, this.additianalPayString.length - 1);
                }
                else {
                    this.additianalPayString = total.toFixed(2);
                }
            };
            ;
            TRAVELINGPaymentController.prototype.stringtoNumber = function (s) {
                var result = 0;
                var step1 = s.replace(',', '.');
                var step2 = step1.replace(/ /g, '');
                var step3 = step2.replace(' ', '').replace(String.fromCharCode(160), '');
                result = parseFloat(step3);
                return result;
            };
            TRAVELINGPaymentController.prototype.pay = function () {
                var total = 0;
                for (var i = 0; i < 3; ++i) {
                    if (this.additianalPay[i].b) {
                        total += this.additianalPay[i].c;
                    }
                }
                if (total > 0) {
                    this.puymentCost = this.stringtoNumber(this.offer.Price) + total;
                }
                else {
                    this.puymentCost = this.stringtoNumber(this.offer.Price);
                }
                this.TRAVELINGService.totoalPrice = this.puymentCost;
                this.$state.go('traveling.finish');
            };
            return TRAVELINGPaymentController;
        })();
        traveling.TRAVELINGPaymentController = TRAVELINGPaymentController;
        angular.module('nepereplaty').controller('nepereplaty.traveling.TRAVELINGPaymentController', TRAVELINGPaymentController);
    })(traveling = nepereplaty.traveling || (nepereplaty.traveling = {}));
})(nepereplaty || (nepereplaty = {}));
