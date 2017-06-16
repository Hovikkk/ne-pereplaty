/// <reference path="../app.ts" />

module nepereplaty.apartment {

    export class APARTMENTCompareController {
        content: APARTMENTOffer = new APARTMENTOffer();
        startData: string;
        constructor(private $state: angular.ui.IStateService, private $q: angular.IQService, private APARTMENTService: IAPARTMENTService) {
            this.content = this.APARTMENTService.getOffers();
            this.content.submodule = 'Квартира';
            this.content.termInsurance = '1 год';
            this.startData = this.content.startData;
            var ar = this.startData.split('-');
            this.startData = ar[2] + '.' + ar[1] + '.' + ar[0];
        };
        back(): void {
            this.$state.go('apartment.offer');
        };
    }

    angular.module('nepereplaty').controller('nepereplaty.apartment.APARTMENTCompareController', APARTMENTCompareController);
}