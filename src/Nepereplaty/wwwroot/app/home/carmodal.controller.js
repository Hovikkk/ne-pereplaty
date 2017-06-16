/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />
/// <reference path="../../../typings/angular-translate/angular-translate.d.ts" />
var nepereplaty;
(function (nepereplaty) {
    var home;
    (function (home) {
        var CarModalController = (function () {
            // @ngInject
            function CarModalController(close, $scope, auth, $q, $timeout) {
                this.close = close;
                this.$scope = $scope;
                this.auth = auth;
                this.$q = $q;
                this.$timeout = $timeout;
                $scope.vm = this;
                $scope.dismissModal = function (result) {
                    if (result === void 0) { result = ''; }
                    close(result);
                };
            }
            return CarModalController;
        })();
        home.CarModalController = CarModalController;
        angular.module('nepereplaty').controller('CarModalController', CarModalController);
    })(home = nepereplaty.home || (nepereplaty.home = {}));
})(nepereplaty || (nepereplaty = {}));
