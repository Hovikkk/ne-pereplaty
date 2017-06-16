/// <reference path="../app.ts" />

module nepereplaty.apartment {

    export class APARTMENTOfferController {
        content: APARTMENTOffer = new APARTMENTOffer();
        canCompare: boolean;
        startData: string;
        endData: string;
        showMargin: boolean;
        constructor(private $state: angular.ui.IStateService,
                    private $q: angular.IQService,
                    private APARTMENTService: APARTMENTService,
                    private $rootScope: any
        ) {
            if (this.APARTMENTService.getOffers() == null) {
                this.$state.go('home');
            }
            this.canCompare = false;
            this.content = this.APARTMENTService.getOffers();
            this.content.submodule = 'Квартира';
            this.content.termInsurance = '1 год';
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
            console.log(this.content.Offers);
        };
       

        buyOffer(index: any): void {
            this.APARTMENTService.offerIndex = index;
            this.APARTMENTService.totoalPrice = this.APARTMENTService.getOffers().Offers[index].Total_SP;
            this.$state.go('apartment.details');
        };
        onClickCompareChackBox() {
            var indexes: number[] = [];
            var offer;
            console.log(indexes);
            for (var i = 0; i < this.content.Offers.length; ++i) {
                offer = this.content.Offers[i];
                if (offer.isCompair) {
                    indexes.push(i);
                }
            }
            if (indexes.length >= 2) {
                this.canCompare = true;
            } else {
                this.canCompare = false;
            }
        };
        compare(): void {
            if (this.canCompare) {

                this.$state.go('apartment.compare');
            }
        };
    }
    
       
    angular.module('nepereplaty').controller('nepereplaty.apartment.APARTMENTOfferController', APARTMENTOfferController);

}