/// <reference path="../app.ts" />

module nepereplaty.casco {
   

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
    export class CASCODetailsForm {

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
    export class CascoOfferModel {
        basic: Basic;
        casco: CascoDetail;
        drivers: DriverDetail[];
        constructor() {
            this.basic = new Basic();
            this.casco = new CascoDetail();
            this.drivers = [];
        }
    }

    export class CascoDetail {
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

    export class DriversLicense {

        number: any;
        year: any;

        constructor() {
            this.number = null;
            this.year = null;
        }
    }

    export class CascoInsuranceForm {
        periodStart: Date;
        brand: any;
        model: any;
        carBody: any;
        modification: any;
        transmission: any;
        power: any;
        region: any;
        releaseYear: number;
        releaseYearIsLarge: boolean;
        isGuarantee: boolean;
        startUsingDate: Date;
        buyingDate: Date;
        carCost: number;
        franchise: any;
        isCredit: boolean;

        isIndividual: any;
        isOwner: any;
        drivers: Driver[];

        wasInsurance: any;
        wasClaims: any;
        carClaimsOneYearAgo: any;
        carClaimsTwoYearAgo: any;
        carClaimsThreeYearAgo: any;
        mutilationClaimsOneYearAgo: any;
        mutilationClaimsTwoYearAgo: any;
        mutilationClaimsThreeYearAgo: any;

        city: any;
        isLeftSideRudder: any;
        InsuranceMode: any;
        antiTheftSystem: any;
        antiTheftSystem_another: string;
        searchSystem: any;
        searchSystem_another: string;

        commissioner: any;
        evacuation: any;
        techSupport: any;
        policeReference: any;

        isAgreed: boolean;

        EngineHorsepower: any;
        EnginePowerKWt: any;
        GroupId: any;
        VehicleMarkModelCode: any;
        Model: any;
        Modification: any;
        VehicleMarkModelRAMICode: any;

        constructor() {
            this.periodStart = new Date();
            this.startUsingDate = new Date();
            this.buyingDate = new Date();
            this.carBody = { text: '--', value: null };
            this.modification = { text: '--', value: null };
            this.transmission = { text: '--', value: null };
            this.region = { text: '--', value: null };
            this.franchise = { text: '--', value: null };
            this.isIndividual = { text: '--', value: null };
            this.isOwner = { text: '--', value: null };
            this.wasInsurance = { text: 'Нет', value: 1 };
            this.wasClaims = { text: 'Нет', value: 1 };
            this.carClaimsOneYearAgo = { text: 'Нет', value: 1 };
            this.carClaimsTwoYearAgo = { text: 'Нет', value: 1 };
            this.carClaimsThreeYearAgo = { text: 'Нет', value: 1 };
            this.mutilationClaimsOneYearAgo = { text: 'Нет', value: 1 };
            this.mutilationClaimsTwoYearAgo = { text: 'Нет', value: 1 };
            this.mutilationClaimsThreeYearAgo = { text: 'Нет', value: 1 };
            this.isLeftSideRudder = { text: '--', value: null };
            this.antiTheftSystem = { text: '--', value: null };
            this.searchSystem = { text: '--', value: null };
            this.releaseYearIsLarge = false;
 //           this.commissioner = { text: '--', value: null };
 //           this.evacuation = { text: '--', value: null };
 //           this.techSupport = { text: '--', value: null };
 //           this.policeReference = { text: '--', value: null };
            this.drivers = [];
            this.isAgreed = false;
            this.InsuranceMode = null;
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

    export class CASCOInsuracneOffer {
        Company: InsuracneCompany;
        Name: string;
        Price: string;
        osagoPrice: string;
        AntiTheftSystem: any;
        AdditionalOptions: AdditionalOption[];
        Description: string;
        IsShown: boolean;
        isCompair: boolean;
        constructor() {
            this.AdditionalOptions = [];
            this.IsShown = false;
            this.isCompair = false;
        }
    }

    export class CASCOInsuranceOffers {
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
        Offers: CASCOInsuracneOffer[];
    }

    export interface ICASCOService {
        getOffers(): CASCOInsuranceOffers;
        offerIndex: any;
        offerId: number;
        loadOffers(request: CascoInsuranceForm): angular.IHttpPromise<{}>;
        buyerInfo: CASCODetailsForm;
        totoalPrice: number;
        driver: Driver[];
    }

    export class CASCOService implements ICASCOService {
        private offers: CASCOInsuranceOffers;
        public offerIndex: any;
        public offerId: number;
        public buyerInfo: CASCODetailsForm;
        public totoalPrice: number;
        public driver: Driver[];
        // @ngInject
        constructor(private $http: angular.IHttpService,
            private $q: angular.IQService,
            private $timeout: angular.ITimeoutService) {
            this.offerIndex = 0;
            this.driver = [];
        }

        loadOffers(request: CascoInsuranceForm): angular.IHttpPromise<{}> {
            return this.$http.post('api/casco/insuranceoffer', request)
                .success((response: CASCOInsuranceOffers) => {
                    this.offers = response;
                });
        }

        getOffers(): CASCOInsuranceOffers {
            return this.offers;
        }
    }

    angular.module('nepereplaty').service('CASCOService', CASCOService);
}