/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />
/// <reference path="../../../typings/angular-translate/angular-translate.d.ts" />
var nepereplaty;
(function (nepereplaty) {
    var account;
    (function (account_1) {
        var AccountController = (function () {
            // @ngInject
            function AccountController($scope, account) {
                var _this = this;
                this.$scope = $scope;
                this.account = account;
                this.showBirthday = false;
                this.isCurrentPasswordIncorrect = false;
                this.changePasswordUnknownError = false;
                account.getAccount().then(function (value) {
                    _this.manageData = value;
                });
            }
            AccountController.prototype.editAccount = function () {
                var _this = this;
                this.account.editAccount(this.manageData).then(function (value) {
                    _this.account.getAccount().then(function (value) {
                        _this.manageData = value;
                    });
                });
            };
            AccountController.prototype.changePassword = function () {
                var _this = this;
                if (this.$scope.changePasswordForm.$valid &&
                    this.changePasswordModel.NewPassword == this.changePasswordModel.ConfirmNewPassword) {
                    this.account.changePassword(this.changePasswordModel).then(function (value) {
                        if (value.IsSuccessful) {
                            _this.changePasswordModel.OldPassword = '';
                            _this.changePasswordModel.NewPassword = '';
                            _this.changePasswordModel.ConfirmNewPassword = '';
                        }
                        else {
                            if (value.Error == 'OldPasswordInvalid') {
                                _this.isCurrentPasswordIncorrect = true;
                            }
                            if (value.Error == 'Unknown') {
                                _this.changePasswordUnknownError = true;
                            }
                        }
                    });
                }
            };
            return AccountController;
        })();
        account_1.AccountController = AccountController;
        angular.module('nepereplaty').controller('nepereplaty.account.AccountController', AccountController);
    })(account = nepereplaty.account || (nepereplaty.account = {}));
})(nepereplaty || (nepereplaty = {}));
