/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var osago;
    (function (osago) {
        var OSAGOFinishController = (function () {
            function OSAGOFinishController($http, $state, $q, OSAGOService) {
                this.$http = $http;
                this.$state = $state;
                this.$q = $q;
                this.OSAGOService = OSAGOService;
                if (this.OSAGOService.getOffers() == null) {
                    this.$state.go('home');
                }
                this.offer = this.OSAGOService.getOffers().Offers[this.OSAGOService.offerIndex];
                this.data = this.OSAGOService.buyerInfo;
                this.age = this.OSAGOService.getOffers().DriversMinAge;
                this.orderNumber = this.OSAGOService.offerId;
                this.startData = this.OSAGOService.getOffers().startData;
                this.endData = this.OSAGOService.getOffers().endData;
                this.DriversCount = this.OSAGOService.getOffers().DriversCount;
                this.$http.get('../api/admin/purchas/' + this.orderNumber + '/'
                    + this.stringtoNumber(this.offer.Price)).success(function (response) {
                    console.log(response);
                });
            }
            OSAGOFinishController.prototype.stringtoNumber = function (s) {
                var result = 0;
                var step1 = s.replace(',', '.');
                var step2 = step1.replace(/ /g, '');
                var step3 = step2.replace(' ', '').replace(String.fromCharCode(160), '');
                result = parseFloat(step3);
                return result;
            };
            OSAGOFinishController.prototype.downloadPdf = function () {
                window.open('../../p/example.pdf');
            };
            ;
            return OSAGOFinishController;
        })();
        osago.OSAGOFinishController = OSAGOFinishController;
        angular.module('nepereplaty').controller('nepereplaty.osago.OSAGOFinishController', OSAGOFinishController);
    })(osago = nepereplaty.osago || (nepereplaty.osago = {}));
})(nepereplaty || (nepereplaty = {}));
