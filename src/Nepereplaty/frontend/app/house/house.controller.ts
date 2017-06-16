/// <reference path="../app.ts" />

module nepereplaty.house {

    export interface IFormScope extends angular.IScope {
        form?: any;
        dismissModal: any;
        vm: any;
    }
    export class HOUSEController {
        insuranceStartMinData: Date = new Date();
        houseInsuranceForm: HOUSEForm;
        showPeriodStart: boolean;
        submitValue: string = 'Получить предложение';
        releaseYearIsLarge: boolean;
        regions: any;
        dataOnTheProperty: boolean;
        wallsOptions = [
            {
                text: 'Дерево',
                value: '1'
            },
            {
                text: 'Камень',
                value: '0'
            }
        ];
        AdditionalBuildingsOptions = [
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

        estateCountModel = null;
        estatesCount = null;

        addEstatesCount = function () {
            this.estatesCount++;
           // this.houseInsuranceForm.releaseYear = '';
            this.estatesCountChange();
            
        };

        estatesCountChange = function () {
            if (this.isNumeric(this.estatesCount)) {
                if (this.estatesCount > this.houseInsuranceForm.AdditionalStructure.length) {
                    while (this.estatesCount > this.houseInsuranceForm.AdditionalStructure.push(new AdditionalStructure())) {
                        //ddd
                    }
                }
                if (this.estatesCount < this.houseInsuranceForm.AdditionalStructure.length) {
                    this.houseInsuranceForm.AdditionalStructure.splice(this.estatesCount,
                        this.houseInsuranceForm.AdditionalStructure.length - this.estatesCount);
                }
            }
        };
        isNumeric = function (n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        };
       
        constructor(
            //private close: any,
            private $http: angular.IHttpService,
            private $state: angular.ui.IStateService,
            private $q: angular.IQService,
            private HOUSEService: IHOUSEService,
            private $scope: IFormScope,
            private ModalService: any,
            private $timeout: angular.ITimeoutService,
            private $rootScope: any) {

            this.dataOnTheProperty = !$rootScope.isMobile;
            this.houseInsuranceForm = new HOUSEForm();
            this.$rootScope.showFooter = true;
            this.$rootScope.showBlindStopper = false;
            this.showPeriodStart = false;
            this.estatesCount = 0;
            this.estatesCountChange();
            this.getRegions();
            this.insuranceStartMinData.setDate(this.insuranceStartMinData.getDate() - 1);
            
        };
        getRegions(): void {
            var s: string = 'api/handbook/region/';
           this.$http.get(s)
               .success((response: any) => {
                   console.log(this.regions);
                   this.regions = response;
                   console.log(this.regions);
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
        yearBigValue = function () {
            var nowYear = new Date().getUTCFullYear();
            if (this.houseInsuranceForm.year > nowYear) {
                this.houseInsuranceForm.year = nowYear;
              //  this.houseInsuranceForm.releaseYearIsLarge = true;
            } else {
              //  this.houseInsuranceForm.releaseYearIsLarge = false;
            }
        };
        iscostIsLarg() {
            for (var i = 0; i < this.houseInsuranceForm.AdditionalStructure.length; i++) {
                if (this.houseInsuranceForm.AdditionalStructure[i].cost > 200000) {
                    this.houseInsuranceForm.AdditionalStructure[i].cost = null;
                } 
            }
        }
        requestOffer(): void {
            if (this.submitValue === 'Получить предложение') {
                console.log(this.houseInsuranceForm.year < 1965,
                    this.houseInsuranceForm.year > 2015,
                    !this.houseInsuranceForm.region,
                    this.houseInsuranceForm.cover.value == null);
                if (this.houseInsuranceForm.year < 1965 ||
                    this.houseInsuranceForm.year > 2015 ||
                    !this.houseInsuranceForm.region ||
                    this.houseInsuranceForm.cover.value == null) {
                    return;
                }
                console.log('________');
                var formClone = new HOUSEForm();
                formClone.year = this.houseInsuranceForm.year;
                formClone.rent = this.houseInsuranceForm.rent;
                formClone.region = this.houseInsuranceForm.region.originalObject.value;
                formClone.cover = this.houseInsuranceForm.cover.value;
                formClone.startData = this.houseInsuranceForm.periodStart;
                for (var i: number = 0; i < this.houseInsuranceForm.AdditionalStructure.length; ++i) {
                    
                    if (this.houseInsuranceForm.AdditionalStructure[i].type.value == null ||
                        !this.houseInsuranceForm.AdditionalStructure[i].cost ||
                        this.houseInsuranceForm.AdditionalStructure[i].cost > 200000) {
                        return;
                    }
                    if (i > 0) {
                        formClone.AdditionalStructures += ', ';
                    }
                    formClone.AdditionalStructures += this.houseInsuranceForm.AdditionalStructure[i].type.text;

                    formClone.AdditionalStructure.push(
                        new AdditionalStructure(this.houseInsuranceForm.AdditionalStructure[i].type.value,
                            this.houseInsuranceForm.AdditionalStructure[i].cost));
                }
                this.submitValue = 'Поиск предложений ...';
                this.ModalService.showModal({
                    templateUrl: 'app/loading/loading.html',
                    controller: 'LoadingModalController',
                    controllerAs: 'loadingModalCtrl',
                    inputs: {
                        
                    }
                });
                window.scrollTo(0, 0);
                this.HOUSEService.loadOffers(formClone).success(() => {
                    this.$rootScope.dismissModal('loading');
                    this.$state.go('house.offer');
                });
            }
            
        }

    }

    angular.module('nepereplaty').controller('nepereplaty.house.HOUSEController', HOUSEController);
}