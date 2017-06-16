/// <reference path="../app.ts" />

module nepereplaty.account {
	
    export interface IAccountScope extends angular.IScope {
        changePasswordForm?: any;
        manageForm?: any;
    }
	export class AccountController {
        manageData: IAccountData;
        changePasswordModel: IChangePasswordModel;
        showBirthday: boolean;
        issued: boolean;
        showPeriodStart: boolean;
        isCurrentPasswordIncorrect: boolean;
        changePasswordUnknownError: boolean;
        minDate: Date;
        city: any;
        pasportWhere: any;
        personalArea: boolean;
        passportData: boolean;
        newChangePassword: boolean;
        telCode = [
            { text: '+7', value: '007' },
            { text: '+1', value: '001' },
            { text: '+33', value: '0033' },
            { text: '+374', value: '00374' },
            { text: '+25', value: '0024' },
            { text: '+908', value: '00908' },
        ];
        isMiddle: boolean;
        // @ngInject
        constructor(private $state: angular.ui.IStateService,
            private $http: angular.IHttpService,
            private $scope: IAccountScope,
            private account: nepereplaty.account.IAccountService,
            private auth: nepereplaty.auth.AuthController,
            private $rootScope: any) {
            this.$rootScope.showFooter = false;
            this.personalArea = !$rootScope.isMobile;
            this.passportData = !$rootScope.isMobile;
            this.newChangePassword = !$rootScope.isMobile;
            this.showBirthday = false;
            this.issued = false;
            this.isCurrentPasswordIncorrect = false;
            this.changePasswordUnknownError = false;
            this.showPeriodStart = false;
            account.getAccount().then((value: IAccountData): void => {
                this.manageData = value;
         //       this.manageData.IsMale;

                console.log(this.manageData);
                this.updateMiddle();
                if (value.Mobile) {
                    if (value.MobileCode.value != null) {
                        this.manageData.MobileCode = value.MobileCode;
                    } else {
                        this.manageData.MobileCode = { text: value.MobileCode, value: value.MobileCode };
                    }
                } else {
                    this.manageData.MobileCode = { text: '--', value: null };
                }
                if (value.TelephoneCode) {
                    if (value.TelephoneCode.value != null) {
                        this.manageData.TelephoneCode = value.TelephoneCode;
                    } else {
                        this.manageData.TelephoneCode = { text: value.TelephoneCode, value: value.TelephoneCode };
                    }
                } else {
                    this.manageData.TelephoneCode = { text: '--', value: null };
                }
            });
            this.minDate = new Date();
            this.minDate.setFullYear(1926);
        }
        logout() {
            this.$http
                .post('api/account/logout', {})
                .success((response: any) => {
                    this.$state.go('home').then((promise: any) => {
                        window.location.reload();
                    });
                });
                
        }
        changeMale(t: boolean) {
            console.log(t);
        }
        updateMiddle() {
            if (this.validate(this.manageData.Name) && this.validate(this.manageData.Surname)) {
                this.isMiddle = true;
            } else {
                this.isMiddle = false;
            }
        }
        
        validate(strValue) {
            var objRegExp = /^[a-zA-Z ]+$/;
            return objRegExp.test(strValue);
        }
        editAccount() {
            var cloneData: IAccountData = new AccountData();
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

            this.account.editAccount(cloneData).then((value: ProfileResult): void => {
                this.account.getAccount().then((value: IAccountData): void => {
                    this.manageData = value;
                    if (value.MobileCode.value != null) {
                        this.manageData.MobileCode = value.MobileCode;
                        this.manageData.TelephoneCode = value.TelephoneCode;
                    } else {
                        this.manageData.MobileCode = { text: value.MobileCode, value: value.MobileCode };
                        this.manageData.TelephoneCode = { text: value.TelephoneCode, value: value.TelephoneCode };
                    }
                });
            });
        }

        changePassword() {
            if (this.$scope.changePasswordForm.$valid &&
                this.changePasswordModel.NewPassword === this.changePasswordModel.ConfirmNewPassword) {
                this.account.changePassword(this.changePasswordModel).then((value: ChangePasswordResult): void => {
                    if (value.IsSuccessful) {
                        this.changePasswordModel.OldPassword = '';
                        this.changePasswordModel.NewPassword = '';
                        this.changePasswordModel.ConfirmNewPassword = '';
                    } else {
                        if (value.Error === 'OldPasswordInvalid') {
                            this.isCurrentPasswordIncorrect = true;
                        }
                        if (value.Error === 'Unknown') {
                            this.changePasswordUnknownError = true;
                        }
                    }
                });
            }
        }
	}
	
    angular.module('nepereplaty').controller('nepereplaty.account.AccountController', AccountController);
	
}