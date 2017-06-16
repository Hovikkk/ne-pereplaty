/// <reference path="../app.ts" />
module nepereplaty.accident {
    export interface IFormScope extends angular.IScope {
        form?: any;
        dismissModal: any;
        vm: any;
    }


    export class ACCIDENTController {
        accidentInsuranceForm: ACCIDENTForm;
        showPeriodStart: boolean;
        showPeriodFinish: boolean;
        submitValue: string = 'Получить предложение';
        releaseYearIsLarge: boolean;
        regions: any;
        isAgreed: boolean;
        dataOnInsured: boolean;
        additionalInformation: boolean;
        insuranceStartMinData: Date = new Date();
        insuranceOptions = [
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
        country: any;
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
        regionOptions = [{
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
            private ACCIDENTService: IACCIDENTService,
            private $scope: IFormScope,
            private ModalService: any,
            private $timeout: angular.ITimeoutService,
            private $rootScope: any) {
            this.insuranceStartMinData.setDate(this.insuranceStartMinData.getDate() - 1);
            this.accidentInsuranceForm = new ACCIDENTForm();
            this.showPeriodStart = false;
            this.showPeriodFinish = false;
            this.$rootScope.showFooter = true;
            this.$rootScope.showBlindStopper = false;
            this.dataOnInsured = !$rootScope.isMobile;
            this.additionalInformation = !$rootScope.isMobile;
            this.$http.get('api/handbook/region')
                .success((response: any) => {
                    this.regionOptions = response;
                    this.$http.get('api/handbook/country')
                        .success((response: any) => {
                            this.countryOptions = response;

                        });
                });
        };
        
        yearBigValue = function () {
            var nowYear = new Date().getUTCFullYear();
            if (this.accidentInsuranceForm.year > nowYear) {
                this.accidentInsuranceForm.year = null;
                this.accidentInsuranceForm.releaseYearIsLarge = true;
            } else {
                this.accidentInsuranceForm.releaseYearIsLarge = false;
            }
        };

        requestOffer(): void {
            if (this.submitValue === 'Получить предложение') {
                console.log(this.accidentInsuranceForm);
                if (this.accidentInsuranceForm.age == null ||
                    this.accidentInsuranceForm.amateurSports == null ||
                    this.accidentInsuranceForm.duration.value == null ||
                    this.accidentInsuranceForm.otherPerson == null || !this.isAgreed) {
                    return;
                }

                var formClone = new ACCIDENTForm();

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
                    inputs: {

                    }
                });
                window.scrollTo(0, 0);
                this.ACCIDENTService.loadOffers(formClone).success(() => {
                     this.$scope.dismissModal('logedin');
                    //  console.log(this.$scope.dismissModal);
                    this.$state.go('accident.offer');
                });
            }

        }
    }
    angular.module('nepereplaty').controller('nepereplaty.accident.ACCIDENTController', ACCIDENTController);
}