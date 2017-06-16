/// <reference path='../app.ts' />
var nepereplaty;
(function (nepereplaty) {
    var house;
    (function (house) {
        var Estate = (function () {
            function Estate() {
                this.additionalBuilding = { text: '--', value: null };
                this.cost = null;
            }
            return Estate;
        })();
        house.Estate = Estate;
        var HOUSEOffer = (function () {
            function HOUSEOffer() {
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
            return HOUSEOffer;
        })();
        house.HOUSEOffer = HOUSEOffer;
        var HOUSEForm = (function () {
            function HOUSEForm() {
                this.AdditionalStructure = [];
                this.periodStart = new Date();
                this.cover = { text: '--', value: null };
                this.AdditionalStructures = '';
            }
            return HOUSEForm;
        })();
        house.HOUSEForm = HOUSEForm;
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
        house.AdditionalStructure = AdditionalStructure;
        var HouseInsuranceForm = (function () {
            function HouseInsuranceForm() {
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
            return HouseInsuranceForm;
        })();
        house.HouseInsuranceForm = HouseInsuranceForm;
        var InsuracneCompany = (function () {
            function InsuracneCompany() {
            }
            return InsuracneCompany;
        })();
        house.InsuracneCompany = InsuracneCompany;
        var HOUSEInsuracneOffer = (function () {
            function HOUSEInsuracneOffer() {
                this.AdditionalOptions = [];
                this.IsShown = false;
                this.isCompair = false;
            }
            return HOUSEInsuracneOffer;
        })();
        house.HOUSEInsuracneOffer = HOUSEInsuracneOffer;
        var HOUSEInsuranceOffers = (function () {
            function HOUSEInsuranceOffers() {
            }
            return HOUSEInsuranceOffers;
        })();
        house.HOUSEInsuranceOffers = HOUSEInsuranceOffers;
        var AdditionalOption = (function () {
            function AdditionalOption(name, des) {
                this.Name = name;
                this.Description = des;
            }
            return AdditionalOption;
        })();
        house.AdditionalOption = AdditionalOption;
        var HOUSEDetailsForm = (function () {
            function HOUSEDetailsForm() {
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
            return HOUSEDetailsForm;
        })();
        house.HOUSEDetailsForm = HOUSEDetailsForm;
        var DriversLicense = (function () {
            function DriversLicense() {
                this.number = null;
                this.year = null;
            }
            return DriversLicense;
        })();
        house.DriversLicense = DriversLicense;
        var OtherAdress = (function () {
            function OtherAdress() {
            }
            return OtherAdress;
        })();
        house.OtherAdress = OtherAdress;
        var ApartmentOfferModel = (function () {
            function ApartmentOfferModel() {
                this.basic = new Basic();
                this.home = new ApartmentDetail();
            }
            return ApartmentOfferModel;
        })();
        house.ApartmentOfferModel = ApartmentOfferModel;
        var Basic = (function () {
            function Basic() {
                this.offerId = 0;
                this.dataId = 0;
            }
            return Basic;
        })();
        house.Basic = Basic;
        var ApartmentDetail = (function () {
            function ApartmentDetail() {
                this.offerId = 0;
            }
            return ApartmentDetail;
        })();
        house.ApartmentDetail = ApartmentDetail;
        var HOUSEService = (function () {
            function HOUSEService($http, $q, $timeout) {
                this.$http = $http;
                this.$q = $q;
                this.$timeout = $timeout;
                this.offerIndex = null;
                this.otherAndress = new OtherAdress();
                this.otherAndress.isAre = false;
            }
            HOUSEService.prototype.getOffers = function () {
                return this.offers;
            };
            HOUSEService.prototype.getAdditional = function () {
                return this.AdditionalOptions;
            };
            HOUSEService.prototype.loadOffers = function (request) {
                var _this = this;
                return this.$http.post('api/house/insuranceoffer', request)
                    .success(function (response) {
                    _this.offers = response;
                    console.log(_this.offers);
                });
            };
            return HOUSEService;
        })();
        house.HOUSEService = HOUSEService;
        angular.module('nepereplaty').service('HOUSEService', HOUSEService);
    })(house = nepereplaty.house || (nepereplaty.house = {}));
})(nepereplaty || (nepereplaty = {}));
