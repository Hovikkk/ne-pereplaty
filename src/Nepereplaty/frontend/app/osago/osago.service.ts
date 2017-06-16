/// <reference path="../app.ts" />

module nepereplaty.osago {


    export class Driver {
        age: any;
        experience: any;
        isMale: boolean;
        martialStatus: any;
        kids: any;

        constructor() {
            this.isMale = null;
            this.martialStatus = { text: '--', value: null };
            this.kids = { text: '--', value: null };
        }
    }


    export class OSAGODetailsForm {

        Name: string;
        Surname: string;
        Middlename: string;
        Email: string;
        Passport: string;
        IsMale: boolean;
        Birthday: Date;
        City: string;
        Adress: string;
        Telephone: any;
        Mobile: any;
        TelephoneCode: any;
        MobileCode: any;


        PassportnNumber: any;
        PassportSerial: any;
        PassportWhere: any;
        PassportWhen: Date;
        PassportIssued: any;

        drivers: DriversLicense[];
       
        constructor() {
            this.IsMale = null;
            this.Birthday = new Date();
            this.MobileCode = { text: '--', value: null };
            this.TelephoneCode = { text: '--', value: null };
            this.drivers = [];
            this.PassportnNumber = null;
            this.PassportSerial = null;
            this.PassportWhere = null;
            this.PassportWhen = null;
            this.PassportIssued = null;
            this.City = null;
            this.Adress = null;
        }
    }

    export class DriversLicense {

        number: any;
        year: any;

        constructor() {
            this.number = null;
            this.year = null;
        }
    }

    export class OsagoOfferModel {
        basic: Basic;
        osago: OsagoDetail;
        drivers: DriverDetail[];
        constructor() {
            this.basic = new Basic();
            this.osago = new OsagoDetail();
            this.drivers = [];
        }
    }
    
    export class OsagoDetail {
        offerId: number;
        drivers: string;
        brand: string;
        model: string;
        carBody: string;
        constructor() {
            this.offerId = 0;

        }
    }
    export class DriverDetail {
        id: number;
        age: number;
        experience: number;
        isMale: boolean;
        kids: number;
        martialStatus: number;
        constructor(a: number, ex: number, im: boolean, k: number, m: number) {
            this.id = 0;
            this.age = a;
            this.experience = ex;
            this.isMale = im;
            this.kids = k;
            this.martialStatus = m;
        }
    }
    export class Basic {
        offerId: number;
        type: string;
        dataId: number;
        cost: number;
        startDate: string;
        endDate: string;
        buyer: string;
        comments: string;
        companyId: number;
        constructor() {
            this.offerId = 0;
            this.dataId = 0;
        }
    }

    export class OsagoInsuranceForm {
        periodStart: Date;
        year: number;
        brand: any;
        model: any;
        carBody: any;
        modification: any;
        transmission: any;
        power: any;
        region: any;
        releaseYearIsLarge: boolean;
        startUsingDate: Date;
        carCost: number;

        isIndividual: any;
        isOwner: any;
        drivers: Driver[];
        isAgreed: boolean;

        constructor() {
            this.periodStart = new Date();
            this.startUsingDate = new Date();
            this.carBody = { text: '--', value: null };
            this.modification = { text: '--', value: null };
            this.transmission = { text: '--', value: null };
            this.region = { text: '--', value: null };
            this.isIndividual = { text: '--', value: null };
            this.isOwner = { text: '--', value: null };
            this.drivers = [];
            this.isAgreed = false;
            this.releaseYearIsLarge = false;
        }
    }

    export class InsuracneCompany {
        Id: number;
        Name: string;
        Logo: string;
    }

    export class AdditionalOption {
        Name: string;
        Description: string;
    }

    export class OSAGOInsuracneOffer {
        Company: InsuracneCompany;
        Name: string;
        Price: string;
        AntiTheftSystem: any;
        AdditionalOptions: AdditionalOption[];
        Description: string;
        IsShown: boolean;
        IsclickInPhone: boolean;
        IsclickInEmail: boolean;
        constructor() {
            this.AdditionalOptions = [];
            this.IsShown = false;
            this.IsclickInPhone = false;
            this.IsclickInEmail = false;
        }
    }

    export class OSAGOInsuranceOffers {
        InsuranceType: string;
        CarBrand: string;
        CarModel: string;
        CarReleaseYear: number;
        DriversCount: number;
        DriversMinAge: number;
        Commissioner: string;
        Evacuation: string;
        TechSupport: string;
        PoliceReference: string;
        startData: string;
        endData: string;
        Offers: OSAGOInsuracneOffer[];
    }

    export interface IOSAGOService {
        offerIndex: number;
        getOffers(): OSAGOInsuranceOffers;
        loadOffers(request: OsagoInsuranceForm): angular.IHttpPromise<{}>;
        buyerInfo: OSAGODetailsForm;
        driver: Driver[];
        offerId: number;
    }

    export class OSAGOService implements IOSAGOService {
        private offers: OSAGOInsuranceOffers;
        public offerIndex: number;
        public offerId: number;
        public buyerInfo: OSAGODetailsForm;
        public driver: Driver[];
        // @ngInject
        constructor(private $http: angular.IHttpService,
            private $q: angular.IQService,
            private $timeout: angular.ITimeoutService) {
            this.offerIndex = 0;
            this.driver = [];
        }

        loadOffers(request: OsagoInsuranceForm): angular.IHttpPromise<{}> {
            return this.$http.post('api/osago/insuranceoffer', request)
                .success((response: OSAGOInsuranceOffers) => {
                    this.offers = response;
                });
        }

        getOffers(): OSAGOInsuranceOffers {
            return this.offers;
        }
    }

    angular.module('nepereplaty').service('OSAGOService', OSAGOService);
}