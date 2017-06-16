/// <reference path='../app.ts' />

module admin.onpurchasoffers {
    export class OnPurchasOffersController {
        name: string;
        offers: Offer[];
        types = {
            'casco': 'каско',
            'osago': 'осаго',
            'house': 'дом',
            'apartment': 'квартира',
            'traveling': 'туризм',
            'accident': 'здоровье'
        };
        constructor(private $http: angular.IHttpService,
            private $state: angular.ui.IStateService,
            private $scope: angular.IScope,
            private $rootScope: any,
            private AdminService: admin.AdminService) {
            this.name = 'Main Page';
            this.offers = [];

            this.$http.get('../api/admin/onpurchasoffers').success((response: Offer[]) => {
                console.log(response);
                this.offers = response;
                setTimeout(createTable, 200);
            });



        }

        selectOffer(id: number) {
            this.$http.get('../api/admin/offerInfo/' + id).success((response: OfferData) => {
                console.log(response);
                this.AdminService.currectOffer = response;
                this.$state.go('offerinfo');
            });
        }
        selectCompany(i: number) {
            console.log(i);

            this.$http.get('../api/admin/company/' + i).success((response: CompanyData) => {
                console.log(response);
                this.AdminService.currectCompany = response;
                this.$state.go('company');
            });
        }

        selectUser(buyerId: string) {

            this.$http.get('../api/admin/getprofile/' + buyerId).success((response: AccountData) => {
                console.log(response);
                this.AdminService.currectUser = response;
                this.$state.go('account');
            });
            console.log(buyerId);
        }


    }
    angular.module('admin').controller('admin.onpurchasoffers.OnPurchasOffersController', OnPurchasOffersController);
}