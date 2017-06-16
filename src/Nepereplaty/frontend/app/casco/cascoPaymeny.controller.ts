/// <reference path="../app.ts" />
module nepereplaty.casco {
    
    export class CASCOPaymentController {
        offers: CASCOInsuranceOffers;
        offer: CASCOInsuracneOffer;

        osagoOffer: number;
        osagoInclude: boolean;

        puymentCost: number;
        logoUrl: string;
        puymentString: string;
        osagoOfferString: string;
        startData: string;
        endData: string;
        constructor(private $state: angular.ui.IStateService, private $q: angular.IQService, private CASCOService: ICASCOService) {
            if (this.CASCOService.getOffers() == null) {
                this.$state.go('home');
            }
            this.offers = this.CASCOService.getOffers();
            this.offer = this.offers.Offers[this.CASCOService.offerIndex];
            this.osagoOffer = this.stringtoNumber(this.offer.osagoPrice);
            this.osagoInclude = false;
            this.updata();
            this.logoUrl = this.offers.Offers[this.CASCOService.offerIndex].Company.Logo;
            this.osagoOfferString = this.osagoOffer.toFixed(3);
            var scapeIndex = (this.osagoOffer / 1000).toFixed(0).length;
            this.osagoOfferString = this.osagoOfferString.slice(0, scapeIndex) + ' ' +
            this.osagoOfferString.slice(scapeIndex, this.osagoOfferString.length - 1); 
            this.startData = this.offers.startData;
            this.endData = this.endData = this.offers.endData;
        };

        updata(): void {
            if (this.osagoInclude) {
                this.puymentCost = this.stringtoNumber(this.offer.Price) + this.osagoOffer;
            } else {
                this.puymentCost = this.stringtoNumber(this.offer.Price);
            }
            this.puymentString = this.puymentCost.toFixed(3);
            var scapeIndex = (this.puymentCost / 1000).toFixed(0).length;
            this.puymentString = this.puymentString.slice(0, scapeIndex) + ' '
            + this.puymentString.slice(scapeIndex, this.puymentString.length - 1);
        };

        stringtoNumber(s: string): number {
            var result: number = 0;
            var step1: string = s.replace(',', '.');
            var step2: string = step1.replace(/ /g, '');
            var step3: string = step2.replace(' ', '').replace(String.fromCharCode(160), '');
            result = parseFloat(step3);
            return result;
        }

        pay(): void {

            if (this.osagoInclude) {
                this.CASCOService.totoalPrice = this.osagoOffer + this.stringtoNumber(this.offer.Price);
            } else {
                this.CASCOService.totoalPrice = this.stringtoNumber(this.offer.Price);
            }
            this.$state.go('casco.finish');

        }
    }
    angular.module('nepereplaty').controller('nepereplaty.casco.CASCOPaymentController', CASCOPaymentController);

}