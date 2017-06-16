/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var accident;
    (function (accident) {
        var ACCIDENTCompareController = (function () {
            function ACCIDENTCompareController($state, $q, ACCIDENTService) {
                this.$state = $state;
                this.$q = $q;
                this.ACCIDENTService = ACCIDENTService;
                this.content = new accident.ACCIDENTOffer();
                this.insuranceOptions = [
                    {
                        text: '1 месяц',
                        value: 1
                    },
                    {
                        text: '3 месяца',
                        value: 3
                    },
                    {
                        text: '6 месяцев',
                        value: 6
                    },
                    {
                        text: '12 месяцев',
                        value: 12
                    }
                ];
                this.content = this.ACCIDENTService.getOffers();
                for (var i = 0; i < this.insuranceOptions.length; i++) {
                    if (this.insuranceOptions[i].value === this.content.duration) {
                        this.duration = this.insuranceOptions[i].text;
                        break;
                    }
                }
            }
            ;
            ACCIDENTCompareController.prototype.back = function () {
                this.$state.go('accident.offer');
            };
            ;
            ACCIDENTCompareController.prototype.openPdf = function () {
                window.open('../../p/example.pdf');
            };
            return ACCIDENTCompareController;
        })();
        accident.ACCIDENTCompareController = ACCIDENTCompareController;
        angular.module('nepereplaty').controller('nepereplaty.accident.ACCIDENTCompareController', ACCIDENTCompareController);
    })(accident = nepereplaty.accident || (nepereplaty.accident = {}));
})(nepereplaty || (nepereplaty = {}));
