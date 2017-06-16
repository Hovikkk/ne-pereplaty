/// <reference path="app.ts" />

module admin {

    export class CompanyData {
        id: number;
        address: string;
        comments: string;
        name: string;
        contactName: string;
        telephone: string;
        email: string;
        insurances: string;
    }
    export class InsuredModel {
        id: number;
        name: string;
        surName: string;
        middleName: string;
        age: number;
        constructor(name: string, sur: string, mid: string, ag: number) {
            this.id = 0;
            this.name = name;
            this.surName = sur;
            this.middleName = mid;
            this.age = ag;
        }
    }
    export class OfferData {
        offerId: number;
        type: string;
        dataId: number;
        cost: number;
        companyId: number;
        companyName: string;
        startDate: string;
        endDate: string;
        buyer: string;
        buyerId: string;
        comments: string;
    }
    export class AccountData {
        public Name: string;
        public Surname: string;
        public Middlename: string;
        public Email: string;
        public Passport: string;
        public IsMale: boolean;
        public Birthday: Date;
        public BirthdayPolis: Date;
        public City: string;
        public Adress: string;
        public Telephone: any;
        public Mobile: any;
        public TelephoneCode: any;
        public MobileCode: any;

        public PassportnNumber: any;
        public PassportSerial: any;
        public PassportWhere: any;
        public PassportWhen: Date;
        public PassportIssued: any;
        public PassportName: any;
        public PassportSurname: any;
        constructor() {
            this.IsMale = true;
        }
    }
    

    export class Offer {
        buyer: string;
        buyerId: string;
        companyName: string;
        companyId: number;
        type: string;
        offerId: number;
        startDat: string;
        cost: number;
    }
    export class TravelingDetail {
        offerID: number;
        type: number;
        countries: string;
        duration: number;
        constructor() {
            this.offerID = 0;

        }
    }


    export interface IAdminService {
        currectUser: AccountData;
        currectCompany: CompanyData;
        currectOffer: OfferData;
    }

    export class AdminService implements IAdminService {
        public currectUser: AccountData;
        public currectCompany: CompanyData;
        public currectOffer: OfferData;
        constructor(private $http: angular.IHttpService,
            private $q: angular.IQService,
            private $timeout: angular.ITimeoutService) {

        }
    }

    angular.module('admin').service('AdminService', AdminService);
}