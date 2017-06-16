/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var house;
    (function (house) {
        var HOUSEDetailsController = (function () {
            function HOUSEDetailsController($http, $state, $q, HOUSEService, auth, $scope, account, $rootScope, ModalService) {
                var _this = this;
                this.$http = $http;
                this.$state = $state;
                this.$q = $q;
                this.HOUSEService = HOUSEService;
                this.auth = auth;
                this.$scope = $scope;
                this.account = account;
                this.$rootScope = $rootScope;
                this.ModalService = ModalService;
                this.content = new house.HOUSEOffer();
                this.telCode = [
                    { text: '+7', value: '007' },
                    { text: '+1', value: '001' },
                    { text: '+33', value: '0033' },
                    { text: '+374', value: '00374' },
                    { text: '+25', value: '0024' },
                    { text: '+908', value: '00908' },
                ];
                if (this.HOUSEService.getOffers() == null) {
                    this.$state.go('home');
                }
                //            this.offers = this.HOUSEService.getOffers();
                this.content = this.HOUSEService.getOffers();
                this.content.submodule = 'Дом';
                this.content.termInsurance = '1 год';
                this.userData = new house.HOUSEDetailsForm();
                this.logoUrl = this.content.Offers[this.HOUSEService.offerIndex].Company.Logo;
                this.startData = this.content.startData;
                var ar = this.startData.split('-');
                this.startData = this.content.startData;
                this.endData = this.content.endData;
                this.minDate = new Date();
                this.minDate.setFullYear(1926);
                this.personalData = !$rootScope.isMobile;
                this.passportData = !$rootScope.isMobile;
                this.propertyDetails = !$rootScope.isMobile;
                //            while (this.offers.DriversCount > this.userData.drivers.length) {
                //                this.userData.drivers.push(new DriversLicense());
                //           }
                if (!this.auth.getUserId()) {
                    this.login();
                }
                else {
                    account.getAccount().then(function (value) {
                        _this.manageData = value;
                        _this.setData();
                    });
                }
                this.getRegions();
            }
            ;
            HOUSEDetailsController.prototype.getRegions = function () {
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
            HOUSEDetailsController.prototype.register = function () {
                var _this = this;
                this.$rootScope.isModalShown = true;
                this.ModalService.showModal({
                    templateUrl: 'app/auth/register.html',
                    controller: 'RegisterModalController',
                    controllerAs: 'registerModalCtrl',
                    inputs: {
                        name: 'house'
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
            HOUSEDetailsController.prototype.login = function () {
                var _this = this;
                this.$rootScope.isModalShown = true;
                this.ModalService.showModal({
                    templateUrl: 'app/auth/login.html',
                    controller: 'LoginModalController',
                    controllerAs: 'loginModalCtrl',
                    inputs: {
                        name: 'house'
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
            HOUSEDetailsController.prototype.editAccount = function () {
                var _this = this;
                this.account.editAccount(this.manageData).then(function (value) {
                    _this.account.getAccount().then(function (value) {
                        _this.manageData = value;
                        _this.setData();
                    });
                });
            };
            ;
            HOUSEDetailsController.prototype.updateMiddle = function () {
                if (this.validate(this.userData.Name) && this.validate(this.userData.Surname)) {
                    this.isMiddle = true;
                }
                else {
                    this.isMiddle = false;
                }
            };
            HOUSEDetailsController.prototype.validate = function (strValue) {
                var objRegExp = /^[a-zA-Z ]+$/;
                return objRegExp.test(strValue);
            };
            HOUSEDetailsController.prototype.setData = function () {
                this.userData.Adress = this.manageData.Adress;
                this.userData.Birthday = this.manageData.Birthday;
                this.userData.City = this.manageData.City;
                this.userData.Email = this.manageData.Email;
                this.userData.IsMale = (this.manageData.IsMale) ? 1 : 2;
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
            HOUSEDetailsController.prototype.requestBuyOffer = function () {
                var _this = this;
                console.log(this.userData);
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
                    this.userData.Coincidence == null ||
                    this.userData.Surname == null ||
                    this.userData.Mobile == null ||
                    this.userData.Telephone == null ||
                    this.userData.PassportWhen === undefined) {
                    return;
                }
                if (!this.isMiddle && this.userData.Middlename == null) {
                    return;
                }
                this.HOUSEService.otherAndress.isAre = false;
                if (this.userData.Coincidence === 'false') {
                    if (this.userData.Region == null ||
                        this.userData.InformationCity == null ||
                        this.userData.FullAdress == null) {
                        return;
                    }
                    else {
                        this.HOUSEService.otherAndress.isAre = true;
                        this.HOUSEService.otherAndress.region = this.userData.Region.originalObject.value;
                        this.HOUSEService.otherAndress.city = this.userData.InformationCity.title;
                        this.HOUSEService.otherAndress.adress = this.userData.FullAdress;
                    }
                }
                if (this.userData.Coincidence === 'true') {
                    this.HOUSEService.otherAndress.region = this.userData.Region;
                    this.HOUSEService.otherAndress.city = this.userData.City;
                    this.HOUSEService.otherAndress.adress = this.userData.Adress;
                }
                this.manageData.Adress = this.userData.Adress;
                this.manageData.Birthday = this.userData.Birthday;
                this.manageData.City = this.userData.City;
                this.manageData.Email = this.userData.Email;
                this.manageData.IsMale = (this.userData.IsMale === 1) ? true : false;
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
                this.HOUSEService.buyerInfo = this.userData;
                var model = new house.ApartmentOfferModel();
                model.basic.cost = this.HOUSEService.totoalPrice;
                model.basic.type = 'house';
                model.basic.buyer = this.userData.Email;
                model.basic.comments = '';
                model.basic.companyId = this.content.Offers[this.HOUSEService.offerIndex].Company.Id;
                model.basic.endDate = this.content.endData;
                model.basic.startDate = this.content.startData;
                model.home.address = this.HOUSEService.otherAndress.adress;
                model.home.city = this.HOUSEService.otherAndress.city;
                model.home.region = this.HOUSEService.otherAndress.region;
                this.$http.put('api/admin/home', model).success(function (response) {
                    _this.HOUSEService.offerId = response.offerId;
                    _this.$state.go('house.payment');
                });
            };
            ;
            return HOUSEDetailsController;
        })();
        house.HOUSEDetailsController = HOUSEDetailsController;
        angular.module('nepereplaty').controller('nepereplaty.house.HOUSEDetailsController', HOUSEDetailsController);
    })(house = nepereplaty.house || (nepereplaty.house = {}));
})(nepereplaty || (nepereplaty = {}));
