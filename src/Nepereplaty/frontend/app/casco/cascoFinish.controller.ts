/// <reference path="../app.ts" />

module nepereplaty.casco {
   
    export class CASCOFinishController {
        offer: CASCOInsuracneOffer;
        orderNumber: any;
        userName: string;
        data: CASCODetailsForm;
        startData: string;
        endData: string;
        age: any;

        price: any;
        priceString: string;

        DriversCount: any;
        constructor(private $http: angular.IHttpService,
            private $state: angular.ui.IStateService,
            private $q: angular.IQService,
            private CASCOService: ICASCOService) {
            if (this.CASCOService.getOffers() == null) {
                this.$state.go('home');
            }
            this.offer = this.CASCOService.getOffers().Offers[this.CASCOService.offerIndex];
            this.data = this.CASCOService.buyerInfo;
            this.age = this.CASCOService.getOffers().DriversMinAge;
            this.orderNumber = this.CASCOService.offerId;
            this.startData = this.CASCOService.getOffers().startData;
            this.endData = this.CASCOService.getOffers().endData;
            this.price = this.CASCOService.totoalPrice;
            this.DriversCount = this.CASCOService.getOffers().DriversCount;
            
            this.priceString = this.price.toFixed(3);
            var scapeIndex = (this.price / 1000).toFixed(0).length;
            this.priceString = this.priceString.slice(0, scapeIndex) + ' ' +
                this.priceString.slice(scapeIndex, this.priceString.length - 1);
            this.$http.get('../api/admin/purchas/' + this.CASCOService.offerId + '/'
                + this.CASCOService.totoalPrice).success((response: any) => {
                    console.log(response);
                }); 
        }


        downloadPdf(): void {
            window.open('../../p/example.pdf');
        };

    }

    angular.module('nepereplaty').controller('nepereplaty.casco.CASCOFinishController', CASCOFinishController);

}