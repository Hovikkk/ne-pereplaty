/// <reference path="../app.ts" />
module nepereplaty.traveling {
    export interface IFormScope extends angular.IScope {
        form?: any;
        dismissModal: any;
        vm: any;
    }

    
    export class TRAVELINGController {
        travelingInsuranceForm: TRAVELINGForm;
        showPeriodStart: boolean;
        showPeriodFinish: boolean;
        submitValue: string = 'Получить предложение';
        releaseYearIsLarge: boolean;
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
        countryMain: any;
        minStartData: Date;
        BirthDate: Date;
        minEndData: Date;
        dataOnInsured: boolean;
        dataTravel: boolean;
        firstbd: boolean;
        protectionAdditionalRisks: boolean;
        insuranceOptions = [
            {
                text: 'Разовая',
                value: 1
            },
            {
                text: 'Многократная на год',
                value: 2
            }
        ];
        durationOptions = [
            {
                text: 'Не более 30 дней',
                value: 30
            },
            {
                text: 'Не более 90 дней',
                value: 90
            }
        ];
        currencyAndSumOptions = [
            {
                text: 'Евро',
                value: 'EUR'
            },
            {
                text: 'Доллар',
                value: 'USD'
            }
        ];

        insuredOptions =
        [
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
        insuredCountModel = null;
        insuredsCount = null;
        birthdaysValid = false;
        addInsuredrsCount = function () {
            this.insuredsCount++;
            this.insuredsCountChange();
        };

        countryFunc(index: number) {
            $("#travelingCtrl_travelingInsuranceForm_city" + index + "_dropdown").hide();
            setTimeout(function () { $("#travelingCtrl_travelingInsuranceForm_city" + index + "_dropdown").show(); }, 10);
        }

        insuredsCountChange = function () {
            this.insuredsCount = this.insuredCountModel.value;
            if (this.insuredsCount > 5) {
                this.insuredsCount = 0;
            }
            console.log(this.travelingInsuranceForm.insureds);
            if (this.isNumeric(this.insuredsCount)) {
                
                if (this.insuredsCount > this.travelingInsuranceForm.insureds.length) {
                    while (this.insuredsCount > this.travelingInsuranceForm.insureds.push(new Insured())) { /*here is nothing to do*/ }
                }
                if (this.insuredsCount < this.travelingInsuranceForm.insureds.length) {
                    this.travelingInsuranceForm.insureds.splice(this.insuredsCount,
                        this.travelingInsuranceForm.insureds.length - this.insuredsCount);
                }
            }
            this.updataBirths();
        };

        countryCountModel = null;
        countriesCount = null;

        addCountriesCount = function () {
            this.countriesCount++;
            this.countriesCountChange();

        };
        updataBirths() {
            
            this.birthdaysValid = false;
            
            if (this.isNumeric(this.insuredsCount)) {
                for (var i = 0; i < this.travelingInsuranceForm.insureds.length; ++i ) {
                    console.log(this.travelingInsuranceForm.insureds[i].db);
                    if (this.travelingInsuranceForm.insureds[i].db == null) {
                        this.birthdaysValid = true;
                        break;
                    }
                }
                
            };
        }
        countriesCountChange() {  
            if (this.isNumeric(this.countriesCount)) {
                var currentCount = this.travelingInsuranceForm.countries.length
                if (this.countriesCount > currentCount) {
                    while (this.countriesCount > currentCount) {
                        var country = new TravelingCountry();
                        var self = this;
                        country.countryFunc = function (count: number, _self: TRAVELINGController) {
                            return function (data) {
                                if (_self.$rootScope.isMobile) {
                                    setTimeout(function () { _self.countryFunc(count); }, 50);
                                }
                                return data;
                            }
                        } (currentCount, self);
                        this.travelingInsuranceForm.countries.push(country);
                        currentCount = this.travelingInsuranceForm.countries.length;
                    }
                }
                if (this.countriesCount < currentCount) {
                    this.travelingInsuranceForm.countries.splice(this.countriesCount,
                        currentCount - this.countriesCount);
                }
            }
        };
        isNumeric = function (n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        };
        regions: any;
        reg: any;
        constructor(
            private $http: angular.IHttpService,
            private $state: angular.ui.IStateService,
            private $q: angular.IQService,
            private TRAVELINGService: ITRAVELINGService,
            private $scope: IFormScope,
            private ModalService: any,
            private $timeout: angular.ITimeoutService,
            private $rootScope: any) {

            this.$rootScope.showFooter = true;
            this.$rootScope.showBlindStopper = false;
            this.dataOnInsured = !$rootScope.isMobile;
            this.dataTravel = !$rootScope.isMobile;
            this.protectionAdditionalRisks = !$rootScope.isMobile;
            this.travelingInsuranceForm = new TRAVELINGForm();
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
                .success((response: any) => {
                    this.countryOptions = response;

                });
        };
       
        updateEndDate(): void {


            this.minEndData = new Date(this.travelingInsuranceForm.periodStart.toString());
            this.minEndData.setDate(this.minEndData.getDate() + 6);
            console.log(this.minEndData);
        }
        getRegions(): void {
            var s: string = 'api/handbook/country/';
            this.$http.get(s)
                .success((response: any) => {
                    this.regions = response;
                });

            
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
 
        requestOffer(): void {
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
                var formClone = new TRAVELINGForm();
               
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
                    inputs: {

                    }
                });
                window.scrollTo(0, 0);
                this.TRAVELINGService.loadOffers(formClone).success(() => {
                    this.$scope.dismissModal('logedin');
                    //  console.log(this.$scope.dismissModal);
                    this.$state.go('traveling.offer');
                });
            }

        }
    }
    angular.module('nepereplaty').controller('nepereplaty.traveling.TRAVELINGController', TRAVELINGController);
}