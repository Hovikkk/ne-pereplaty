/// <reference path="../app.ts" />

module nepereplaty.apartment {

    export class APARTMENTFinishController {
        content: APARTMENTOffer = new APARTMENTOffer();
        offer: APARTMENTInsuracneOffer;
        orderNumber: any;
        userName: string;
        data: APARTMENTDetailsForm;
        startData: string;
        endData: string;
        age: any;

        price: any;
        priceString: string;

        DriversCount: any;
        constructor(private $http: angular.IHttpService,
            private $state: angular.ui.IStateService,
            private $q: angular.IQService,
            private APARTMENTService: IAPARTMENTService) {
            if (this.APARTMENTService.getOffers() == null) {
                this.$state.go('home');
            }
            this.offer = this.APARTMENTService.getOffers().Offers[this.APARTMENTService.offerIndex];
            this.data = this.APARTMENTService.buyerInfo;
            this.orderNumber = 5;
            this.startData = this.APARTMENTService.getOffers().startData;
            this.endData = this.APARTMENTService.getOffers().endData;
            this.price = this.APARTMENTService.totoalPrice;

            this.priceString = this.price.toFixed(3);
            var scapeIndex = (this.price / 1000).toFixed(0).length;
            this.priceString = this.priceString.slice(0, scapeIndex) + ' ' +
            this.priceString.slice(scapeIndex, this.priceString.length - 1);

            this.content.name = this.data.Name + ' ' + this.data.Surname;
            this.content.orderNumber = this.APARTMENTService.offerId.toString();
            this.content.insurancePolicy = this.offer.Company.Name + ' СТРАХОВАНИЕ';
            this.content.companyName = this.offer.Company.Name;
            this.content.startData = this.startData;
            this.content.endData = this.endData;
            

            this.content.submodule = 'Квартира';
            this.content.priceString = this.priceString;
            if (this.APARTMENTService.otherAndress.isAre) {
                this.content.city = this.APARTMENTService.otherAndress.city;
                this.content.address = this.APARTMENTService.otherAndress.adress;
            } else {
                this.content.city = this.data.City;
                this.content.address = this.data.Adress;
            }
            this.$http.get('../api/admin/purchas/' + this.content.orderNumber + '/'
                + this.APARTMENTService.totoalPrice).success((response: any) => {
                    console.log(response);
                });

        }


        downloadPdf(): void {
            window.open('../../p/example.pdf');
        };

    }

    angular.module('nepereplaty').controller('nepereplaty.apartment.APARTMENTFinishController', APARTMENTFinishController);

}