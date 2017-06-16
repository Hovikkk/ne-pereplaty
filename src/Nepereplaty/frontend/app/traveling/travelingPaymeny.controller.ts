/// <reference path="../app.ts" />
module nepereplaty.traveling {

    export class TRAVELINGPaymentController {
        content: TRAVELINGOffer = new TRAVELINGOffer();
        offer: TRAVELINGInsuracneOffer;
        logoUrl: string;
        additianalPay = [
            {
                b: false,
                c: 1000,
                s: '1 000'
            },
            {
                b: false,
                c: 500,
                s: '500'
            },
            {
                b: false,
                c: 2000,
                s: '2 000'
            }
        ];
        additianalPayString: string;
        add: boolean;

        puymentCost: number;

        puymentString: string;
        startData: string;
        endData: string;
        constructor(private $state: angular.ui.IStateService, private $q: angular.IQService, private TRAVELINGService: ITRAVELINGService) {
            if (this.TRAVELINGService.getOffers() == null) {
                this.$state.go('home');
            }
            this.content = this.TRAVELINGService.getOffers();
            this.offer = this.content.Offers[this.TRAVELINGService.offerIndex];
            this.logoUrl = this.content.Offers[this.TRAVELINGService.offerIndex].Company.Logo;
            var priceString = this.content.Offers[this.TRAVELINGService.offerIndex].Total_SP.toFixed(3);
            var scapeIndex = (this.content.Offers[this.TRAVELINGService.offerIndex].Total_SP / 1000).toFixed(0).length;
            priceString = priceString.slice(0, scapeIndex) + ' ' +
            priceString.slice(scapeIndex, priceString.length - 1);
            this.content.Price = this.content.Offers[this.TRAVELINGService.offerIndex].Total_SP.toFixed(3);
            this.content.priceString = priceString;
            this.startData = this.content.startData;
            this.endData = this.content.endData;
            
            this.updata();
        };

        updata(): void {
            var total = 0;
            for (var i = 0; i < 3; ++i) {
                if (this.additianalPay[i].b) {
                    total += this.additianalPay[i].c;
                }
            }

            if (total > 0) {
                this.add = true;
                this.puymentCost = this.stringtoNumber(this.offer.Price) + total;
            } else {
                this.add = false;
                this.puymentCost = this.stringtoNumber(this.offer.Price);
            }


            this.puymentString = this.puymentCost.toFixed(3);

            var scapeIndex = Math.floor(this.puymentCost / 1000).toFixed(0).length;
            this.puymentString = this.puymentString.slice(0, scapeIndex) + ' '
            + this.puymentString.slice(scapeIndex, this.puymentString.length - 1);
            if (total > 1000) {
                this.additianalPayString = total.toFixed(3);
                scapeIndex = (total / 1000).toFixed(0).length;
                this.additianalPayString = this.additianalPayString.slice(0, scapeIndex) + ' '
                + this.additianalPayString.slice(scapeIndex, this.additianalPayString.length - 1);
            } else {
                this.additianalPayString = total.toFixed(2);
            }
        };

        stringtoNumber(s: string): number {
            var result: number = 0;
            var step1: string = s.replace(',', '.');
            var step2: string = step1.replace(/ /g, '');
            var step3: string = step2.replace(' ', '').replace(String.fromCharCode(160), '');
            result = parseFloat(step3);
            return result;
        }

        pay(): void {
            var total = 0;
            for (var i = 0; i < 3; ++i) {
                if (this.additianalPay[i].b) {
                    total += this.additianalPay[i].c;
                }
            }

            if (total > 0) {
                this.puymentCost = this.stringtoNumber(this.offer.Price) + total;
            } else {
                this.puymentCost = this.stringtoNumber(this.offer.Price);
            }
            this.TRAVELINGService.totoalPrice = this.puymentCost;
            this.$state.go('traveling.finish');

        }
    }
    angular.module('nepereplaty').controller('nepereplaty.traveling.TRAVELINGPaymentController', TRAVELINGPaymentController);

}