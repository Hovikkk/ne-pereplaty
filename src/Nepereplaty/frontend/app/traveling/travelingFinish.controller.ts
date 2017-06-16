/// <reference path="../app.ts" />

module nepereplaty.traveling {

    export class TRAVELINGFinishController {
        content: TRAVELINGOffer = new TRAVELINGOffer();
        offer: TRAVELINGInsuracneOffer;
        orderNumber: any;
        userName: string;
        data: TRAVELINGDetailsForm;
        startData: string;
        endData: string;
        age: any;

        price: any;
        priceString: string;
        BirthData: string;
        DriversCount: any;
        constructor(private $http: angular.IHttpService,
            private $state: angular.ui.IStateService,
            private $q: angular.IQService,
            private TRAVELINGService: ITRAVELINGService) {
            if (this.TRAVELINGService.getOffers() == null) {
                this.$state.go('home');
            }
            this.offer = this.TRAVELINGService.getOffers().Offers[this.TRAVELINGService.offerIndex];
            this.data = this.TRAVELINGService.buyerInfo;
            this.orderNumber = this.TRAVELINGService.offerId;
            this.startData = this.TRAVELINGService.getOffers().startData;
            this.price = this.TRAVELINGService.totoalPrice;
            if (this.price > 1000) {

                this.priceString = this.price.toFixed(3);
                var scapeIndex = (this.price / 1000).toFixed(0).length;
                this.priceString = this.priceString.slice(0, scapeIndex) + ' ' +
                this.priceString.slice(scapeIndex, this.priceString.length - 1);
            } else {
                this.priceString = this.price.toFixed(2);
            }
            this.content.name = this.data.Name + ' ' + this.data.Surname;
            this.content.orderNumber = this.TRAVELINGService.offerId.toString();
            this.content.insurancePolicy = this.offer.Company.Name + ' СТРАХОВАНИЕ';
            this.content.insuredsCount = this.TRAVELINGService.getOffers().insuredsCount;
            this.content.companyName = this.offer.Company.Name;
            this.content.startData = this.TRAVELINGService.getOffers().startData;
            this.content.endData = this.TRAVELINGService.getOffers().endData;
            this.content.travelingDur = this.TRAVELINGService.getOffers().travelingDur;
            this.content.submodule = 'Квартира';
            this.content.priceString = this.priceString;
            this.BirthData = this.data.Birthday.toString();

            var ar = this.BirthData.split('-');
            this.BirthData = ar[2] + '.' + ar[1] + '.' + ar[0];

            this.$http.get('../api/admin/purchas/' + this.content.orderNumber + '/'
                + this.TRAVELINGService.totoalPrice).success((response: any) => {
                console.log(response);
            });
        }


        downloadPdf(): void {
            console.log('_______________');
        };

    }

    angular.module('nepereplaty').controller('nepereplaty.traveling.TRAVELINGFinishController', TRAVELINGFinishController);

}