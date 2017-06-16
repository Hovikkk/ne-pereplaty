/// <reference path='../app.ts' />

module admin.company {
    export class CompanyController {
        types = {
            'casco': 'каско',
            'osago': 'осаго',
            'house': 'дом',
            'apartment': 'квартира',
            'traveling': 'туризм',
            'accident': 'здоровье'
        };
        company: CompanyData;
        type: string;
        constructor(private $http: angular.IHttpService,
            private $state: angular.ui.IStateService,
            private $q: angular.IQService,
            private $timeout: angular.ITimeoutService,
            private $scope: angular.IScope,
            private $rootScope: any,
            private AdminService: admin.AdminService) {
            this.company = this.AdminService.currectCompany;
            if (this.company.insurances) {
                var arr: string[] = this.company.insurances.split(',');
                this.type = '';
                for (var i = 0; i < arr.length; ++i) {
                    this.type += this.types[arr[i]];
                }
            }
            console.log(this.company);
        }

        gotoPage(url: string): void {
            this.$state.go(url);
        }
        updateData(): void {
            console.log(offer);
            this.$http.put('../api/admin/updatecompany', this.company).success((response: CompanyData) => {
                this.AdminService.currectCompany = response;
                this.company = this.AdminService.currectCompany;
                console.log(response);
            });
        }
    }
    angular.module('admin').controller('admin.company.CompanyController', CompanyController);
}