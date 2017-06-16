/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var loading;
    (function (loading) {
        var LoadingModalController = (function () {
            function LoadingModalController(close, auth, $q, $timeout, $rootScope) {
                this.close = close;
                this.auth = auth;
                this.$q = $q;
                this.$timeout = $timeout;
                this.$rootScope = $rootScope;
                $rootScope.dismissModal = function (result) {
                    if (result === void 0) { result = ''; }
                    close(result);
                };
            }
            return LoadingModalController;
        })();
        loading.LoadingModalController = LoadingModalController;
        angular.module('nepereplaty').controller('LoadingModalController', LoadingModalController);
    })(loading = nepereplaty.loading || (nepereplaty.loading = {}));
})(nepereplaty || (nepereplaty = {}));
