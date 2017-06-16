/// <reference path="../app.ts" />
module nepereplaty.traveling {

    export class Insured {
       bd: Date;
       bdShow: boolean;

        constructor() {
            this.bd = null;
            this.bdShow = false;
        }
    }

    export class TravelingOfferModel {
        basic: Basic;
        traveling: TravelingDetail;
        insured: InsuredModel[];
        constructor() {
            this.basic = new Basic();
            this.traveling = new TravelingDetail();
            this.insured = [];
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
            this.comments = '';
        }
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

    export class TRAVELINGOffer {
        Offers: TRAVELINGInsuracneOffer[];
        submodule: string;
        termInsurance: string;
        InsuranceType: number;
        name: string;
        orderNumber: string;
        insurancePolicy: string;
        companyName: string;
        startData: string;
        endData: string;
        address: string;
        priceString: string;
        city: string;
        Price: string;
        SumPrice: string;
        insureds: Insured[];
        insuredsCount: string;
        insuredsAges: string;
        country: string;
        travelingDur: string;

       constructor() {
            this.submodule = '';
            this.termInsurance = '';
            this.country = '';
            this.travelingDur = '';
            this.name = '';
            this.orderNumber = '';
            this.insurancePolicy = '';
            this.companyName = '';
            this.startData = '';
            this.endData = '';
            this.address = '';
            this.priceString = '';
            this.city = '';
            this.insuredsCount = '';
            this.Price = '';
            this.SumPrice = '';
            this.insuredsAges = '';
            this.insureds = [];
            this.Offers = TRAVELINGInsuracneOffer[2];
        }
    }
    export class TravelingCountry {
        value: any;
        countryFunc: any;

        constructor() {
            this.value = {};
        }
    }
    export class Country {
        id: string; 
        name: string;
        sheng: boolean;
        cis :boolean;
        ipInc : number;
        c : number;
        ps1: number;
        code : string;
    }
    export class TRAVELINGForm {
        leisureOrSports: boolean;
        chronic: boolean;
        pregnant: boolean;
        currencyAndSum: any;
        periodStart: Date;
        periodFinish: Date;
        insureds: any[];
        countries: any[];
        choiceInsurance: any;
        duration: any;
        isAgreed: boolean;
        constructor() {
            this.countries = [];
            this.periodStart = new Date();
            this.periodStart.setDate(this.periodStart.getDate() + 3);
            this.periodFinish = new Date();
            this.periodFinish.setDate(this.periodFinish.getDate() + 10);
            this.currencyAndSum = { text: '--', value: null };
            this.choiceInsurance = {
                text: 'Разовая',
                value: 1
            };
            this.duration = { text: '--', value: null };
            this.insureds = [];
            this.isAgreed = false;
        }
    }
    export class AdditionalStructure {
        type: any;
        cost: number;
        constructor(t: number = null, c: number = null) {
            if (t == null) {
                this.type = { value: null, text: '--' };
            } else {
                this.type = t;
            }
            this.cost = c;
        }
    }

    export class TravelingInsuranceForm {
        year: number;
        cityNumber: any;
        periodStart: Date;
        periodFinish: Date;
        birthDay: Date;
        travelingForRent: boolean;
        releaseYearIsLarge: boolean;
        releaseYear: number;
        coveringStatus: any;
        isAgreed: boolean;
        leisureOrSports: boolean;
        chronic: boolean;
        pregnant: boolean;
        walls: any;
        addBuilding: any;
        travelingCost: number;
        countries: TravelingCountry[];
        insureds: Insured[];
        constructor() {
            this.isAgreed = false;
            this.leisureOrSports = null;
            this.chronic = null;
            this.pregnant = null;
            this.cityNumber = null;
            this.walls = { text: '--', value: null };
            this.addBuilding = { text: '--', value: null };
            this.coveringStatus = { text: '--', value: null };
            this.periodStart = new Date();
            this.periodFinish = new Date();
            this.birthDay = new Date();
            this.releaseYearIsLarge = false;
            this.countries = [];
            this.insureds = [];
        }
    }

    export class InsuracneCompany {
        Id: number;
        Name: string;
        Price: string;
        Logo: string;
    }

