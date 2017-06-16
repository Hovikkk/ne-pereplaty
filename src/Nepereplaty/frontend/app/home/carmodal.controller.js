/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var home;
    (function (home) {
        var CarModalController = (function () {
            // @ngInject
            function CarModalController(close, $scope, auth, $q, $timeout, $rootScope) {
                this.close = close;
                this.$scope = $scope;
                this.auth = auth;
                this.$q = $q;
                this.$timeout = $timeout;
                this.$rootScope = $rootScope;
                $scope.vmm = this;
                $rootScope.mod = 'mod';
                $scope.dismissModal = function (result) {
                    if (result === void 0) { result = ''; }
                    console.log(result);
                    close(result);
                    $rootScope.mod = '';
                };
            }
            return CarModalController;
        })();
        home.CarModalController = CarModalController;
        angular.module('nepereplaty').controller('CarModalController', CarModalController);
    })(home = nepereplaty.home || (nepereplaty.home = {}));
})(nepereplaty || (nepereplaty = {}));
