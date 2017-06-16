/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var traveling;
    (function (traveling) {
        var TRAVELINGCompareController = (function () {
            function TRAVELINGCompareController($state, $q, TRAVELINGService) {
                this.$state = $state;
                this.$q = $q;
                this.TRAVELINGService = TRAVELINGService;
                this.content = new traveling.TRAVELINGOffer();
                this.content = this.TRAVELINGService.getOffers();
                this.startData = this.content.startData;
                this.endData = this.content.endData;
            }
            ;
            TRAVELINGCompareController.prototype.back = function () {
                console.log('________________________________===================');
                this.$state.go('traveling.offer');
            };
            ;
            TRAVELINGCompareController.prototype.openPdf = function () {
                window.open('../../p/example.pdf');
            };
            return TRAVELINGCompareController;
        })();
        traveling.TRAVELINGCompareController = TRAVELINGCompareController;
        angular.module('nepereplaty').controller('nepereplaty.traveling.TRAVELINGCompareController', TRAVELINGCompareController);
    })(traveling = nepereplaty.traveling || (nepereplaty.traveling = {}));
})(nepereplaty || (nepereplaty = {}));
