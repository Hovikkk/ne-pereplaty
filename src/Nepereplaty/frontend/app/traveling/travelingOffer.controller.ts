﻿/// <reference path="../app.ts" />

module nepereplaty.traveling {

    export class TRAVELINGOfferController {
        content: TRAVELINGOffer = new TRAVELINGOffer();
        canCompare: boolean;
        startData: string;
        endData: string;
        showMargin: boolean;
        constructor(private $state: angular.ui.IStateService,
                    private $q: angular.IQService,
                    private TRAVELINGService: TRAVELINGService,
                    private $rootScope: any) {

            this.canCompare = false;
            if (this.TRAVELINGService.getOffers() == null) {
                this.$state.go('home');
            }

            this.content = this.TRAVELINGService.getOffers();

            this.startData = this.content.startData;
            this.endData = this.content.endData;
            this.showMargin = $rootScope.isMobile;

            var priceString = '';
            console.log(this.content);
            console.log(this.content.Offers);
            for (var i = 0; i < this.content.Offers.length; ++i) {
               
                if (this.content.Offers[i].Total_SP > 1000) {
                    priceString = this.content.Offers[i].Total_SP.toFixed(3);
                    var scapeIndex = Math.floor(this.content.Offers[i].Total_SP / 1000).toFixed(0).length;
                    priceString = priceString.slice(0, scapeIndex) + ' ' +
                    priceString.slice(scapeIndex, priceString.length - 1);

                } else {
                    priceString = this.content.Offers[i].Total_SP.toFixed(2);
                }
                this.content.Offers[i].Price = priceString;
            }
            console.log(this.content.Offers);

         //   this.defaultValue();

        };
 

        generationOffer(name: string, logo: string, companyName: string, price: string): TRAVELINGInsuracneOffer {
            var result: TRAVELINGInsuracneOffer = new TRAVELINGInsuracneOffer();
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
            this.TRAVELINGService.offerIndex = index;
            this.TRAVELINGService.totoalPrice = this.TRAVELINGService.getOffers().Offers[index].Total_SP;
            this.$state.go('traveling.details');
        };
        onClickCompareChackBox() {
            var indexes: number[] = [];
            var offer;
            console.log(indexes);
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

                this.$state.go('traveling.compare');
            }
        };
    }
    
    /* content: APARTMENTOffer;
     canCompare: boolean;
     constructor(private $state: angular.ui.IStateService, private $q: angular.IQService, private HOUSEService: IAPARTMENTService) {
         this.canCompare = false;
         this.content = this.HOUSEService.getOffers();

         var priceString = '';
         for (var i = 0; i < this.content.offers.length; ++i) {
             priceString = this.content.offers[i].Total_SP.toFixed(3);
             var scapeIndex = (this.content.offers[i].Total_SP / 1000).toFixed(0).length;
             priceString = priceString.slice(0, scapeIndex) + ' ' +
             priceString.slice(scapeIndex, priceString.length - 1);
             this.content.offers[i].Price = priceString;
         }
     };

     generationOffer(name: string, logo: string, companyName: string, price: string): APARTMENTInsuracneOffer {
         var result: APARTMENTInsuracneOffer = new APARTMENTInsuracneOffer();
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
         this.$state.go('house.details');
     };
     onClickCompareChackBox() {
         var indexes: number[] = [];
         var offer;
         for (var i = 0; i < this.content.offers.length; ++i) {
             offer = this.content.offers[i];
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
 }*/

    angular.module('nepereplaty').controller('nepereplaty.traveling.TRAVELINGOfferController', TRAVELINGOfferController);

}