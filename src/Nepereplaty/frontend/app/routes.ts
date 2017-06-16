/// <reference path="app.ts" />

module nepereplaty.config {

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
                .state('protected', {
                    abstract: true,
                    template: '<div ui-view></div>',
                    resolve: {
                        authenticated: ['nepereplaty.auth.auth', function (auth: nepereplaty.auth.IAuthService) {
                            console.log('protecting route');
                            return auth.isAuthenticated();
                        }]
                    }
                })
                .state('casco.compare', {
                    url: '/compare',
                    views: {
                        '@': {
                            templateUrl: 'app/casco/compare.html',
                            controller: 'nepereplaty.casco.CASCOCompareController',
                            controllerAs: 'cascoCompareCtrl'
                        }
                    }
                })
                .state('home', {
                    url: '/',
                    templateUrl: 'app/home/home.html',
                    controller: 'nepereplaty.home.HomeController',
                    controllerAs: 'homeCtrl'
                })
                .state('casco', {
                    url: '/casco',
                    templateUrl: 'app/casco/casco.html',
                    controller: 'nepereplaty.casco.CASCOController',
                    controllerAs: 'cascoCtrl'
                })
                .state('traveling', {
                    url: '/traveling',
                    templateUrl: 'app/traveling/travelingnew.html',
                    controller: 'nepereplaty.traveling.TRAVELINGController',
                    controllerAs: 'travelingCtrl'
                })
                .state('osago', {
                    url: '/osago',
                    templateUrl: 'app/osago/osago.html',
                    controller: 'nepereplaty.osago.OSAGOController',
                    controllerAs: 'osagoCtrl'
                })
                .state('osago.offer', {
                    url: '/offer',
                    views: {
                        '@': {
                            templateUrl: 'app/osago/offer.html',
                            controller: 'nepereplaty.osago.OSAGOOfferController',
                            controllerAs: 'osagoOfferCtrl'
                        }
                    }
                })
                .state('osago.details', {
                    url: '/details',
                    views: {
                        '@': {
                            templateUrl: 'app/osago/details.html',
                            controller: 'nepereplaty.osago.OSAGODetailsController',
                            controllerAs: 'osagoDetailsCtrl'
                        }
                    }
                })
                .state('osago.payment', {
                    url: '/payment',
                    views: {
                        '@': {
                            templateUrl: 'app/osago/payment.html',
                            controller: 'nepereplaty.osago.OSAGOPaymentController',
                            controllerAs: 'osagoPaymentCtrl'
                        }
                    }
                })
                .state('osago.finish', {
                    url: '/finish',
                    views: {
                        '@': {
                            templateUrl: 'app/osago/finish.html',
                            controller: 'nepereplaty.osago.OSAGOFinishController',
                            controllerAs: 'osagoFinishCtrl'
                        }
                    }
                })
                .state('casco.offer', {
                    url: '/offer',
                    views: {
                        '@': {
                            templateUrl: 'app/casco/offer.html',
                            controller: 'nepereplaty.casco.CASCOOfferController',
                            controllerAs: 'cascoOfferCtrl'
                        }
                    }
                })
                .state('casco.details', {
                    url: '/details',
                    views: {
                        '@': {
                            templateUrl: 'app/casco/details.html',
                            controller: 'nepereplaty.casco.CASCODetailsController',
                            controllerAs: 'cascoDetailsCtrl'
                        }
                    }
                })
                .state('casco.payment', {
                    url: '/payment',
                    views: {
                        '@': {
                            templateUrl: 'app/casco/payment.html',
                            controller: 'nepereplaty.casco.CASCOPaymentController',
                            controllerAs: 'cascoPaymentCtrl'
                        }
                    }
                })
                .state('casco.finish', {
                    url: '/finish',
                    views: {
                        '@': {
                            templateUrl: 'app/casco/finish.html',
                            controller: 'nepereplaty.casco.CASCOFinishController',
                            controllerAs: 'cascoFinishCtrl'
                        }
                    }
                })
                .state('house', {
                    url: '/house',
                    templateUrl: 'app/house/house.html',
                    controller: 'nepereplaty.house.HOUSEController',
                    controllerAs: 'houseCtrl'
                })
                .state('house.offer', {
                    url: '/offer',
                    views: {
                        '@': {
                            templateUrl: 'app/house/offer.html',
                            controller: 'nepereplaty.house.HOUSEOfferController',
                            controllerAs: 'houseOfferCtrl'
                        }
                    }
                })
                .state('house.compare', {
                    url: '/compare',
                    views: {
                        '@': {
                            templateUrl: 'app/house/compare.html',
                            controller: 'nepereplaty.house.HOUSECompareController',
                            controllerAs: 'houseCompareCtrl'
                        }
                    }
                })
                .state('house.details', {
                    url: '/details',
                    views: {
                        '@': {
                            templateUrl: 'app/house/details.html',
                            controller: 'nepereplaty.house.HOUSEDetailsController',
                            controllerAs: 'houseDetailsCtrl'
                        }
                    }
                })
                .state('house.payment', {
                    url: '/payment',
                    views: {
                        '@': {
                            templateUrl: 'app/house/payment.html',
                            controller: 'nepereplaty.house.HOUSEPaymentController',
                            controllerAs: 'housePaymentCtrl'
                        }
                    }
                })
                .state('house.finish', {
                    url: '/finish',
                    views: {
                        '@': {
                            templateUrl: 'app/house/finish.html',
                            controller: 'nepereplaty.house.HOUSEFinishController',
                            controllerAs: 'houseFinishCtrl'
                        }
                    }
                })
                .state('apartment', {
                    url: '/apartment',
                    templateUrl: 'app/apartment/apartment.html',
                    controller: 'nepereplaty.apartment.APARTMENTController',
                    controllerAs: 'apartmentCtrl'
                })
                .state('apartment.offer', {
                    url: '/offer',
                    views: {
                        '@': {
                            templateUrl: 'app/apartment/offer.html',
                            controller: 'nepereplaty.apartment.APARTMENTOfferController',
                            controllerAs: 'apartmentOfferCtrl'
                        }
                    }
                })
                .state('apartment.compare', {
                    url: '/compare',
                    views: {
                        '@': {
                            templateUrl: 'app/apartment/compare.html',
                            controller: 'nepereplaty.apartment.APARTMENTCompareController',
                            controllerAs: 'apartmentCompareCtrl'
                        }
                    }
                })
                .state('apartment.details', {
                    url: '/details',
                    views: {
                        '@': {
                            templateUrl: 'app/apartment/details.html',
                            controller: 'nepereplaty.apartment.APARTMENTDetailsController',
                            controllerAs: 'apartmentDetailsCtrl'
                        }
                    }
                })
                .state('apartment.payment', {
                    url: '/payment',
                    views: {
                        '@': {
                            templateUrl: 'app/apartment/payment.html',
                            controller: 'nepereplaty.apartment.APARTMENTPaymentController',
                            controllerAs: 'apartmentPaymentCtrl'
                        }
                    }
                })
                .state('apartment.finish', {
                    url: '/finish',
                    views: {
                        '@': {
                            templateUrl: 'app/apartment/finish.html',
                            controller: 'nepereplaty.apartment.APARTMENTFinishController',
                            controllerAs: 'apartmentFinishCtrl'
                        }
                    }
                })
                
