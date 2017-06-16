/// <reference path="app.ts" />
var admin;
(function (admin) {
    var CompanyData = (function () {
        function CompanyData() {
        }
        return CompanyData;
    })();
    admin.CompanyData = CompanyData;
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
    admin.InsuredModel = InsuredModel;
    var OfferData = (function () {
        function OfferData() {
        }
        return OfferData;
    })();
    admin.OfferData = OfferData;
    var AccountData = (function () {
        function AccountData() {
            this.IsMale = true;
        }
        return AccountData;
    })();
    admin.AccountData = AccountData;
    var Offer = (function () {
        function Offer() {
        }
        return Offer;
    })();
    admin.Offer = Offer;
    var TravelingDetail = (function () {
        function TravelingDetail() {
            this.offerID = 0;
        }
        return TravelingDetail;
    })();
    admin.TravelingDetail = TravelingDetail;
    var AdminService = (function () {
        function AdminService($http, $q, $timeout) {
            this.$http = $http;
            this.$q = $q;
            this.$timeout = $timeout;
        }
        return AdminService;
    })();
    admin.AdminService = AdminService;
    angular.module('admin').service('AdminService', AdminService);
})(admin || (admin = {}));
