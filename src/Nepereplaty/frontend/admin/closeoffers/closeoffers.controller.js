/// <reference path='../app.ts' />
var admin;
(function (admin) {
    var closeoffers;
    (function (closeoffers) {
        var CloseOffersController = (function () {
            function CloseOffersController($http, $state, $scope, $rootScope, AdminService) {
                var _this = this;
                this.$http = $http;
                this.$state = $state;
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
                this.name = 'Main Page';
                this.offers = [];
                this.$http.get('../api/admin/closedataoffers').success(function (response) {
                    console.log(response);
                    _this.offers = response;
                    setTimeout(createTable, 200);
                });
            }
            CloseOffersController.prototype.selectOffer = function (id) {
                var _this = this;
                this.$http.get('../api/admin/offerInfo/' + id).success(function (response) {
                    console.log(response);
                    _this.AdminService.currectOffer = response;
                    _this.$state.go('offerinfo');
                });
            };
            CloseOffersController.prototype.selectCompany = function (i) {
                var _this = this;
                console.log(i);
                this.$http.get('../api/admin/company/' + i).success(function (response) {
                    console.log(response);
                    _this.AdminService.currectCompany = response;
                    _this.$state.go('company');
                });
            };
            CloseOffersController.prototype.selectUser = function (buyerId) {
                var _this = this;
                this.$http.get('../api/admin/getprofile/' + buyerId).success(function (response) {
                    console.log(response);
                    _this.AdminService.currectUser = response;
                    _this.$state.go('account');
                });
                console.log(buyerId);
            };
            return CloseOffersController;
        })();
        closeoffers.CloseOffersController = CloseOffersController;
        angular.module('admin').controller('admin.closeoffers.CloseOffersController', CloseOffersController);
    })(closeoffers = admin.closeoffers || (admin.closeoffers = {}));
})(admin || (admin = {}));
