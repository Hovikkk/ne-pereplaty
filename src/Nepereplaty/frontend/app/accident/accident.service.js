/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var accident;
    (function (accident) {
        var Insured = (function () {
            function Insured() {
                this.isMale = null;
                this.martialStatus = { text: '--', value: null };
                this.kids = { text: '--', value: null };
                this.bd = null;
                this.bdShow = false;
            }
            return Insured;
        })();
        accident.Insured = Insured;
        var AccidentOfferModel = (function () {
            function AccidentOfferModel() {
                this.basic = new Basic();
                this.accident = new AccidentDetail();
                this.insured = new InsuredModel();
            }
            return AccidentOfferModel;
        })();
        accident.AccidentOfferModel = AccidentOfferModel;
        var Basic = (function () {
            function Basic() {
                this.offerId = 0;
                this.dataId = 0;
                this.comments = '';
            }
            return Basic;
        })();
        accident.Basic = Basic;
        var AccidentDetail = (function () {
            function AccidentDetail() {
                this.offerId = 0;
            }
            return AccidentDetail;
        })();
        accident.AccidentDetail = AccidentDetail;
        var InsuredModel = (function () {
            function InsuredModel() {
                this.id = 0;
                this.name = 'name';
                this.surName = 'surName';
                this.middleName = 'middleName';
                this.age = 36;
            }
            return InsuredModel;
        })();
        accident.InsuredModel = InsuredModel;
        var ACCIDENTOffer = (function () {
            function ACCIDENTOffer() {
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
            return ACCIDENTOffer;
        })();
        accident.ACCIDENTOffer = ACCIDENTOffer;
        var AccidentCountry = (function () {
            function AccidentCountry() {
            }
            return AccidentCountry;
        })();
        accident.AccidentCountry = AccidentCountry;
        var ACCIDENTForm = (function () {
            function ACCIDENTForm() {
                this.startData = new Date();
                this.duration = { text: '--', value: null };
                this.otherPerson = null;
                this.age = null;
                this.amateurSports = null;
            }
            return ACCIDENTForm;
        })();
        accident.ACCIDENTForm = ACCIDENTForm;
        var AdditionalStructure = (function () {
            function AdditionalStructure(t, c) {
                if (t === void 0) { t = null; }
                if (c === void 0) { c = null; }
                if (t == null) {
                    this.type = { value: null, text: '--' };
                }
                else {
                    this.type = t;
                }
                this.cost = c;
            }
            return AdditionalStructure;
        })();
        accident.AdditionalStructure = AdditionalStructure;
        var AccidentInsuranceForm = (function () {
            function AccidentInsuranceForm() {
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
            return AccidentInsuranceForm;
        })();
        accident.AccidentInsuranceForm = AccidentInsuranceForm;
        var InsuracneCompany = (function () {
            function InsuracneCompany() {
            }
            return InsuracneCompany;
        })();
        accident.InsuracneCompany = InsuracneCompany;
        var ACCIDENTInsuracneOffer = (function () {
            function ACCIDENTInsuracneOffer() {
                this.AdditionalOptions = [];
                this.IsShown = false;
                this.isCompair = false;
            }
            return ACCIDENTInsuracneOffer;
        })();
        accident.ACCIDENTInsuracneOffer = ACCIDENTInsuracneOffer;
        var ACCIDENTInsuranceOffers = (function () {
            function ACCIDENTInsuranceOffers() {
            }
            return ACCIDENTInsuranceOffers;
        })();
        accident.ACCIDENTInsuranceOffers = ACCIDENTInsuranceOffers;
        var AdditionalOption = (function () {
            function AdditionalOption(name, des) {
                this.Name = name;
                this.Description = des;
            }
            return AdditionalOption;
        })();
        accident.AdditionalOption = AdditionalOption;
        var PrivateData = (function () {
            function PrivateData() {
                this.Birthday = new Date();
                this.isMale = 0;
            }
            return PrivateData;
        })();
        accident.PrivateData = PrivateData;
        var Passport = (function () {
            function Passport() {
                this.Document = 1;
            }
            return Passport;
        })();
        accident.Passport = Passport;
        var AdditionACCIDENTData = (function () {
            function AdditionACCIDENTData() {
                this.privateData = new PrivateData();
                this.pasport = new Passport();
            }
            return AdditionACCIDENTData;
        })();
        accident.AdditionACCIDENTData = AdditionACCIDENTData;
        var ACCIDENTDetailsForm = (function () {
            function ACCIDENTDetailsForm() {
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
            return ACCIDENTDetailsForm;
        })();
        accident.ACCIDENTDetailsForm = ACCIDENTDetailsForm;
        var InsuredsLicense = (function () {
            function InsuredsLicense() {
                this.number = null;
                this.year = null;
            }
            return InsuredsLicense;
        })();
        accident.InsuredsLicense = InsuredsLicense;
        var ACCIDENTService = (function () {
            function ACCIDENTService($http, $q, $timeout) {
                this.$http = $http;
                this.$q = $q;
                this.$timeout = $timeout;
                this.offerIndex = null;
            }
            ACCIDENTService.prototype.getOffers = function () {
                return this.offers;
            };
            ACCIDENTService.prototype.getAdditional = function () {
                return this.AdditionalOptions;
            };
            ACCIDENTService.prototype.loadOffers = function (request) {
                var _this = this;
                return this.$http.post('api/accident/insuranceoffer', request)
                    .success(function (response) {
                    _this.offers = response;
                    console.log(_this.offers);
                });
            };
            return ACCIDENTService;
        })();
        accident.ACCIDENTService = ACCIDENTService;
        angular.module('nepereplaty').service('ACCIDENTService', ACCIDENTService);
    })(accident = nepereplaty.accident || (nepereplaty.accident = {}));
})(nepereplaty || (nepereplaty = {}));
