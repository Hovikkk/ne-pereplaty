/// <reference path="../app.ts" />

module nepereplaty.osago {

    export interface IFormScope extends angular.IScope {
        form?: any;
    }

    export class OSAGOController {
        insuranceStartMinData: Date = new Date();
        osagoInsuranceForm: OsagoInsuranceForm;
        showPeriodStart: boolean;
        showStartUsingDate: boolean;
        showBuyingDate: boolean;
        submitValue: string = 'Получить предложение';
        openAboutCar: boolean;
        openDataDrivers: boolean;
        openDriver: boolean;
        /*modificationOption = [
            {
                text: 'text 1',
                value: '1'
            },
            {
                text: 'text 2',
                value: '2'
            },
            {
                text: 'text 3',
                value: '3'
            },
            {
                text: 'text 4',
                value: '4'
            }

        ];*/
        transmissionOption: any;
        modificationOption: any;
        carBodyOptions: any;
        /*carBodyOptions = [
            {
                text: 'Седан',
                value: 'sedan'
            },
            {
                text: 'Хетчбэк',
                value: 'hatchback'
            },
            {
                text: 'Универсал',
                value: 'universal'
            },
            {
                text: 'Внедорожник',
                value: 'offroad'
            },
            {
                text: 'Минивэн',
                value: 'van'
            },
            {
                text: 'Купе',
                value: 'cupe'
            },
            {
                text: 'Пикап',
                value: 'pickup'
            },
            {
                text: 'Кабриолет',
                value: 'cabriolet'
            }
        ];*/
        powerOptions = [{
                text: 'До 50',
                value: '45'
            },
            {
                text: 'От 50 до 70',
                value: '55'
            },
            {
                text: 'От 70 до 100',
                value: '75'
            },
            {
                text: 'От 100 до 120',
                value: '110'
            },
            {
                text: 'От 120 до 150',
                value: '125'
            },
            {
                text: 'Свыше 150',
                value: '155'
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
        franchiseOptions = [{
                text: 'Первая франшиза',
                value: '1'
            },
            {
                text: 'Вторая франшиза',
                value: '2'
            },
            {
                text: 'Третья франшиза',
                value: '3'
            }
        ];
        isIndividualOptions = [
            {
                text: 'Физическое лицо',
                value: true
            },
            {
                text: 'Юридическое лицо',
                value: false
            }
        ];
        isOwnerOptions = [
            {
                text: 'Собственник',
                value: true
            },
            {
                text: 'По доверенности',
                value: false
            }
        ];
        wasInsuranceOptions = [{
                text: 'Нет',
                value: '1'
            },
            {
                text: 'Да, одна',
                value: '2'
            },
            {
                text: 'Больше',
                value: '3'
            }
        ];
        wasClaimsOptions = [{
                text: 'Нет',
                value: '1'
            },
            {
                text: 'Да, один',
                value: '2'
            },
            {
                text: 'Больше',
                value: '3'
            }
        ];
        rudderOptions = [{
                text: 'Левосторонний',
                value: true
            },
            {
                text: 'Правосторонний',
                value: false
            }
        ];
        antiTheftSystemOptions = [{
                text: 'Нет',
                value: false
            },
            {
                text: 'Сигнализация',
                value: false
            },
            {
                text: 'Другое',
                value: true
            }
        ];
        searchSystemOptions =
        [
            {
                text: 'Нет',
                value: false
            },
            {
                text: 'GPS',
                value: false
            },
            {
                text: 'Другое',
                value: true
            }
        ];
        commissionerOptions =
        [
            {
                text: 'Нет',
                value: '1'
            },
            {
                text: 'Да',
                value: '2'
            },
            {
                text: 'Другой вариант',
                value: '3'
            }
        ];
        evacuationOptions =
        [
            {
                text: 'Нет',
                value: '1'
            },
            {
                text: 'Да',
                value: '2'
            },
            {
                text: 'Другой вариант',
                value: '3'
            }
        ];
        techSupportOptions =
        [
            {
                text: 'Нет',
                value: '1'
            },
            {
                text: 'Да',
                value: '2'
            },
            {
                text: 'Другой вариант',
                value: '3'
            }
        ];
        policeReferenceOptions =
        [
            {
                text: 'Нет',
                value: '1'
            },
            {
                text: 'Да',
                value: '2'
            },
            {
                text: 'Другой вариант',
                value: '3'
            }
        ];
        ageOptions =
        [
            {
                text: 'От 18 до 21',
                value: '1'
            },
            {
                text: 'От 21 до 30',
                value: '2'
            },
            {
                text: 'От 30 до 45',
                value: '3'
            },
            {
                text: 'Больше 45',
                value: '4'
            }
        ];
        experienceOptions =
        [
            {
                text: 'До года',
                value: '1'
            },
            {
                text: 'От 1 года до 3',
                value: '2'
            },
            {
                text: 'От 3 лет до 5',
                value: '3'
            },
            {
                text: 'Больше 5 лет',
                value: '4'
            }
        ];
        martialStatusOptions =
        [
            {
                text: 'Не женат/не замужем',
                value: '1'
            },
            {
                text: 'Женат/замужем',
                value: '2'
            },
            {
                text: 'Разведён/разведена',
                value: '3'
            }
        ];

        driverOptions =
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
            },
            {
                text: 'Неограниченно',
                value: '6'
            }
        ];
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
        country;
        kidsOptions =
        [
            {
                text: 'Нет',
                value: '0'
            },
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
                text: 'Больше 3-ех',
                value: '4'
            }
        ];
        driverCountModel = null;
        driversCount = null;

