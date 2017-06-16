/// <reference path="../app.ts" />

module nepereplaty.casco {

    export class CASCOCompareController {
        offers: CASCOInsuranceOffers;
        AdditionalOptions: AdditionalOption[];

         constructor(private $state: angular.ui.IStateService, private $q: angular.IQService, private CASCOService: ICASCOService) {

             console.log('++++++++++++++++++____');
             this.offers = this.CASCOService.getOffers();
             if (this.offers.Offers[0].AdditionalOptions.length > this.offers.Offers[1].AdditionalOptions.length) {
                 this.AdditionalOptions = this.offers.Offers[0].AdditionalOptions;
             } else {
                 this.AdditionalOptions = this.offers.Offers[1].AdditionalOptions;
             }
             console.log('++++++++++++++++++____');
             
        }
         back(): void {
             console.log('________________________________===================');
            this.$state.go('casco.offer');
        };
       
    }

    angular.module('nepereplaty').controller('nepereplaty.casco.CASCOCompareController', CASCOCompareController);

}