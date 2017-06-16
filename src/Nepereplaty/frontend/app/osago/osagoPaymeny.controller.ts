/// <reference path="../app.ts" />
module nepereplaty.osago {
    
    export class OSAGOPaymentController {
        offers: OSAGOInsuranceOffers;
        offer: OSAGOInsuracneOffer;
        startData: string;
        endData: string;
        logoUrl: string;
        constructor(private $state: angular.ui.IStateService, private $q: angular.IQService, private OSAGOService: IOSAGOService) {
            if (this.OSAGOService.getOffers() == null) {
                this.$state.go('home');
            }
            this.offers = this.OSAGOService.getOffers();
            this.logoUrl = this.offers.Offers[this.OSAGOService.offerIndex].Company.Logo;
            this.offer = this.offers.Offers[this.OSAGOService.offerIndex];
            console.log(this.offer);
            this.startData = this.offers.startData;
            this.endData = this.offers.endData;
        };

        pay(): void {

            this.$state.go('osago.finish');

        }
    }
    angular.module('nepereplaty').controller('nepereplaty.osago.OSAGOPaymentController', OSAGOPaymentController);

}