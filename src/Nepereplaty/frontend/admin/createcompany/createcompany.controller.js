/// <reference path='../app.ts' />
var admin;
(function (admin) {
    var createcompany;
    (function (createcompany) {
        var CreateCompanyController = (function () {
            function CreateCompanyController($http, $state, $q, $timeout, $scope, $rootScope, AdminService) {
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
                console.log(this.company);
            }
            CreateCompanyController.prototype.gotoPage = function (url) {
                this.$state.go(url);
            };
            CreateCompanyController.prototype.updateData = function () {
                var _this = this;
                console.log(admin.offer);
                this.$http.put('../api/admin/updatecompany', this.company).success(function (response) {
                    _this.AdminService.currectCompany = response;
                    _this.company = _this.AdminService.currectCompany;
                    console.log(response);
                });
            };
            return CreateCompanyController;
        })();
        createcompany.CreateCompanyController = CreateCompanyController;
        angular.module('admin').controller('admin.createcompany.CreateCompanyController', CreateCompanyController);
    })(createcompany = admin.createcompany || (admin.createcompany = {}));
})(admin || (admin = {}));
