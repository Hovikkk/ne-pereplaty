/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var house;
    (function (house) {
        var HOUSEOfferController = (function () {
            function HOUSEOfferController($state, $q, HOUSEService, $rootScope) {
                this.$state = $state;
                this.$q = $q;
                this.HOUSEService = HOUSEService;
                this.$rootScope = $rootScope;
                if (this.HOUSEService.getOffers() == null) {
                    this.$state.go('home');
                }
                this.canCompare = false;
                this.content = this.HOUSEService.getOffers();
                this.content.submodule = 'Дом';
                this.content.termInsurance = '1 год';
                this.startData = this.content.startData;
                var ar = this.startData.split('-');
                this.startData = this.content.startData;
                this.endData = this.content.endData;
                this.showMargin = $rootScope.isMobile;
                var priceString = '';
                for (var i = 0; i < this.content.Offers.length; ++i) {
                    priceString = this.content.Offers[i].Total_SP.toFixed(3);
                    var scapeIndex = Math.floor(this.content.Offers[i].Total_SP / 1000).toFixed(0).length;
                    priceString = priceString.slice(0, scapeIndex) + ' ' +
                        priceString.slice(scapeIndex, priceString.length - 1);
                    this.content.Offers[i].Price = priceString;
                }
            }
            ;
            HOUSEOfferController.prototype.generationOffer = function (name, logo, companyName, price) {
                var result = new house.HOUSEInsuracneOffer();
                result.Company = new house.InsuracneCompany();
                result.Name = name;
                result.Company.Logo = logo;
                result.Company.Name = companyName;
                result.Company.Price = price;
                console.log(result.AdditionalOptions);
                result.AdditionalOptions = [];
                result.AdditionalOptions.push(new house.AdditionalOption(name + ' _ 1', name + ' Description 1'));
                result.AdditionalOptions.push(new house.AdditionalOption(name + ' _ 2', name + ' Description 2'));
                console.log(result.AdditionalOptions);
                return result;
            };
            HOUSEOfferController.prototype.buyOffer = function (index) {
                this.HOUSEService.offerIndex = index;
                this.HOUSEService.totoalPrice = this.HOUSEService.getOffers().Offers[index].Total_SP;
                this.$state.go('house.details');
            };
            ;
            HOUSEOfferController.prototype.onClickCompareChackBox = function () {
                var indexes = [];
                var offer;
                for (var i = 0; i < this.content.Offers.length; ++i) {
                    offer = this.content.Offers[i];
                    if (offer.isCompair) {
                        indexes.push(i);
                    }
                }
                if (indexes.length >= 2) {
                    this.canCompare = true;
                }
                else {
                    this.canCompare = false;
                }
                console.log(this.canCompare);
                console.log(indexes);
            };
            ;
            HOUSEOfferController.prototype.compare = function () {
                if (this.canCompare) {
                    this.$state.go('house.compare');
                }
            };
            ;
            return HOUSEOfferController;
        })();
        house.HOUSEOfferController = HOUSEOfferController;
        angular.module('nepereplaty').controller('nepereplaty.house.HOUSEOfferController', HOUSEOfferController);
    })(house = nepereplaty.house || (nepereplaty.house = {}));
})(nepereplaty || (nepereplaty = {}));
