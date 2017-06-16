/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var accident;
    (function (accident) {
        var ACCIDENTController = (function () {
            function ACCIDENTController($http, $state, $q, ACCIDENTService, $scope, ModalService, $timeout, $rootScope) {
                var _this = this;
                this.$http = $http;
                this.$state = $state;
                this.$q = $q;
                this.ACCIDENTService = ACCIDENTService;
                this.$scope = $scope;
                this.ModalService = ModalService;
                this.$timeout = $timeout;
                this.$rootScope = $rootScope;
                this.submitValue = 'Получить предложение';
                this.insuranceStartMinData = new Date();
                this.insuranceOptions = [
                    {
                        text: '1 месяц',
                        value: '1'
                    },
                    {
                        text: '3 месяца',
                        value: '3'
                    },
                    {
                        text: '6 месяцев',
                        value: '6'
                    },
                    {
                        text: '12 месяцев',
                        value: '12'
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
                this.yearBigValue = function () {
                    var nowYear = new Date().getUTCFullYear();
                    if (this.accidentInsuranceForm.year > nowYear) {
                        this.accidentInsuranceForm.year = null;
                        this.accidentInsuranceForm.releaseYearIsLarge = true;
                    }
                    else {
                        this.accidentInsuranceForm.releaseYearIsLarge = false;
                    }
                };
                this.insuranceStartMinData.setDate(this.insuranceStartMinData.getDate() - 1);
                this.accidentInsuranceForm = new accident.ACCIDENTForm();
                this.showPeriodStart = false;
                this.showPeriodFinish = false;
                this.$rootScope.showFooter = true;
                this.$rootScope.showBlindStopper = false;
                this.dataOnInsured = !$rootScope.isMobile;
                this.additionalInformation = !$rootScope.isMobile;
                this.$http.get('api/handbook/region')
                    .success(function (response) {
                    _this.regionOptions = response;
                    _this.$http.get('api/handbook/country')
                        .success(function (response) {
                        _this.countryOptions = response;
                    });
                });
            }
            ;
            ACCIDENTController.prototype.requestOffer = function () {
                var _this = this;
                if (this.submitValue === 'Получить предложение') {
                    console.log(this.accidentInsuranceForm);
                    if (this.accidentInsuranceForm.age == null ||
                        this.accidentInsuranceForm.amateurSports == null ||
                        this.accidentInsuranceForm.duration.value == null ||
                        this.accidentInsuranceForm.otherPerson == null || !this.isAgreed) {
                        return;
                    }
                    var formClone = new accident.ACCIDENTForm();
                    formClone.age = this.accidentInsuranceForm.age;
                    formClone.amateurSports = this.accidentInsuranceForm.amateurSports;
                    formClone.otherPerson = this.accidentInsuranceForm.otherPerson;
                    formClone.startData = this.accidentInsuranceForm.startData;
                    formClone.duration = this.accidentInsuranceForm.duration.value;
                    console.log(formClone);
                    this.submitValue = 'Поиск предложений ...';
                    this.ModalService.showModal({
                        templateUrl: 'app/loading/loading.html',
                        controller: 'LoadingModalController',
                        controllerAs: 'loadingModalCtrl',
                        inputs: {}
                    });
                    window.scrollTo(0, 0);
                    this.ACCIDENTService.loadOffers(formClone).success(function () {
                        _this.$scope.dismissModal('logedin');
                        //  console.log(this.$scope.dismissModal);
                        _this.$state.go('accident.offer');
                    });
                }
            };
            return ACCIDENTController;
        })();
        accident.ACCIDENTController = ACCIDENTController;
        angular.module('nepereplaty').controller('nepereplaty.accident.ACCIDENTController', ACCIDENTController);
    })(accident = nepereplaty.accident || (nepereplaty.accident = {}));
})(nepereplaty || (nepereplaty = {}));
