/// <reference path="../app.ts" />

module nepereplaty.house {
    
    export class HOUSEOfferController {
        content: HOUSEOffer;
        canCompare: boolean;
        submodule: string;
        startData: string;
        endData: string;
        showMargin: boolean;
        constructor(private $state: angular.ui.IStateService,
                    private $q: angular.IQService,
                    private HOUSEService: IHOUSEService,
                    private $rootScope: any) {
            if (this.HOUSEService.getOffers() == null) {
                this.$state.go('home');
            }
            this.canCompare = false;
            this.content = this.HOUSEService.getOffers();
            this.content.submodule = 'Дом';
            this.content.termInsurance = '1 год';
            this.startData = this.content.startData;
            var ar = this.startData.split('-');
            this.startData = this.content.startData;
            this.endData = this.content.endData;
            this.showMargin = $rootScope.isMobile;
            
            var priceString = '';
            for (var i = 0; i < this.content.Offers.length; ++i) {
                priceString = this.content.Offers[i].Total_SP.toFixed(3);
                var scapeIndex = Math.floor(this.content.Offers[i].Total_SP / 1000).toFixed(0).length;
                priceString = priceString.slice(0, scapeIndex) + ' ' +
                priceString.slice(scapeIndex, priceString.length - 1);
                this.content.Offers[i].Price = priceString;
            }
        };
        
        generationOffer(name: string, logo: string, companyName: string, price: string): HOUSEInsuracneOffer {
            var result: HOUSEInsuracneOffer = new HOUSEInsuracneOffer();
            result.Company = new InsuracneCompany();
            result.Name = name;
            result.Company.Logo = logo;
            result.Company.Name = companyName;
            result.Company.Price = price;
            console.log(result.AdditionalOptions);
            result.AdditionalOptions = [];
            result.AdditionalOptions.push(new AdditionalOption(name + ' _ 1', name + ' Description 1'));
            result.AdditionalOptions.push(new AdditionalOption(name + ' _ 2', name + ' Description 2'));
            console.log(result.AdditionalOptions);
            return result;
        }
        
        buyOffer(index: any): void {
            this.HOUSEService.offerIndex = index;
            this.HOUSEService.totoalPrice = this.HOUSEService.getOffers().Offers[index].Total_SP;
            this.$state.go('house.details');
        };
        onClickCompareChackBox() {
            var indexes: number[] = [];
            var offer;
            for (var i = 0; i < this.content.Offers.length; ++i) {
                offer = this.content.Offers[i];
                if (offer.isCompair) {
                    indexes.push(i);
                }
            }
            if (indexes.length >= 2) {
                this.canCompare = true;
            } else {
                this.canCompare = false;
            }
            console.log(this.canCompare);
            console.log(indexes);
        };
        compare(): void {
            if (this.canCompare) {

                this.$state.go('house.compare');
            }
        };
    }

    

    angular.module('nepereplaty').controller('nepereplaty.house.HOUSEOfferController', HOUSEOfferController);

}