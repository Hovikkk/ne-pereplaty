/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var accident;
    (function (accident) {
        var ACCIDENTFinishController = (function () {
            function ACCIDENTFinishController($http, $state, $q, ACCIDENTService) {
                this.$http = $http;
                this.$state = $state;
                this.$q = $q;
                this.ACCIDENTService = ACCIDENTService;
                this.content = new accident.ACCIDENTOffer();
                if (this.ACCIDENTService.getOffers() == null) {
                    this.$state.go('home');
                }
                this.data = this.ACCIDENTService.buyerInfo;
                this.offers = this.ACCIDENTService.getOffers();
                this.content.name = this.data.Surname + ' ' + this.data.Name;
                this.content.orderNumber = this.ACCIDENTService.offerId.toString();
                this.content.insurancePolicy = this.offers.Offers[this.ACCIDENTService.offerIndex].Name;
                this.content.companyName = this.offers.Offers[this.ACCIDENTService.offerIndex].Company.Name;
                this.content.age = this.offers.age;
                this.content.startData = this.offers.startData;
                var ar = this.offers.startData.split('.');
                var d = new Date(ar[2] + '-' + ar[1] + '-' + ar[0]);
                console.log(d);
                d.setMonth(d.getMonth() + this.offers.duration);
                console.log(d);
                this.content.endData = d.getDate().toString() + '.' + (d.getMonth() + 1).toString() + '.' + d.getFullYear().toString();
                this.content.passportData = this.data.additiolData.pasport.serial +
                    ' ' + this.data.additiolData.pasport.number +
                    ' ' + this.data.additiolData.pasport.where +
                    ' ' + this.data.additiolData.pasport.issued;
                if (this.ACCIDENTService.totoalPrice > 1000) {
                    var priceString = this.ACCIDENTService.totoalPrice.toFixed(3);
                    var scapeIndex = (this.ACCIDENTService.totoalPrice / 1000).toFixed(0).length;
                    priceString = priceString.slice(0, scapeIndex) + ' ' +
                        priceString.slice(scapeIndex, priceString.length - 1);
                    this.content.priceString = priceString;
                }
                else {
                    this.content.priceString = this.ACCIDENTService.totoalPrice.toFixed(2);
                }
                ;
                this.$http.get('../api/admin/purchas/' + this.content.orderNumber + '/'
                    + this.ACCIDENTService.totoalPrice).success(function (response) {
                    console.log(response);
                });
            }
            ACCIDENTFinishController.prototype.downloadPdf = function () {
                console.log('_______________');
            };
            ;
            return ACCIDENTFinishController;
        })();
        accident.ACCIDENTFinishController = ACCIDENTFinishController;
        angular.module('nepereplaty').controller('nepereplaty.accident.ACCIDENTFinishController', ACCIDENTFinishController);
    })(accident = nepereplaty.accident || (nepereplaty.accident = {}));
})(nepereplaty || (nepereplaty = {}));
