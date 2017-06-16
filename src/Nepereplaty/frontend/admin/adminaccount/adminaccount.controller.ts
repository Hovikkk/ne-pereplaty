/// <reference path='../app.ts' />

module admin.account {
    export class AdminAccountController {

        account: AccountData;

        offers:Offer[];

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
            private $q: angular.IQService,
            private $timeout: angular.ITimeoutService,
            private $scope: angular.IScope,
            private $rootScope: any,
            private AdminService: admin.AdminService) {
            this.account = this.AdminService.currectUser;
            console.log(this.account);

            this.$http.get('../api/admin/useroffers/' + this.account.Email).success((response: Offer[]) => {
                console.log(response);
                this.offers = response;
                setTimeout(createTable, 200);
            });
 

        }

        edit(): void {
            console.log(this.account);
            this.$http.put('../api/admin/editprofile', this.account).success((response: any) => {
                // this.offers = response;
                console.log(response);
            });   
        }

        saveComments(offer: Offer): void {
            console.log(offer);
            this.$http.put('../api/admin/updateoffer', offer).success((response: Offer[]) => {
                // this.offers = response;
                console.log(response);
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

        gotoPage(url: string): void {
            this.$state.go(url);
        }
    }
    angular.module('admin').controller('admin.account.AdminAccountController', AdminAccountController);
}