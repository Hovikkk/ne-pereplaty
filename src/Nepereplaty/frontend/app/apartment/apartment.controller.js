/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var apartment;
    (function (apartment) {
        var APARTMENTController = (function () {
            function APARTMENTController($http, $state, $q, APARTMENTService, $scope, ModalService, $timeout, $rootScope) {
                var _this = this;
                this.$http = $http;
                this.$state = $state;
                this.$q = $q;
                this.APARTMENTService = APARTMENTService;
                this.$scope = $scope;
                this.ModalService = ModalService;
                this.$timeout = $timeout;
                this.$rootScope = $rootScope;
                this.insuranceStartMinData = new Date();
                this.submitValue = 'Получить предложение';
                this.regions = [{
                        text: 'Москва и МО, Санкт-Петербург и ЛО',
                        value: 0
                    }, {
                        text: 'Другой регион',
                        value: 1
                    }];
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
                this.insuranceStartMinData.setDate(this.insuranceStartMinData.getDate() - 1);
                this.$rootScope.showFooter = true;
                this.$rootScope.showBlindStopper = false;
                this.apartmentForm = new apartment.APARTMENTForm();
                this.showPeriodStart = false;
                this.dataOnTheProperty = !$rootScope.isMobile;
                this.$http.get('api/handbook/country')
                    .success(function (response) {
                    _this.countryOptions = response;
                });
            }
            ;
            APARTMENTController.prototype.requestOffer = function () {
                var _this = this;
                if (this.submitValue === 'Получить предложение') {
                    if (this.apartmentForm.area == null ||
                        this.apartmentForm.property == null ||
                        this.apartmentForm.region.value == null ||
                        this.apartmentForm.rent == null ||
                        this.apartmentForm.startData == null ||
                        this.apartmentForm.sum == null) {
                        return;
                    }
                    var form = new apartment.APARTMENTForm();
                    form.area = this.apartmentForm.area;
                    form.property = this.apartmentForm.property;
                    form.region = this.apartmentForm.region.value;
                    form.rent = this.apartmentForm.rent;
                    form.startData = this.apartmentForm.startData;
                    form.sum = this.apartmentForm.sum;
                    console.log(form);
                    this.submitValue = 'Поиск предложений ...';
                    this.ModalService.showModal({
                        templateUrl: 'app/loading/loading.html',
                        controller: 'LoadingModalController',
                        controllerAs: 'loadingModalCtrl',
                        inputs: {}
                    });
                    window.scrollTo(0, 0);
                    this.APARTMENTService.loadOffers(form).success(function () {
                        _this.$rootScope.dismissModal('loading');
                        _this.$state.go('apartment.offer');
                    });
                }
            };
            return APARTMENTController;
        })();
        apartment.APARTMENTController = APARTMENTController;
        angular.module('nepereplaty').controller('nepereplaty.apartment.APARTMENTController', APARTMENTController);
    })(apartment = nepereplaty.apartment || (nepereplaty.apartment = {}));
})(nepereplaty || (nepereplaty = {}));