                .state('traveling.offer', {
                    url: '/offer',
                    views: {
                        '@': {
                            templateUrl: 'app/traveling/offer.html',
                            controller: 'nepereplaty.traveling.TRAVELINGOfferController',
                            controllerAs: 'travelingtOfferCtrl'
                        }
                    }
                })
                .state('traveling.compare', {
                    url: '/compare',
                    views: {
                        '@': {
                            templateUrl: 'app/traveling/compare.html',
                            controller: 'nepereplaty.traveling.TRAVELINGCompareController',
                            controllerAs: 'travelingCompareCtrl'
                        }
                    }
                })
                .state('traveling.details', {
                    url: '/details',
                    views: {
                        '@': {
                            templateUrl: 'app/traveling/details.html',
                            controller: 'nepereplaty.traveling.TRAVELINGDetailsController',
                            controllerAs: 'travelingDetailsCtrl'
                        }
                    }
                })
                .state('traveling.payment', {
                    url: '/payment',
                    views: {
                        '@': {
                            templateUrl: 'app/traveling/payment.html',
                            controller: 'nepereplaty.traveling.TRAVELINGPaymentController',
                            controllerAs: 'travelingPaymentCtrl'
                        }
                    }
                })
                .state('traveling.finish', {
                    url: '/finish',
                    views: {
                        '@': {
                            templateUrl: 'app/traveling/finish.html',
                            controller: 'nepereplaty.traveling.TRAVELINGFinishController',
                            controllerAs: 'travelingFinishCtrl'
                        }
                    }
                })
                .state('accident', {
                    url: '/accident',
                    templateUrl: 'app/accident/accident.html',
                    controller: 'nepereplaty.accident.ACCIDENTController',
                    controllerAs: 'accidentCtrl'
                })
                .state('accident.offer', {
                    url: '/offer',
                    views: {
                        '@': {
                            templateUrl: 'app/accident/offer.html',
                            controller: 'nepereplaty.accident.ACCIDENTOfferController',
                            controllerAs: 'accidentOfferCtrl'
                        }
                    }
                })
                .state('accident.compare', {
                    url: '/compare',
                    views: {
                        '@': {
                            templateUrl: 'app/accident/compare.html',
                            controller: 'nepereplaty.accident.ACCIDENTCompareController',
                            controllerAs: 'accidentCompareCtrl'
                        }
                    }
                })
                .state('accident.details', {
                    url: '/details',
                    views: {
                        '@': {
                            templateUrl: 'app/accident/details.html',
                            controller: 'nepereplaty.accident.ACCIDENTDetailsController',
                            controllerAs: 'accidentDetailsCtrl'
                        }
                    }
                })
                .state('accident.payment', {
                    url: '/payment',
                    views: {
                        '@': {
                            templateUrl: 'app/accident/payment.html',
                            controller: 'nepereplaty.accident.ACCIDENTPaymentController',
                            controllerAs: 'accidentPaymentCtrl'
                        }
                    }
                })
                .state('accident.finish', {
                    url: '/finish',
                    views: {
                        '@': {
                            templateUrl: 'app/accident/finish.html',
                            controller: 'nepereplaty.accident.ACCIDENTFinishController',
                            controllerAs: 'accidentFinishCtrl'
                        }
                    }
                })
                .state('account', {
                    url: '/account',
                    templateUrl: 'app/account/account.html',
                    controller: 'nepereplaty.account.AccountController',
                    controllerAs: 'accountCtrl'
                });

            $locationProvider.html5Mode(true);
        }

    }

    angular.module('nepereplaty').config(Routes.configureRoutes);
}