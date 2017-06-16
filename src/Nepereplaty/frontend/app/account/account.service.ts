/// <reference path="../app.ts" />

module nepereplaty.account {
    export class ACCOUNTform {
        TelCode1: any;
        TelCode2: any;
        constructor() {
            this.TelCode1 = { text: '--', value: null };
            this.TelCode2 = { text: '--', value: null };
        }
    }
    export interface ProfileResult {
        IsSuccessful: boolean;
        Error: string;
    }

    export interface ChangePasswordResult {
        IsSuccessful: boolean;
        Error: string;
    }

    export class AccountData implements IAccountData {
      public   Name: string;
      public  Surname: string;
      public  Middlename: string;
      public   Email: string;
      public     Passport: string;
      public   IsMale: boolean;
      public  Birthday: Date;
      public   BirthdayPolis: Date;
      public  City: string;
      public  Adress: string;
      public   Telephone: any;
      public   Mobile: any;
      public   TelephoneCode: any;
      public   MobileCode: any;

      public  PassportnNumber: any;
      public  PassportSerial: any;
      public  PassportWhere: any;
      public   PassportWhen: Date;
      public   PassportIssued: any;
       public   PassportName: any;
      public   PassportSurname: any;
    }
    export interface IAccountData {
        Name: string;
        Surname: string;
        Middlename: string;
        Email: string;
        Passport: string;
        IsMale: boolean;
        Birthday: Date ;
        BirthdayPolis: Date;
        City: string;
        Adress: string;
        Telephone: any;
        Mobile: any;
        TelephoneCode: any;
        MobileCode: any;

        PassportnNumber: number;
        PassportSerial: number;
        PassportWhere: any;
        PassportWhen: Date;
        PassportIssued: number;
        PassportName: any;
        PassportSurname: any;

        
        
}

    export interface IChangePasswordModel {
        OldPassword: string;
        NewPassword: string;
        ConfirmNewPassword: string;
    }

    export interface IAccountService {

        load(): angular.IPromise<IAccountData>;
        getAccount(): angular.IPromise<IAccountData>;
        editAccount(data: IAccountData): angular.IPromise<ProfileResult>;
        changePassword(data: IChangePasswordModel): angular.IPromise<ChangePasswordResult>;
    }

    export class AccountService implements IAccountService {
        accountData: IAccountData;
       

        constructor(private $q: angular.IQService, private $http: angular.IHttpService, private auth: nepereplaty.auth.IAuthService) {
            this.accountData = null;
          
        }

        /**
         * Load account data from server
         * @returns {IPromise<T>}
         */
        load(): angular.IPromise<IAccountData> {
            var defer = this.$q.defer();

            this.$http
                .get('api/account/profile')
                .success((account: IAccountData): void => {
                    console.log(account);
                    defer.resolve(account);
                })
                .error((): void => {
                    defer.reject();
                });

            return defer.promise;
        }

        /**
         * Retrieve account from service. If no account information, load id from server
         * @returns {IPromise<T>}
         */
        getAccount(): angular.IPromise<IAccountData> {
            var defer = this.$q.defer();

            if (this.accountData !== null) {
                // Data is already loaded
                console.log(this.accountData);
                defer.resolve(this.accountData);
            } else {
                this
                    .load()
                    .then((data: IAccountData): void => {
                        // Resolve loaded account data
                        this.accountData = data;
                        if (this.accountData.PassportnNumber) {
                            this.accountData.PassportnNumber = parseInt( this.accountData.PassportnNumber.toString(), 0);
                        }
                        if (this.accountData.PassportSerial) {
                            this.accountData.PassportSerial = parseInt(this.accountData.PassportSerial.toString(), 0);
                        }
                        if (this.accountData.PassportIssued) {
                            this.accountData.PassportIssued = parseInt(this.accountData.PassportIssued.toString(), 0);
                        }
                        if (this.accountData.Telephone) {
                            this.accountData.Telephone = parseInt(this.accountData.Telephone.toString(), 0);
                        }
                        if (this.accountData.Mobile) {
                            this.accountData.Mobile = parseInt(this.accountData.Mobile.toString(), 0);
                        }
                        defer.resolve(this.accountData);
                    })
                    .catch((): void => {
                        defer.reject();
                    });
            }

            return defer.promise;
        }

        editAccount(data: IAccountData): angular.IPromise<ProfileResult> {
            var defer = this.$q.defer();

            this.$http
                .put('api/account', data)
                .success((account: ProfileResult): void => {
                    if (account.IsSuccessful) {
                        this.accountData = data;
                        defer.resolve(account);
                    } else {
                        defer.reject(account);
                    }
                })
                .error((): void => {
                    defer.reject();
                });

            return defer.promise;
        }

        changePassword(data: IChangePasswordModel): angular.IPromise<ChangePasswordResult> {
            var defer = this.$q.defer();

            this.$http
                .put('api/account/changepassword', data)
                .success((account: ChangePasswordResult): void => {
                    if (account.IsSuccessful) {
                        defer.resolve(account);
                    } else {
                        defer.resolve(account);
                    }
                })
                .error((): void => {
                    defer.reject();
                });

            return defer.promise;
        }

    }

    angular.module('nepereplaty').service('account', AccountService);
}