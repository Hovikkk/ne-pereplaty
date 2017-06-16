/// <reference path="../app.ts" />

module nepereplaty.apartment {

    export interface IFormScope extends angular.IScope {
        form?: any;
    }

    export class APARTMENTController {
        insuranceStartMinData: Date = new Date();
        apartmentForm: APARTMENTForm;
        showPeriodStart: boolean;
        dataOnTheProperty: boolean;
        submitValue: string = 'Получить предложение';
        regions = [{
            text : 'Москва и МО, Санкт-Петербург и ЛО',
            value : 0
        }, {
                text: 'Другой регион',
                value: 1
            }];
        country:any;
        countryOptions = [{
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
        constructor(
            private $http: angular.IHttpService,
            private $state: angular.ui.IStateService,
            private $q: angular.IQService,
            private APARTMENTService: IAPARTMENTService,
            private $scope: IFormScope,
            private ModalService: any,
            private $timeout: angular.ITimeoutService,
            private $rootScope: any) {
            this.insuranceStartMinData.setDate(this.insuranceStartMinData.getDate() - 1);
            this.$rootScope.showFooter = true;
            this.$rootScope.showBlindStopper = false;
            this.apartmentForm = new APARTMENTForm();
            this.showPeriodStart = false;
            this.dataOnTheProperty = !$rootScope.isMobile;
            this.$http.get('api/handbook/country')
                .success((response: any) => {
                    this.countryOptions = response;

                });
        };
        
        requestOffer(): void {
            if (this.submitValue === 'Получить предложение') {

                if (this.apartmentForm.area == null ||
                    this.apartmentForm.property == null ||
                    this.apartmentForm.region.value == null ||
                    this.apartmentForm.rent == null ||
                    this.apartmentForm.startData == null ||
                    this.apartmentForm.sum == null
                ) {
                    return;
                }


                var form: APARTMENTForm = new APARTMENTForm();



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
                    inputs: {

                    }
                });
                window.scrollTo(0, 0);
                this.APARTMENTService.loadOffers(form).success(() => {
                    this.$rootScope.dismissModal('loading');
                    this.$state.go('apartment.offer');
                });
            }
        } 

    }

    angular.module('nepereplaty').controller('nepereplaty.apartment.APARTMENTController', APARTMENTController);
}