/// <reference path='../app.ts' />
var admin;
(function (admin) {
    var account;
    (function (account) {
        var AdminAccountController = (function () {
            function AdminAccountController($http, $state, $q, $timeout, $scope, $rootScope, AdminService) {
                var _this = this;
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
                this.account = this.AdminService.currectUser;
                console.log(this.account);
                this.$http.get('../api/admin/useroffers/' + this.account.Email).success(function (response) {
                    console.log(response);
                    _this.offers = response;
                    setTimeout(createTable, 200);
                });
            }
            AdminAccountController.prototype.edit = function () {
                console.log(this.account);
                this.$http.put('../api/admin/editprofile', this.account).success(function (response) {
                    // this.offers = response;
                    console.log(response);
                });
            };
            AdminAccountController.prototype.saveComments = function (offer) {
                console.log(offer);
                this.$http.put('../api/admin/updateoffer', offer).success(function (response) {
                    // this.offers = response;
                    console.log(response);
                });
            };
            AdminAccountController.prototype.selectOffer = function (id) {
                var _this = this;
                this.$http.get('../api/admin/offerInfo/' + id).success(function (response) {
                    console.log(response);
                    _this.AdminService.currectOffer = response;
                    _this.$state.go('offerinfo');
                });
            };
            AdminAccountController.prototype.selectCompany = function (i) {
                var _this = this;
                console.log(i);
                this.$http.get('../api/admin/company/' + i).success(function (response) {
                    console.log(response);
                    _this.AdminService.currectCompany = response;
                    _this.$state.go('company');
                });
            };
            AdminAccountController.prototype.selectUser = function (buyerId) {
                var _this = this;
                this.$http.get('../api/admin/getprofile/' + buyerId).success(function (response) {
                    console.log(response);
                    _this.AdminService.currectUser = response;
                    _this.$state.go('account');
                });
                console.log(buyerId);
            };
            AdminAccountController.prototype.gotoPage = function (url) {
                this.$state.go(url);
            };
            return AdminAccountController;
        })();
        account.AdminAccountController = AdminAccountController;
        angular.module('admin').controller('admin.account.AdminAccountController', AdminAccountController);
    })(account = admin.account || (admin.account = {}));
})(admin || (admin = {}));
