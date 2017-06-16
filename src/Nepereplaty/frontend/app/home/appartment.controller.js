/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var home;
    (function (home) {
        var AppartmentController = (function () {
            // @ngInject
            function AppartmentController(close, $scope, auth, $q, $timeout, $rootScope) {
                this.close = close;
                this.$scope = $scope;
                this.auth = auth;
                this.$q = $q;
                this.$timeout = $timeout;
                this.$rootScope = $rootScope;
                $scope.vmm = this;
                $rootScope.mod = 'mod';
                $scope.dismisssModal = function (result) {
                    if (result === void 0) { result = ''; }
                    console.log(result);
                    close(result);
                    $rootScope.mod = '';
                };
            }
            return AppartmentController;
        })();
        home.AppartmentController = AppartmentController;
        angular.module('nepereplaty').controller('AppartmentController', AppartmentController);
    })(home = nepereplaty.home || (nepereplaty.home = {}));
})(nepereplaty || (nepereplaty = {}));
