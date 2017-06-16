/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var traveling;
    (function (traveling) {
        var TRAVELINGController = (function () {
            function TRAVELINGController($http, $state, $q, TRAVELINGService, $scope, ModalService, $timeout, $rootScope) {
                var _this = this;
                this.$http = $http;
                this.$state = $state;
                this.$q = $q;
                this.TRAVELINGService = TRAVELINGService;
                this.$scope = $scope;
                this.ModalService = ModalService;
                this.$timeout = $timeout;
                this.$rootScope = $rootScope;
                this.submitValue = 'Получить предложение';
                this.regionOptions = [{
                        text: 'Первый регион',
                        value: '1'
                    },
                    {
                        text: 'Второй регион',
                        value: '2'
                    },
                    {
                        text: 'Третий регион',
                        value: '3'
                    }
                ];
                this.insuranceOptions = [
                    {
                        text: 'Разовая',
                        value: 1
                    },
                    {
                        text: 'Многократная на год',
                        value: 2
                    }
                ];
                this.durationOptions = [
                    {
                        text: 'Не более 30 дней',
                        value: 30
                    },
                    {
                        text: 'Не более 90 дней',
                        value: 90
                    }
                ];
                this.currencyAndSumOptions = [
                    {
                        text: 'Евро',
                        value: 'EUR'
                    },
                    {
                        text: 'Доллар',
                        value: 'USD'
                    }
                ];
                this.insuredOptions = [
                    {
                        text: '1',
                        value: '1'
                    },
                    {
                        text: '2',
                        value: '2'
                    },
                    {
                        text: '3',
                        value: '3'
                    },
                    {
                        text: '4',
                        value: '4'
                    },
                    {
                        text: '5',
                        value: '5'
                    }
                ];
                this.countryOptions = [{
                        text: 'Первый регион',
                        value: '1'
                    },
                    {
                        text: 'Второй регион',
                        value: '2'
                    },
                    {
                        text: 'Третий регион',
                        value: '3'
                    }
                ];
                this.insuredCountModel = null;
                this.insuredsCount = null;
                this.birthdaysValid = false;
                this.addInsuredrsCount = function () {
                    this.insuredsCount++;
                    this.insuredsCountChange();
                };
                this.insuredsCountChange = function () {
                    this.insuredsCount = this.insuredCountModel.value;
                    if (this.insuredsCount > 5) {
                        this.insuredsCount = 0;
                    }
                    console.log(this.travelingInsuranceForm.insureds);
                    if (this.isNumeric(this.insuredsCount)) {
                        if (this.insuredsCount > this.travelingInsuranceForm.insureds.length) {
                            while (this.insuredsCount > this.travelingInsuranceForm.insureds.push(new traveling.Insured())) { }
                        }
                        if (this.insuredsCount < this.travelingInsuranceForm.insureds.length) {
                            this.travelingInsuranceForm.insureds.splice(this.insuredsCount, this.travelingInsuranceForm.insureds.length - this.insuredsCount);
                        }
                    }
                    this.updataBirths();
                };
                this.countryCountModel = null;
                this.countriesCount = null;
                this.addCountriesCount = function () {
                    this.countriesCount++;
                    this.countriesCountChange();
                };
                this.isNumeric = function (n) {
                    return !isNaN(parseFloat(n)) && isFinite(n);
                };
                this.$rootScope.showFooter = true;
                this.$rootScope.showBlindStopper = false;
                this.dataOnInsured = !$rootScope.isMobile;
                this.dataTravel = !$rootScope.isMobile;
                this.protectionAdditionalRisks = !$rootScope.isMobile;
                this.travelingInsuranceForm = new traveling.TRAVELINGForm();
                this.showPeriodStart = false;
                this.showPeriodFinish = false;
                this.countriesCount = 1;
                this.countriesCountChange();
                this.insuredCountModel = { text: '1', value: '1' };
                this.insuredsCountChange();
                //   this.getRegions();
                $scope.vm = this;
                console.log(close);
                this.minStartData = new Date();
                this.minStartData.setDate(this.minStartData.getDate() + 2);
                this.minEndData = new Date(this.minStartData.getFullYear(), this.minStartData.getMonth(), this.minStartData.getDate() + 7);
                this.BirthDate = new Date(1926, this.minStartData.getMonth(), this.minStartData.getDate());
                this.$http.get('api/handbook/country')
                    .success(function (response) {
                    _this.countryOptions = response;
                });
            }
            TRAVELINGController.prototype.countryFunc = function (index) {
                $("#travelingCtrl_travelingInsuranceForm_city" + index + "_dropdown").hide();
                setTimeout(function () { $("#travelingCtrl_travelingInsuranceForm_city" + index + "_dropdown").show(); }, 10);
            };
            TRAVELINGController.prototype.updataBirths = function () {
                this.birthdaysValid = false;
                if (this.isNumeric(this.insuredsCount)) {
                    for (var i = 0; i < this.travelingInsuranceForm.insureds.length; ++i) {
                        console.log(this.travelingInsuranceForm.insureds[i].db);
                        if (this.travelingInsuranceForm.insureds[i].db == null) {
                            this.birthdaysValid = true;
                            break;
                        }
                    }
                }
                ;
            };
            TRAVELINGController.prototype.countriesCountChange = function () {
                if (this.isNumeric(this.countriesCount)) {
                    var currentCount = this.travelingInsuranceForm.countries.length;
                    if (this.countriesCount > currentCount) {
                        while (this.countriesCount > currentCount) {
                            var country = new traveling.TravelingCountry();
                            var self = this;
                            country.countryFunc = function (count, _self) {
                                return function (data) {
                                    if (_self.$rootScope.isMobile) {
                                        setTimeout(function () { _self.countryFunc(count); }, 50);
                                    }
                                    return data;
                                };
                            }(currentCount, self);
                            this.travelingInsuranceForm.countries.push(country);
                            currentCount = this.travelingInsuranceForm.countries.length;
                        }
                    }
                    if (this.countriesCount < currentCount) {
                        this.travelingInsuranceForm.countries.splice(this.countriesCount, currentCount - this.countriesCount);
                    }
                }
            };
            ;
            ;
            TRAVELINGController.prototype.updateEndDate = function () {
                this.minEndData = new Date(this.travelingInsuranceForm.periodStart.toString());
                this.minEndData.setDate(this.minEndData.getDate() + 6);
                console.log(this.minEndData);
            };
            TRAVELINGController.prototype.getRegions = function () {
                var _this = this;
                var s = 'api/handbook/country/';
                this.$http.get(s)
                    .success(function (response) {
                    _this.regions = response;
                });
            };
            ;
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
            TRAVELINGController.prototype.requestOffer = function () {
                var _this = this;
                if (this.submitValue === 'Получить предложение') {
                    if (!this.travelingInsuranceForm.isAgreed) {
                        return;
                    }
                    this.firstbd = false;
                    for (var j = 0; j < this.travelingInsuranceForm.insureds.length; ++j) {
                        if (this.travelingInsuranceForm.insureds[j].bd == null) {
                            this.firstbd = true;
                            return;
                        }
                    }
                    if (this.travelingInsuranceForm.choiceInsurance.value == null ||
                        this.travelingInsuranceForm.currencyAndSum.value == null) {
                        return;
                    }
                    if (this.travelingInsuranceForm.choiceInsurance.value === 2 && this.travelingInsuranceForm.duration.value == null) {
                        return;
                    }
                    this.firstbd = true;
                    var formClone = new traveling.TRAVELINGForm();
                    formClone.chronic = this.travelingInsuranceForm.chronic;
                    formClone.currencyAndSum = this.travelingInsuranceForm.currencyAndSum.value;
                    formClone.leisureOrSports = this.travelingInsuranceForm.leisureOrSports;
                    formClone.periodFinish = this.travelingInsuranceForm.periodFinish;
                    formClone.periodStart = this.travelingInsuranceForm.periodStart;
                    formClone.pregnant = this.travelingInsuranceForm.pregnant;
                    formClone.choiceInsurance = this.travelingInsuranceForm.choiceInsurance.value;
                    formClone.duration = (this.travelingInsuranceForm.duration.value != null) ? this.travelingInsuranceForm.duration.value : '0';
                    for (var i = 0; i < this.travelingInsuranceForm.countries.length; ++i) {
                        formClone.countries.push(this.travelingInsuranceForm.countries[i].value.originalObject);
                    }
                    for (var j = 0; j < this.travelingInsuranceForm.insureds.length; ++j) {
                        formClone.insureds.push(this.travelingInsuranceForm.insureds[j].bd);
                    }
                    this.firstbd = true;
                    console.log(formClone);
                    this.submitValue = 'Поиск предложений ...';
                    this.ModalService.showModal({
                        templateUrl: 'app/loading/loading.html',
                        controller: 'LoadingModalController',
                        controllerAs: 'loadingModalCtrl',
                        inputs: {}
                    });
                    window.scrollTo(0, 0);
                    this.TRAVELINGService.loadOffers(formClone).success(function () {
                        _this.$scope.dismissModal('logedin');
                        //  console.log(this.$scope.dismissModal);
                        _this.$state.go('traveling.offer');
                    });
                }
            };
            return TRAVELINGController;
        })();
        traveling.TRAVELINGController = TRAVELINGController;
        angular.module('nepereplaty').controller('nepereplaty.traveling.TRAVELINGController', TRAVELINGController);
    })(traveling = nepereplaty.traveling || (nepereplaty.traveling = {}));
})(nepereplaty || (nepereplaty = {}));
