/// <reference path="../app.ts" />

module nepereplaty.accident {

    export class ACCIDENTFinishController {
        content: ACCIDENTOffer = new ACCIDENTOffer();
        offers: ACCIDENTOffer;
        orderNumber: any;
        userName: string;
        data: ACCIDENTDetailsForm;
        startData: string;
        endData: string;
        age: any;

        price: any;
        priceString: string;
        DriversCount: any;
        constructor(private $http: angular.IHttpService,
            private $state: angular.ui.IStateService,
            private $q: angular.IQService,
            private ACCIDENTService: IACCIDENTService) {
            if (this.ACCIDENTService.getOffers() == null) {
                this.$state.go('home');
            }

            this.data = this.ACCIDENTService.buyerInfo;

            this.offers = this.ACCIDENTService.getOffers();
            
            this.content.name = this.data.Surname + ' ' + this.data.Name;
            this.content.orderNumber = this.ACCIDENTService.offerId.toString();
            this.content.insurancePolicy = this.offers.Offers[this.ACCIDENTService.offerIndex].Name;
            this.content.companyName = this.offers.Offers[this.ACCIDENTService.offerIndex].Company.Name;
            this.content.age = this.offers.age;
            this.content.startData = this.offers.startData;
            var ar = this.offers.startData.split('.');
            var d = new Date(ar[2] + '-' + ar[1] + '-' + ar[0]);
            console.log(d);
            d.setMonth(d.getMonth() + this.offers.duration);
            console.log(d);
            this.content.endData = d.getDate().toString() + '.' + (d.getMonth() + 1).toString() + '.' + d.getFullYear().toString();
            this.content.passportData = this.data.additiolData.pasport.serial +
            ' ' + this.data.additiolData.pasport.number +
            ' ' + this.data.additiolData.pasport.where +
            ' ' + this.data.additiolData.pasport.issued;
           
            if (this.ACCIDENTService.totoalPrice > 1000) {
                var priceString = this.ACCIDENTService.totoalPrice.toFixed(3);
                var scapeIndex = (this.ACCIDENTService.totoalPrice / 1000).toFixed(0).length;
                priceString = priceString.slice(0, scapeIndex) + ' ' +
                priceString.slice(scapeIndex, priceString.length - 1);
                this.content.priceString = priceString;
            } else {
                this.content.priceString = this.ACCIDENTService.totoalPrice.toFixed(2);
            };

            this.$http.get('../api/admin/purchas/' + this.content.orderNumber + '/'
                + this.ACCIDENTService.totoalPrice).success((response: any) => {
                console.log(response);
            });
        }


        downloadPdf(): void {
            console.log('_______________');
        };

    }

    angular.module('nepereplaty').controller('nepereplaty.accident.ACCIDENTFinishController', ACCIDENTFinishController);

}