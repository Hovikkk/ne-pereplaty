/// <reference path="../app.ts" />
module nepereplaty.accident {

    export class Insured {
        age: any;
        experience: any;
        isMale: boolean;
        martialStatus: any;
        kids: any;

        bd: Date;

        bdShow: boolean;

        constructor() {
            this.isMale = null;
            this.martialStatus = { text: '--', value: null };
            this.kids = { text: '--', value: null };
            this.bd = null;
            this.bdShow = false;
        }
    }

    export class AccidentOfferModel {
        basic: Basic;
        accident: AccidentDetail;
        insured: InsuredModel;
        constructor() {
            this.basic = new Basic();
            this.accident = new AccidentDetail();
            this.insured = new InsuredModel();
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

    export class AccidentDetail {
        offerId: number;
        isSelf: boolean;
        amateurSports: boolean;
        duration: number;
        constructor() {
            this.offerId = 0;
            
        }
    }

    export class InsuredModel {
        id: number;
        name: string;
        surName: string;
        middleName: string;
        age: number;
        constructor() {
            this.id = 0;
            this.name = 'name';
            this.surName = 'surName';
            this.middleName = 'middleName';
            this.age = 36;
        }
    }
    export class ACCIDENTOffer {
        Offers: ACCIDENTInsuracneOffer[];
        termInsurance: string;
        includesExcludes: string;
        age: string;
        amateurSports: boolean;
        duration: number;
        otherPerson: boolean;
        name: string;
        orderNumber: string;
        insurancePolicy: string;
        companyName: string;
        startData: string;
        endData: string;
        address: string;
        priceString: string;
        passportData: string;
        limitation: string;

        Price: string;
        SumPrice: string;

        constructor() {
            this.termInsurance = '';
            this.includesExcludes = '';
            this.age = '';

            this.name = '';
            this.orderNumber = '';
            this.insurancePolicy = '';
            this.companyName = '';
            this.startData = '';
            this.endData = '';
            this.address = '';
            this.priceString = '';
            this.passportData = '';
            this.limitation = '';


            this.Price = '';
            this.SumPrice = '';


            this.Offers = ACCIDENTInsuracneOffer[2];
        }
    }
    export class AccidentCountry {
        value: any;
    }
    export class ACCIDENTForm {
        startData: Date;

        duration: any;
        otherPerson: boolean;
        age: number;
        amateurSports: boolean;
        region: any;
        constructor() {
            this.startData = new Date();
            this.duration = { text: '--', value: null };
            this.otherPerson = null;
            this.age = null;
            this.amateurSports = null;
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

    export class AccidentInsuranceForm {
        year: number;
        cityNumber: any;
        AgeInsureds: number;
        periodStart: Date;
        periodFinish: Date;
        birthDay: Date;
        accidentForRent: boolean;
        releaseYearIsLarge: boolean;
        releaseYear: number;
        coveringStatus: any;
        isAgreed: boolean;
        WhoInsured: boolean;
        walls: any;
        addBuilding: any;
        accidentCost: number;
        countries: AccidentCountry[];
        insureds: Insured[];
        constructor() {
            this.isAgreed = false;
            this.AgeInsureds = null;
            this.WhoInsured = null;
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
    export class ACCIDENTInsuracneOffer {
        Company: InsuracneCompany;
        AdditionalOptions: AdditionalOption[];
        Name: string;
        Price: string;
        AntiTheftSystem: any;
        Description: string;
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
    export class ACCIDENTInsuranceOffers {
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
        Offers: ACCIDENTInsuracneOffer[];
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
        name: any;
        surName: any;
        middleName: any;
        isMale: number;
        Birthday: Date;
        isShow: boolean;
        constructor() {
            this.Birthday = new Date();
            this.isMale = 0;
        }
    }
    export class Passport {
        serial: number;
        number: number;
        when: Date;
        issued: number;
        where: any;
        showWhan: boolean;
        Document: number;
        constructor() {
            this.Document = 1;
        }
    }

    export class AdditionACCIDENTData {
        privateData: PrivateData;
        pasport: Passport;
        constructor() {
            this.privateData = new PrivateData();
            this.pasport = new Passport();
        }

    }
    export class ACCIDENTDetailsForm {
        Name: string;
        Surname: string;
        Middlename: string;
        Email: string;
        Passport: number;
        IsMale: number;
        Birthday: Date;
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
        PassportIssued: any;



        additiolData: AdditionACCIDENTData;


        insureds: InsuredsLicense[];

        constructor() {
            this.IsMale = 0;
            this.Birthday = new Date();
            this.BirthdayPolis = new Date();
            this.MobileCode = { text: '--', value: null };
            this.TelephoneCode = { text: '--', value: null };
            this.insureds = [];
            this.PassportWhere = null;
            this.PassportWhen = null;
            this.PassportIssued = null;


            this.City = null;
            this.Adress = null;
            this.additiolData = new AdditionACCIDENTData();
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
    export interface IACCIDENTService {
        AdditionalOptions: AdditionalOption;
        getOffers(): ACCIDENTOffer;
        offerIndex: any;
        offerId: number;
        buyerInfo: ACCIDENTDetailsForm;
        loadOffers(request: ACCIDENTForm): angular.IHttpPromise<{}>;
        totoalPrice: number;
    }
    export class ACCIDENTService implements IACCIDENTService {
        public offerIndex: any;
        public offerId: number;
        public offers: ACCIDENTOffer;
        public AdditionalOptions: AdditionalOption;
        public buyerInfo: ACCIDENTDetailsForm;
        public totoalPrice: number;
        constructor(private $http: angular.IHttpService,
            private $q: angular.IQService,
            private $timeout: angular.ITimeoutService) {
            this.offerIndex = null;
        }

        getOffers(): ACCIDENTOffer {
            return this.offers;
        }

        getAdditional(): AdditionalOption {
            return this.AdditionalOptions;
        }

        loadOffers(request: ACCIDENTForm): angular.IHttpPromise<{}> {
            return this.$http.post('api/accident/insuranceoffer', request)
                .success((response: ACCIDENTOffer) => {

                    this.offers = response;
                    console.log(this.offers);
                });
        }
    }
    angular.module('nepereplaty').service('ACCIDENTService', ACCIDENTService);
}