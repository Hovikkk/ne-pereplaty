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
        function (
            $rootScope,
            $state: angular.ui.IStateService,
            $stateParams: angular.ui.IStateParamsService,
            amMoment,
            $interval: angular.IIntervalService,
            $http: angular.IHttpService,
            ModalService ) {

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
                    if (tem != null) { return { name: 'Opera', version: tem[1] }; }
                }
                M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
                if ((tem = ua.match(/version\/(\d+)/i)) != null) { M.splice(1, 1, tem[1]); }
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