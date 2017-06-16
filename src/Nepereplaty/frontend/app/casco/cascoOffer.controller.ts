/// <reference path="../app.ts" />

module nepereplaty.casco {
    
    export class CASCOOfferController {
        offers: CASCOInsuranceOffers;
        canCompare: boolean;
        startData: string;
        endData: string;
        showMargin: boolean;
        constructor(private $state: angular.ui.IStateService,
                    private $q: angular.IQService,
                    private CASCOService: ICASCOService,
                    private $rootScope: any) {
            if (this.CASCOService.getOffers() == null) {
                this.$state.go('home');
            }
            this.offers = this.CASCOService.getOffers();
            this.canCompare = false;
            this.startData = this.offers.startData;
            this.endData = this.offers.endData;
            this.showMargin = $rootScope.isMobile;
        }
        buyOffer(index : any): void {
            this.CASCOService.offerIndex = index;
            this.$state.go('casco.details');
        };
        onClickCompareChackBox() {
            var indexes: number[] = [];
            var index = 0;
            var offer;
            for (var i = 0; i < this.offers.Offers.length; ++i) {
                offer = this.offers.Offers[i];
                if (offer.isCompair) {
                    indexes.push(index);
                }
                index++;
            }

            if (indexes.length === 2) {
                this.canCompare = true;
            } else {
                this.canCompare = false;
            }
            console.log(this.canCompare);
        };
        compare(): void {
            if (this.canCompare) {
                this.$state.go('casco.compare');
                
            }
        };
       
    }

    angular.module('nepereplaty').controller('nepereplaty.casco.CASCOOfferController', CASCOOfferController);

}