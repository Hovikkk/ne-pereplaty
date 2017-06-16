/// <reference path="../app.ts" />

module nepereplaty.accident {

    export class ACCIDENTCompareController {
        content: ACCIDENTOffer = new ACCIDENTOffer();
        insuranceOptions = [
            {
                text: '1 месяц',
                value: 1
            },
            {
                text: '3 месяца',
                value: 3
            },
            {
                text: '6 месяцев',
                value: 6
            },
            {
                text: '12 месяцев',
                value: 12
            }
        ];
        duration: string;
        constructor(private $state: angular.ui.IStateService, private $q: angular.IQService, private ACCIDENTService: IACCIDENTService) {
            this.content = this.ACCIDENTService.getOffers();
            

            for (var i = 0; i < this.insuranceOptions.length; i++) {
                if (this.insuranceOptions[i].value === this.content.duration) {
                    this.duration = this.insuranceOptions[i].text;
                    break;
                }
            }
        };
        back(): void {
            this.$state.go('accident.offer');
        };
        openPdf(): void {
            window.open('../../p/example.pdf');
        }
    }

    angular.module('nepereplaty').controller('nepereplaty.accident.ACCIDENTCompareController', ACCIDENTCompareController);
}