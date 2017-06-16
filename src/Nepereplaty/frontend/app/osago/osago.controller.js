/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var osago;
    (function (osago) {
        var OSAGOController = (function () {
            // @ngInject
            function OSAGOController($http, $state, $q, OSAGOService, $scope, ModalService, $timeout, $rootScope) {
                var _this = this;
                this.$http = $http;
                this.$state = $state;
                this.$q = $q;
                this.OSAGOService = OSAGOService;
                this.$scope = $scope;
                this.ModalService = ModalService;
                this.$timeout = $timeout;
                this.$rootScope = $rootScope;
                this.insuranceStartMinData = new Date();
                this.submitValue = 'Получить предложение';
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
                this.powerOptions = [{
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
                this.franchiseOptions = [{
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
                this.isIndividualOptions = [
                    {
                        text: 'Физическое лицо',
                        value: true
                    },
                    {
                        text: 'Юридическое лицо',
                        value: false
                    }
                ];
                this.isOwnerOptions = [
                    {
                        text: 'Собственник',
                        value: true
                    },
                    {
                        text: 'По доверенности',
                        value: false
                    }
                ];
                this.wasInsuranceOptions = [{
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
                this.wasClaimsOptions = [{
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
                this.rudderOptions = [{
                        text: 'Левосторонний',
                        value: true
                    },
                    {
                        text: 'Правосторонний',
                        value: false
                    }
                ];
                this.antiTheftSystemOptions = [{
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
                this.searchSystemOptions = [
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
                this.commissionerOptions = [
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
                this.evacuationOptions = [
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
                this.techSupportOptions = [
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
                this.policeReferenceOptions = [
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
                this.ageOptions = [
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
                this.experienceOptions = [
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
                this.martialStatusOptions = [
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
                this.driverOptions = [
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
                this.kidsOptions = [
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
                this.driverCountModel = null;
                this.driversCount = null;
                this.addDriversCount = function () {
                    this.driversCount++;
                    this.driversCountChange();
                };
                this.driversCountChange = function () {
                    this.driversCount = this.driverCountModel.value;
                    if (this.driversCount > 5) {
                        this.driversCount = 0;
                    }
                    if (this.isNumeric(this.driversCount)) {
                        if (this.driversCount > this.osagoInsuranceForm.drivers.length) {
                            while (this.driversCount > this.osagoInsuranceForm.drivers.push(new osago.Driver())) { }
                        }
                        if (this.driversCount < this.osagoInsuranceForm.drivers.length) {
                            this.osagoInsuranceForm.drivers.splice(this.driversCount, this.osagoInsuranceForm.drivers.length - this.driversCount);
                        }
                    }
                };
                this.isNumeric = function (n) {
                    return !isNaN(parseFloat(n)) && isFinite(n);
                };
                this.lastBody = null;
                this.yearBigValue = function () {
                    var nowYear = new Date().getUTCFullYear();
                    if (this.osagoInsuranceForm.year > nowYear) {
                        this.osagoInsuranceForm.year = null;
                        this.osagoInsuranceForm.releaseYearIsLarge = true;
                    }
                    else {
                        this.osagoInsuranceForm.releaseYearIsLarge = false;
                    }
                };
                this.insuranceStartMinData.setDate(this.insuranceStartMinData.getDate() - 1);
                this.openAboutCar = !$rootScope.isMobile;
                this.openDataDrivers = !$rootScope.isMobile;
                this.openDriver = !$rootScope.isMobile;
                this.$rootScope.showFooter = true;
                this.$rootScope.showBlindStopper = false;
                this.osagoInsuranceForm = new osago.OsagoInsuranceForm();
                this.showPeriodStart = false;
                this.showBuyingDate = false;
                this.showStartUsingDate = false;
                this.antiTheftSystemAnotherFocused = false;
                this.searchSystemAnotherFocused = false;
                this.driverCountModel = { text: '1', value: '1' };
                this.driversCountChange();
                this.$http.get('api/handbook/region')
                    .success(function (response) {
                    _this.regionOptions = response;
                    _this.$http.get('api/handbook/country')
                        .success(function (response) {
                        _this.countryOptions = response;
                    });
                });
            }
            OSAGOController.prototype.antiTheftSystemSelected = function (selected) {
                if (selected.value) {
                    this.antiTheftSystemAnotherFocused = true;
                }
            };
            OSAGOController.prototype.searchSystemSelected = function (selected) {
                if (selected.value) {
                    this.searchSystemAnotherFocused = true;
                }
            };
            OSAGOController.prototype.getCarModificationOptions = function () {
                var _this = this;
                var s = 'api/handbook/carModifications/' + this.osagoInsuranceForm.year + '/';
                s += this.osagoInsuranceForm.brand.originalObject.title + '/' + this.osagoInsuranceForm.model.originalObject.title + '/';
                s += this.osagoInsuranceForm.carBody.value + '/';
                this.$http.get(s)
                    .success(function (response) {
                    _this.modificationOption = response;
                });
            };
            ;
            OSAGOController.prototype.getCarTransmissionOptions = function () {
                var _this = this;
                var s = 'api/handbook/carTransmission/' + this.osagoInsuranceForm.year + '/';
                s += this.osagoInsuranceForm.brand.originalObject.title + '/' + this.osagoInsuranceForm.model.originalObject.title + '/';
                s += this.osagoInsuranceForm.carBody.value + '/' + this.osagoInsuranceForm.modification.value + '/';
                this.$http.get(s)
                    .success(function (response) {
                    _this.transmissionOption = response;
                });
            };
            ;
            OSAGOController.prototype.getCarDetailsOptions = function () {
                var _this = this;
                var s = 'api/handbook/carDetails/' + this.osagoInsuranceForm.year + '/';
                s += this.osagoInsuranceForm.brand.originalObject.title + '/' + this.osagoInsuranceForm.model.originalObject.title + '/';
                s += this.osagoInsuranceForm.carBody.value + '/' + this.osagoInsuranceForm.modification.value + '/';
                s += this.osagoInsuranceForm.transmission.value + '/';
                this.$http.get(s)
                    .success(function (response) {
                    _this.osagoInsuranceForm.power = Number(response.EnginePower);
                    _this.osagoInsuranceForm.carCost = Number(response.Price);
                });
            };
            ;
            OSAGOController.prototype.getCarBodyOptions = function () {
                var _this = this;
                if (!this.osagoInsuranceForm.model) {
                    return null;
                }
                if (!this.lastBody || this.lastBody !== this.osagoInsuranceForm.model.originalObject.value) {
                    this.lastBody = this.osagoInsuranceForm.model.originalObject.value;
                    var s = 'api/handbook/carBodies/' + this.osagoInsuranceForm.year + '/';
                    s += this.osagoInsuranceForm.brand.originalObject.title + '/' + this.osagoInsuranceForm.model.originalObject.title + '/';
                    this.$http.get(s)
                        .success(function (response) {
                        console.log(_this.carBodyOptions);
                        console.log(response);
                        _this.carBodyOptions = response;
                    });
                }
            };
            OSAGOController.prototype.requestOffer = function () {
                var _this = this;
                console.log(this.osagoInsuranceForm);
                if (this.submitValue === 'Получить предложение') {
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
                    var formClone = new osago.OsagoInsuranceForm();
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
                        formClone.drivers[i] = new osago.Driver();
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
                        inputs: {}
                    });
                    window.scrollTo(0, 0);
                    this.OSAGOService.loadOffers(formClone).success(function () {
                        _this.$rootScope.dismissModal('loading');
                        _this.$state.go('osago.offer');
                    });
                }
            };
            return OSAGOController;
        })();
        osago.OSAGOController = OSAGOController;
        angular.module('nepereplaty').controller('nepereplaty.osago.OSAGOController', OSAGOController);
    })(osago = nepereplaty.osago || (nepereplaty.osago = {}));
})(nepereplaty || (nepereplaty = {}));
