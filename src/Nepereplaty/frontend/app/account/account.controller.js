/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var account;
    (function (account_1) {
        var AccountController = (function () {
            // @ngInject
            function AccountController($state, $http, $scope, account, auth, $rootScope) {
                var _this = this;
                this.$state = $state;
                this.$http = $http;
                this.$scope = $scope;
                this.account = account;
                this.auth = auth;
                this.$rootScope = $rootScope;
                this.telCode = [
                    { text: '+7', value: '007' },
                    { text: '+1', value: '001' },
                    { text: '+33', value: '0033' },
                    { text: '+374', value: '00374' },
                    { text: '+25', value: '0024' },
                    { text: '+908', value: '00908' },
                ];
                this.$rootScope.showFooter = false;
                this.personalArea = !$rootScope.isMobile;
                this.passportData = !$rootScope.isMobile;
                this.newChangePassword = !$rootScope.isMobile;
                this.showBirthday = false;
                this.issued = false;
                this.isCurrentPasswordIncorrect = false;
                this.changePasswordUnknownError = false;
                this.showPeriodStart = false;
                account.getAccount().then(function (value) {
                    _this.manageData = value;
                    //       this.manageData.IsMale;
                    console.log(_this.manageData);
                    _this.updateMiddle();
                    if (value.Mobile) {
                        if (value.MobileCode.value != null) {
                            _this.manageData.MobileCode = value.MobileCode;
                        }
                        else {
                            _this.manageData.MobileCode = { text: value.MobileCode, value: value.MobileCode };
                        }
                    }
                    else {
                        _this.manageData.MobileCode = { text: '--', value: null };
                    }
                    if (value.TelephoneCode) {
                        if (value.TelephoneCode.value != null) {
                            _this.manageData.TelephoneCode = value.TelephoneCode;
                        }
                        else {
                            _this.manageData.TelephoneCode = { text: value.TelephoneCode, value: value.TelephoneCode };
                        }
                    }
                    else {
                        _this.manageData.TelephoneCode = { text: '--', value: null };
                    }
                });
                this.minDate = new Date();
                this.minDate.setFullYear(1926);
            }
            AccountController.prototype.logout = function () {
                var _this = this;
                this.$http
                    .post('api/account/logout', {})
                    .success(function (response) {
                    _this.$state.go('home').then(function (promise) {
                        window.location.reload();
                    });
                });
            };
            AccountController.prototype.changeMale = function (t) {
                console.log(t);
            };
            AccountController.prototype.updateMiddle = function () {
                if (this.validate(this.manageData.Name) && this.validate(this.manageData.Surname)) {
                    this.isMiddle = true;
                }
                else {
                    this.isMiddle = false;
                }
            };
            AccountController.prototype.validate = function (strValue) {
                var objRegExp = /^[a-zA-Z ]+$/;
                return objRegExp.test(strValue);
            };
            AccountController.prototype.editAccount = function () {
                var _this = this;
                var cloneData = new account_1.AccountData();
                if (this.pasportWhere) {
                    this.manageData.PassportWhere = this.pasportWhere.title;
                }
                if (this.city) {
                    this.manageData.City = this.city.title;
                }
                cloneData.Email = this.manageData.Email;
                cloneData.TelephoneCode = this.manageData.TelephoneCode.value;
                cloneData.MobileCode = this.manageData.MobileCode.value;
                cloneData.Adress = this.manageData.Adress;
                cloneData.Birthday = this.manageData.Birthday;
                cloneData.City = this.manageData.City;
                cloneData.IsMale = this.manageData.IsMale;
                cloneData.Middlename = this.manageData.Middlename;
                cloneData.Name = this.manageData.Name;
                cloneData.Surname = this.manageData.Surname;
                cloneData.Telephone = this.manageData.Telephone;
                cloneData.Mobile = this.manageData.Mobile;
                cloneData.PassportIssued = this.manageData.PassportIssued;
                cloneData.PassportnNumber = this.manageData.PassportnNumber;
                cloneData.PassportSerial = this.manageData.PassportSerial;
                cloneData.PassportWhen = this.manageData.PassportWhen;
                cloneData.PassportWhere = this.manageData.PassportWhere;
                this.account.editAccount(cloneData).then(function (value) {
                    _this.account.getAccount().then(function (value) {
                        _this.manageData = value;
                        if (value.MobileCode.value != null) {
                            _this.manageData.MobileCode = value.MobileCode;
                            _this.manageData.TelephoneCode = value.TelephoneCode;
                        }
                        else {
                            _this.manageData.MobileCode = { text: value.MobileCode, value: value.MobileCode };
                            _this.manageData.TelephoneCode = { text: value.TelephoneCode, value: value.TelephoneCode };
                        }
                    });
                });
            };
            AccountController.prototype.changePassword = function () {
                var _this = this;
                if (this.$scope.changePasswordForm.$valid &&
                    this.changePasswordModel.NewPassword === this.changePasswordModel.ConfirmNewPassword) {
                    this.account.changePassword(this.changePasswordModel).then(function (value) {
                        if (value.IsSuccessful) {
                            _this.changePasswordModel.OldPassword = '';
                            _this.changePasswordModel.NewPassword = '';
                            _this.changePasswordModel.ConfirmNewPassword = '';
                        }
                        else {
                            if (value.Error === 'OldPasswordInvalid') {
                                _this.isCurrentPasswordIncorrect = true;
                            }
                            if (value.Error === 'Unknown') {
                                _this.changePasswordUnknownError = true;
                            }
                        }
                    });
                }
            };
            return AccountController;
        })();
        account_1.AccountController = AccountController;
        angular.module('nepereplaty').controller('nepereplaty.account.AccountController', AccountController);
    })(account = nepereplaty.account || (nepereplaty.account = {}));
})(nepereplaty || (nepereplaty = {}));
