/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var house;
    (function (house) {
        var HOUSEPaymentController = (function () {
            function HOUSEPaymentController($state, $q, HOUSEService) {
                this.$state = $state;
                this.$q = $q;
                this.HOUSEService = HOUSEService;
                this.content = new house.HOUSEOffer();
                this.additianalPay = [
                    {
                        b: false,
                        c: 700,
                        s: '700'
                    },
                    {
                        b: false,
                        c: 1000,
                        s: '1 000'
                    }
                ];
                if (this.HOUSEService.getOffers() == null) {
                    this.$state.go('home');
                }
                this.content = this.HOUSEService.getOffers();
                this.content.submodule = 'Дом';
                this.content.termInsurance = '1 год';
                this.logoUrl = this.content.Offers[this.HOUSEService.offerIndex].Company.Logo;
                this.offer = this.content.Offers[this.HOUSEService.offerIndex];
                var priceString = this.content.Offers[this.HOUSEService.offerIndex].Total_SP.toFixed(3);
                var scapeIndex = (this.content.Offers[this.HOUSEService.offerIndex].Total_SP / 1000).toFixed(0).length;
                priceString = priceString.slice(0, scapeIndex) + ' ' +
                    priceString.slice(scapeIndex, priceString.length - 1);
                this.content.Price = this.content.Offers[this.HOUSEService.offerIndex].Total_SP.toFixed(3);
                this.content.priceString = priceString;
                this.startData = this.content.startData;
                this.endData = this.content.endData;
            }
            ;
            HOUSEPaymentController.prototype.updata = function () {
                var total = 0;
                for (var i = 0; i < 2; ++i) {
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
                this.additianalPayString = total.toFixed(3);
                scapeIndex = (total / 1000).toFixed(0).length;
                this.additianalPayString = this.additianalPayString.slice(0, scapeIndex) + ' '
                    + this.additianalPayString.slice(scapeIndex, this.additianalPayString.length - 1);
            };
            ;
            HOUSEPaymentController.prototype.stringtoNumber = function (s) {
                var result = 0;
                var step1 = s.replace(',', '.');
                var step2 = step1.replace(/ /g, '');
                var step3 = step2.replace(' ', '').replace(String.fromCharCode(160), '');
                result = parseFloat(step3);
                return result;
            };
            HOUSEPaymentController.prototype.pay = function () {
                var total = 0;
                for (var i = 0; i < 2; ++i) {
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
                this.HOUSEService.totoalPrice = this.puymentCost;
                this.$state.go('house.finish');
            };
            return HOUSEPaymentController;
        })();
        house.HOUSEPaymentController = HOUSEPaymentController;
        angular.module('nepereplaty').controller('nepereplaty.house.HOUSEPaymentController', HOUSEPaymentController);
    })(house = nepereplaty.house || (nepereplaty.house = {}));
})(nepereplaty || (nepereplaty = {}));
