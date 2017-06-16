/// <reference path='../app.ts' />

module admin.offer {

    export class OfferController {
        types = {
            'casco': 'каско',
            'osago': 'осаго',
            'house': 'дом',
            'apartment': 'квартира',
            'traveling': 'туризм',
            'accident': 'здоровье'
        };
        offerinfo: OfferData;

        data: any;

        drivers: string[];

        constructor(private $http: angular.IHttpService,
            private $state: angular.ui.IStateService,
            private $q: angular.IQService,
            private $timeout: angular.ITimeoutService,
            private $scope: angular.IScope,
            private $rootScope: any,
            private AdminService: admin.AdminService) {
            this.offerinfo = this.AdminService.currectOffer;
            console.log(this.offerinfo);
            switch (this.offerinfo.type) {
                case 'traveling':
                    this.getTravelingData(this.offerinfo.dataId);
                    break;
                case 'accident':
                    this.getAccidentData(this.offerinfo.dataId);
                    break;
                case 'apartment':
                case 'house':
                    this.getHomeData(this.offerinfo.dataId);
                    break;
                case 'casco':
                    this.getCascoData(this.offerinfo.dataId);
                    break;
                case 'osago':
                    this.getOsagoData(this.offerinfo.dataId);
                    break;
                

            }
            
        }

        getHomeData(id: number): void {
            this.$http.get('../api/admin/gethomeoffer/' + id).success((response: any) => {
                console.log(response);
                this.data = response;
            });

        }
        getCascoData(id: number): void {
            this.$http.get('../api/admin/getcascoffer/' + id).success((response: any) => {
                console.log(response);
                this.data = response;

            });

        }
        getOsagoData(id: number): void {
            this.$http.get('../api/admin/getosagoffer/' + id).success((response: any) => {
                this.data = response;
            });

        }
        getAccidentData(id: number): void {
            this.$http.get('../api/admin/getaccidentoffer/' + id).success((response: any) => {
                
                this.data = response;
            });

        }

        getTravelingData(id: number): void {
            this.$http.get('../api/admin/gettravelingoffer/' + id ).success((response: any) => {
                console.log(response);
                this.data = response;
            });

        }

        gotoPage(url: string): void {
            this.$state.go(url);
        }
    }
    angular.module('admin').controller('admin.offer.OfferController', OfferController);
}