/// <reference path="../app.ts" />

module nepereplaty.house {

    export class HOUSECompareController {
        content: HOUSEOffer = new HOUSEOffer();
        startData: string;
        constructor(private $state: angular.ui.IStateService, private $q: angular.IQService, private HOUSEService: IHOUSEService) {
            this.content = this.HOUSEService.getOffers();
            this.content.submodule = 'Дом';
            this.content.termInsurance = '1 год';
            this.startData = this.content.startData;
            var ar = this.startData.split('-');
            this.startData = ar[2] + '.' + ar[1] + '.' + ar[0];
        };
        back(): void {
            console.log('________________________________===================');
            this.$state.go('house.offer');
        };
        openPdf(): void {
            window.open('../../p/example.pdf');
        }
    }

    angular.module('nepereplaty').controller('nepereplaty.house.HOUSECompareController', HOUSECompareController);
}