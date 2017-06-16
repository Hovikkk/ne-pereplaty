/// <reference path="../app.ts" />

module nepereplaty.apartment {
    export interface IDetailsFormScope extends angular.IScope {
        form?: any;
    }
    export class APARTMENTDetailsController {
        content: APARTMENTOffer = new APARTMENTOffer();
        offers: APARTMENTInsuranceOffers;
        userData: APARTMENTDetailsForm;
        manageData: nepereplaty.account.IAccountData;
        interval: any;
        startData: string;
        logoUrl: string;
        endData: string;
        regions: any;
        minDate: Date;
        city: any;
        pasportWhere: any;
        personalData: boolean;
        passportData: boolean;
        propertyDetails: boolean;

        telCode = [
            { text: '+7', value: '007' },
            { text: '+1', value: '001' },
            { text: '+33', value: '0033' },
            { text: '+374', value: '00374' },
            { text: '+25', value: '0024' },
            { text: '+908', value: '00908' },
        ];
        isMiddle: boolean;
        constructor(private $http: angular.IHttpService,
            private $state: angular.ui.IStateService,
            private $q: angular.IQService,
            private APARTMENTService: IAPARTMENTService,
            private auth: nepereplaty.auth.AuthService,
            private $scope: IDetailsFormScope,
            private account: nepereplaty.account.IAccountService,
            private $rootScope: any,
            private ModalService: any) {
            if (this.APARTMENTService.getOffers() == null) {
                this.$state.go('home');
            }
            this.content = this.APARTMENTService.getOffers();
            this.content.submodule = 'Квартира';
            this.content.termInsurance = '1 год';
            this.logoUrl = this.content.Offers[this.APARTMENTService.offerIndex].Company.Logo;
            this.userData = new APARTMENTDetailsForm();
            this.personalData = !$rootScope.isMobile;
            this.passportData = !$rootScope.isMobile;
            this.propertyDetails = !$rootScope.isMobile;

            this.startData = this.content.startData;
            this.endData = this.content.endData;
            this.minDate = new Date();
            this.minDate.setFullYear(1926);
            if (!this.auth.getUserId()) {
                this.login();
            } else {
                account.getAccount().then((value: nepereplaty.account.IAccountData): void => {
                    this.manageData = value;
                    this.setData();
                });
            }
            this.getRegions();
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
        register(): void {
            this.$rootScope.isModalShown = true;
            this.ModalService.showModal({
                templateUrl: 'app/auth/register.html',
                controller: 'RegisterModalController',
                controllerAs: 'registerModalCtrl',
                inputs: {
                    name: 'apartment'
                }
            }).then((modal): void => {
                modal.close.then((result: string): void => {
                    if (result === 'login') {
                        this.login();
                    } else {
                        if (result === 'registered') {
                            this.account.getAccount().then((value: nepereplaty.account.IAccountData): void => {
                                this.manageData = value;
                                this.setData();
                            });
                        }
                        this.$rootScope.isModalShown = false;
                    }
                    // Reset user password
                    //this.credentials.password = '';
                });
            });
        }
        login(): void {
            this.$rootScope.isModalShown = true;
            this.ModalService.showModal({
                templateUrl: 'app/auth/login.html',
                controller: 'LoginModalController',
                controllerAs: 'loginModalCtrl',
                inputs: {
                    name: 'apartment'
                }
            }).then((modal): void => {
                modal.close.then((result: string): void => {
                    if (result === 'register') {
                        this.register();
                    } else {
                        if (result === 'logedin') {
                            this.account.getAccount().then((value: nepereplaty.account.IAccountData): void => {
                                this.manageData = value;
                                this.setData();
                            });
                        }
                        this.$rootScope.isModalShown = false;
                    }
                });
            });
        }
        editAccount() {
            this.account.editAccount(this.manageData).then((value: nepereplaty.account.ProfileResult): void => {
                this.account.getAccount().then((value: nepereplaty.account.IAccountData): void => {
                    this.manageData = value;
                    this.setData();
                });
            });
        };
        updateMiddle() {
            console.log(this.validate(this.userData.Name) && this.validate(this.userData.Surname));
            if (this.validate(this.userData.Name) && this.validate(this.userData.Surname)) {
                this.isMiddle = true;
            } else {
                this.isMiddle = false;
            }
        }

        validate(strValue) {
            var objRegExp = /^[a-zA-Z]+$/;
            return objRegExp.test(strValue);
        }
        setData(): void {
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

                } else {
                    this.userData.MobileCode = { text: this.manageData.MobileCode, value: this.manageData.MobileCode };

                }
            } else {
                this.userData.MobileCode = { text: '--', value: null };
            }
            if (this.manageData.TelephoneCode) {
                if (this.manageData.TelephoneCode.text != null) {
                    this.userData.TelephoneCode = this.manageData.TelephoneCode;
                } else {
                    this.userData.TelephoneCode = { text: this.manageData.TelephoneCode, value: this.manageData.TelephoneCode };
                }
            } else {
                this.userData.TelephoneCode = { text: '--', value: null };
            }
            this.updateMiddle();
        }
        requestBuyOffer(): void {
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
            this.APARTMENTService.otherAndress.isAre = false;

            if (this.userData.Coincidence === 'false') {
                if (this.userData.Region == null ||
                    this.userData.InformationCity == null ||
                    this.userData.FullAdress == null) {
                    return;
                } else {
                    this.APARTMENTService.otherAndress.isAre = true;
                    this.APARTMENTService.otherAndress.region = this.userData.Region.originalObject.value;
                    this.APARTMENTService.otherAndress.city = this.userData.InformationCity;
                    this.APARTMENTService.otherAndress.adress = this.userData.FullAdress;
                }
            } 
            if (this.userData.Coincidence === 'true') {
                this.APARTMENTService.otherAndress.region = this.userData.Region;
                this.APARTMENTService.otherAndress.city = this.userData.City;
                this.APARTMENTService.otherAndress.adress = this.userData.Adress;
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

            this.APARTMENTService.buyerInfo = this.userData;
            var model: ApartmentOfferModel = new ApartmentOfferModel();
            model.basic.cost = this.APARTMENTService.totoalPrice;
            model.basic.type = 'apartment';
            model.basic.buyer = this.userData.Email;
            model.basic.comments = '';
            model.basic.companyId = this.content.Offers[this.APARTMENTService.offerIndex].Company.Id;
            model.basic.endDate = this.content.endData;
            model.basic.startDate = this.content.startData;
            model.home.address = this.APARTMENTService.otherAndress.adress;
            model.home.city = this.APARTMENTService.otherAndress.city;
            model.home.region = this.APARTMENTService.otherAndress.region;

            this.$http.put('api/admin/home', model).success((response: any) => {
                this.APARTMENTService.offerId = response.offerId;
                this.$state.go('apartment.payment');
            });
            
        };

    }

    angular.module('nepereplaty').controller('nepereplaty.apartment.APARTMENTDetailsController', APARTMENTDetailsController);

}