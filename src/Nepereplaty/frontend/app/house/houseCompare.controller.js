/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var house;
    (function (house) {
        var HOUSECompareController = (function () {
            function HOUSECompareController($state, $q, HOUSEService) {
                this.$state = $state;
                this.$q = $q;
                this.HOUSEService = HOUSEService;
                this.content = new house.HOUSEOffer();
                this.content = this.HOUSEService.getOffers();
                this.content.submodule = 'Дом';
                this.content.termInsurance = '1 год';
                this.startData = this.content.startData;
                var ar = this.startData.split('-');
                this.startData = ar[2] + '.' + ar[1] + '.' + ar[0];
            }
            ;
            HOUSECompareController.prototype.back = function () {
                console.log('________________________________===================');
                this.$state.go('house.offer');
            };
            ;
            HOUSECompareController.prototype.openPdf = function () {
                window.open('../../p/example.pdf');
            };
            return HOUSECompareController;
        })();
        house.HOUSECompareController = HOUSECompareController;
        angular.module('nepereplaty').controller('nepereplaty.house.HOUSECompareController', HOUSECompareController);
    })(house = nepereplaty.house || (nepereplaty.house = {}));
})(nepereplaty || (nepereplaty = {}));
