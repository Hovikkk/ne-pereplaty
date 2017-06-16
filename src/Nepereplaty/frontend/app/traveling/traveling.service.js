/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var traveling;
    (function (traveling) {
        var Insured = (function () {
            function Insured() {
                this.bd = null;
                this.bdShow = false;
            }
            return Insured;
        })();
        traveling.Insured = Insured;
        var TravelingOfferModel = (function () {
            function TravelingOfferModel() {
                this.basic = new Basic();
                this.traveling = new TravelingDetail();
                this.insured = [];
            }
            return TravelingOfferModel;
        })();
        traveling.TravelingOfferModel = TravelingOfferModel;
        var Basic = (function () {
            function Basic() {
                this.offerId = 0;
                this.dataId = 0;
                this.comments = '';
            }
            return Basic;
        })();
        traveling.Basic = Basic;
        var TravelingDetail = (function () {
            function TravelingDetail() {
                this.offerID = 0;
            }
            return TravelingDetail;
        })();
        traveling.TravelingDetail = TravelingDetail;
        var InsuredModel = (function () {
            function InsuredModel(name, sur, mid, ag) {
                this.id = 0;
                this.name = name;
                this.surName = sur;
                this.middleName = mid;
                this.age = ag;
            }
            return InsuredModel;
        })();
        traveling.InsuredModel = InsuredModel;
        var TRAVELINGOffer = (function () {
            function TRAVELINGOffer() {
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
            return TRAVELINGOffer;
        })();
        traveling.TRAVELINGOffer = TRAVELINGOffer;
        var TravelingCountry = (function () {
            function TravelingCountry() {
                this.value = {};
            }
            return TravelingCountry;
        })();
        traveling.TravelingCountry = TravelingCountry;
        var Country = (function () {
            function Country() {
            }
            return Country;
        })();
        traveling.Country = Country;
        var TRAVELINGForm = (function () {
            function TRAVELINGForm() {
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
            return TRAVELINGForm;
        })();
        traveling.TRAVELINGForm = TRAVELINGForm;
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
        traveling.AdditionalStructure = AdditionalStructure;
        var TravelingInsuranceForm = (function () {
            function TravelingInsuranceForm() {
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
            return TravelingInsuranceForm;
        })();
        traveling.TravelingInsuranceForm = TravelingInsuranceForm;
        var InsuracneCompany = (function () {
            function InsuracneCompany() {
            }
            return InsuracneCompany;
        })();
        traveling.InsuracneCompany = InsuracneCompany;
        var TRAVELINGInsuracneOffer = (function () {
            function TRAVELINGInsuracneOffer() {
                this.AdditionalOptions = [];
                this.IsShown = false;
                this.isCompair = false;
            }
            return TRAVELINGInsuracneOffer;
        })();
        traveling.TRAVELINGInsuracneOffer = TRAVELINGInsuracneOffer;
        var TRAVELINGInsuranceOffers = (function () {
            function TRAVELINGInsuranceOffers() {
            }
            return TRAVELINGInsuranceOffers;
        })();
        traveling.TRAVELINGInsuranceOffers = TRAVELINGInsuranceOffers;
        var AdditionalOption = (function () {
            function AdditionalOption(name, des) {
                this.Name = name;
                this.Description = des;
            }
            return AdditionalOption;
        })();
        traveling.AdditionalOption = AdditionalOption;
        var PrivateData = (function () {
            function PrivateData() {
                this.BirthdayPolis = new Date();
            }
            return PrivateData;
        })();
        traveling.PrivateData = PrivateData;
        var OutBorderPassport = (function () {
            function OutBorderPassport() {
            }
            return OutBorderPassport;
        })();
        traveling.OutBorderPassport = OutBorderPassport;
        var AdditionTrevalerData = (function () {
            function AdditionTrevalerData() {
                this.privateData = new PrivateData();
                this.outBorderPassport = new OutBorderPassport();
            }
            return AdditionTrevalerData;
        })();
        traveling.AdditionTrevalerData = AdditionTrevalerData;
        var TRAVELINGDetailsForm = (function () {
            function TRAVELINGDetailsForm() {
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
            return TRAVELINGDetailsForm;
        })();
        traveling.TRAVELINGDetailsForm = TRAVELINGDetailsForm;
        var InsuredsLicense = (function () {
            function InsuredsLicense() {
                this.number = null;
                this.year = null;
            }
            return InsuredsLicense;
        })();
        traveling.InsuredsLicense = InsuredsLicense;
        var TRAVELINGService = (function () {
            function TRAVELINGService($http, $q, $timeout) {
                this.$http = $http;
                this.$q = $q;
                this.$timeout = $timeout;
                this.offerIndex = null;
            }
            TRAVELINGService.prototype.getOffers = function () {
                return this.offers;
            };
            TRAVELINGService.prototype.getAdditional = function () {
                return this.AdditionalOptions;
            };
            TRAVELINGService.prototype.loadOffers = function (request) {
                var _this = this;
                return this.$http.post('api/traveling/insuranceoffer', request)
                    .success(function (response) {
                    _this.offers = response;
                    console.log(_this.offers);
                });
            };
            return TRAVELINGService;
        })();
        traveling.TRAVELINGService = TRAVELINGService;
        angular.module('nepereplaty').service('TRAVELINGService', TRAVELINGService);
    })(traveling = nepereplaty.traveling || (nepereplaty.traveling = {}));
})(nepereplaty || (nepereplaty = {}));
