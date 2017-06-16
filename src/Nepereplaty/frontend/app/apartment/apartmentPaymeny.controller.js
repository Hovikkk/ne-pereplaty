/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var apartment;
    (function (apartment) {
        var APARTMENTPaymentController = (function () {
            function APARTMENTPaymentController($state, $q, APARTMENTService) {
                this.$state = $state;
                this.$q = $q;
                this.APARTMENTService = APARTMENTService;
                this.content = new apartment.APARTMENTOffer();
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
                if (this.APARTMENTService.getOffers() == null) {
                    this.$state.go('home');
                }
                this.content = this.APARTMENTService.getOffers();
                this.content.submodule = 'Дом';
                this.content.termInsurance = '1 год';
                this.logoUrl = this.content.Offers[this.APARTMENTService.offerIndex].Company.Logo;
                this.offer = this.content.Offers[this.APARTMENTService.offerIndex];
                var priceString = this.content.Offers[this.APARTMENTService.offerIndex].Total_SP.toFixed(3);
                var scapeIndex = (this.content.Offers[this.APARTMENTService.offerIndex].Total_SP / 1000).toFixed(0).length;
                priceString = priceString.slice(0, scapeIndex) + ' ' +
                    priceString.slice(scapeIndex, priceString.length - 1);
                this.content.Price = this.content.Offers[this.APARTMENTService.offerIndex].Total_SP.toFixed(3);
                this.content.priceString = priceString;
                this.startData = this.content.startData;
                this.endData = this.content.endData;
                this.updata();
            }
            ;
            APARTMENTPaymentController.prototype.updata = function () {
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
            APARTMENTPaymentController.prototype.stringtoNumber = function (s) {
                var result = 0;
                var step1 = s.replace(',', '.');
                var step2 = step1.replace(/ /g, '');
                var step3 = step2.replace(' ', '').replace(String.fromCharCode(160), '');
                result = parseFloat(step3);
                return result;
            };
            APARTMENTPaymentController.prototype.pay = function () {
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
                this.APARTMENTService.totoalPrice = this.puymentCost;
                this.$state.go('apartment.finish');
            };
            return APARTMENTPaymentController;
        })();
        apartment.APARTMENTPaymentController = APARTMENTPaymentController;
        angular.module('nepereplaty').controller('nepereplaty.apartment.APARTMENTPaymentController', APARTMENTPaymentController);
    })(apartment = nepereplaty.apartment || (nepereplaty.apartment = {}));
})(nepereplaty || (nepereplaty = {}));
