/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var apartment;
    (function (apartment) {
        var APARTMENTCompareController = (function () {
            function APARTMENTCompareController($state, $q, APARTMENTService) {
                this.$state = $state;
                this.$q = $q;
                this.APARTMENTService = APARTMENTService;
                this.content = new apartment.APARTMENTOffer();
                this.content = this.APARTMENTService.getOffers();
                this.content.submodule = 'Квартира';
                this.content.termInsurance = '1 год';
                this.startData = this.content.startData;
                var ar = this.startData.split('-');
                this.startData = ar[2] + '.' + ar[1] + '.' + ar[0];
            }
            ;
            APARTMENTCompareController.prototype.back = function () {
                this.$state.go('apartment.offer');
            };
            ;
            return APARTMENTCompareController;
        })();
        apartment.APARTMENTCompareController = APARTMENTCompareController;
        angular.module('nepereplaty').controller('nepereplaty.apartment.APARTMENTCompareController', APARTMENTCompareController);
    })(apartment = nepereplaty.apartment || (nepereplaty.apartment = {}));
})(nepereplaty || (nepereplaty = {}));
