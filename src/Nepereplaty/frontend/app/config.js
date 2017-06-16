/// <reference path="app.ts" />
var nepereplaty;
(function (nepereplaty) {
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
        angular.module('nepereplaty').config(Language.configureLang);
    })(config = nepereplaty.config || (nepereplaty.config = {}));
})(nepereplaty || (nepereplaty = {}));
