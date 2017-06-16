/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var casco;
    (function (casco) {
        var CASCODetailsController = (function () {
            function CASCODetailsController($http, $state, $q, CASCOService, auth, $scope, account, $rootScope, ModalService) {
                var _this = this;
                this.$http = $http;
                this.$state = $state;
                this.$q = $q;
                this.CASCOService = CASCOService;
                this.auth = auth;
                this.$scope = $scope;
                this.account = account;
                this.$rootScope = $rootScope;
                this.ModalService = ModalService;
                this.telCode = [
                    { text: '+7', value: '007' },
                    { text: '+1', value: '001' },
                    { text: '+33', value: '0033' },
                    { text: '+374', value: '00374' },
                    { text: '+25', value: '0024' },
                    { text: '+908', value: '00908' },
                ];
                if (this.CASCOService.getOffers() == null) {
                    this.$state.go('home');
                }
                this.personalData = !$rootScope.isMobile;
                this.openPassportData = !$rootScope.isMobile;
                this.openDataDriving = !$rootScope.isMobile;
                this.offers = this.CASCOService.getOffers();
                this.userData = new casco.CASCODetailsForm();
                this.startData = this.offers.startData;
                this.endData = this.endData = this.offers.endData;
                this.logoUrl = this.offers.Offers[this.CASCOService.offerIndex].Company.Logo;
                while (this.offers.DriversCount > this.userData.drivers.length) {
                    this.userData.drivers.push(new casco.DriversLicense());
                }
                if (!this.auth.getUserId()) {
                    this.login();
                }
                else {
                    account.getAccount().then(function (value) {
                        _this.manageData = value;
                        _this.setData();
                    });
                }
            }
            ;
            CASCODetailsController.prototype.register = function () {
                var _this = this;
                this.$rootScope.isModalShown = true;
                this.ModalService.showModal({
                    templateUrl: 'app/auth/register.html',
                    controller: 'RegisterModalController',
                    controllerAs: 'registerModalCtrl',
                    inputs: {
                        name: 'casco'
                    }
                }).then(function (modal) {
                    modal.close.then(function (result) {
                        if (result === 'login') {
                            _this.login();
                        }
                        else {
                            if (result === 'registered') {
                                _this.account.getAccount().then(function (value) {
                                    _this.manageData = value;
                                    _this.setData();
                                });
                            }
                            _this.$rootScope.isModalShown = false;
                        }
                        // Reset user password
                        //this.credentials.password = '';
                    });
                });
            };
            CASCODetailsController.prototype.login = function () {
                var _this = this;
                this.$rootScope.isModalShown = true;
                this.ModalService.showModal({
                    templateUrl: 'app/auth/login.html',
                    controller: 'LoginModalController',
                    controllerAs: 'loginModalCtrl',
                    inputs: {
                        name: 'casco'
                    }
                }).then(function (modal) {
                    modal.close.then(function (result) {
                        if (result === 'register') {
                            _this.register();
                        }
                        else {
                            if (result === 'logedin') {
                                _this.account.getAccount().then(function (value) {
                                    _this.manageData = value;
                                    _this.setData();
                                });
                            }
                            _this.$rootScope.isModalShown = false;
                        }
                        // Reset user password
                        //this.credentials.password = '';
                    });
                });
            };
            CASCODetailsController.prototype.editAccount = function () {
                var _this = this;
                this.account.editAccount(this.manageData).then(function (value) {
                    _this.account.getAccount().then(function (value) {
                        _this.manageData = value;
                        _this.setData();
                    });
                });
            };
            ;
            CASCODetailsController.prototype.updateMiddle = function () {
                if (this.validate(this.userData.Name) && this.validate(this.userData.Surname)) {
                    this.isMiddle = true;
                }
                else {
                    this.isMiddle = false;
                }
            };
            CASCODetailsController.prototype.driversYearCheck = function () {
                var nowYear = new Date().getUTCFullYear();
                for (var i = 0; i < this.userData.drivers.length; i++) {
                    if (this.userData.drivers[i].year > nowYear) {
                        this.userData.drivers[i].year = nowYear;
                    }
                }
            };
            CASCODetailsController.prototype.validate = function (strValue) {
                var objRegExp = /^[a-zA-Z ]+$/;
                return objRegExp.test(strValue);
            };
            CASCODetailsController.prototype.setData = function () {
                this.userData.Adress = this.manageData.Adress;
                this.userData.Birthday = this.manageData.Birthday;
                this.userData.City = this.manageData.City;
                this.userData.Email = this.manageData.Email;
                this.userData.IsMale = this.manageData.IsMale;
                this.userData.Middlename = this.manageData.Middlename;
                this.userData.Name = this.manageData.Name;
                this.userData.PassportIssued = this.manageData.PassportIssued;
                this.userData.PassportnNumber = this.manageData.PassportnNumber;
                this.userData.PassportSerial = this.manageData.PassportSerial;
                this.userData.PassportWhen = this.manageData.PassportWhen;
                this.userData.PassportWhere = this.manageData.PassportWhere;
                this.userData.Surname = this.manageData.Surname;
                this.userData.Mobile = Number(this.manageData.Mobile);
                this.userData.Telephone = Number(this.manageData.Telephone);
                if (this.manageData.MobileCode) {
                    if (this.manageData.MobileCode.text != null) {
                        this.userData.MobileCode = this.manageData.MobileCode;
                    }
                    else {
                        this.userData.MobileCode = { text: this.manageData.MobileCode, value: this.manageData.MobileCode };
                    }
                }
                else {
                    this.userData.MobileCode = { text: '--', value: null };
                }
                if (this.manageData.TelephoneCode) {
                    if (this.manageData.TelephoneCode.text != null) {
                        this.userData.TelephoneCode = this.manageData.TelephoneCode;
                    }
                    else {
                        this.userData.TelephoneCode = { text: this.manageData.TelephoneCode, value: this.manageData.TelephoneCode };
                    }
                }
                else {
                    this.userData.TelephoneCode = { text: '--', value: null };
                }
                this.updateMiddle();
            };
            CASCODetailsController.prototype.requestBuyOffer = function () {
                var _this = this;
                if (!this.$scope.form.$valid) {
                    return;
                }
                if (this.pasportWhere) {
                    this.userData.PassportWhere = this.pasportWhere.title;
                }
                if (this.city) {
                    this.userData.City = this.city.title;
                }
                if (this.userData.Adress == null ||
                    this.userData.City == null ||
                    this.userData.Email == null ||
                    this.userData.IsMale == null ||
                    this.userData.Name == null ||
                    this.userData.PassportIssued == null ||
                    this.userData.PassportnNumber == null ||
                    this.userData.PassportSerial == null ||
                    this.userData.PassportWhere == null ||
                    this.userData.Surname == null ||
                    this.userData.Mobile == null ||
                    this.userData.Telephone == null ||
                    this.userData.PassportWhen === undefined) {
                    return;
                }
                if (!this.isMiddle && this.userData.Middlename == null) {
                    return;
                }
                for (var i = 0; i < this.userData.drivers.length; i++) {
                    if (this.userData.drivers[i].number == null ||
                        this.userData.drivers[i].year == null) {
                        return;
                    }
                }
                this.manageData.Adress = this.userData.Adress;
                this.manageData.Birthday = this.userData.Birthday;
                this.manageData.City = this.userData.City;
                this.manageData.Email = this.userData.Email;
                this.manageData.IsMale = this.userData.IsMale;
                this.manageData.Middlename = this.userData.Middlename;
                this.manageData.Name = this.userData.Name;
                this.manageData.PassportIssued = this.userData.PassportIssued;
                this.manageData.PassportnNumber = this.userData.PassportnNumber;
                this.manageData.PassportSerial = this.userData.PassportSerial;
                this.manageData.PassportWhen = this.userData.PassportWhen;
                this.manageData.PassportWhere = this.userData.PassportWhere;
                this.manageData.Surname = this.userData.Surname;
                this.manageData.Mobile = this.userData.Mobile;
                this.manageData.Telephone = this.userData.Telephone;
                this.manageData.MobileCode = this.userData.MobileCode.value;
                this.manageData.TelephoneCode = this.userData.TelephoneCode.value;
                this.editAccount();
                this.CASCOService.buyerInfo = this.userData;
                var osagoModel = new nepereplaty.osago.OsagoOfferModel();
                osagoModel.basic.buyer = this.userData.Email;
                osagoModel.basic.companyId = this.offers.Offers[this.CASCOService.offerIndex].Company.Id;
                osagoModel.basic.cost = this.stringToFloat(this.CASCOService.getOffers().Offers[this.CASCOService.offerIndex].Price);
                osagoModel.basic.startDate = this.startData;
                osagoModel.basic.endDate = this.endData;
                osagoModel.basic.type = 'casco';
                osagoModel.osago.brand = this.offers.CarBrand.split('_')[0];
                osagoModel.osago.model = this.offers.CarModel.split('_')[0] + ' ' + this.offers.CarReleaseYear;
                for (var i = 0; i < this.CASCOService.driver.length; ++i) {
                    var d = this.CASCOService.driver[i];
                    osagoModel.drivers.push(new casco.DriverDetail(d.age, d.experience, d.isMale, d.kids, d.martialStatus));
                }
                this.$http.put('api/admin/casco', osagoModel).success(function (response) {
                    _this.CASCOService.offerId = response.offerId;
                    _this.$state.go('casco.payment');
                });
            };
            ;
            CASCODetailsController.prototype.stringToFloat = function (s) {
                var result = 0;
                var step1 = s.replace(',', '.');
                var step2 = step1.replace(/ /g, '');
                var step3 = step2.replace(' ', '').replace(String.fromCharCode(160), '');
                result = parseFloat(step3);
                return result;
            };
            return CASCODetailsController;
        })();
        casco.CASCODetailsController = CASCODetailsController;
        angular.module('nepereplaty').controller('nepereplaty.casco.CASCODetailsController', CASCODetailsController);
    })(casco = nepereplaty.casco || (nepereplaty.casco = {}));
})(nepereplaty || (nepereplaty = {}));
