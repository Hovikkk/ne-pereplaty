/// <reference path="../app.ts" />

module nepereplaty.osago {
    
    export class OSAGOOfferController {
        offers: OSAGOInsuranceOffers;

        startData: string;
        endData: string;
        showMargin: boolean;
        constructor(private $state: angular.ui.IStateService,
                    private $q: angular.IQService,
                    private OSAGOService: IOSAGOService,
                    private $rootScope: any) {
            if (this.OSAGOService.getOffers() == null) {
                this.$state.go('home');
            }
            this.offers = this.OSAGOService.getOffers();
            this.startData = this.offers.startData;
            this.endData = this.offers.endData;
            this.showMargin = $rootScope.isMobile;
        }

        buyOffer(index:any): void { 
            this.OSAGOService.offerIndex = index;
            console.log(this.OSAGOService.offerIndex);
            this.$state.go('osago.details');
        };
    }

    angular.module('nepereplaty').controller('nepereplaty.osago.OSAGOOfferController', OSAGOOfferController);

}