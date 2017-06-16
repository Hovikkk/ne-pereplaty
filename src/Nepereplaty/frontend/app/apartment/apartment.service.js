/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var apartment;
    (function (apartment) {
        var APARTMENTOffer = (function () {
            function APARTMENTOffer() {
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
            return APARTMENTOffer;
        })();
        apartment.APARTMENTOffer = APARTMENTOffer;
        var ApartmentOfferModel = (function () {
            function ApartmentOfferModel() {
                this.basic = new Basic();
                this.home = new ApartmentDetail();
            }
            return ApartmentOfferModel;
        })();
        apartment.ApartmentOfferModel = ApartmentOfferModel;
        var Basic = (function () {
            function Basic() {
                this.offerId = 0;
                this.dataId = 0;
            }
            return Basic;
        })();
        apartment.Basic = Basic;
        var ApartmentDetail = (function () {
            function ApartmentDetail() {
                this.offerId = 0;
            }
            return ApartmentDetail;
        })();
        apartment.ApartmentDetail = ApartmentDetail;
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
        apartment.InsuredModel = InsuredModel;
        var APARTMENTInsuracneOffer = (function () {
            function APARTMENTInsuracneOffer() {
                this.AdditionalOptions = [];
                this.IsShown = false;
                this.isCompair = false;
            }
            return APARTMENTInsuracneOffer;
        })();
        apartment.APARTMENTInsuracneOffer = APARTMENTInsuracneOffer;
        var InsuracneCompany = (function () {
            function InsuracneCompany() {
            }
            return InsuracneCompany;
        })();
        apartment.InsuracneCompany = InsuracneCompany;
        var APARTMENTInsuranceOffers = (function () {
            function APARTMENTInsuranceOffers() {
            }
            return APARTMENTInsuranceOffers;
        })();
        apartment.APARTMENTInsuranceOffers = APARTMENTInsuranceOffers;
        var AdditionalOption = (function () {
            function AdditionalOption(name, des) {
                this.Name = name;
                this.Description = des;
            }
            return AdditionalOption;
        })();
        apartment.AdditionalOption = AdditionalOption;
        var APARTMENTDetailsForm = (function () {
            function APARTMENTDetailsForm() {
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
            return APARTMENTDetailsForm;
        })();
        apartment.APARTMENTDetailsForm = APARTMENTDetailsForm;
        var APARTMENTForm = (function () {
            function APARTMENTForm() {
                this.startData = new Date();
                this.region = { text: '--', value: null };
            }
            return APARTMENTForm;
        })();
        apartment.APARTMENTForm = APARTMENTForm;
        var OtherAdress = (function () {
            function OtherAdress() {
            }
            return OtherAdress;
        })();
        apartment.OtherAdress = OtherAdress;
        var APARTMENTService = (function () {
            function APARTMENTService($http, $q, $timeout) {
                this.$http = $http;
                this.$q = $q;
                this.$timeout = $timeout;
                this.offerIndex = null;
                this.otherAndress = new OtherAdress();
                this.otherAndress.isAre = false;
            }
            APARTMENTService.prototype.getOffers = function () {
                return this.offers;
            };
            APARTMENTService.prototype.loadOffers = function (request) {
                var _this = this;
                return this.$http.post('api/apartment/insuranceoffer', request)
                    .success(function (response) {
                    console.log(response);
                    _this.offers = response;
                    console.log(_this.offers);
                });
            };
            return APARTMENTService;
        })();
        apartment.APARTMENTService = APARTMENTService;
        angular.module('nepereplaty').service('APARTMENTService', APARTMENTService);
    })(apartment = nepereplaty.apartment || (nepereplaty.apartment = {}));
})(nepereplaty || (nepereplaty = {}));
