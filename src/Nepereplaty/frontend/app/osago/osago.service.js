/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var osago;
    (function (osago) {
        var Driver = (function () {
            function Driver() {
                this.isMale = null;
                this.martialStatus = { text: '--', value: null };
                this.kids = { text: '--', value: null };
            }
            return Driver;
        })();
        osago.Driver = Driver;
        var OSAGODetailsForm = (function () {
            function OSAGODetailsForm() {
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
            return OSAGODetailsForm;
        })();
        osago.OSAGODetailsForm = OSAGODetailsForm;
        var DriversLicense = (function () {
            function DriversLicense() {
                this.number = null;
                this.year = null;
            }
            return DriversLicense;
        })();
        osago.DriversLicense = DriversLicense;
        var OsagoOfferModel = (function () {
            function OsagoOfferModel() {
                this.basic = new Basic();
                this.osago = new OsagoDetail();
                this.drivers = [];
            }
            return OsagoOfferModel;
        })();
        osago.OsagoOfferModel = OsagoOfferModel;
        var OsagoDetail = (function () {
            function OsagoDetail() {
                this.offerId = 0;
            }
            return OsagoDetail;
        })();
        osago.OsagoDetail = OsagoDetail;
        var DriverDetail = (function () {
            function DriverDetail(a, ex, im, k, m) {
                this.id = 0;
                this.age = a;
                this.experience = ex;
                this.isMale = im;
                this.kids = k;
                this.martialStatus = m;
            }
            return DriverDetail;
        })();
        osago.DriverDetail = DriverDetail;
        var Basic = (function () {
            function Basic() {
                this.offerId = 0;
                this.dataId = 0;
            }
            return Basic;
        })();
        osago.Basic = Basic;
        var OsagoInsuranceForm = (function () {
            function OsagoInsuranceForm() {
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
            return OsagoInsuranceForm;
        })();
        osago.OsagoInsuranceForm = OsagoInsuranceForm;
        var InsuracneCompany = (function () {
            function InsuracneCompany() {
            }
            return InsuracneCompany;
        })();
        osago.InsuracneCompany = InsuracneCompany;
        var AdditionalOption = (function () {
            function AdditionalOption() {
            }
            return AdditionalOption;
        })();
        osago.AdditionalOption = AdditionalOption;
        var OSAGOInsuracneOffer = (function () {
            function OSAGOInsuracneOffer() {
                this.AdditionalOptions = [];
                this.IsShown = false;
                this.IsclickInPhone = false;
                this.IsclickInEmail = false;
            }
            return OSAGOInsuracneOffer;
        })();
        osago.OSAGOInsuracneOffer = OSAGOInsuracneOffer;
        var OSAGOInsuranceOffers = (function () {
            function OSAGOInsuranceOffers() {
            }
            return OSAGOInsuranceOffers;
        })();
        osago.OSAGOInsuranceOffers = OSAGOInsuranceOffers;
        var OSAGOService = (function () {
            // @ngInject
            function OSAGOService($http, $q, $timeout) {
                this.$http = $http;
                this.$q = $q;
                this.$timeout = $timeout;
                this.offerIndex = 0;
                this.driver = [];
            }
            OSAGOService.prototype.loadOffers = function (request) {
                var _this = this;
                return this.$http.post('api/osago/insuranceoffer', request)
                    .success(function (response) {
                    _this.offers = response;
                });
            };
            OSAGOService.prototype.getOffers = function () {
                return this.offers;
            };
            return OSAGOService;
        })();
        osago.OSAGOService = OSAGOService;
        angular.module('nepereplaty').service('OSAGOService', OSAGOService);
    })(osago = nepereplaty.osago || (nepereplaty.osago = {}));
})(nepereplaty || (nepereplaty = {}));
