/// <reference path="../app.ts" />

module nepereplaty.osago {

    export class OSAGOFinishController {
        offer: OSAGOInsuracneOffer;
        orderNumber: any;
        userName: string;
        data: OSAGODetailsForm;
        age: any;
        startData: string;
        endData: string;
        DriversCount: any;
        constructor(private $http: angular.IHttpService,
            private $state: angular.ui.IStateService,
            private $q: angular.IQService,
            private OSAGOService: IOSAGOService) {
            if (this.OSAGOService.getOffers() == null) {
                this.$state.go('home');
            }
            this.offer = this.OSAGOService.getOffers().Offers[this.OSAGOService.offerIndex];
            this.data = this.OSAGOService.buyerInfo;
            this.age = this.OSAGOService.getOffers().DriversMinAge;
            this.orderNumber = this.OSAGOService.offerId;
            this.startData = this.OSAGOService.getOffers().startData;
            this.endData = this.OSAGOService.getOffers().endData;
            this.DriversCount = this.OSAGOService.getOffers().DriversCount;
            this.$http.get('../api/admin/purchas/' + this.orderNumber + '/'
                + this.stringtoNumber(this.offer.Price)).success((response: any) => {
                console.log(response);
            });
        }

        stringtoNumber(s: string): number {
            var result: number = 0;
            var step1: string = s.replace(',', '.');
            var step2: string = step1.replace(/ /g, '');
            var step3: string = step2.replace(' ', '').replace(String.fromCharCode(160), '');
            result = parseFloat(step3);
            return result;
        }
        downloadPdf(): void {
            window.open('../../p/example.pdf');
        };

    }

    angular.module('nepereplaty').controller('nepereplaty.osago.OSAGOFinishController', OSAGOFinishController);

}