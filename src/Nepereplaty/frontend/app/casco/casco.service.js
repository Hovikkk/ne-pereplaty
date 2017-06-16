/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var casco;
    (function (casco) {
        var Driver = (function () {
            function Driver() {
                this.isMale = null;
                this.martialStatus = { text: '--', value: null };
                this.kids = { text: '--', value: null };
            }
            return Driver;
        })();
        casco.Driver = Driver;
        var CASCODetailsForm = (function () {
            function CASCODetailsForm() {
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
            return CASCODetailsForm;
        })();
        casco.CASCODetailsForm = CASCODetailsForm;
        var CascoOfferModel = (function () {
            function CascoOfferModel() {
                this.basic = new Basic();
                this.casco = new CascoDetail();
                this.drivers = [];
            }
            return CascoOfferModel;
        })();
        casco.CascoOfferModel = CascoOfferModel;
        var CascoDetail = (function () {
            function CascoDetail() {
                this.offerId = 0;
            }
            return CascoDetail;
        })();
        casco.CascoDetail = CascoDetail;
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
        casco.DriverDetail = DriverDetail;
        var Basic = (function () {
            function Basic() {
                this.offerId = 0;
                this.dataId = 0;
            }
            return Basic;
        })();
        casco.Basic = Basic;
        var DriversLicense = (function () {
            function DriversLicense() {
                this.number = null;
                this.year = null;
            }
            return DriversLicense;
        })();
        casco.DriversLicense = DriversLicense;
        var CascoInsuranceForm = (function () {
            function CascoInsuranceForm() {
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
            return CascoInsuranceForm;
        })();
        casco.CascoInsuranceForm = CascoInsuranceForm;
        var InsuracneCompany = (function () {
            function InsuracneCompany() {
            }
            return InsuracneCompany;
        })();
        casco.InsuracneCompany = InsuracneCompany;
        var AdditionalOption = (function () {
            function AdditionalOption() {
            }
            return AdditionalOption;
        })();
        casco.AdditionalOption = AdditionalOption;
        var CASCOInsuracneOffer = (function () {
            function CASCOInsuracneOffer() {
                this.AdditionalOptions = [];
                this.IsShown = false;
                this.isCompair = false;
            }
            return CASCOInsuracneOffer;
        })();
        casco.CASCOInsuracneOffer = CASCOInsuracneOffer;
        var CASCOInsuranceOffers = (function () {
            function CASCOInsuranceOffers() {
            }
            return CASCOInsuranceOffers;
        })();
        casco.CASCOInsuranceOffers = CASCOInsuranceOffers;
        var CASCOService = (function () {
            // @ngInject
            function CASCOService($http, $q, $timeout) {
                this.$http = $http;
                this.$q = $q;
                this.$timeout = $timeout;
                this.offerIndex = 0;
                this.driver = [];
            }
            CASCOService.prototype.loadOffers = function (request) {
                var _this = this;
                return this.$http.post('api/casco/insuranceoffer', request)
                    .success(function (response) {
                    _this.offers = response;
                });
            };
            CASCOService.prototype.getOffers = function () {
                return this.offers;
            };
            return CASCOService;
        })();
        casco.CASCOService = CASCOService;
        angular.module('nepereplaty').service('CASCOService', CASCOService);
    })(casco = nepereplaty.casco || (nepereplaty.casco = {}));
})(nepereplaty || (nepereplaty = {}));
