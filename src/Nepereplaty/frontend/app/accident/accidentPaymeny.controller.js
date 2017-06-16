/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var accident;
    (function (accident) {
        var ACCIDENTPaymentController = (function () {
            function ACCIDENTPaymentController($state, $q, ACCIDENTService) {
                this.$state = $state;
                this.$q = $q;
                this.ACCIDENTService = ACCIDENTService;
                this.content = new accident.ACCIDENTOffer();
                this.additianalPay = [
                    {
                        b: false,
                        c: 50,
                        s: '50'
                    },
                    {
                        b: false,
                        c: 10,
                        s: '10'
                    }
                ];
                this.insuranceOptions = [
                    {
                        text: '1 месяц',
                        value: 1
                    },
                    {
                        text: '3 месяца',
                        value: 3
                    },
                    {
                        text: '6 месяцев',
                        value: 6
                    },
                    {
                        text: '12 месяцев',
                        value: 12
                    }
                ];
                if (this.ACCIDENTService.getOffers() == null) {
                    this.$state.go('home');
                }
                this.content = this.ACCIDENTService.getOffers();
                this.offer = this.content.Offers[this.ACCIDENTService.offerIndex];
                this.logoUrl = this.content.Offers[this.ACCIDENTService.offerIndex].Company.Logo;
                if (this.offer.Total_SP > 1000) {
                    var priceString = this.offer.Total_SP.toFixed(3);
                    var scapeIndex = (this.offer.Total_SP / 1000).toFixed(0).length;
                    priceString = priceString.slice(0, scapeIndex) + ' ' +
                        priceString.slice(scapeIndex, priceString.length - 1);
                    this.offer.Price = priceString;
                }
                else {
                    this.offer.Price = this.offer.Total_SP.toFixed(2);
                }
                for (var i = 0; i < this.insuranceOptions.length; i++) {
                    if (this.insuranceOptions[i].value === this.content.duration) {
                        this.duration = this.insuranceOptions[i].text;
                        break;
                    }
                }
                this.startData = this.content.startData;
                this.endData = this.content.endData;
                this.updata();
            }
            ;
            ACCIDENTPaymentController.prototype.updata = function () {
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
                if (this.puymentCost > 1000) {
                    this.puymentString = this.puymentCost.toFixed(3);
                    var scapeIndex = Math.floor(this.puymentCost / 1000).toFixed(0).length;
                    this.puymentString = this.puymentString.slice(0, scapeIndex) + ' '
                        + this.puymentString.slice(scapeIndex, this.puymentString.length - 1);
                }
                else {
                    this.puymentString = this.puymentCost.toFixed(2);
                }
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
            ACCIDENTPaymentController.prototype.stringtoNumber = function (s) {
                var result = 0;
                var step1 = s.replace(',', '.');
                var step2 = step1.replace(/ /g, '');
                var step3 = step2.replace(' ', '').replace(String.fromCharCode(160), '');
                result = parseFloat(step3);
                return result;
            };
            ACCIDENTPaymentController.prototype.pay = function () {
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
                this.ACCIDENTService.totoalPrice = this.puymentCost;
                this.$state.go('accident.finish');
            };
            return ACCIDENTPaymentController;
        })();
        accident.ACCIDENTPaymentController = ACCIDENTPaymentController;
        angular.module('nepereplaty').controller('nepereplaty.accident.ACCIDENTPaymentController', ACCIDENTPaymentController);
    })(accident = nepereplaty.accident || (nepereplaty.accident = {}));
})(nepereplaty || (nepereplaty = {}));
