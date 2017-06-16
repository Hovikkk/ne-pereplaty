/// <reference path='../app.ts' />
var admin;
(function (admin) {
    var offer;
    (function (offer) {
        var OfferController = (function () {
            function OfferController($http, $state, $q, $timeout, $scope, $rootScope, AdminService) {
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
            OfferController.prototype.getHomeData = function (id) {
                var _this = this;
                this.$http.get('../api/admin/gethomeoffer/' + id).success(function (response) {
                    console.log(response);
                    _this.data = response;
                });
            };
            OfferController.prototype.getCascoData = function (id) {
                var _this = this;
                this.$http.get('../api/admin/getcascoffer/' + id).success(function (response) {
                    console.log(response);
                    _this.data = response;
                });
            };
            OfferController.prototype.getOsagoData = function (id) {
                var _this = this;
                this.$http.get('../api/admin/getosagoffer/' + id).success(function (response) {
                    _this.data = response;
                });
            };
            OfferController.prototype.getAccidentData = function (id) {
                var _this = this;
                this.$http.get('../api/admin/getaccidentoffer/' + id).success(function (response) {
                    _this.data = response;
                });
            };
            OfferController.prototype.getTravelingData = function (id) {
                var _this = this;
                this.$http.get('../api/admin/gettravelingoffer/' + id).success(function (response) {
                    console.log(response);
                    _this.data = response;
                });
            };
            OfferController.prototype.gotoPage = function (url) {
                this.$state.go(url);
            };
            return OfferController;
        })();
        offer.OfferController = OfferController;
        angular.module('admin').controller('admin.offer.OfferController', OfferController);
    })(offer = admin.offer || (admin.offer = {}));
})(admin || (admin = {}));
