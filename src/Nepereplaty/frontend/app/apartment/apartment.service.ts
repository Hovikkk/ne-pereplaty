/// <reference path="../app.ts" />

module nepereplaty.apartment {

    export class APARTMENTOffer {

        Offers: APARTMENTInsuracneOffer[];
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


            this.Offers = APARTMENTInsuracneOffer[2];
        }
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
    export class APARTMENTInsuracneOffer {
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
    export class InsuracneCompany {
        Id: number;
        Name: string;
        Price: string;
        Logo: string;
    }
    export class APARTMENTInsuranceOffers {
        InsuranceType: string;
        startData: string;
        Offers: APARTMENTInsuracneOffer[];
    }
    export class AdditionalOption {
        Name: string;
        Description: string;
        constructor(name: string, des: string) {
            this.Name = name;
            this.Description = des;
        }
    }
    export class APARTMENTDetailsForm {
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


        constructor() {
            this.IsMale = 0;
            this.Birthday = new Date();
            this.MobileCode = { text: '--', value: null };
            this.TelephoneCode = { text: '--', value: null };
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

    export class APARTMENTForm {
        startData: Date;
        region: any;
        area: number;
        property: boolean;
        rent: boolean;
        sum: number;
        constructor() {
            this.startData = new Date();
            this.region = { text: '--', value: null };     
        }
    }

    export class OtherAdress {
        region: string;
        city: string;
        adress: string;
        isAre: boolean;
    }

    export interface IAPARTMENTService {
        buyerInfo: APARTMENTDetailsForm;
        offerIndex: any;
        getOffers(): APARTMENTOffer;
        loadOffers(request: APARTMENTForm): angular.IHttpPromise<{}>;
        totoalPrice: number;
        otherAndress: OtherAdress;
        offerId: number;
    }
    export class APARTMENTService implements IAPARTMENTService {
        offerIndex: any;
        public offerId: number;
        public buyerInfo: APARTMENTDetailsForm;
        public offers: APARTMENTOffer;
        public otherAndress: OtherAdress;
        constructor(private $http: angular.IHttpService,
            private $q: angular.IQService,
            private $timeout: angular.ITimeoutService) {
            this.offerIndex = null;
            this.otherAndress = new OtherAdress();
            this.otherAndress.isAre = false;
        }
        getOffers(): APARTMENTOffer {
            return this.offers;
        }
        loadOffers(request: APARTMENTForm): angular.IHttpPromise<{}> {
            return this.$http.post('api/apartment/insuranceoffer', request)
                .success((response: APARTMENTOffer) => {
                    console.log(response);
                    this.offers = response;
                    console.log(this.offers);
                });
        }
        totoalPrice: number;
    }
    angular.module('nepereplaty').service('APARTMENTService', APARTMENTService);
}