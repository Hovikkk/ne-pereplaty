/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var accident;
    (function (accident) {
        var ACCIDENTDetailsController = (function () {
            function ACCIDENTDetailsController($http, $state, $q, ACCIDENTService, auth, $scope, account, $rootScope, ModalService) {
                var _this = this;
                this.$http = $http;
                this.$state = $state;
                this.$q = $q;
                this.ACCIDENTService = ACCIDENTService;
                this.auth = auth;
                this.$scope = $scope;
                this.account = account;
                this.$rootScope = $rootScope;
                this.ModalService = ModalService;
                this.content = new accident.ACCIDENTOffer();
                this.insuranceOptions = [
                    {
                        text: '1 месяц',
                        value: 1
                    },
                    {
                        text: '3 месяца',
                        value: 3
                    },
                    {
                        text: '6 месяцев',
                        value: 6
                    },
                    {
                        text: '12 месяцев',
                        value: 12
                    }
                ];
                this.telCode = [
                    { text: '+7', value: '007' },
                    { text: '+1', value: '001' },
                    { text: '+33', value: '0033' },
                    { text: '+374', value: '00374' },
                    { text: '+25', value: '0024' },
                    { text: '+908', value: '00908' },
                ];
                this.personalData = !$rootScope.isMobile;
                this.passportData = !$rootScope.isMobile;
                this.personalDataInsured = !$rootScope.isMobile;
                this.passportDataInsured = !$rootScope.isMobile;
                if (this.ACCIDENTService.getOffers() == null) {
                    this.$state.go('home');
                }
                this.content = this.ACCIDENTService.getOffers();
                this.userData = new accident.ACCIDENTDetailsForm();
                this.logoUrl = this.content.Offers[this.ACCIDENTService.offerIndex].Company.Logo;
                console.log(this.content);
                for (var i = 0; i < this.insuranceOptions.length; i++) {
                    if (this.insuranceOptions[i].value === this.content.duration) {
                        this.duration = this.insuranceOptions[i].text;
                        break;
                    }
                }
                if (!this.auth.getUserId()) {
                    this.login();
                }
                else {
                    account.getAccount().then(function (value) {
                        _this.manageData = value;
                        //                   this.authController.update();
                        _this.setData();
                    });
                }
            }
            ;
            ACCIDENTDetailsController.prototype.register = function () {
                var _this = this;
                this.$rootScope.isModalShown = true;
                this.ModalService.showModal({
                    templateUrl: 'app/auth/register.html',
                    controller: 'RegisterModalController',
                    controllerAs: 'registerModalCtrl',
                    inputs: {
                        name: 'accident'
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
                                    //                              this.authController.update();
                                    _this.setData();
                                });
                            }
                            else {
                                console.log(result);
                            }
                            _this.$rootScope.isModalShown = false;
                        }
                        // Reset user password
                        //this.credentials.password = '';
                    });
                });
            };
            ACCIDENTDetailsController.prototype.login = function () {
                var _this = this;
                this.$rootScope.isModalShown = true;
                this.ModalService.showModal({
                    templateUrl: 'app/auth/login.html',
                    controller: 'LoginModalController',
                    controllerAs: 'loginModalCtrl',
                    inputs: {
                        name: 'accident'
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
                                    //                                this.authController.update();
                                    _this.setData();
                                });
                            }
                            _this.$rootScope.isModalShown = false;
                        }
                    });
                });
            };
            ACCIDENTDetailsController.prototype.editAccount = function () {
                var _this = this;
                this.account.editAccount(this.manageData).then(function (value) {
                    _this.account.getAccount().then(function (value) {
                        _this.manageData = value;
                        //                    this.authController.update();
                        _this.setData();
                    });
                });
            };
            ;
            ACCIDENTDetailsController.prototype.updateMiddle = function () {
                if (this.validate(this.userData.Name) && this.validate(this.userData.Surname)) {
                    this.isMiddle = true;
                }
                else {
                    this.isMiddle = false;
                }
                console.log(this.isMiddle);
            };
            ACCIDENTDetailsController.prototype.updateSecondMiddle = function () {
                if (this.validate(this.userData.additiolData.privateData.name) &&
                    this.validate(this.userData.additiolData.privateData.surName)) {
                    this.isSecondMiddle = true;
                }
                else {
                    this.isSecondMiddle = false;
                }
            };
            ACCIDENTDetailsController.prototype.validate = function (strValue) {
                var objRegExp = /^[a-zA-Z ]+$/;
                return objRegExp.test(strValue);
            };
            ACCIDENTDetailsController.prototype.setData = function () {
                console.log('setData');
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
                console.log('Hello Moto 1');
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
                console.log('Hello Moto 2');
                if (!this.content.otherPerson) {
                    this.userData.additiolData.privateData.name = this.userData.Name;
                    this.userData.additiolData.privateData.surName = this.userData.Surname;
                    this.userData.additiolData.privateData.middleName = this.userData.Middlename;
                    this.userData.additiolData.privateData.Birthday = this.userData.Birthday;
                    this.userData.additiolData.privateData.isMale = this.userData.IsMale;
                    this.userData.additiolData.pasport.Document = 1;
                    this.userData.additiolData.pasport.number = this.userData.PassportnNumber;
                    this.userData.additiolData.pasport.serial = this.userData.PassportSerial;
                    this.userData.additiolData.pasport.where = this.userData.PassportWhere;
                    this.userData.additiolData.pasport.when = this.userData.PassportWhen;
                    this.userData.additiolData.pasport.issued = this.userData.PassportIssued;
                }
                if (this.userData.City == null) {
                    this.$scope.form.city.$invalid = true;
                    this.$scope.form.city1.$invalid = true;
                }
                console.log('Hello Moto 3');
                this.updateMiddle();
                this.updateSecondMiddle();
            };
            ACCIDENTDetailsController.prototype.requestBuyOffer = function () {
                var _this = this;
                console.log(this.userData);
                if (this.pasportWhere) {
                    this.userData.PassportWhere = this.pasportWhere.title;
                }
                if (this.city) {
                    this.userData.City = this.city.title;
                }
                console.log(this.userData);
                if (this.userData.Adress == null ||
                    this.userData.City == null ||
                    this.userData.Email == null ||
                    this.userData.IsMale == null ||
                    this.userData.Name == null ||
                    this.userData.PassportIssued == null ||
                    this.userData.PassportnNumber == null ||
                    this.userData.PassportSerial == null ||
                    this.userData.PassportWhere === undefined ||
                    this.userData.Surname == null ||
                    this.userData.Mobile == null ||
                    this.userData.Telephone == null) {
                    return;
                }
                console.log(this.isMiddle);
                if (this.userData.Middlename == null && !this.isMiddle) {
                    return;
                }
                if (this.content.otherPerson) {
                    if (this.userData.additiolData.pasport.Document === 0 ||
                        this.userData.additiolData.pasport.issued == null ||
                        this.userData.additiolData.pasport.number == null ||
                        this.userData.additiolData.pasport.serial == null ||
                        this.userData.additiolData.pasport.where === undefined ||
                        this.userData.additiolData.pasport.when == null) {
                        return;
                    }
                    if (this.userData.additiolData.privateData.Birthday == null ||
                        this.userData.additiolData.privateData.isMale === 0 ||
                        this.userData.additiolData.privateData.middleName == null ||
                        this.userData.additiolData.privateData.name == null ||
                        this.userData.additiolData.privateData.surName == null) {
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
                this.ACCIDENTService.buyerInfo = this.userData;
                var model = new accident.AccidentOfferModel();
                model.accident.amateurSports = this.content.amateurSports;
                model.accident.duration = this.content.duration;
                model.accident.isSelf = !this.content.otherPerson;
                model.insured.name = this.userData.Name;
                model.insured.surName = this.userData.Surname;
                model.insured.age = parseFloat(this.content.age);
                model.insured.middleName = this.userData.Middlename;
                model.basic.cost = this.ACCIDENTService.totoalPrice;
                model.basic.type = 'accident';
                model.basic.buyer = this.userData.Email;
                model.basic.startDate = this.content.startData;
                model.basic.endDate = this.content.endData;
                model.basic.companyId = this.content.Offers[this.ACCIDENTService.offerIndex].Company.Id;
                this.$http.put('api/admin/accident', model).success(function (response) {
                    console.log(response);
                    _this.ACCIDENTService.offerId = response.offerId;
                    _this.$state.go('accident.payment');
                });
            };
            ;
            return ACCIDENTDetailsController;
        })();
        accident.ACCIDENTDetailsController = ACCIDENTDetailsController;
        angular.module('nepereplaty').controller('nepereplaty.accident.ACCIDENTDetailsController', ACCIDENTDetailsController);
    })(accident = nepereplaty.accident || (nepereplaty.accident = {}));
})(nepereplaty || (nepereplaty = {}));
