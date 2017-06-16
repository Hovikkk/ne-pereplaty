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
