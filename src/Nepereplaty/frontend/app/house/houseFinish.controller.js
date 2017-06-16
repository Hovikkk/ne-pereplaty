/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var house;
    (function (house) {
        var HOUSEFinishController = (function () {
            function HOUSEFinishController($http, $state, $q, HOUSEService) {
                this.$http = $http;
                this.$state = $state;
                this.$q = $q;
                this.HOUSEService = HOUSEService;
                this.content = new house.HOUSEOffer();
                if (this.HOUSEService.getOffers() == null) {
                    this.$state.go('home');
                }
                this.offer = this.HOUSEService.getOffers().Offers[this.HOUSEService.offerIndex];
                this.data = this.HOUSEService.buyerInfo;
                this.orderNumber = 5;
                this.startData = this.content.startData;
                this.endData = this.content.endData;
                this.price = this.HOUSEService.totoalPrice;
                this.priceString = this.price.toFixed(3);
                var scapeIndex = (this.price / 1000).toFixed(0).length;
                this.priceString = this.priceString.slice(0, scapeIndex) + ' ' +
                    this.priceString.slice(scapeIndex, this.priceString.length - 1);
                this.content.name = this.data.Name + ' ' + this.data.Surname;
                this.content.orderNumber = this.HOUSEService.offerId.toString();
                this.content.insurancePolicy = this.offer.Company.Name + ' СТРАХОВАНИЕ';
                this.content.companyName = this.offer.Company.Name;
                this.content.startData = this.HOUSEService.getOffers().startData;
                this.content.endData = this.HOUSEService.getOffers().endData;
                this.content.submodule = 'Дом';
                this.content.priceString = this.priceString;
                if (this.HOUSEService.otherAndress.isAre) {
                    this.content.city = this.HOUSEService.otherAndress.city;
                    this.content.address = this.HOUSEService.otherAndress.adress;
                }
                else {
                    this.content.city = this.data.City;
                    this.content.address = this.data.Adress;
                }
                this.$http.get('../api/admin/purchas/' + this.content.orderNumber + '/'
                    + this.HOUSEService.totoalPrice).success(function (response) {
                    console.log(response);
                });
            }
            HOUSEFinishController.prototype.downloadPdf = function () {
                window.open('../../p/example.pdf');
            };
            ;
            return HOUSEFinishController;
        })();
        house.HOUSEFinishController = HOUSEFinishController;
        angular.module('nepereplaty').controller('nepereplaty.house.HOUSEFinishController', HOUSEFinishController);
    })(house = nepereplaty.house || (nepereplaty.house = {}));
})(nepereplaty || (nepereplaty = {}));