        addDriversCount = function () {
            this.driversCount++;
            this.driversCountChange();
        };
        
        driversCountChange = function () {
            this.driversCount = this.driverCountModel.value;
            if (this.driversCount > 5) {
                this.driversCount = 0;
            }
            if (this.isNumeric(this.driversCount)) {
                if (this.driversCount > this.osagoInsuranceForm.drivers.length) {
                    while (this.driversCount > this.osagoInsuranceForm.drivers.push(new Driver())) { /*here is nothing to do*/ }
                }
                if (this.driversCount < this.osagoInsuranceForm.drivers.length) {
                    this.osagoInsuranceForm.drivers.splice(this.driversCount, this.osagoInsuranceForm.drivers.length - this.driversCount);
                }
            }
        };
        isNumeric = function (n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        };
        antiTheftSystemAnotherFocused: boolean;
        searchSystemAnotherFocused: boolean;

        // @ngInject
        constructor(
            private $http: angular.IHttpService,
            private $state: angular.ui.IStateService,
            private $q: angular.IQService,
            private OSAGOService: IOSAGOService,
            private $scope: IFormScope,
            private ModalService: any,
            private $timeout: angular.ITimeoutService,
            private $rootScope: any) {
            this.insuranceStartMinData.setDate(this.insuranceStartMinData.getDate() - 1);
            this.openAboutCar = !$rootScope.isMobile;
            this.openDataDrivers = !$rootScope.isMobile;
            this.openDriver = !$rootScope.isMobile;
            this.$rootScope.showFooter = true;
            this.$rootScope.showBlindStopper = false;
            this.osagoInsuranceForm = new OsagoInsuranceForm();
            this.showPeriodStart = false;
            this.showBuyingDate = false;
            this.showStartUsingDate = false;
            this.antiTheftSystemAnotherFocused = false;
            this.searchSystemAnotherFocused = false;
            this.driverCountModel = {text:'1', value:'1'};
            this.driversCountChange();


            this.$http.get('api/handbook/region')
                .success((response: any) => {
                    this.regionOptions = response;
                    this.$http.get('api/handbook/country')
                        .success((response: any) => {
                            this.countryOptions = response;

                        });
                });

        }

        antiTheftSystemSelected(selected: any): void {
            if (selected.value) {
                this.antiTheftSystemAnotherFocused = true;
            }
        }

        searchSystemSelected(selected: any): void {
            if (selected.value) {
                this.searchSystemAnotherFocused = true;
            }
        }

        lastBody: any = null;
        getCarModificationOptions(): void {
            var s: string = 'api/handbook/carModifications/' + this.osagoInsuranceForm.year + '/';
            s += this.osagoInsuranceForm.brand.originalObject.title + '/' + this.osagoInsuranceForm.model.originalObject.title + '/';
            s += this.osagoInsuranceForm.carBody.value + '/';
            this.$http.get(s)
                .success((response: any) => {
                    this.modificationOption = response;
                });
        };

        getCarTransmissionOptions(): void {
            var s: string = 'api/handbook/carTransmission/' + this.osagoInsuranceForm.year + '/';
            s += this.osagoInsuranceForm.brand.originalObject.title + '/' + this.osagoInsuranceForm.model.originalObject.title + '/';
            s += this.osagoInsuranceForm.carBody.value + '/' + this.osagoInsuranceForm.modification.value + '/';
            this.$http.get(s)
                .success((response: any) => {
                    this.transmissionOption = response;
                });
        };

        getCarDetailsOptions(): void {
            var s: string = 'api/handbook/carDetails/' + this.osagoInsuranceForm.year + '/';
            s += this.osagoInsuranceForm.brand.originalObject.title + '/' + this.osagoInsuranceForm.model.originalObject.title + '/';
            s += this.osagoInsuranceForm.carBody.value + '/' + this.osagoInsuranceForm.modification.value + '/';
            s += this.osagoInsuranceForm.transmission.value + '/';
            this.$http.get(s)
                .success((response: any) => {
                    this.osagoInsuranceForm.power = Number(response.EnginePower);
                    this.osagoInsuranceForm.carCost = Number(response.Price);
                });
        };

