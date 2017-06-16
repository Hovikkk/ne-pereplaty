/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var traveling;
    (function (traveling) {
        var TRAVELINGDetailsController = (function () {
            function TRAVELINGDetailsController($http, $state, $q, TRAVELINGService, auth, $scope, account, $rootScope, ModalService) {
                var _this = this;
                this.$http = $http;
                this.$state = $state;
                this.$q = $q;
                this.TRAVELINGService = TRAVELINGService;
                this.auth = auth;
                this.$scope = $scope;
                this.account = account;
                this.$rootScope = $rootScope;
                this.ModalService = ModalService;
                this.content = new traveling.TRAVELINGOffer();
                this.telCode = [
                    { text: '+7', value: '007' },
                    { text: '+1', value: '001' },
                    { text: '+33', value: '0033' },
                    { text: '+374', value: '00374' },
                    { text: '+25', value: '0024' },
                    { text: '+908', value: '00908' },
                ];
                if (this.TRAVELINGService.getOffers() == null) {
                    this.$state.go('home');
                }
                this.personalData = !$rootScope.isMobile;
                this.openTravelPassport = !$rootScope.isMobile;
                this.openPersonalData = !$rootScope.isMobile;
                this.openTravelData = !$rootScope.isMobile;
                this.content = this.TRAVELINGService.getOffers();
                this.startData = this.content.startData;
                this.endData = this.content.endData;
                this.logoUrl = this.content.Offers[this.TRAVELINGService.offerIndex].Company.Logo;
                this.userData = new traveling.TRAVELINGDetailsForm();
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
            TRAVELINGDetailsController.prototype.register = function () {
                var _this = this;
                this.$rootScope.isModalShown = true;
                this.ModalService.showModal({
                    templateUrl: 'app/auth/register.html',
                    controller: 'RegisterModalController',
                    controllerAs: 'registerModalCtrl',
                    inputs: {
                        name: 'traveling'
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
            TRAVELINGDetailsController.prototype.login = function () {
                var _this = this;
                this.$rootScope.isModalShown = true;
                this.ModalService.showModal({
                    templateUrl: 'app/auth/login.html',
                    controller: 'LoginModalController',
                    controllerAs: 'loginModalCtrl',
                    inputs: {
                        name: 'traveling'
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
                    });
                });
            };
            TRAVELINGDetailsController.prototype.editAccount = function () {
                var _this = this;
                this.account.editAccount(this.manageData).then(function (value) {
                    _this.account.getAccount().then(function (value) {
                        _this.manageData = value;
                        //this.setData();
                    });
                });
            };
            ;
            TRAVELINGDetailsController.prototype.updateMiddle = function () {
                if (this.validate(this.manageData.Name) && this.validate(this.manageData.Surname)) {
                    this.isMiddle = true;
                }
                else {
                    this.isMiddle = false;
                }
            };
            TRAVELINGDetailsController.prototype.validate = function (strValue) {
                var objRegExp = /^[a-zA-Z ]+$/;
                return objRegExp.test(strValue);
            };
            TRAVELINGDetailsController.prototype.onMiddlesCahsnge = function () {
                for (var i = 0; i < this.userData.additiolData.length; ++i) {
                    if (this.validate(this.userData.additiolData[i].privateData.NamePolis)
                        && this.validate(this.userData.additiolData[i].privateData.SurnamePolis)) {
                        this.userData.additiolData[i].isMiddle = true;
                    }
                    else {
                        this.userData.additiolData[i].isMiddle = false;
                    }
                }
            };
            TRAVELINGDetailsController.prototype.setData = function () {
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
                this.userData.additiolData = [];
                for (var i = 1; i < this.content.insureds.length; ++i) {
                    var item = new traveling.AdditionTrevalerData();
                    console.log(this.content.insureds[i].bd);
                    item.privateData.BirthdayPolis = this.content.insureds[i].bd;
                    item.privateData.age = this.content.insuredsAges.split(', ')[i];
                    this.userData.additiolData.push(item);
                }
                console.log(this.userData);
                this.updateMiddle();
                this.onMiddlesCahsnge();
            };
            TRAVELINGDetailsController.prototype.requestBuyOffer = function () {
                var _this = this;
                if (this.pasportWhere) {
                    this.userData.PassportWhere = this.pasportWhere.title;
                }
                if (this.city) {
                    this.userData.City = this.city.title;
                }
                console.log(this.userData.City == null, this.userData.Email == null, this.userData.IsMale == null, this.userData.Middlename == null, this.userData.Name == null, this.userData.PassportIssued == null, this.userData.PassportnNumber == null, this.userData.PassportSerial == null, this.userData.Surname == null, this.userData.Mobile == null, this.userData.Telephone == null);
                if (this.userData.Adress == null ||
                    this.userData.City == null ||
                    this.userData.Email == null ||
                    this.userData.IsMale == null ||
                    this.userData.Name == null ||
                    this.userData.PassportIssued == null ||
                    this.userData.PassportnNumber == null ||
                    this.userData.PassportSerial == null ||
                    this.userData.Surname == null ||
                    this.userData.Mobile == null ||
                    this.userData.Telephone == null ||
                    this.userData.PassportWhen === undefined) {
                    return;
                }
                if (this.userData.Middlename == null && !this.isMiddle) {
                    return;
                }
                for (var i = 0; i < this.userData.additiolData.length; i++) {
                    if (this.userData.additiolData[i].privateData.Gender == null ||
                        this.userData.additiolData[i].privateData.NamePolis == null ||
                        this.userData.additiolData[i].privateData.SurnamePolis == null ||
                        this.userData.additiolData[i].outBorderPassport.PassportIssuedHuman == null ||
                        this.userData.additiolData[i].outBorderPassport.PassportNameHuman == null ||
                        this.userData.additiolData[i].outBorderPassport.PassportnNumberHuman == null ||
                        this.userData.additiolData[i].outBorderPassport.PassportSerialHuman == null ||
                        this.userData.additiolData[i].outBorderPassport.PassportSurnameHuman == null) {
                        return;
                    }
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
                this.TRAVELINGService.buyerInfo = this.userData;
                var model = new traveling.TravelingOfferModel();
                model.traveling.duration = parseFloat(this.content.travelingDur);
                model.traveling.countries = this.content.country;
                model.traveling.type = this.content.InsuranceType;
                model.insured.push(new traveling.InsuredModel(this.userData.Name, this.userData.Surname, this.userData.Middlename, parseFloat(this.content.insuredsAges.split(', ')[0])));
                for (var i = 1; i < this.userData.additiolData.length; i++) {
                    model.insured.push(new traveling.InsuredModel(this.userData.additiolData[i].privateData.NamePolis, this.userData.additiolData[i].privateData.SurnamePolis, this.userData.additiolData[i].privateData.PatronymicPolis, parseFloat(this.userData.additiolData[i].privateData.age)));
                }
                //           model.insured.name = this.userData.Name;
                //           model.insured.surName = this.userData.Surname;
                //           model.insured.age = parseFloat(this.content.age);
                //          model.insured.middleName = this.userData.Middlename;
                model.basic.cost = this.TRAVELINGService.totoalPrice;
                model.basic.type = 'traveling';
                model.basic.buyer = this.userData.Email;
                model.basic.startDate = this.content.startData;
                model.basic.endDate = this.content.endData;
                model.basic.companyId = this.content.Offers[this.TRAVELINGService.offerIndex].Company.Id;
                console.log(model);
                this.$http.put('api/admin/traveling', model).success(function (response) {
                    console.log(response);
                    _this.TRAVELINGService.offerId = response.offerId;
                    _this.$state.go('traveling.payment');
                });
            };
            ;
            return TRAVELINGDetailsController;
        })();
        traveling.TRAVELINGDetailsController = TRAVELINGDetailsController;
        angular.module('nepereplaty').controller('nepereplaty.traveling.TRAVELINGDetailsController', TRAVELINGDetailsController);
    })(traveling = nepereplaty.traveling || (nepereplaty.traveling = {}));
})(nepereplaty || (nepereplaty = {}));
