/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var casco;
    (function (casco) {
        var CASCOontroller = (function () {
            // @ngInject
            function CASCOontroller($http, $state, $q, CASCOService, $scope, ModalService, $timeout, $rootScope) {
                this.$http = $http;
                this.$state = $state;
                this.$q = $q;
                this.CASCOService = CASCOService;
                this.$scope = $scope;
                this.ModalService = ModalService;
                this.$timeout = $timeout;
                this.$rootScope = $rootScope;
                this.insuranceStartMinData = new Date();
                this.submitValue = 'Получить предложение';
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
                this.franchiseOptions = [
                    {
                        text: '15000',
                        value: '15000_15000'
                    },
                    {
                        text: '50000',
                        value: '50000_50000'
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
                        if (this.driversCount > this.cascoInsuranceForm.drivers.length) {
                            while (this.driversCount > this.cascoInsuranceForm.drivers.push(new casco.Driver())) { }
                        }
                        if (this.driversCount < this.cascoInsuranceForm.drivers.length) {
                            this.cascoInsuranceForm.drivers.splice(this.driversCount, this.cascoInsuranceForm.drivers.length - this.driversCount);
                        }
                    }
                };
                this.isNumeric = function (n) {
                    return !isNaN(parseFloat(n)) && isFinite(n);
                };
                this.lastBody = null;
                this.yearBigValue = function () {
                    var nowYear = new Date().getUTCFullYear();
                    if (this.cascoInsuranceForm.releaseYear > nowYear) {
                        this.cascoInsuranceForm.releaseYear = null;
                        this.cascoInsuranceForm.releaseYearIsLarge = true;
                    }
                    else {
                        this.cascoInsuranceForm.releaseYearIsLarge = false;
                    }
                };
                this.insuranceStartMinData.setDate(this.insuranceStartMinData.getDate() - 1);
                this.$rootScope.showFooter = true;
                this.$rootScope.showBlindStopper = false;
                this.cascoInsuranceForm = new casco.CascoInsuranceForm();
                this.openAboutCar = !$rootScope.isMobile;
                this.openDataDrivers = !$rootScope.isMobile;
                this.openListDrivers = !$rootScope.isMobile;
                this.openExtraOptions = !$rootScope.isMobile;
                this.openAdditionalServices = !$rootScope.isMobile;
                this.openPreviousInsurance = !$rootScope.isMobile;
                this.showPeriodStart = false;
                this.showBuyingDate = false;
                this.showStartUsingDate = false;
                this.antiTheftSystemAnotherFocused = false;
                this.searchSystemAnotherFocused = false;
                this.driverCountModel = { text: '1', value: '1' };
                this.driversCountChange();
                this.getRegions();
            }
            CASCOontroller.prototype.stringtoNumber = function (s) {
                var result = 0;
                var step1 = s.replace(' ', '.').replace(String.fromCharCode(160), '');
                var step2 = step1.replace(',', '');
                result = parseFloat(step2);
                console.log(result);
                return result;
            };
            CASCOontroller.prototype.getRegions = function () {
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
            CASCOontroller.prototype.antiTheftSystemSelected = function (selected) {
                if (selected.value) {
                    this.antiTheftSystemAnotherFocused = true;
                }
            };
            CASCOontroller.prototype.searchSystemSelected = function (selected) {
                if (selected.value) {
                    this.searchSystemAnotherFocused = true;
                }
            };
            CASCOontroller.prototype.getCarModificationOptions = function () {
                var _this = this;
                var s = 'api/handbook/carModifications/' + this.cascoInsuranceForm.releaseYear + '/';
                s += this.cascoInsuranceForm.brand.originalObject.title + '/' + this.cascoInsuranceForm.model.originalObject.title + '/';
                s += this.cascoInsuranceForm.carBody.value + '/';
                this.$http.get(s)
                    .success(function (response) {
                    _this.modificationOption = response;
                });
            };
            ;
            CASCOontroller.prototype.getCarTransmissionOptions = function () {
                var _this = this;
                var s = 'api/handbook/carTransmission/' + this.cascoInsuranceForm.releaseYear + '/';
                s += this.cascoInsuranceForm.brand.originalObject.title + '/' + this.cascoInsuranceForm.model.originalObject.title + '/';
                s += this.cascoInsuranceForm.carBody.value + '/' + this.cascoInsuranceForm.modification.value + '/';
                this.$http.get(s)
                    .success(function (response) {
                    _this.transmissionOption = response;
                });
            };
            ;
            CASCOontroller.prototype.getCarDetailsOptions = function () {
                var _this = this;
                var s = 'api/handbook/carDetails/' + this.cascoInsuranceForm.releaseYear + '/';
                s += this.cascoInsuranceForm.brand.originalObject.title + '/' + this.cascoInsuranceForm.model.originalObject.title + '/';
                s += this.cascoInsuranceForm.carBody.value + '/' + this.cascoInsuranceForm.modification.value + '/';
                s += this.cascoInsuranceForm.transmission.value + '/';
                this.$http.get(s)
                    .success(function (response) {
                    console.log(response);
                    _this.cascoInsuranceForm.power = Number(response.EnginePower);
                    _this.cascoInsuranceForm.carCost = Number(response.Price);
                    console.log(response);
                    _this.cascoInsuranceForm.EngineHorsepower = response.EnginePower;
                    _this.cascoInsuranceForm.EnginePowerKWt = response.EnginePowerKWt;
                    _this.cascoInsuranceForm.GroupId = response.GroupId;
                    _this.cascoInsuranceForm.VehicleMarkModelCode = response.Id;
                    _this.cascoInsuranceForm.Model = response.Model;
                    _this.cascoInsuranceForm.Modification = response.Modification;
                    _this.cascoInsuranceForm.VehicleMarkModelRAMICode = response.RsaCode;
                    console.log(_this.cascoInsuranceForm);
                });
            };
            ;
            CASCOontroller.prototype.getCarBodyOptions = function () {
                var _this = this;
                if (!this.cascoInsuranceForm.model) {
                    return null;
                }
                if (!this.lastBody || this.lastBody !== this.cascoInsuranceForm.model.originalObject.title) {
                    this.lastBody = this.cascoInsuranceForm.model.originalObject.title;
                    var s = 'api/handbook/carBodies/' + this.cascoInsuranceForm.releaseYear + '/';
                    s += this.cascoInsuranceForm.brand.originalObject.title + '/' + this.cascoInsuranceForm.model.originalObject.title + '/';
                    this.$http.get(s)
                        .success(function (response) {
                        console.log(_this.carBodyOptions);
                        console.log(response);
                        _this.carBodyOptions = response;
                    });
                }
            };
            CASCOontroller.prototype.requestOffer = function () {
                var _this = this;
                if (true) {
                    //           if (this.submitValue === 'Получить предложение') {
                    console.log(this.cascoInsuranceForm);
                    if (!this.$scope.form.$valid || !this.cascoInsuranceForm.isAgreed) {
                        return;
                    }
                    if (this.cascoInsuranceForm.carBody.value == null ||
                        this.cascoInsuranceForm.franchise.value == null ||
                        this.cascoInsuranceForm.isIndividual.value == null ||
                        this.cascoInsuranceForm.isOwner.value == null ||
                        this.cascoInsuranceForm.wasInsurance.value == null ||
                        this.cascoInsuranceForm.wasClaims.value == null ||
                        this.cascoInsuranceForm.carClaimsOneYearAgo.value == null ||
                        this.cascoInsuranceForm.carClaimsTwoYearAgo.value == null ||
                        this.cascoInsuranceForm.carClaimsThreeYearAgo.value == null ||
                        this.cascoInsuranceForm.mutilationClaimsOneYearAgo.value == null ||
                        this.cascoInsuranceForm.mutilationClaimsTwoYearAgo.value == null ||
                        this.cascoInsuranceForm.mutilationClaimsThreeYearAgo.value == null ||
                        this.cascoInsuranceForm.isLeftSideRudder.value == null ||
                        this.cascoInsuranceForm.antiTheftSystem.value == null ||
                        this.cascoInsuranceForm.searchSystem.value == null ||
                        this.cascoInsuranceForm.commissioner == null ||
                        this.cascoInsuranceForm.evacuation == null ||
                        this.cascoInsuranceForm.techSupport == null ||
                        this.cascoInsuranceForm.policeReference == null ||
                        this.cascoInsuranceForm.InsuranceMode == null) {
                        return;
                    }
                    console.log(' ------ ');
                    var formClone = new casco.CascoInsuranceForm();
                    formClone.carBody = this.cascoInsuranceForm.carBody.value;
                    formClone.region = this.cascoInsuranceForm.region.originalObject.value;
                    formClone.franchise = this.cascoInsuranceForm.franchise.value;
                    formClone.isIndividual = this.cascoInsuranceForm.isIndividual.value;
                    formClone.isOwner = this.cascoInsuranceForm.isOwner.value;
                    formClone.wasInsurance = this.cascoInsuranceForm.wasInsurance.value.toString();
                    formClone.wasClaims = this.cascoInsuranceForm.wasClaims.value.toString();
                    formClone.carClaimsOneYearAgo = this.cascoInsuranceForm.carClaimsOneYearAgo.value.toString();
                    formClone.carClaimsTwoYearAgo = this.cascoInsuranceForm.carClaimsTwoYearAgo.value.toString();
                    formClone.carClaimsThreeYearAgo = this.cascoInsuranceForm.carClaimsThreeYearAgo.value.toString();
                    formClone.mutilationClaimsOneYearAgo = this.cascoInsuranceForm.mutilationClaimsOneYearAgo.value.toString();
                    formClone.mutilationClaimsTwoYearAgo = this.cascoInsuranceForm.mutilationClaimsTwoYearAgo.value.toString();
                    formClone.mutilationClaimsThreeYearAgo = this.cascoInsuranceForm.mutilationClaimsThreeYearAgo.value.toString();
                    formClone.isLeftSideRudder = this.cascoInsuranceForm.isLeftSideRudder.value;
                    formClone.antiTheftSystem = this.cascoInsuranceForm.antiTheftSystem.value.toString();
                    formClone.searchSystem = this.cascoInsuranceForm.searchSystem.value.toString();
                    formClone.commissioner = this.cascoInsuranceForm.commissioner.toString();
                    formClone.evacuation = this.cascoInsuranceForm.evacuation.toString();
                    formClone.techSupport = this.cascoInsuranceForm.techSupport.toString();
                    formClone.policeReference = this.cascoInsuranceForm.policeReference.toString();
                    formClone.modification = this.cascoInsuranceForm.modification.value;
                    formClone.brand = this.cascoInsuranceForm.brand.originalObject.value;
                    formClone.model = this.cascoInsuranceForm.model.originalObject.value;
                    formClone.drivers = [];
                    formClone.transmission = this.cascoInsuranceForm.transmission.value;
                    formClone.antiTheftSystem_another = this.cascoInsuranceForm.antiTheftSystem_another;
                    formClone.buyingDate = this.cascoInsuranceForm.buyingDate;
                    formClone.carCost = this.cascoInsuranceForm.carCost;
                    formClone.isAgreed = this.cascoInsuranceForm.isAgreed;
                    formClone.isCredit = this.cascoInsuranceForm.isCredit;
                    formClone.isGuarantee = this.cascoInsuranceForm.isGuarantee;
                    formClone.InsuranceMode = this.cascoInsuranceForm.InsuranceMode.value;
                    formClone.periodStart = this.cascoInsuranceForm.periodStart;
                    formClone.searchSystem_another = this.cascoInsuranceForm.searchSystem_another;
                    formClone.startUsingDate = this.cascoInsuranceForm.startUsingDate;
                    formClone.releaseYear = this.cascoInsuranceForm.releaseYear;
                    formClone.releaseYearIsLarge = this.cascoInsuranceForm.releaseYearIsLarge;
                    formClone.power = this.cascoInsuranceForm.power;
                    formClone.InsuranceMode = this.cascoInsuranceForm.InsuranceMode.toString();
                    formClone.EngineHorsepower = this.cascoInsuranceForm.EngineHorsepower;
                    formClone.EnginePowerKWt = this.cascoInsuranceForm.EnginePowerKWt;
                    formClone.GroupId = this.cascoInsuranceForm.GroupId;
                    formClone.VehicleMarkModelCode = this.cascoInsuranceForm.VehicleMarkModelCode.toString();
                    formClone.Model = this.cascoInsuranceForm.Model;
                    formClone.Modification = this.cascoInsuranceForm.Modification;
                    formClone.VehicleMarkModelRAMICode = this.cascoInsuranceForm.VehicleMarkModelRAMICode.toString();
                    formClone.city = this.cascoInsuranceForm.city.title;
                    console.log(formClone);
                    for (var i = 0; i < this.cascoInsuranceForm.drivers.length; i++) {
                        if (this.cascoInsuranceForm.drivers[i].martialStatus.value == null ||
                            this.cascoInsuranceForm.drivers[i].kids.value == null) {
                            return;
                        }
                        formClone.drivers[i] = new casco.Driver();
                        //formClone.drivers[i].age = this.carInsuranceForm.drivers[i].age.value;
                        //formClone.drivers[i].experience = this.carInsuranceForm.drivers[i].experience.value;
                        formClone.drivers[i].age = this.cascoInsuranceForm.drivers[i].age;
                        formClone.drivers[i].experience = this.cascoInsuranceForm.drivers[i].experience;
                        formClone.drivers[i].martialStatus = this.cascoInsuranceForm.drivers[i].martialStatus.value;
                        formClone.drivers[i].kids = this.cascoInsuranceForm.drivers[i].kids.value;
                        formClone.drivers[i].isMale = this.cascoInsuranceForm.drivers[i].isMale;
                    }
                    this.submitValue = 'Поиск предложений ...';
                    this.ModalService.showModal({
                        templateUrl: 'app/loading/loading.html',
                        controller: 'LoadingModalController',
                        controllerAs: 'loadingModalCtrl',
                        inputs: {}
                    });
                    window.scrollTo(0, 0);
                    this.CASCOService.loadOffers(formClone).success(function () {
                        _this.$rootScope.dismissModal('loading');
                        _this.$state.go('casco.offer');
                    });
                }
            };
            return CASCOontroller;
        })();
        casco.CASCOontroller = CASCOontroller;
        angular.module('nepereplaty').controller('nepereplaty.casco.CASCOController', CASCOontroller);
    })(casco = nepereplaty.casco || (nepereplaty.casco = {}));
})(nepereplaty || (nepereplaty = {}));
