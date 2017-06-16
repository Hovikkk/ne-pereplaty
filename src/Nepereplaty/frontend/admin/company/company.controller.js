/// <reference path='../app.ts' />
var admin;
(function (admin) {
    var company;
    (function (company) {
        var CompanyController = (function () {
            function CompanyController($http, $state, $q, $timeout, $scope, $rootScope, AdminService) {
                this.$http = $http;
                this.$state = $state;
                this.$q = $q;
                this.$timeout = $timeout;
                this.$scope = $scope;
                this.$rootScope = $rootScope;
                this.AdminService = AdminService;
                this.types = {
                    'casco': 'каско',
                    'osago': 'осаго',
                    'house': 'дом',
                    'apartment': 'квартира',
                    'traveling': 'туризм',
                    'accident': 'здоровье'
                };
                this.company = this.AdminService.currectCompany;
                if (this.company.insurances) {
                    var arr = this.company.insurances.split(',');
                    this.type = '';
                    for (var i = 0; i < arr.length; ++i) {
                        this.type += this.types[arr[i]];
                    }
                }
                console.log(this.company);
            }
            CompanyController.prototype.gotoPage = function (url) {
                this.$state.go(url);
            };
            CompanyController.prototype.updateData = function () {
                var _this = this;
                console.log(admin.offer);
                this.$http.put('../api/admin/updatecompany', this.company).success(function (response) {
                    _this.AdminService.currectCompany = response;
                    _this.company = _this.AdminService.currectCompany;
                    console.log(response);
                });
            };
            return CompanyController;
        })();
        company.CompanyController = CompanyController;
        angular.module('admin').controller('admin.company.CompanyController', CompanyController);
    })(company = admin.company || (admin.company = {}));
})(admin || (admin = {}));