        getCarBodyOptions(): void {
            if (!this.osagoInsuranceForm.model) {
                return null;
            }
            if (!this.lastBody || this.lastBody !== this.osagoInsuranceForm.model.originalObject.value) {
                this.lastBody = this.osagoInsuranceForm.model.originalObject.value;
                var s: string = 'api/handbook/carBodies/' + this.osagoInsuranceForm.year + '/';
                s += this.osagoInsuranceForm.brand.originalObject.title + '/' + this.osagoInsuranceForm.model.originalObject.title + '/';
                this.$http.get(s)
                    .success((response: any) => {
                        console.log(this.carBodyOptions);
                        console.log(response);

                        this.carBodyOptions = response;
                    });
            }
        }

        yearBigValue = function () {
            var nowYear = new Date().getUTCFullYear();
            if (this.osagoInsuranceForm.year > nowYear) {
                this.osagoInsuranceForm.year = null;
                this.osagoInsuranceForm.releaseYearIsLarge = true;
            } else {
                this.osagoInsuranceForm.releaseYearIsLarge = false;
            }
        };

        requestOffer(): void {
            console.log(this.osagoInsuranceForm);
            if (this.submitValue === 'Получить предложение' ) {
//           if (this.submitValue === 'Получить предложение') {
                if (!this.$scope.form.$valid || !this.osagoInsuranceForm.isAgreed) {
                    return;
                }
                if (this.osagoInsuranceForm.carBody.value == null ||
                    this.osagoInsuranceForm.isIndividual.value == null ||
                    this.osagoInsuranceForm.isOwner.value == null ||
                    this.osagoInsuranceForm.brand == null) {
                    return;
                }

                var formClone = new OsagoInsuranceForm();
                console.log(this.osagoInsuranceForm);
                formClone.periodStart = this.osagoInsuranceForm.periodStart;
                formClone.year = this.osagoInsuranceForm.year;
                formClone.brand = this.osagoInsuranceForm.brand.originalObject.title;
                formClone.model = this.osagoInsuranceForm.model.originalObject.title;
                formClone.carBody = this.osagoInsuranceForm.carBody.value;
                formClone.region = this.osagoInsuranceForm.region.originalObject.value;
                formClone.modification = this.osagoInsuranceForm.modification.value;
                formClone.startUsingDate = this.osagoInsuranceForm.startUsingDate;
                formClone.carCost = this.osagoInsuranceForm.carCost;
                formClone.isIndividual = this.osagoInsuranceForm.isIndividual.value;
                formClone.isOwner = this.osagoInsuranceForm.isOwner.value;
                formClone.drivers = [];
                formClone.isAgreed = this.osagoInsuranceForm.isAgreed;
                formClone.power = this.osagoInsuranceForm.power;

                for (var i = 0; i < this.osagoInsuranceForm.drivers.length; i++) {
                    if (this.osagoInsuranceForm.drivers[i].martialStatus.value == null ||
                        this.osagoInsuranceForm.drivers[i].kids.value == null) {
                        return;
                    }
                    formClone.drivers[i] = new Driver();
                    //formClone.drivers[i].age = this.carInsuranceForm.drivers[i].age.value;
                    //formClone.drivers[i].experience = this.carInsuranceForm.drivers[i].experience.value;
                    formClone.drivers[i].age = this.osagoInsuranceForm.drivers[i].age;
                    formClone.drivers[i].experience = this.osagoInsuranceForm.drivers[i].experience;
                    formClone.drivers[i].martialStatus = this.osagoInsuranceForm.drivers[i].martialStatus.value;
                    formClone.drivers[i].kids = this.osagoInsuranceForm.drivers[i].kids.value;
                    formClone.drivers[i].isMale = this.osagoInsuranceForm.drivers[i].isMale;
                }
                this.OSAGOService.driver = formClone.drivers;
                this.submitValue = 'Поиск предложений ...';
                this.ModalService.showModal({
                    templateUrl: 'app/loading/loading.html',
                    controller: 'LoadingModalController',
                    controllerAs: 'loadingModalCtrl',
                    inputs: {

                    }
                });
                window.scrollTo(0, 0);
                this.OSAGOService.loadOffers(formClone).success(() => {
                    this.$rootScope.dismissModal('loading');
                    this.$state.go('osago.offer');
                });
            }
        }
    }

    angular.module('nepereplaty').controller('nepereplaty.osago.OSAGOController', OSAGOController);
}