/// <reference path="app.ts" />

module admin.config {

    export class Routes {

        static $inject: string[] = ['$stateProvider', '$urlRouterProvider'];
        // @ngInject
        static configureRoutes( 
            $stateProvider: angular.ui.IStateProvider,
            $urlRouterProvider: angular.ui.IUrlRouterProvider,
            $locationProvider: angular.ILocationProvider) {

            $urlRouterProvider.otherwise('/');
            
            // Base route sets
            $stateProvider
                .state('main', {
                    url: '/',
                    templateUrl: 'main/main.html',
                    controller: 'admin.main.MainController',
                    controllerAs: 'mainCtrl'
                }).state('account', {
                    url: '/account',
                    templateUrl: 'adminaccount/adminaccount.html',
                    controller: 'admin.account.AdminAccountController',
                    controllerAs: 'accountCtrl'
                }).state('company', {
                    url: '/company',
                    templateUrl: 'company/company.html',
                    controller: 'admin.company.CompanyController',
                    controllerAs: 'companyCtrl'
                }).state('offerinfo', {
                    url: '/offerinfo',
                    templateUrl: 'offer/offer.html',
                    controller: 'admin.offer.OfferController',
                    controllerAs: 'offerCtrl'
                }).state('closeoffers', {
                    url: '/closeoffers',
                    templateUrl: 'closeoffers/closeoffers.html',
                    controller: 'admin.closeoffers.CloseOffersController',
                    controllerAs: 'closeoffersCtrl'
                }).state('onpurchasoffers', {
                    url: '/onpurchasoffers',
                    templateUrl: 'onpurchasoffers/onpurchasoffers.html',
                    controller: 'admin.onpurchasoffers.OnPurchasOffersController',
                    controllerAs: 'onpurchasoffersCtrl'
                }).state('createcompany', {
                    url: '/createcompany',
                    templateUrl: 'createcompany/createcompany.html',
                    controller: 'admin.createcompany.CreateCompanyController',
                    controllerAs: 'createcompanyCtrl'
                });

            $locationProvider.html5Mode(true);
        }

    }

    angular.module('admin').config(Routes.configureRoutes);
}