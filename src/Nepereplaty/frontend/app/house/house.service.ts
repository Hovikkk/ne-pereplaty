/// <reference path='../app.ts' />

module nepereplaty.house {

    export class Estate {
        
        additionalBuilding: any;
        cost: number;
        constructor() {
              this.additionalBuilding = { text: '--', value: null };
              this.cost = null;
        }
    }

    export class HOUSEOffer {
        Offers: HOUSEInsuracneOffer[];
        submodule: string;
        termInsurance: string;
        AdditionalStructures: string;

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

        constructor() {
            this.submodule = '';
            this.termInsurance = '';
            this.AdditionalStructures = '';

            this.name = '';
            this.orderNumber = '';
            this.insurancePolicy = '';
            this.companyName = '';
            this.startData = '';
            this.endData = '';
            this.address = '';
            this.priceString = '';
            this.city = '';

            this.Price = '';
            this.SumPrice = '';
            

            this.Offers = HOUSEInsuracneOffer[2];
        }
    }
    export class HOUSEForm {
         region:any;
         year: number;
         rent: boolean;
         cover: any;
         periodStart: Date;
         AdditionalStructure: AdditionalStructure[];
         startData: Date;
         AdditionalStructures: string;
         constructor() {
             this.AdditionalStructure = [];
             this.periodStart = new Date();
             this.cover = { text: '--', value: null };
             this.AdditionalStructures = '';
    }
    }
    export class AdditionalStructure {
        type :any;
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

    export class HouseInsuranceForm {
        year: number;
        cityNumber: any;
        periodStart: Date;
        houseForRent: boolean;
        releaseYearIsLarge: boolean;
        releaseYear: number;
        coveringStatus: any;
        isAgreed: boolean;
        rent: boolean;
        walls: any;
        addBuilding: any;
        houseCost: number;
        estates: Estate[];
        constructor() {
            this.isAgreed = false;
            this.rent = null;
            this.cityNumber = null;
            this.walls = { text: '--', value: null };
            this.addBuilding = { text: '--', value: null };
            this.coveringStatus = { text: '--', value: null };
            this.periodStart = new Date();
            this.releaseYearIsLarge = false;
            this.estates = [];
        }
    }

    export class InsuracneCompany {
        Id: number;
        Name: string;
        Price: string;
        Logo: string;
    }
    export class HOUSEInsuracneOffer {
        Company: InsuracneCompany;
        AdditionalOptions: AdditionalOption[];
        Name: string;
        Price: string;
        AntiTheftSystem: any;
        Description: string;
        IsShown: boolean;
        isCompair: boolean;
        Total_SS :  number;
        Total_SP : number;
        Damage_SP : number;
        Liquid_Spill_SP: number; 
        Luxury_SP : number;
        Dop_Total_SP: number;
        constructor() {
            this.AdditionalOptions = [];
            this.IsShown = false;
            this.isCompair = false;
        }
    }
    export class HOUSEInsuranceOffers {
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
        Offers: HOUSEInsuracneOffer[];
    }

    export class AdditionalOption {
        Name: string;
        Description: string;
        constructor(name: string, des: string) {
            this.Name = name;
            this.Description = des;
        }
    } 
    export class HOUSEDetailsForm {
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

        Region: any;
        InformationCity: any;
        FullAdress: any;
        Coincidence: any;

        drivers: DriversLicense[];

        constructor() {
            this.IsMale = 0;
            this.Birthday = new Date();
            this.MobileCode = { text: '--', value: null };
            this.TelephoneCode = { text: '--', value: null };
            this.drivers = [];
            this.PassportnNumber = null;
            this.PassportSerial = null;
            this.PassportWhere = null;
            this.PassportWhen = null;
            this.PassportIssued = null;
            this.Region = null;
            this.InformationCity = null;
            this.FullAdress = null;
            this.Coincidence = null;
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
    export class OtherAdress {
        region: string;
        city: string;
        adress: string;
        isAre: boolean;
    }
    export class ApartmentOfferModel {
        basic: Basic;
        home: ApartmentDetail;
        constructor() {
            this.basic = new Basic();
            this.home = new ApartmentDetail();
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

    export class ApartmentDetail {
        offerId: number;
        region: string;
        city: string;
        address: string;
        constructor() {
            this.offerId = 0;
        }
    }
    export interface IHOUSEService {
        AdditionalOptions: AdditionalOption;
        getOffers(): HOUSEOffer;
        offerIndex: any;
        buyerInfo: HOUSEDetailsForm;
        loadOffers(request: HOUSEForm): angular.IHttpPromise<{}>;
        totoalPrice: number;
        otherAndress: OtherAdress;
        offerId: number;

    }
    export class HOUSEService implements IHOUSEService {
        public offerIndex: any;
        public offerId: number;
        public offers: HOUSEOffer;
        public AdditionalOptions: AdditionalOption;
        public buyerInfo: HOUSEDetailsForm;
        public totoalPrice: number;
        public otherAndress: OtherAdress;
        constructor(private $http: angular.IHttpService,
            private $q: angular.IQService,
            private $timeout: angular.ITimeoutService) {
            this.offerIndex = null;
            this.otherAndress = new OtherAdress();
            this.otherAndress.isAre = false;
        }

        getOffers(): HOUSEOffer {
            return this.offers;
        }

        getAdditional(): AdditionalOption {
            return this.AdditionalOptions;
        }

        loadOffers(request: HOUSEForm): angular.IHttpPromise<{}> {
            return this.$http.post('api/house/insuranceoffer', request)
                .success((response: HOUSEOffer) => {
                    
                    this.offers = response;
                    console.log(this.offers);
                });
        }
    }
    angular.module('nepereplaty').service('HOUSEService', HOUSEService);
}
