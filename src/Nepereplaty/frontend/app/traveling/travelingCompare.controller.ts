/// <reference path="../app.ts" />

module nepereplaty.traveling {

    export class TRAVELINGCompareController {
        content: TRAVELINGOffer = new TRAVELINGOffer();
        startData: string;
        endData: string;
        constructor(private $state: angular.ui.IStateService, private $q: angular.IQService, private TRAVELINGService: ITRAVELINGService) {
            this.content = this.TRAVELINGService.getOffers();
            this.startData = this.content.startData;
            this.endData = this.content.endData;
        };
        back(): void {
            console.log('________________________________===================');
            this.$state.go('traveling.offer');
        };
        openPdf(): void {
            window.open('../../p/example.pdf');
        }
    }

    angular.module('nepereplaty').controller('nepereplaty.traveling.TRAVELINGCompareController', TRAVELINGCompareController);
}