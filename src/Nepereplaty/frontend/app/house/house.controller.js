/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var house;
    (function (house) {
        var HOUSEController = (function () {
            function HOUSEController(
                //private close: any,
                $http, $state, $q, HOUSEService, $scope, ModalService, $timeout, $rootScope) {
                this.$http = $http;
                this.$state = $state;
                this.$q = $q;
                this.HOUSEService = HOUSEService;
                this.$scope = $scope;
                this.ModalService = ModalService;
                this.$timeout = $timeout;
                this.$rootScope = $rootScope;
                this.insuranceStartMinData = new Date();
                this.submitValue = 'Получить предложение';
                this.wallsOptions = [
                    {
                        text: 'Дерево',
                        value: '1'
                    },
                    {
                        text: 'Камень',
                        value: '0'
                    }
                ];
                this.AdditionalBuildingsOptions = [
                    {
                        text: 'Баня/Сауна',
                        value: '0'
                    },
                    {
                        text: 'Гараж',
                        value: '1'
                    },
                    {
                        text: 'Сарай',
                        value: '1'
                    },
                    {
                        text: 'Беседка',
                        value: '1'
                    },
                    {
                        text: 'Забор',
                        value: '2'
                    }
                ];
                this.estateCountModel = null;
                this.estatesCount = null;
                this.addEstatesCount = function () {
                    this.estatesCount++;
                    // this.houseInsuranceForm.releaseYear = '';
                    this.estatesCountChange();
                };
                this.estatesCountChange = function () {
                    if (this.isNumeric(this.estatesCount)) {
                        if (this.estatesCount > this.houseInsuranceForm.AdditionalStructure.length) {
                            while (this.estatesCount > this.houseInsuranceForm.AdditionalStructure.push(new house.AdditionalStructure())) {
                            }
                        }
                        if (this.estatesCount < this.houseInsuranceForm.AdditionalStructure.length) {
                            this.houseInsuranceForm.AdditionalStructure.splice(this.estatesCount, this.houseInsuranceForm.AdditionalStructure.length - this.estatesCount);
                        }
                    }
                };
                this.isNumeric = function (n) {
                    return !isNaN(parseFloat(n)) && isFinite(n);
                };
                /*yearBigValue(index: any): void {
                    var _year = this.houseInsuranceForm.estates[index].year;
                    var nowYear = new Date().getUTCFullYear();
                    if (_year > nowYear) {
                        _year = null;
                        this.houseInsuranceForm.estates[index].releaseYearIsLarge = true;
                    } else {
                        this.houseInsuranceForm.estates[index].releaseYearIsLarge = false;
                    }
                };*/
                this.yearBigValue = function () {
                    var nowYear = new Date().getUTCFullYear();
                    if (this.houseInsuranceForm.year > nowYear) {
                        this.houseInsuranceForm.year = nowYear;
                    }
                    else {
                    }
                };
                this.dataOnTheProperty = !$rootScope.isMobile;
                this.houseInsuranceForm = new house.HOUSEForm();
                this.$rootScope.showFooter = true;
                this.$rootScope.showBlindStopper = false;
                this.showPeriodStart = false;
                this.estatesCount = 0;
                this.estatesCountChange();
                this.getRegions();
                this.insuranceStartMinData.setDate(this.insuranceStartMinData.getDate() - 1);
            }
            ;
            HOUSEController.prototype.getRegions = function () {
                var _this = this;
                var s = 'api/handbook/region/';
                this.$http.get(s)
                    .success(function (response) {
                    console.log(_this.regions);
                    _this.regions = response;
                    console.log(_this.regions);
                });
            };
            ;
            HOUSEController.prototype.iscostIsLarg = function () {
                for (var i = 0; i < this.houseInsuranceForm.AdditionalStructure.length; i++) {
                    if (this.houseInsuranceForm.AdditionalStructure[i].cost > 200000) {
                        this.houseInsuranceForm.AdditionalStructure[i].cost = null;
                    }
                }
            };
            HOUSEController.prototype.requestOffer = function () {
                var _this = this;
                if (this.submitValue === 'Получить предложение') {
                    console.log(this.houseInsuranceForm.year < 1965, this.houseInsuranceForm.year > 2015, !this.houseInsuranceForm.region, this.houseInsuranceForm.cover.value == null);
                    if (this.houseInsuranceForm.year < 1965 ||
                        this.houseInsuranceForm.year > 2015 ||
                        !this.houseInsuranceForm.region ||
                        this.houseInsuranceForm.cover.value == null) {
                        return;
                    }
                    console.log('________');
                    var formClone = new house.HOUSEForm();
                    formClone.year = this.houseInsuranceForm.year;
                    formClone.rent = this.houseInsuranceForm.rent;
                    formClone.region = this.houseInsuranceForm.region.originalObject.value;
                    formClone.cover = this.houseInsuranceForm.cover.value;
                    formClone.startData = this.houseInsuranceForm.periodStart;
                    for (var i = 0; i < this.houseInsuranceForm.AdditionalStructure.length; ++i) {
                        if (this.houseInsuranceForm.AdditionalStructure[i].type.value == null ||
                            !this.houseInsuranceForm.AdditionalStructure[i].cost ||
                            this.houseInsuranceForm.AdditionalStructure[i].cost > 200000) {
                            return;
                        }
                        if (i > 0) {
                            formClone.AdditionalStructures += ', ';
                        }
                        formClone.AdditionalStructures += this.houseInsuranceForm.AdditionalStructure[i].type.text;
                        formClone.AdditionalStructure.push(new house.AdditionalStructure(this.houseInsuranceForm.AdditionalStructure[i].type.value, this.houseInsuranceForm.AdditionalStructure[i].cost));
                    }
                    this.submitValue = 'Поиск предложений ...';
                    this.ModalService.showModal({
                        templateUrl: 'app/loading/loading.html',
                        controller: 'LoadingModalController',
                        controllerAs: 'loadingModalCtrl',
                        inputs: {}
                    });
                    window.scrollTo(0, 0);
                    this.HOUSEService.loadOffers(formClone).success(function () {
                        _this.$rootScope.dismissModal('loading');
                        _this.$state.go('house.offer');
                    });
                }
            };
            return HOUSEController;
        })();
        house.HOUSEController = HOUSEController;
        angular.module('nepereplaty').controller('nepereplaty.house.HOUSEController', HOUSEController);
    })(house = nepereplaty.house || (nepereplaty.house = {}));
})(nepereplaty || (nepereplaty = {}));