    export class TRAVELINGInsuracneOffer {
        Company: InsuracneCompany;
        AdditionalOptions: AdditionalOption[];
        Name: string;
        Price: string;
        IsShown: boolean;
        isCompair: boolean;
        Total_SS: number;
        Total_SP: number;
        Damage_SP: number;
        Liquid_Spill_SP: number;
        Luxury_SP: number;
        Dop_Total_SP: number;
        constructor() {
            this.AdditionalOptions = [];
            this.IsShown = false;
            this.isCompair = false;
        }
    }
    export class TRAVELINGInsuranceOffers {
        InsuranceType: string;
        CarBrand: string;
        CarModel: string;
        CarReleaseYear: number;
        InsuredsCount: number;
        InsuredsMinAge: number;
        Commissioner: string;
        Evacuation: string;
        TechSupport: string;
        PoliceReference: string;
        startData: string;
        Offers: TRAVELINGInsuracneOffer[];
    }

    export class AdditionalOption {
        Name: string;
        Description: string;
        constructor(name: string, des: string) {
            this.Name = name;
            this.Description = des;
        }
    }
    export class PrivateData {
        NamePolis: any;
        SurnamePolis: any;
        PatronymicPolis: any;
        Gender: any;
        BirthdayPolis: Date;
        isShow: boolean;
        age: string;
        constructor() {
            this.BirthdayPolis = new Date();
           }
    }
    export class OutBorderPassport {
        PassportNameHuman: any;
        PassportSurnameHuman: any;
        PassportSerialHuman: any;
        PassportnNumberHuman: any;
        PassportWhenHuman: Date;
        PassportIssuedHuman: any;
        passportShowWhanHuman: boolean;

    }

    export class AdditionTrevalerData {
        privateData: PrivateData;
        outBorderPassport: OutBorderPassport;
        isMiddle: boolean;
        constructor() {
            this.privateData = new PrivateData();
            this.outBorderPassport = new OutBorderPassport();
        }
    }
    export class TRAVELINGDetailsForm {
        Name: string;
        Surname: string;
        Middlename: string;
        Email: string;
        Passport: string;
        IsMale: number;
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

        

        additiolData: AdditionTrevalerData[];
       

        insureds: InsuredsLicense[];

        constructor() {
            this.IsMale = 0;
            this.Birthday = new Date();
            this.MobileCode = { text: '--', value: null };
            this.TelephoneCode = { text: '--', value: null };
            this.insureds = [];


            this.PassportnNumber = null;
            this.PassportSerial = null;
            this.PassportWhere = null;
            this.PassportWhen = null;
            this.PassportIssued = null;

     
            this.City = null;
            this.Adress = null;
            this.additiolData = [];
        }
    }
    export class InsuredsLicense {

        number: any;
        year: any;

        constructor() {
            this.number = null;
            this.year = null;
        }
    }
    export interface ITRAVELINGService {
        AdditionalOptions: AdditionalOption;
        getOffers(): TRAVELINGOffer;
        offerIndex: any;
        offerId: number;
        buyerInfo: TRAVELINGDetailsForm;
        loadOffers(request: TRAVELINGForm): angular.IHttpPromise<{}>;
        totoalPrice: number;
    }
    export class TRAVELINGService implements ITRAVELINGService {
        public offerIndex: any;
        public offerId: number;
        public offers: TRAVELINGOffer;
        public AdditionalOptions: AdditionalOption;
        public buyerInfo: TRAVELINGDetailsForm;
        public totoalPrice: number;
        constructor(private $http: angular.IHttpService,
            private $q: angular.IQService,
            private $timeout: angular.ITimeoutService) {
            this.offerIndex = null;
        }

        getOffers(): TRAVELINGOffer {
            return this.offers;
        }

        getAdditional(): AdditionalOption {
            return this.AdditionalOptions;
        }

        loadOffers(request: TRAVELINGForm): angular.IHttpPromise<{}> {
            return this.$http.post('api/traveling/insuranceoffer', request)
                .success((response: TRAVELINGOffer) => {

                    this.offers = response;
                    console.log(this.offers);
                });
        }
    }
    angular.module('nepereplaty').service('TRAVELINGService', TRAVELINGService);
}