/// <reference path="app.ts" />
'use strict';
angular
    .module('admin', [
    'ngSanitize',
    'ui.router',
    'pascalprecht.translate',
    'angularMoment',
    'angularModalService'
]).run(['$rootScope', '$state', '$stateParams', 'amMoment', '$interval', '$http', 'ModalService',
    function ($rootScope, $state, $stateParams, amMoment, $interval, $http, ModalService) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.time = new Date();
        amMoment.changeLocale('ru');
        var updateTime = function () {
            $rootScope.time = new Date();
        };
        var stopTime = $interval(updateTime, 1000);
        //$rootScope.isModalShown = false;
        var browser = get_browser_info();
        if (browser.name === 'IE') {
            $rootScope.cl = 'ie';
        }
        function get_browser_info() {
            var ua = navigator.userAgent, tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
            if (/trident/i.test(M[1])) {
                tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
                return { name: 'IE', version: (tem[1] || '') };
            }
            if (M[1] === 'Chrome') {
                tem = ua.match(/\bOPR\/(\d+)/);
                if (tem != null) {
                    return { name: 'Opera', version: tem[1] };
                }
            }
            M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
            if ((tem = ua.match(/version\/(\d+)/i)) != null) {
                M.splice(1, 1, tem[1]);
            }
            return {
                name: M[0],
                version: M[1]
            };
        }
        $rootScope.showFooter = true;
        $rootScope.showHeader = true;
        var isMobile = {
            Android: function () { return navigator.userAgent.match(/Android/i); },
            BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); },
            iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
            Opera: function () { return navigator.userAgent.match(/Opera Mini/i); },
            Windows: function () { return navigator.userAgent.match(/IEMobile/i); },
            any: function () {
                return (isMobile.Android() || isMobile.BlackBerry() ||
                    isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
            }
        };
        $rootScope.isMobile = (isMobile.any() != null);
        console.log($rootScope.isMobile);
    }
]);
angular.module('admin').filter('dotless', function () {
    return function (input) {
        if (input) {
            return input.replace('.', '-');
        }
    };
});
/// <reference path='../app.ts' />
var admin;
(function (admin) {
    var main;
    (function (main) {
        var MainController = (function () {
            function MainController($http, $state, $scope, $rootScope, AdminService) {
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
                this.$http.get('../api/admin/offers').success(function (response) {
                    console.log(response);
                    _this.offers = response;
                    setTimeout(createTable, 200);
                });
            }
            MainController.prototype.selectOffer = function (id) {
                var _this = this;
                this.$http.get('../api/admin/offerInfo/' + id).success(function (response) {
                    console.log(response);
                    _this.AdminService.currectOffer = response;
                    _this.$state.go('offerinfo');
                });
            };
            MainController.prototype.selectCompany = function (i) {
                var _this = this;
                console.log(i);
                this.$http.get('../api/admin/company/' + i).success(function (response) {
                    console.log(response);
                    _this.AdminService.currectCompany = response;
                    _this.$state.go('company');
                });
            };
            MainController.prototype.selectUser = function (buyerId) {
                var _this = this;
                this.$http.get('../api/admin/getprofile/' + buyerId).success(function (response) {
                    console.log(response);
                    _this.AdminService.currectUser = response;
                    _this.$state.go('account');
                });
                console.log(buyerId);
            };
            return MainController;
        })();
        main.MainController = MainController;
        angular.module('admin').controller('admin.main.MainController', MainController);
    })(main = admin.main || (admin.main = {}));
})(admin || (admin = {}));
/// <reference path='../app.ts' />
var admin;
(function (admin) {
    var menu;
    (function (menu) {
        var MenuController = (function () {
            function MenuController($http, $state, $q, $timeout, $scope, $rootScope, ModalService) {
                var _this = this;
                this.$http = $http;
                this.$state = $state;
                this.$q = $q;
                this.$timeout = $timeout;
                this.$scope = $scope;
                this.$rootScope = $rootScope;
                this.ModalService = ModalService;
                var defer = this.$q.defer();
                this.$http
                    .get('../api/account/admin')
                    .success(function (response) {
                    if (response.IsSuccessful) {
                        defer.resolve(response);
                    }
                    else {
                        _this.ModalService.showModal({
                            templateUrl: 'login/login.html',
                            controller: 'LoginModalController',
                            controllerAs: 'loginModalCtrl',
                            inputs: {}
                        });
                        defer.reject(null);
                    }
                })
                    .error(function () {
                    _this.ModalService.showModal({
                        templateUrl: 'login/login.html',
                        controller: 'LoginModalController',
                        controllerAs: 'loginModalCtrl',
                        inputs: {}
                    });
                    defer.reject(null);
                });
            }
            MenuController.prototype.gotoPage = function (url) {
                console.log(url);
                this.$state.go(url);
            };
            return MenuController;
        })();
        menu.MenuController = MenuController;
        angular.module('admin').controller('admin.menu.MenuController', MenuController);
    })(menu = admin.menu || (admin.menu = {}));
})(admin || (admin = {}));
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
/// <reference path='../app.ts' />
var admin;
(function (admin) {
    var onpurchasoffers;
    (function (onpurchasoffers) {
        var OnPurchasOffersController = (function () {
            function OnPurchasOffersController($http, $state, $scope, $rootScope, AdminService) {
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
                this.$http.get('../api/admin/onpurchasoffers').success(function (response) {
                    console.log(response);
                    _this.offers = response;
                    setTimeout(createTable, 200);
                });
            }
            OnPurchasOffersController.prototype.selectOffer = function (id) {
                var _this = this;
                this.$http.get('../api/admin/offerInfo/' + id).success(function (response) {
                    console.log(response);
                    _this.AdminService.currectOffer = response;
                    _this.$state.go('offerinfo');
                });
            };
            OnPurchasOffersController.prototype.selectCompany = function (i) {
                var _this = this;
                console.log(i);
                this.$http.get('../api/admin/company/' + i).success(function (response) {
                    console.log(response);
                    _this.AdminService.currectCompany = response;
                    _this.$state.go('company');
                });
            };
            OnPurchasOffersController.prototype.selectUser = function (buyerId) {
                var _this = this;
                this.$http.get('../api/admin/getprofile/' + buyerId).success(function (response) {
                    console.log(response);
                    _this.AdminService.currectUser = response;
                    _this.$state.go('account');
                });
                console.log(buyerId);
            };
            return OnPurchasOffersController;
        })();
        onpurchasoffers.OnPurchasOffersController = OnPurchasOffersController;
        angular.module('admin').controller('admin.onpurchasoffers.OnPurchasOffersController', OnPurchasOffersController);
    })(onpurchasoffers = admin.onpurchasoffers || (admin.onpurchasoffers = {}));
})(admin || (admin = {}));
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
/// <reference path="../app.ts" />
var admin;
(function (admin) {
    var login;
    (function (login) {
        var LoginModalController = (function () {
            function LoginModalController(close, $q, $timeout, $rootScope, $http) {
                this.close = close;
                this.$q = $q;
                this.$timeout = $timeout;
                this.$rootScope = $rootScope;
                this.$http = $http;
                console.log('ligin Controller ');
                $rootScope.dismissModal = function (result) {
                    if (result === void 0) { result = ''; }
                    close(result);
                };
            }
            LoginModalController.prototype.login = function () {
                var _this = this;
                console.log('Ade hly hoooooooooop');
                var defer = this.$q.defer();
                this.$http
                    .post('../api/account/loginadmin', { Email: this.userName, Password: this.password })
                    .success(function (response) {
                    if (response.IsSuccessful) {
                        defer.resolve(response.Id);
                        _this.$rootScope.dismissModal();
                        window.location.reload();
                    }
                    else {
                        defer.reject(null);
                    }
                })
                    .error(function () {
                    defer.reject(null);
                });
            };
            return LoginModalController;
        })();
        login.LoginModalController = LoginModalController;
        angular.module('admin').controller('LoginModalController', LoginModalController);
    })(login = admin.login || (admin.login = {}));
})(admin || (admin = {}));
/// <reference path="app.ts" />
var admin;
(function (admin) {
    var CompanyData = (function () {
        function CompanyData() {
        }
        return CompanyData;
    })();
    admin.CompanyData = CompanyData;
    var InsuredModel = (function () {
        function InsuredModel(name, sur, mid, ag) {
            this.id = 0;
            this.name = name;
            this.surName = sur;
            this.middleName = mid;
            this.age = ag;
        }
        return InsuredModel;
    })();
    admin.InsuredModel = InsuredModel;
    var OfferData = (function () {
        function OfferData() {
        }
        return OfferData;
    })();
    admin.OfferData = OfferData;
    var AccountData = (function () {
        function AccountData() {
            this.IsMale = true;
        }
        return AccountData;
    })();
    admin.AccountData = AccountData;
    var Offer = (function () {
        function Offer() {
        }
        return Offer;
    })();
    admin.Offer = Offer;
    var TravelingDetail = (function () {
        function TravelingDetail() {
            this.offerID = 0;
        }
        return TravelingDetail;
    })();
    admin.TravelingDetail = TravelingDetail;
    var AdminService = (function () {
        function AdminService($http, $q, $timeout) {
            this.$http = $http;
            this.$q = $q;
            this.$timeout = $timeout;
        }
        return AdminService;
    })();
    admin.AdminService = AdminService;
    angular.module('admin').service('AdminService', AdminService);
})(admin || (admin = {}));
/// <reference path="app.ts" />
var admin;
(function (admin) {
    var config;
    (function (config) {
        var Language = (function () {
            function Language() {
            }
            // @ngInject
            Language.configureLang = function ($translateProvider) {
                $translateProvider.useStaticFilesLoader({
                    prefix: 'lang/',
                    suffix: '.json'
                });
                $translateProvider.preferredLanguage('pl_pl');
                $translateProvider.useSanitizeValueStrategy('sanitize');
                console.log('Language configured!');
            };
            return Language;
        })();
        config.Language = Language;
        angular.module('admin').config(Language.configureLang);
    })(config = admin.config || (admin.config = {}));
})(admin || (admin = {}));
/// <reference path="app.ts" />
var admin;
(function (admin) {
    var config;
    (function (config) {
        var Routes = (function () {
            function Routes() {
            }
            // @ngInject
            Routes.configureRoutes = function ($stateProvider, $urlRouterProvider, $locationProvider) {
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
            };
            Routes.$inject = ['$stateProvider', '$urlRouterProvider'];
            return Routes;
        })();
        config.Routes = Routes;
        angular.module('admin').config(Routes.configureRoutes);
    })(config = admin.config || (admin.config = {}));
})(admin || (admin = {}));
/* App definitions */
/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../typings/angularjs/angular-cookies.d.ts" />
/// <reference path="../../typings/angularjs/angular-sanitize.d.ts" />
/// <reference path="../../typings/angular-translate/angular-translate.d.ts" />
/// <reference path="../../typings/angular-ui-router/angular-ui-router.d.ts" />
/// <reference path="../../typings/angularjs/angular-mocks.d.ts" />
/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="init.ts" />
/// <reference path="main/main.controller.ts" />
/// <reference path="menu/menu.controller.ts" />
/// <reference path="closeoffers/closeoffers.controller.ts" />
/// <reference path="onpurchasoffers/onpurchasoffers.controller.ts" />
/// <reference path="offer/offer.controller.ts" />
/// <reference path="adminaccount/adminaccount.controller.ts" />
/// <reference path="company/company.controller.ts" />
/// <reference path="createcompany/createcompany.controller.ts" />
/// <reference path="login/login.controller.ts" />
/// <reference path="admin.service.ts" />
/// <reference path="config.ts" />
/// <reference path="routes.ts" />
function createTable() {
    $('.datatables').dataTable({
        'sDom': '<\'row\'<\'col-xs-6\'l><\'col-xs-6\'f>r>t<\'row\'<\'col-xs-6\'i><\'col-xs-6\'p>>',
        'sPaginationType': 'bootstrap',
        'aaSorting': [[0, 'desc']],
        'oLanguage': {
            'sLengthMenu': '_MENU_ записей в странице',
            'sSearch': ''
        }
    });
    $('.dataTables_filter input').addClass('form-control').attr('placeholder', 'поиск...');
    $('.dataTables_length select').addClass('form-control');
}
