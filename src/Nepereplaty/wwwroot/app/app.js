/// <reference path="app.ts" />
'use strict';
angular
    .module('nepereplaty', [
    'ngSanitize',
    'ui.router',
    'pascalprecht.translate',
    'angularMoment',
    'pickadate',
    'angucomplete-alt',
    'ngDropdowns',
    'angularModalService'
]).run(['$rootScope', '$state', '$stateParams', 'amMoment', '$interval', '$http',
    function ($rootScope, $state, $stateParams, amMoment, $interval, $http) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.time = new Date();
        $rootScope.step3 = false;
        amMoment.changeLocale('ru');
        $rootScope.openLogin = false;
        var updateTime = function () {
            $rootScope.time = new Date();
        };
        var stopTime = $interval(updateTime, 1000);
        //$rootScope.isModalShown = false;
        var browser = get_browser_info();
        console.log(browser.name);
        if (browser.name === 'IE') {
            $rootScope.cl = 'ie';
        }
        if (browser.name === 'Firefox') {
            $rootScope.cl = 'mz';
        }
        function get_browser_info() {
            var ua = navigator.userAgent, tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
            if (/trident/i.test(M[1])) {
                tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
                return { name: 'IE', version: (tem[1] || '') };
            }
            if (M[1] === 'Chrome') {
                tem = ua.match(/\bOPR\/(\d+)/);
                if (tem != null) {
                    return { name: 'Opera', version: tem[1] };
                }
            }
            M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
            if ((tem = ua.match(/version\/(\d+)/i)) != null) {
                M.splice(1, 1, tem[1]);
            }
            return {
                name: M[0],
                version: M[1]
            };
        }
        $rootScope.showFooter = true;
        $rootScope.showHeader = true;
        $rootScope.showBlindStopper = true;
        var isMobile = {
            Android: function () { return navigator.userAgent.match(/Android/i); },
            BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); },
            iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
            Opera: function () { return navigator.userAgent.match(/Opera Mini/i); },
            Windows: function () { return navigator.userAgent.match(/IEMobile/i); },
            any: function () {
                return (isMobile.Android() || isMobile.BlackBerry() ||
                    isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
            }
        };
        setTimeout(function () {
            $rootScope.$apply(function () {
                $rootScope.showBlindStopper = false;
            });
        }, 4000);
        console.log(isMobile.any());
        $rootScope.isMobile = (isMobile.any() != null && isMobile.any()[0] !== 'iPad');
        $rootScope.mod = '';
        console.log($rootScope.isMobile);
    }
]);
angular.module('nepereplaty').filter('dotless', function () {
    return function (input) {
        if (input) {
            return input.replace('.', '-');
        }
    };
});
/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var auth;
    (function (auth) {
        var AuthService = (function () {
            // @ngInject
            function AuthService($http, $q, $timeout) {
                this.$http = $http;
                this.$q = $q;
                this.$timeout = $timeout;
                this.isAuthorized = false;
                this.userId = null;
                this.userName = '';
                this.userSurname = '';
            }
            AuthService.prototype.checkUser = function () {
                var _this = this;
                var defer = this.$q.defer();
                this.$http
                    .get('api/account')
                    .success(function (response) {
                    if (response.IsSuccessful) {
                        _this.isAuthorized = true;
                        _this.userId = response.Id;
                        _this.userName = response.Name;
                        _this.userSurname = response.Surname;
                        defer.resolve(response);
                    }
                    else {
                        defer.reject(null);
                    }
                })
                    .error(function () {
                    defer.reject(null);
                });
                return defer.promise;
            };
            /**
             * Authenticate user on server and in client app
             * @param credentials
             * @returns {IPromise<T>}
             */
            AuthService.prototype.authenticate = function (credentials) {
                var _this = this;
                var defer = this.$q.defer();
                this.$http
                    .post('api/account/login', { Email: credentials.login, Password: credentials.password })
                    .success(function (response) {
                    if (response.IsSuccessful) {
                        _this.isAuthorized = true;
                        _this.userId = response.Id;
                        _this.userName = response.Name;
                        _this.userSurname = response.Surname;
                        defer.resolve(response.Id);
                    }
                    else {
                        defer.reject(null);
                    }
                })
                    .error(function () {
                    defer.reject(null);
                });
                return defer.promise;
            };
            /**
             * Send register request
             * @param credentials
             * @returns {IHttpPromise<T>}
             */
            AuthService.prototype.register = function (credentials) {
                return this.$http
                    .post('api/account/register', {
                    Email: credentials.login,
                    Password: credentials.password,
                    ConfirmPassword: credentials.confirmPassword,
                    Name: credentials.name,
                    Surname: credentials.surname,
                    IsAgreed: credentials.isAgreed
                });
            };
            /**
             * Logout user. Clean all data on client side
             * @returns {IPromise<T>}
             */
            AuthService.prototype.logout = function () {
                var defer = this.$q.defer();
                this.$http
                    .post('api/account/logout', {})
                    .success(function (response) {
                    console.log('api/account/logout');
                    //window.location.reload();
                })
                    .error(function () {
                    defer.reject(null);
                });
                return defer.promise;
            };
            /**
             * Check if user is authenticated
             * @returns {boolean|function(): boolean}
             */
            AuthService.prototype.isAuthenticated = function () {
                var defer = this.$q.defer();
                if (this.userId !== null) {
                    this.isAuthorized = true;
                    defer.resolve(true);
                }
                else {
                    this.isAuthorized = false;
                    defer.reject(false);
                }
                return defer.promise;
            };
            /**
             *
             * @returns {string}
             */
            AuthService.prototype.getUserId = function () {
                return this.userId;
            };
            AuthService.prototype.getFullName = function () {
                return this.userName + ' ' + this.userSurname;
            };
            return AuthService;
        })();
        auth.AuthService = AuthService;
        angular.module('nepereplaty').service('auth', AuthService);
    })(auth = nepereplaty.auth || (nepereplaty.auth = {}));
})(nepereplaty || (nepereplaty = {}));
/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var auth;
    (function (auth_1) {
        var AuthController = (function () {
            // @ngInject
            function AuthController($http, $state, $q, $timeout, auth, $scope, $rootScope, ModalService) {
                var _this = this;
                this.$http = $http;
                this.$state = $state;
                this.$q = $q;
                this.$timeout = $timeout;
                this.auth = auth;
                this.$scope = $scope;
                this.$rootScope = $rootScope;
                this.ModalService = ModalService;
                this.isAuthenticated = false;
                this.fullName = '';
                this.openLogin = false;
                this.openTelephone = false;
                auth.checkUser().then(function (value) {
                    _this.isAuthenticated = value.IsSuccessful;
                    _this.fullName = auth.getFullName();
                });
            }
            AuthController.prototype.updata = function () {
                this.$rootScope.openLogin = this.openLogin;
            };
            /**
             * Forget user
             */
            AuthController.prototype.logout = function () {
                var _this = this;
                this.$http
                    .post('api/account/logout', {})
                    .success(function (response) {
                    _this.$state.go('home');
                    window.location.reload();
                });
            };
            AuthController.prototype.update = function () {
                var _this = this;
                this.isAuthenticated = false;
                this.fullName = '';
                this.auth.checkUser().then(function (value) {
                    _this.isAuthenticated = value.IsSuccessful;
                    _this.fullName = _this.auth.getFullName();
                });
            };
            AuthController.prototype.login = function () {
                var _this = this;
                this.$rootScope.isModalShown = true;
                this.ModalService.showModal({
                    templateUrl: 'app/auth/login.html',
                    controller: 'LoginModalController',
                    controllerAs: 'loginModalCtrl',
                    inputs: {
                        name: 'auth'
                    }
                }).then(function (modal) {
                    modal.close.then(function (result) {
                        if (result === 'register') {
                            _this.register();
                        }
                        else {
                            if (result === 'logedin') {
                                _this.isAuthenticated = true;
                                _this.fullName = _this.auth.getFullName();
                            }
                            _this.$rootScope.isModalShown = false;
                        }
                        // Reset user password
                        //this.credentials.password = '';
                    });
                });
            };
            AuthController.prototype.register = function () {
                var _this = this;
                this.$rootScope.isModalShown = true;
                this.ModalService.showModal({
                    templateUrl: 'app/auth/register.html',
                    controller: 'RegisterModalController',
                    controllerAs: 'registerModalCtrl',
                    inputs: {
                        name: 'auth'
                    }
                }).then(function (modal) {
                    modal.close.then(function (result) {
                        if (result === 'login') {
                            _this.login();
                        }
                        else {
                            if (result === 'registered') {
                                _this.isAuthenticated = true;
                                _this.auth.checkUser().then(function (value) {
                                    _this.fullName = _this.auth.getFullName();
                                });
                            }
                            _this.$rootScope.isModalShown = false;
                        }
                        // Reset user password
                        //this.credentials.password = '';
                    });
                });
            };
            return AuthController;
        })();
        auth_1.AuthController = AuthController;
        angular.module('nepereplaty').controller('AuthController', AuthController);
    })(auth = nepereplaty.auth || (nepereplaty.auth = {}));
})(nepereplaty || (nepereplaty = {}));
/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var auth;
    (function (auth_2) {
        var UserCredentials = (function () {
            function UserCredentials(login, password) {
                if (login === void 0) { login = ''; }
                if (password === void 0) { password = ''; }
                this.login = login;
                this.password = password;
            }
            return UserCredentials;
        })();
        auth_2.UserCredentials = UserCredentials;
        var LoginModalController = (function () {
            // @ngInject
            function LoginModalController(close, name, $scope, auth, $q, $state, $timeout, $rootScope) {
                this.close = close;
                this.name = name;
                this.$scope = $scope;
                this.auth = auth;
                this.$q = $q;
                this.$state = $state;
                this.$timeout = $timeout;
                this.$rootScope = $rootScope;
                $scope.vm = this;
                this.step = 0;
                console.log(this.name);
                this.closeResult = this.name;
                $scope.dismissModal = function (result) {
                    if (result === void 0) { result = ''; }
                    console.log(this.loginModalCtrl.name);
                    console.log(result);
                    if (result !== 'logedin' && result !== 'register') {
                        if (this.loginModalCtrl.name !== 'auth') {
                            this.$state.go(this.loginModalCtrl.name + '.offer');
                        }
                        ;
                    }
                    close(result);
                };
                this.credentials = new UserCredentials();
                this.isUnSuccessful = false;
            }
            /**
             * Try authenticate user, if success redirect him to home page
             */
            LoginModalController.prototype.login = function () {
                var _this = this;
                // Check if user pass valid credentials
                if (this.$scope.form.$valid) {
                    this.auth
                        .authenticate(this.credentials)
                        .then(function (user) {
                        _this.$scope.dismissModal('logedin');
                    })
                        .catch(function () {
                        _this.isUnSuccessful = true;
                    });
                }
            };
            LoginModalController.prototype.chackSendMail = function () {
                if (this.$scope.form.email.$invalid) {
                    return;
                }
                this.step = 2;
            };
            return LoginModalController;
        })();
        auth_2.LoginModalController = LoginModalController;
        angular.module('nepereplaty').controller('LoginModalController', LoginModalController);
    })(auth = nepereplaty.auth || (nepereplaty.auth = {}));
})(nepereplaty || (nepereplaty = {}));
/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var auth;
    (function (auth_3) {
        var RegisterCredentials = (function () {
            function RegisterCredentials(login, password, confirmPassword, name, surname, isAgreed) {
                if (login === void 0) { login = ''; }
                if (password === void 0) { password = ''; }
                if (confirmPassword === void 0) { confirmPassword = ''; }
                if (name === void 0) { name = ''; }
                if (surname === void 0) { surname = ''; }
                if (isAgreed === void 0) { isAgreed = false; }
                this.login = login;
                this.password = password;
                this.confirmPassword = confirmPassword;
                this.name = name;
                this.surname = surname;
                this.isAgreed = isAgreed;
            }
            return RegisterCredentials;
        })();
        auth_3.RegisterCredentials = RegisterCredentials;
        var RegisterModalController = (function () {
            // @ngInject
            function RegisterModalController(close, name, $scope, auth, $q, $timeout) {
                this.close = close;
                this.name = name;
                this.$scope = $scope;
                this.auth = auth;
                this.$q = $q;
                this.$timeout = $timeout;
                $scope.vm = this;
                $scope.dismissModal = function (result) {
                    if (result === void 0) { result = ''; }
                    console.log(this.registerModalCtrl.name);
                    console.log(result);
                    if (result !== 'registered' && result !== 'login') {
                        if (this.registerModalCtrl.name !== 'auth') {
                            this.$state.go(this.registerModalCtrl.name + '.offer');
                        }
                        ;
                    }
                    close(result);
                };
                this.credentials = new RegisterCredentials();
                this.emailExists = false;
                this.unknownError = false;
            }
            /**
             * Register user, after successful redirect to home page
             */
            RegisterModalController.prototype.register = function () {
                var _this = this;
                if (this.$scope.form.$valid &&
                    this.credentials.password === this.credentials.confirmPassword &&
                    this.credentials.isAgreed) {
                    this.auth
                        .register(this.credentials)
                        .success(function (respone) {
                        if (respone.IsSuccessful) {
                            _this.$scope.dismissModal('registered');
                        }
                        else {
                            if (respone.Error === 'EmailExiststs') {
                                _this.emailExists = true;
                            }
                            if (respone.Error === 'Unknown') {
                                _this.unknownError = true;
                            }
                        }
                    })
                        .error(function () {
                        console.error('Server communication problem');
                    });
                }
            };
            return RegisterModalController;
        })();
        auth_3.RegisterModalController = RegisterModalController;
        angular.module('nepereplaty').controller('RegisterModalController', RegisterModalController);
    })(auth = nepereplaty.auth || (nepereplaty.auth = {}));
})(nepereplaty || (nepereplaty = {}));
/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var loading;
    (function (loading) {
        var LoadingModalController = (function () {
            function LoadingModalController(close, auth, $q, $timeout, $rootScope) {
                this.close = close;
                this.auth = auth;
                this.$q = $q;
                this.$timeout = $timeout;
                this.$rootScope = $rootScope;
                $rootScope.dismissModal = function (result) {
                    if (result === void 0) { result = ''; }
                    close(result);
                };
            }
            return LoadingModalController;
        })();
        loading.LoadingModalController = LoadingModalController;
        angular.module('nepereplaty').controller('LoadingModalController', LoadingModalController);
    })(loading = nepereplaty.loading || (nepereplaty.loading = {}));
})(nepereplaty || (nepereplaty = {}));
/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var account;
    (function (account_1) {
        var ACCOUNTform = (function () {
            function ACCOUNTform() {
                this.TelCode1 = { text: '--', value: null };
                this.TelCode2 = { text: '--', value: null };
            }
            return ACCOUNTform;
        })();
        account_1.ACCOUNTform = ACCOUNTform;
        var AccountData = (function () {
            function AccountData() {
            }
            return AccountData;
        })();
        account_1.AccountData = AccountData;
        var AccountService = (function () {
            function AccountService($q, $http, auth) {
                this.$q = $q;
                this.$http = $http;
                this.auth = auth;
                this.accountData = null;
            }
            /**
             * Load account data from server
             * @returns {IPromise<T>}
             */
            AccountService.prototype.load = function () {
                var defer = this.$q.defer();
                this.$http
                    .get('api/account/profile')
                    .success(function (account) {
                    console.log(account);
                    defer.resolve(account);
                })
                    .error(function () {
                    defer.reject();
                });
                return defer.promise;
            };
            /**
             * Retrieve account from service. If no account information, load id from server
             * @returns {IPromise<T>}
             */
            AccountService.prototype.getAccount = function () {
                var _this = this;
                var defer = this.$q.defer();
                if (this.accountData !== null) {
                    // Data is already loaded
                    console.log(this.accountData);
                    defer.resolve(this.accountData);
                }
                else {
                    this
                        .load()
                        .then(function (data) {
                        // Resolve loaded account data
                        _this.accountData = data;
                        if (_this.accountData.PassportnNumber) {
                            _this.accountData.PassportnNumber = parseInt(_this.accountData.PassportnNumber.toString(), 0);
                        }
                        if (_this.accountData.PassportSerial) {
                            _this.accountData.PassportSerial = parseInt(_this.accountData.PassportSerial.toString(), 0);
                        }
                        if (_this.accountData.PassportIssued) {
                            _this.accountData.PassportIssued = parseInt(_this.accountData.PassportIssued.toString(), 0);
                        }
                        if (_this.accountData.Telephone) {
                            _this.accountData.Telephone = parseInt(_this.accountData.Telephone.toString(), 0);
                        }
                        if (_this.accountData.Mobile) {
                            _this.accountData.Mobile = parseInt(_this.accountData.Mobile.toString(), 0);
                        }
                        defer.resolve(_this.accountData);
                    })
                        .catch(function () {
                        defer.reject();
                    });
                }
                return defer.promise;
            };
            AccountService.prototype.editAccount = function (data) {
                var _this = this;
                var defer = this.$q.defer();
                this.$http
                    .put('api/account', data)
                    .success(function (account) {
                    if (account.IsSuccessful) {
                        _this.accountData = data;
                        defer.resolve(account);
                    }
                    else {
                        defer.reject(account);
                    }
                })
                    .error(function () {
                    defer.reject();
                });
                return defer.promise;
            };
            AccountService.prototype.changePassword = function (data) {
                var defer = this.$q.defer();
                this.$http
                    .put('api/account/changepassword', data)
                    .success(function (account) {
                    if (account.IsSuccessful) {
                        defer.resolve(account);
                    }
                    else {
                        defer.resolve(account);
                    }
                })
                    .error(function () {
                    defer.reject();
                });
                return defer.promise;
            };
            return AccountService;
        })();
        account_1.AccountService = AccountService;
        angular.module('nepereplaty').service('account', AccountService);
    })(account = nepereplaty.account || (nepereplaty.account = {}));
})(nepereplaty || (nepereplaty = {}));
/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var account;
    (function (account_2) {
        var AccountController = (function () {
            // @ngInject
            function AccountController($state, $http, $scope, account, auth, $rootScope) {
                var _this = this;
                this.$state = $state;
                this.$http = $http;
                this.$scope = $scope;
                this.account = account;
                this.auth = auth;
                this.$rootScope = $rootScope;
                this.telCode = [
                    { text: '+7', value: '007' },
                    { text: '+1', value: '001' },
                    { text: '+33', value: '0033' },
                    { text: '+374', value: '00374' },
                    { text: '+25', value: '0024' },
                    { text: '+908', value: '00908' },
                ];
                this.$rootScope.showFooter = false;
                this.personalArea = !$rootScope.isMobile;
                this.passportData = !$rootScope.isMobile;
                this.newChangePassword = !$rootScope.isMobile;
                this.showBirthday = false;
                this.issued = false;
                this.isCurrentPasswordIncorrect = false;
                this.changePasswordUnknownError = false;
                this.showPeriodStart = false;
                account.getAccount().then(function (value) {
                    _this.manageData = value;
                    //       this.manageData.IsMale;
                    console.log(_this.manageData);
                    _this.updateMiddle();
                    if (value.Mobile) {
                        if (value.MobileCode.value != null) {
                            _this.manageData.MobileCode = value.MobileCode;
                        }
                        else {
                            _this.manageData.MobileCode = { text: value.MobileCode, value: value.MobileCode };
                        }
                    }
                    else {
                        _this.manageData.MobileCode = { text: '--', value: null };
                    }
                    if (value.TelephoneCode) {
                        if (value.TelephoneCode.value != null) {
                            _this.manageData.TelephoneCode = value.TelephoneCode;
                        }
                        else {
                            _this.manageData.TelephoneCode = { text: value.TelephoneCode, value: value.TelephoneCode };
                        }
                    }
                    else {
                        _this.manageData.TelephoneCode = { text: '--', value: null };
                    }
                });
                this.minDate = new Date();
                this.minDate.setFullYear(1926);
            }
            AccountController.prototype.logout = function () {
                var _this = this;
                this.$http
                    .post('api/account/logout', {})
                    .success(function (response) {
                    _this.$state.go('home').then(function (promise) {
                        window.location.reload();
                    });
                });
            };
            AccountController.prototype.changeMale = function (t) {
                console.log(t);
            };
            AccountController.prototype.updateMiddle = function () {
                if (this.validate(this.manageData.Name) && this.validate(this.manageData.Surname)) {
                    this.isMiddle = true;
                }
                else {
                    this.isMiddle = false;
                }
            };
            AccountController.prototype.validate = function (strValue) {
                var objRegExp = /^[a-zA-Z ]+$/;
                return objRegExp.test(strValue);
            };
            AccountController.prototype.editAccount = function () {
                var _this = this;
                var cloneData = new account_2.AccountData();
                if (this.pasportWhere) {
                    this.manageData.PassportWhere = this.pasportWhere.title;
                }
                if (this.city) {
                    this.manageData.City = this.city.title;
                }
                cloneData.Email = this.manageData.Email;
                cloneData.TelephoneCode = this.manageData.TelephoneCode.value;
                cloneData.MobileCode = this.manageData.MobileCode.value;
                cloneData.Adress = this.manageData.Adress;
                cloneData.Birthday = this.manageData.Birthday;
                cloneData.City = this.manageData.City;
                cloneData.IsMale = this.manageData.IsMale;
                cloneData.Middlename = this.manageData.Middlename;
                cloneData.Name = this.manageData.Name;
                cloneData.Surname = this.manageData.Surname;
                cloneData.Telephone = this.manageData.Telephone;
                cloneData.Mobile = this.manageData.Mobile;
                cloneData.PassportIssued = this.manageData.PassportIssued;
                cloneData.PassportnNumber = this.manageData.PassportnNumber;
                cloneData.PassportSerial = this.manageData.PassportSerial;
                cloneData.PassportWhen = this.manageData.PassportWhen;
                cloneData.PassportWhere = this.manageData.PassportWhere;
                this.account.editAccount(cloneData).then(function (value) {
                    _this.account.getAccount().then(function (value) {
                        _this.manageData = value;
                        if (value.MobileCode.value != null) {
                            _this.manageData.MobileCode = value.MobileCode;
                            _this.manageData.TelephoneCode = value.TelephoneCode;
                        }
                        else {
                            _this.manageData.MobileCode = { text: value.MobileCode, value: value.MobileCode };
                            _this.manageData.TelephoneCode = { text: value.TelephoneCode, value: value.TelephoneCode };
                        }
                    });
                });
            };
            AccountController.prototype.changePassword = function () {
                var _this = this;
                if (this.$scope.changePasswordForm.$valid &&
                    this.changePasswordModel.NewPassword === this.changePasswordModel.ConfirmNewPassword) {
                    this.account.changePassword(this.changePasswordModel).then(function (value) {
                        if (value.IsSuccessful) {
                            _this.changePasswordModel.OldPassword = '';
                            _this.changePasswordModel.NewPassword = '';
                            _this.changePasswordModel.ConfirmNewPassword = '';
                        }
                        else {
                            if (value.Error === 'OldPasswordInvalid') {
                                _this.isCurrentPasswordIncorrect = true;
                            }
                            if (value.Error === 'Unknown') {
                                _this.changePasswordUnknownError = true;
                            }
                        }
                    });
                }
            };
            return AccountController;
        })();
        account_2.AccountController = AccountController;
        angular.module('nepereplaty').controller('nepereplaty.account.AccountController', AccountController);
    })(account = nepereplaty.account || (nepereplaty.account = {}));
})(nepereplaty || (nepereplaty = {}));
/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var home;
    (function (home) {
        var HomeController = (function () {
            function HomeController($state, $scope, $rootScope, ModalService) {
                this.$state = $state;
                this.$scope = $scope;
                this.$rootScope = $rootScope;
                this.ModalService = ModalService;
                this.$rootScope.showFooter = false;
            }
            HomeController.prototype.carModal = function () {
                var _this = this;
                this.$rootScope.isModalShown = true;
                this.ModalService.showModal({
                    templateUrl: 'app/home/car.modal.html',
                    controller: 'CarModalController',
                    controllerAs: 'carModalCtrl',
                    inputs: {}
                }).then(function (modal) {
                    modal.close.then(function (result) {
                        if (result === 'casco') {
                            _this.$state.go('casco');
                        }
                        if (result === 'osago') {
                            _this.$state.go('osago');
                        }
                        _this.$rootScope.isModalShown = false;
                        // Reset user password
                        //this.credentials.password = '';
                    });
                });
            };
            HomeController.prototype.gotoTraveling = function () {
                this.$state.go('traveling');
            };
            HomeController.prototype.appartment = function () {
                var _this = this;
                this.$rootScope.isModalShown = true;
                this.ModalService.showModal({
                    templateUrl: 'app/home/appartment.modal.html',
                    controller: 'AppartmentController',
                    controllerAs: 'appartmentCtrl',
                    inputs: {}
                }).then(function (modal) {
                    modal.close.then(function (result) {
                        if (result === 'house') {
                            _this.$state.go('house');
                        }
                        if (result === 'apartment') {
                            _this.$state.go('apartment');
                        }
                        _this.$rootScope.isModalShown = false;
                        // Reset user password
                        //this.credentials.password = '';
                    });
                });
            };
            HomeController.prototype.health = function () {
                var _this = this;
                this.$rootScope.isModalShown = true;
                this.ModalService.showModal({
                    templateUrl: 'app/home/health.modal.html',
                    controller: 'HealthController',
                    controllerAs: 'healthCtrl',
                    inputs: {}
                }).then(function (modal) {
                    modal.close.then(function (result) {
                        if (result === 'accident') {
                            _this.$state.go('accident');
                        }
                        if (result === 'medical') {
                            _this.$state.go('medical');
                        }
                        _this.$rootScope.isModalShown = false;
                        // Reset user password
                        //this.credentials.password = '';
                    });
                });
            };
            return HomeController;
        })();
        home.HomeController = HomeController;
        angular.module('nepereplaty').controller('nepereplaty.home.HomeController', HomeController);
    })(home = nepereplaty.home || (nepereplaty.home = {}));
})(nepereplaty || (nepereplaty = {}));
/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var home;
    (function (home) {
        var CarModalController = (function () {
            // @ngInject
            function CarModalController(close, $scope, auth, $q, $timeout, $rootScope) {
                this.close = close;
                this.$scope = $scope;
                this.auth = auth;
                this.$q = $q;
                this.$timeout = $timeout;
                this.$rootScope = $rootScope;
                $scope.vmm = this;
                $rootScope.mod = 'mod';
                $scope.dismissModal = function (result) {
                    if (result === void 0) { result = ''; }
                    console.log(result);
                    close(result);
                    $rootScope.mod = '';
                };
            }
            return CarModalController;
        })();
        home.CarModalController = CarModalController;
        angular.module('nepereplaty').controller('CarModalController', CarModalController);
    })(home = nepereplaty.home || (nepereplaty.home = {}));
})(nepereplaty || (nepereplaty = {}));
/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var home;
    (function (home) {
        var AppartmentController = (function () {
            // @ngInject
            function AppartmentController(close, $scope, auth, $q, $timeout, $rootScope) {
                this.close = close;
                this.$scope = $scope;
                this.auth = auth;
                this.$q = $q;
                this.$timeout = $timeout;
                this.$rootScope = $rootScope;
                $scope.vmm = this;
                $rootScope.mod = 'mod';
                $scope.dismisssModal = function (result) {
                    if (result === void 0) { result = ''; }
                    console.log(result);
                    close(result);
                    $rootScope.mod = '';
                };
            }
            return AppartmentController;
        })();
        home.AppartmentController = AppartmentController;
        angular.module('nepereplaty').controller('AppartmentController', AppartmentController);
    })(home = nepereplaty.home || (nepereplaty.home = {}));
})(nepereplaty || (nepereplaty = {}));
/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var home;
    (function (home) {
        var HealthController = (function () {
            // @ngInject
            function HealthController(close, $scope, auth, $q, $timeout, $rootScope) {
                this.close = close;
                this.$scope = $scope;
                this.auth = auth;
                this.$q = $q;
                this.$timeout = $timeout;
                this.$rootScope = $rootScope;
                $scope.vmm = this;
                $rootScope.mod = 'mod';
                $scope.dismissModal = function (result) {
                    if (result === void 0) { result = ''; }
                    console.log(result);
                    close(result);
                    $rootScope.mod = '';
                };
            }
            return HealthController;
        })();
        home.HealthController = HealthController;
        angular.module('nepereplaty').controller('HealthController', HealthController);
    })(home = nepereplaty.home || (nepereplaty.home = {}));
})(nepereplaty || (nepereplaty = {}));
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
/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var osago;
    (function (osago) {
        var OSAGOController = (function () {
            // @ngInject
            function OSAGOController($http, $state, $q, OSAGOService, $scope, ModalService, $timeout, $rootScope) {
                var _this = this;
                this.$http = $http;
                this.$state = $state;
                this.$q = $q;
                this.OSAGOService = OSAGOService;
                this.$scope = $scope;
                this.ModalService = ModalService;
                this.$timeout = $timeout;
                this.$rootScope = $rootScope;
                this.insuranceStartMinData = new Date();
                this.submitValue = 'Получить предложение';
                /*carBodyOptions = [
                    {
                        text: 'Седан',
                        value: 'sedan'
                    },
                    {
                        text: 'Хетчбэк',
                        value: 'hatchback'
                    },
                    {
                        text: 'Универсал',
                        value: 'universal'
                    },
                    {
                        text: 'Внедорожник',
                        value: 'offroad'
                    },
                    {
                        text: 'Минивэн',
                        value: 'van'
                    },
                    {
                        text: 'Купе',
                        value: 'cupe'
                    },
                    {
                        text: 'Пикап',
                        value: 'pickup'
                    },
                    {
                        text: 'Кабриолет',
                        value: 'cabriolet'
                    }
                ];*/
                this.powerOptions = [{
                        text: 'До 50',
                        value: '45'
                    },
                    {
                        text: 'От 50 до 70',
                        value: '55'
                    },
                    {
                        text: 'От 70 до 100',
                        value: '75'
                    },
                    {
                        text: 'От 100 до 120',
                        value: '110'
                    },
                    {
                        text: 'От 120 до 150',
                        value: '125'
                    },
                    {
                        text: 'Свыше 150',
                        value: '155'
                    }
                ];
                this.regionOptions = [{
                        text: 'Первый регион',
                        value: '1'
                    },
                    {
                        text: 'Второй регион',
                        value: '2'
                    },
                    {
                        text: 'Третий регион',
                        value: '3'
                    }
                ];
                this.franchiseOptions = [{
                        text: 'Первая франшиза',
                        value: '1'
                    },
                    {
                        text: 'Вторая франшиза',
                        value: '2'
                    },
                    {
                        text: 'Третья франшиза',
                        value: '3'
                    }
                ];
                this.isIndividualOptions = [
                    {
                        text: 'Физическое лицо',
                        value: true
                    },
                    {
                        text: 'Юридическое лицо',
                        value: false
                    }
                ];
                this.isOwnerOptions = [
                    {
                        text: 'Собственник',
                        value: true
                    },
                    {
                        text: 'По доверенности',
                        value: false
                    }
                ];
                this.wasInsuranceOptions = [{
                        text: 'Нет',
                        value: '1'
                    },
                    {
                        text: 'Да, одна',
                        value: '2'
                    },
                    {
                        text: 'Больше',
                        value: '3'
                    }
                ];
                this.wasClaimsOptions = [{
                        text: 'Нет',
                        value: '1'
                    },
                    {
                        text: 'Да, один',
                        value: '2'
                    },
                    {
                        text: 'Больше',
                        value: '3'
                    }
                ];
                this.rudderOptions = [{
                        text: 'Левосторонний',
                        value: true
                    },
                    {
                        text: 'Правосторонний',
                        value: false
                    }
                ];
                this.antiTheftSystemOptions = [{
                        text: 'Нет',
                        value: false
                    },
                    {
                        text: 'Сигнализация',
                        value: false
                    },
                    {
                        text: 'Другое',
                        value: true
                    }
                ];
                this.searchSystemOptions = [
                    {
                        text: 'Нет',
                        value: false
                    },
                    {
                        text: 'GPS',
                        value: false
                    },
                    {
                        text: 'Другое',
                        value: true
                    }
                ];
                this.commissionerOptions = [
                    {
                        text: 'Нет',
                        value: '1'
                    },
                    {
                        text: 'Да',
                        value: '2'
                    },
                    {
                        text: 'Другой вариант',
                        value: '3'
                    }
                ];
                this.evacuationOptions = [
                    {
                        text: 'Нет',
                        value: '1'
                    },
                    {
                        text: 'Да',
                        value: '2'
                    },
                    {
                        text: 'Другой вариант',
                        value: '3'
                    }
                ];
                this.techSupportOptions = [
                    {
                        text: 'Нет',
                        value: '1'
                    },
                    {
                        text: 'Да',
                        value: '2'
                    },
                    {
                        text: 'Другой вариант',
                        value: '3'
                    }
                ];
                this.policeReferenceOptions = [
                    {
                        text: 'Нет',
                        value: '1'
                    },
                    {
                        text: 'Да',
                        value: '2'
                    },
                    {
                        text: 'Другой вариант',
                        value: '3'
                    }
                ];
                this.ageOptions = [
                    {
                        text: 'От 18 до 21',
                        value: '1'
                    },
                    {
                        text: 'От 21 до 30',
                        value: '2'
                    },
                    {
                        text: 'От 30 до 45',
                        value: '3'
                    },
                    {
                        text: 'Больше 45',
                        value: '4'
                    }
                ];
                this.experienceOptions = [
                    {
                        text: 'До года',
                        value: '1'
                    },
                    {
                        text: 'От 1 года до 3',
                        value: '2'
                    },
                    {
                        text: 'От 3 лет до 5',
                        value: '3'
                    },
                    {
                        text: 'Больше 5 лет',
                        value: '4'
                    }
                ];
                this.martialStatusOptions = [
                    {
                        text: 'Не женат/не замужем',
                        value: '1'
                    },
                    {
                        text: 'Женат/замужем',
                        value: '2'
                    },
                    {
                        text: 'Разведён/разведена',
                        value: '3'
                    }
                ];
                this.driverOptions = [
                    {
                        text: '1',
                        value: '1'
                    },
                    {
                        text: '2',
                        value: '2'
                    },
                    {
                        text: '3',
                        value: '3'
                    },
                    {
                        text: '4',
                        value: '4'
                    },
                    {
                        text: '5',
                        value: '5'
                    },
                    {
                        text: 'Неограниченно',
                        value: '6'
                    }
                ];
                this.countryOptions = [{
                        text: 'Первый регион',
                        value: '1'
                    },
                    {
                        text: 'Второй регион',
                        value: '2'
                    },
                    {
                        text: 'Третий регион',
                        value: '3'
                    }
                ];
                this.kidsOptions = [
                    {
                        text: 'Нет',
                        value: '0'
                    },
                    {
                        text: '1',
                        value: '1'
                    },
                    {
                        text: '2',
                        value: '2'
                    },
                    {
                        text: '3',
                        value: '3'
                    },
                    {
                        text: 'Больше 3-ех',
                        value: '4'
                    }
                ];
                this.driverCountModel = null;
                this.driversCount = null;
                this.addDriversCount = function () {
                    this.driversCount++;
                    this.driversCountChange();
                };
                this.driversCountChange = function () {
                    this.driversCount = this.driverCountModel.value;
                    if (this.driversCount > 5) {
                        this.driversCount = 0;
                    }
                    if (this.isNumeric(this.driversCount)) {
                        if (this.driversCount > this.osagoInsuranceForm.drivers.length) {
                            while (this.driversCount > this.osagoInsuranceForm.drivers.push(new osago.Driver())) { }
                        }
                        if (this.driversCount < this.osagoInsuranceForm.drivers.length) {
                            this.osagoInsuranceForm.drivers.splice(this.driversCount, this.osagoInsuranceForm.drivers.length - this.driversCount);
                        }
                    }
                };
                this.isNumeric = function (n) {
                    return !isNaN(parseFloat(n)) && isFinite(n);
                };
                this.lastBody = null;
                this.yearBigValue = function () {
                    var nowYear = new Date().getUTCFullYear();
                    if (this.osagoInsuranceForm.year > nowYear) {
                        this.osagoInsuranceForm.year = null;
                        this.osagoInsuranceForm.releaseYearIsLarge = true;
                    }
                    else {
                        this.osagoInsuranceForm.releaseYearIsLarge = false;
                    }
                };
                this.insuranceStartMinData.setDate(this.insuranceStartMinData.getDate() - 1);
                this.openAboutCar = !$rootScope.isMobile;
                this.openDataDrivers = !$rootScope.isMobile;
                this.openDriver = !$rootScope.isMobile;
                this.$rootScope.showFooter = true;
                this.$rootScope.showBlindStopper = false;
                this.osagoInsuranceForm = new osago.OsagoInsuranceForm();
                this.showPeriodStart = false;
                this.showBuyingDate = false;
                this.showStartUsingDate = false;
                this.antiTheftSystemAnotherFocused = false;
                this.searchSystemAnotherFocused = false;
                this.driverCountModel = { text: '1', value: '1' };
                this.driversCountChange();
                this.$http.get('api/handbook/region')
                    .success(function (response) {
                    _this.regionOptions = response;
                    _this.$http.get('api/handbook/country')
                        .success(function (response) {
                        _this.countryOptions = response;
                    });
                });
            }
            OSAGOController.prototype.antiTheftSystemSelected = function (selected) {
                if (selected.value) {
                    this.antiTheftSystemAnotherFocused = true;
                }
            };
            OSAGOController.prototype.searchSystemSelected = function (selected) {
                if (selected.value) {
                    this.searchSystemAnotherFocused = true;
                }
            };
            OSAGOController.prototype.getCarModificationOptions = function () {
                var _this = this;
                var s = 'api/handbook/carModifications/' + this.osagoInsuranceForm.year + '/';
                s += this.osagoInsuranceForm.brand.originalObject.title + '/' + this.osagoInsuranceForm.model.originalObject.title + '/';
                s += this.osagoInsuranceForm.carBody.value + '/';
                this.$http.get(s)
                    .success(function (response) {
                    _this.modificationOption = response;
                });
            };
            ;
            OSAGOController.prototype.getCarTransmissionOptions = function () {
                var _this = this;
                var s = 'api/handbook/carTransmission/' + this.osagoInsuranceForm.year + '/';
                s += this.osagoInsuranceForm.brand.originalObject.title + '/' + this.osagoInsuranceForm.model.originalObject.title + '/';
                s += this.osagoInsuranceForm.carBody.value + '/' + this.osagoInsuranceForm.modification.value + '/';
                this.$http.get(s)
                    .success(function (response) {
                    _this.transmissionOption = response;
                });
            };
            ;
            OSAGOController.prototype.getCarDetailsOptions = function () {
                var _this = this;
                var s = 'api/handbook/carDetails/' + this.osagoInsuranceForm.year + '/';
                s += this.osagoInsuranceForm.brand.originalObject.title + '/' + this.osagoInsuranceForm.model.originalObject.title + '/';
                s += this.osagoInsuranceForm.carBody.value + '/' + this.osagoInsuranceForm.modification.value + '/';
                s += this.osagoInsuranceForm.transmission.value + '/';
                this.$http.get(s)
                    .success(function (response) {
                    _this.osagoInsuranceForm.power = Number(response.EnginePower);
                    _this.osagoInsuranceForm.carCost = Number(response.Price);
                });
            };
            ;
            OSAGOController.prototype.getCarBodyOptions = function () {
                var _this = this;
                if (!this.osagoInsuranceForm.model) {
                    return null;
                }
                if (!this.lastBody || this.lastBody !== this.osagoInsuranceForm.model.originalObject.value) {
                    this.lastBody = this.osagoInsuranceForm.model.originalObject.value;
                    var s = 'api/handbook/carBodies/' + this.osagoInsuranceForm.year + '/';
                    s += this.osagoInsuranceForm.brand.originalObject.title + '/' + this.osagoInsuranceForm.model.originalObject.title + '/';
                    this.$http.get(s)
                        .success(function (response) {
                        console.log(_this.carBodyOptions);
                        console.log(response);
                        _this.carBodyOptions = response;
                    });
                }
            };
            OSAGOController.prototype.requestOffer = function () {
                var _this = this;
                console.log(this.osagoInsuranceForm);
                if (this.submitValue === 'Получить предложение') {
                    //           if (this.submitValue === 'Получить предложение') {
                    if (!this.$scope.form.$valid || !this.osagoInsuranceForm.isAgreed) {
                        return;
                    }
                    if (this.osagoInsuranceForm.carBody.value == null ||
                        this.osagoInsuranceForm.isIndividual.value == null ||
                        this.osagoInsuranceForm.isOwner.value == null ||
                        this.osagoInsuranceForm.brand == null) {
                        return;
                    }
                    var formClone = new osago.OsagoInsuranceForm();
                    console.log(this.osagoInsuranceForm);
                    formClone.periodStart = this.osagoInsuranceForm.periodStart;
                    formClone.year = this.osagoInsuranceForm.year;
                    formClone.brand = this.osagoInsuranceForm.brand.originalObject.title;
                    formClone.model = this.osagoInsuranceForm.model.originalObject.title;
                    formClone.carBody = this.osagoInsuranceForm.carBody.value;
                    formClone.region = this.osagoInsuranceForm.region.originalObject.value;
                    formClone.modification = this.osagoInsuranceForm.modification.value;
                    formClone.startUsingDate = this.osagoInsuranceForm.startUsingDate;
                    formClone.carCost = this.osagoInsuranceForm.carCost;
                    formClone.isIndividual = this.osagoInsuranceForm.isIndividual.value;
                    formClone.isOwner = this.osagoInsuranceForm.isOwner.value;
                    formClone.drivers = [];
                    formClone.isAgreed = this.osagoInsuranceForm.isAgreed;
                    formClone.power = this.osagoInsuranceForm.power;
                    for (var i = 0; i < this.osagoInsuranceForm.drivers.length; i++) {
                        if (this.osagoInsuranceForm.drivers[i].martialStatus.value == null ||
                            this.osagoInsuranceForm.drivers[i].kids.value == null) {
                            return;
                        }
                        formClone.drivers[i] = new osago.Driver();
                        //formClone.drivers[i].age = this.carInsuranceForm.drivers[i].age.value;
                        //formClone.drivers[i].experience = this.carInsuranceForm.drivers[i].experience.value;
                        formClone.drivers[i].age = this.osagoInsuranceForm.drivers[i].age;
                        formClone.drivers[i].experience = this.osagoInsuranceForm.drivers[i].experience;
                        formClone.drivers[i].martialStatus = this.osagoInsuranceForm.drivers[i].martialStatus.value;
                        formClone.drivers[i].kids = this.osagoInsuranceForm.drivers[i].kids.value;
                        formClone.drivers[i].isMale = this.osagoInsuranceForm.drivers[i].isMale;
                    }
                    this.OSAGOService.driver = formClone.drivers;
                    this.submitValue = 'Поиск предложений ...';
                    this.ModalService.showModal({
                        templateUrl: 'app/loading/loading.html',
                        controller: 'LoadingModalController',
                        controllerAs: 'loadingModalCtrl',
                        inputs: {}
                    });
                    window.scrollTo(0, 0);
                    this.OSAGOService.loadOffers(formClone).success(function () {
                        _this.$rootScope.dismissModal('loading');
                        _this.$state.go('osago.offer');
                    });
                }
            };
            return OSAGOController;
        })();
        osago.OSAGOController = OSAGOController;
        angular.module('nepereplaty').controller('nepereplaty.osago.OSAGOController', OSAGOController);
    })(osago = nepereplaty.osago || (nepereplaty.osago = {}));
})(nepereplaty || (nepereplaty = {}));
/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var osago;
    (function (osago) {
        var OSAGOOfferController = (function () {
            function OSAGOOfferController($state, $q, OSAGOService, $rootScope) {
                this.$state = $state;
                this.$q = $q;
                this.OSAGOService = OSAGOService;
                this.$rootScope = $rootScope;
                if (this.OSAGOService.getOffers() == null) {
                    this.$state.go('home');
                }
                this.offers = this.OSAGOService.getOffers();
                this.startData = this.offers.startData;
                this.endData = this.offers.endData;
                this.showMargin = $rootScope.isMobile;
            }
            OSAGOOfferController.prototype.buyOffer = function (index) {
                this.OSAGOService.offerIndex = index;
                console.log(this.OSAGOService.offerIndex);
                this.$state.go('osago.details');
            };
            ;
            return OSAGOOfferController;
        })();
        osago.OSAGOOfferController = OSAGOOfferController;
        angular.module('nepereplaty').controller('nepereplaty.osago.OSAGOOfferController', OSAGOOfferController);
    })(osago = nepereplaty.osago || (nepereplaty.osago = {}));
})(nepereplaty || (nepereplaty = {}));
/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var osago;
    (function (osago) {
        var OSAGODetailsController = (function () {
            function OSAGODetailsController($http, $state, $q, OSAGOService, auth, $scope, account, $rootScope, ModalService) {
                var _this = this;
                this.$http = $http;
                this.$state = $state;
                this.$q = $q;
                this.OSAGOService = OSAGOService;
                this.auth = auth;
                this.$scope = $scope;
                this.account = account;
                this.$rootScope = $rootScope;
                this.ModalService = ModalService;
                this.telCode = [
                    { text: '+7', value: '007' },
                    { text: '+1', value: '001' },
                    { text: '+33', value: '0033' },
                    { text: '+374', value: '00374' },
                    { text: '+25', value: '0024' },
                    { text: '+908', value: '00908' },
                ];
                if (this.OSAGOService.getOffers() == null) {
                    this.$state.go('home');
                }
                this.personalData = !$rootScope.isMobile;
                this.openPassportData = !$rootScope.isMobile;
                this.openDataDriving = !$rootScope.isMobile;
                this.offers = this.OSAGOService.getOffers();
                this.logoUrl = this.offers.Offers[this.OSAGOService.offerIndex].Company.Logo;
                this.userData = new osago.OSAGODetailsForm();
                while (this.offers.DriversCount > this.userData.drivers.length) {
                    this.userData.drivers.push(new osago.DriversLicense());
                }
                this.startData = this.offers.startData;
                this.endData = this.offers.endData;
                if (!this.auth.getUserId()) {
                    this.login();
                }
                else {
                    account.getAccount().then(function (value) {
                        _this.manageData = value;
                        _this.setData();
                    });
                }
            }
            ;
            OSAGODetailsController.prototype.register = function () {
                var _this = this;
                this.$rootScope.isModalShown = true;
                this.ModalService.showModal({
                    templateUrl: 'app/auth/register.html',
                    controller: 'RegisterModalController',
                    controllerAs: 'registerModalCtrl',
                    inputs: {
                        name: 'osago'
                    }
                }).then(function (modal) {
                    modal.close.then(function (result) {
                        if (result === 'login') {
                            _this.login();
                        }
                        else {
                            if (result === 'registered') {
                                _this.account.getAccount().then(function (value) {
                                    _this.manageData = value;
                                    _this.setData();
                                });
                            }
                            _this.$rootScope.isModalShown = false;
                        }
                        // Reset user password
                        //this.credentials.password = '';
                    });
                });
            };
            OSAGODetailsController.prototype.driversYearCheck = function () {
                var nowYear = new Date().getUTCFullYear();
                for (var i = 0; i < this.userData.drivers.length; i++) {
                    if (this.userData.drivers[i].year > nowYear) {
                        this.userData.drivers[i].year = nowYear;
                    }
                }
            };
            OSAGODetailsController.prototype.login = function () {
                var _this = this;
                this.$rootScope.isModalShown = true;
                this.ModalService.showModal({
                    templateUrl: 'app/auth/login.html',
                    controller: 'LoginModalController',
                    controllerAs: 'loginModalCtrl',
                    inputs: {
                        name: 'osago'
                    }
                }).then(function (modal) {
                    modal.close.then(function (result) {
                        if (result === 'register') {
                            _this.register();
                        }
                        else {
                            if (result === 'logedin') {
                                _this.account.getAccount().then(function (value) {
                                    _this.manageData = value;
                                    _this.setData();
                                });
                            }
                            _this.$rootScope.isModalShown = false;
                        }
                        // Reset user password
                        //this.credentials.password = '';
                    });
                });
            };
            OSAGODetailsController.prototype.editAccount = function () {
                var _this = this;
                this.account.editAccount(this.manageData).then(function (value) {
                    _this.account.getAccount().then(function (value) {
                        _this.manageData = value;
                        _this.setData();
                    });
                });
            };
            ;
            OSAGODetailsController.prototype.updateMiddle = function () {
                if (this.validate(this.userData.Name) && this.validate(this.userData.Surname)) {
                    this.isMiddle = true;
                }
                else {
                    this.isMiddle = false;
                }
            };
            OSAGODetailsController.prototype.validate = function (strValue) {
                var objRegExp = /^[a-zA-Z ]+$/;
                return objRegExp.test(strValue);
            };
            OSAGODetailsController.prototype.setData = function () {
                this.userData.Adress = this.manageData.Adress;
                this.userData.Birthday = this.manageData.Birthday;
                this.userData.City = this.manageData.City;
                this.userData.Email = this.manageData.Email;
                this.userData.IsMale = this.manageData.IsMale;
                this.userData.Middlename = this.manageData.Middlename;
                this.userData.Name = this.manageData.Name;
                this.userData.PassportIssued = this.manageData.PassportIssued;
                this.userData.PassportnNumber = this.manageData.PassportnNumber;
                this.userData.PassportSerial = this.manageData.PassportSerial;
                this.userData.PassportWhen = this.manageData.PassportWhen;
                this.userData.PassportWhere = this.manageData.PassportWhere;
                this.userData.Surname = this.manageData.Surname;
                this.userData.Mobile = Number(this.manageData.Mobile);
                this.userData.Telephone = Number(this.manageData.Telephone);
                if (this.manageData.MobileCode) {
                    if (this.manageData.MobileCode.text != null) {
                        this.userData.MobileCode = this.manageData.MobileCode;
                    }
                    else {
                        this.userData.MobileCode = { text: this.manageData.MobileCode, value: this.manageData.MobileCode };
                    }
                }
                else {
                    this.userData.MobileCode = { text: '--', value: null };
                }
                if (this.manageData.TelephoneCode) {
                    if (this.manageData.TelephoneCode.text != null) {
                        this.userData.TelephoneCode = this.manageData.TelephoneCode;
                    }
                    else {
                        this.userData.TelephoneCode = { text: this.manageData.TelephoneCode, value: this.manageData.TelephoneCode };
                    }
                }
                else {
                    this.userData.TelephoneCode = { text: '--', value: null };
                }
                this.updateMiddle();
            };
            OSAGODetailsController.prototype.requestBuyOffer = function () {
                var _this = this;
                if (!this.$scope.form.$valid) {
                    return;
                }
                if (this.pasportWhere) {
                    this.userData.PassportWhere = this.pasportWhere.title;
                }
                if (this.city) {
                    this.userData.City = this.city.title;
                }
                if (this.userData.Adress == null ||
                    this.userData.City == null ||
                    this.userData.Email == null ||
                    this.userData.IsMale == null ||
                    this.userData.Name == null ||
                    this.userData.PassportIssued == null ||
                    this.userData.PassportnNumber == null ||
                    this.userData.PassportSerial == null ||
                    this.userData.PassportWhere == null ||
                    this.userData.Surname == null ||
                    this.userData.Mobile == null ||
                    this.userData.Telephone == null ||
                    this.userData.PassportWhen === undefined) {
                    return;
                }
                if (!this.isMiddle && this.userData.Middlename == null) {
                    return;
                }
                for (var i = 0; i < this.userData.drivers.length; i++) {
                    if (this.userData.drivers[i].number == null ||
                        this.userData.drivers[i].year == null) {
                        return;
                    }
                }
                this.manageData.Adress = this.userData.Adress;
                this.manageData.Birthday = this.userData.Birthday;
                this.manageData.City = this.userData.City;
                this.manageData.Email = this.userData.Email;
                this.manageData.IsMale = this.userData.IsMale;
                this.manageData.Middlename = this.userData.Middlename;
                this.manageData.Name = this.userData.Name;
                this.manageData.PassportIssued = this.userData.PassportIssued;
                this.manageData.PassportnNumber = this.userData.PassportnNumber;
                this.manageData.PassportSerial = this.userData.PassportSerial;
                this.manageData.PassportWhen = this.userData.PassportWhen;
                this.manageData.PassportWhere = this.userData.PassportWhere;
                this.manageData.Surname = this.userData.Surname;
                this.manageData.Mobile = this.userData.Mobile;
                this.manageData.Telephone = this.userData.Telephone;
                this.manageData.MobileCode = this.userData.MobileCode.value;
                this.manageData.TelephoneCode = this.userData.TelephoneCode.value;
                this.editAccount();
                this.OSAGOService.buyerInfo = this.userData;
                var osagoModel = new osago.OsagoOfferModel();
                osagoModel.basic.buyer = this.userData.Email;
                osagoModel.basic.companyId = this.offers.Offers[this.OSAGOService.offerIndex].Company.Id;
                osagoModel.basic.cost = this.stringToFloat(this.OSAGOService.getOffers().Offers[this.OSAGOService.offerIndex].Price);
                osagoModel.basic.startDate = this.startData;
                osagoModel.basic.endDate = this.endData;
                osagoModel.basic.type = 'osago';
                osagoModel.osago.brand = this.offers.CarBrand;
                osagoModel.osago.model = this.offers.CarModel + ' ' + this.offers.CarReleaseYear;
                for (var i = 0; i < this.OSAGOService.driver.length; ++i) {
                    var d = this.OSAGOService.driver[i];
                    osagoModel.drivers.push(new osago.DriverDetail(d.age, d.experience, d.isMale, d.kids, d.martialStatus));
                }
                this.$http.put('api/admin/osago', osagoModel).success(function (response) {
                    _this.OSAGOService.offerId = response.offerId;
                    _this.$state.go('osago.payment');
                });
                //    this.$state.go('osago.payment');
            };
            ;
            OSAGODetailsController.prototype.stringToFloat = function (s) {
                var result = 0;
                var step1 = s.replace(',', '.');
                var step2 = step1.replace(/ /g, '');
                var step3 = step2.replace(' ', '').replace(String.fromCharCode(160), '');
                result = parseFloat(step3);
                return result;
            };
            return OSAGODetailsController;
        })();
        osago.OSAGODetailsController = OSAGODetailsController;
        angular.module('nepereplaty').controller('nepereplaty.osago.OSAGODetailsController', OSAGODetailsController);
    })(osago = nepereplaty.osago || (nepereplaty.osago = {}));
})(nepereplaty || (nepereplaty = {}));
/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var osago;
    (function (osago) {
        var OSAGOPaymentController = (function () {
            function OSAGOPaymentController($state, $q, OSAGOService) {
                this.$state = $state;
                this.$q = $q;
                this.OSAGOService = OSAGOService;
                if (this.OSAGOService.getOffers() == null) {
                    this.$state.go('home');
                }
                this.offers = this.OSAGOService.getOffers();
                this.logoUrl = this.offers.Offers[this.OSAGOService.offerIndex].Company.Logo;
                this.offer = this.offers.Offers[this.OSAGOService.offerIndex];
                console.log(this.offer);
                this.startData = this.offers.startData;
                this.endData = this.offers.endData;
            }
            ;
            OSAGOPaymentController.prototype.pay = function () {
                this.$state.go('osago.finish');
            };
            return OSAGOPaymentController;
        })();
        osago.OSAGOPaymentController = OSAGOPaymentController;
        angular.module('nepereplaty').controller('nepereplaty.osago.OSAGOPaymentController', OSAGOPaymentController);
    })(osago = nepereplaty.osago || (nepereplaty.osago = {}));
})(nepereplaty || (nepereplaty = {}));
/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var osago;
    (function (osago) {
        var OSAGOFinishController = (function () {
            function OSAGOFinishController($http, $state, $q, OSAGOService) {
                this.$http = $http;
                this.$state = $state;
                this.$q = $q;
                this.OSAGOService = OSAGOService;
                if (this.OSAGOService.getOffers() == null) {
                    this.$state.go('home');
                }
                this.offer = this.OSAGOService.getOffers().Offers[this.OSAGOService.offerIndex];
                this.data = this.OSAGOService.buyerInfo;
                this.age = this.OSAGOService.getOffers().DriversMinAge;
                this.orderNumber = this.OSAGOService.offerId;
                this.startData = this.OSAGOService.getOffers().startData;
                this.endData = this.OSAGOService.getOffers().endData;
                this.DriversCount = this.OSAGOService.getOffers().DriversCount;
                this.$http.get('../api/admin/purchas/' + this.orderNumber + '/'
                    + this.stringtoNumber(this.offer.Price)).success(function (response) {
                    console.log(response);
                });
            }
            OSAGOFinishController.prototype.stringtoNumber = function (s) {
                var result = 0;
                var step1 = s.replace(',', '.');
                var step2 = step1.replace(/ /g, '');
                var step3 = step2.replace(' ', '').replace(String.fromCharCode(160), '');
                result = parseFloat(step3);
                return result;
            };
            OSAGOFinishController.prototype.downloadPdf = function () {
                window.open('../../p/example.pdf');
            };
            ;
            return OSAGOFinishController;
        })();
        osago.OSAGOFinishController = OSAGOFinishController;
        angular.module('nepereplaty').controller('nepereplaty.osago.OSAGOFinishController', OSAGOFinishController);
    })(osago = nepereplaty.osago || (nepereplaty.osago = {}));
})(nepereplaty || (nepereplaty = {}));
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
/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var casco;
    (function (casco) {
        var CASCOontroller = (function () {
            // @ngInject
            function CASCOontroller($http, $state, $q, CASCOService, $scope, ModalService, $timeout, $rootScope) {
                this.$http = $http;
                this.$state = $state;
                this.$q = $q;
                this.CASCOService = CASCOService;
                this.$scope = $scope;
                this.ModalService = ModalService;
                this.$timeout = $timeout;
                this.$rootScope = $rootScope;
                this.insuranceStartMinData = new Date();
                this.submitValue = 'Получить предложение';
                this.powerOptions = [{
                        text: 'До 50',
                        value: '45'
                    },
                    {
                        text: 'От 50 до 70',
                        value: '55'
                    },
                    {
                        text: 'От 70 до 100',
                        value: '75'
                    },
                    {
                        text: 'От 100 до 120',
                        value: '110'
                    },
                    {
                        text: 'От 120 до 150',
                        value: '125'
                    },
                    {
                        text: 'Свыше 150',
                        value: '155'
                    }
                ];
                this.regionOptions = [{
                        text: 'Первый регион',
                        value: '1'
                    },
                    {
                        text: 'Второй регион',
                        value: '2'
                    },
                    {
                        text: 'Третий регион',
                        value: '3'
                    }
                ];
                this.franchiseOptions = [
                    {
                        text: '15000',
                        value: '15000_15000'
                    },
                    {
                        text: '50000',
                        value: '50000_50000'
                    }
                ];
                this.isIndividualOptions = [
                    {
                        text: 'Физическое лицо',
                        value: true
                    },
                    {
                        text: 'Юридическое лицо',
                        value: false
                    }
                ];
                this.isOwnerOptions = [
                    {
                        text: 'Собственник',
                        value: true
                    },
                    {
                        text: 'По доверенности',
                        value: false
                    }
                ];
                this.wasInsuranceOptions = [{
                        text: 'Нет',
                        value: '1'
                    },
                    {
                        text: 'Да, одна',
                        value: '2'
                    },
                    {
                        text: 'Больше',
                        value: '3'
                    }
                ];
                this.wasClaimsOptions = [{
                        text: 'Нет',
                        value: '1'
                    },
                    {
                        text: 'Да, один',
                        value: '2'
                    },
                    {
                        text: 'Больше',
                        value: '3'
                    }
                ];
                this.rudderOptions = [{
                        text: 'Левосторонний',
                        value: true
                    },
                    {
                        text: 'Правосторонний',
                        value: false
                    }
                ];
                this.antiTheftSystemOptions = [{
                        text: 'Нет',
                        value: false
                    },
                    {
                        text: 'Сигнализация',
                        value: false
                    },
                    {
                        text: 'Другое',
                        value: true
                    }
                ];
                this.searchSystemOptions = [
                    {
                        text: 'Нет',
                        value: false
                    },
                    {
                        text: 'GPS',
                        value: false
                    },
                    {
                        text: 'Другое',
                        value: true
                    }
                ];
                this.commissionerOptions = [
                    {
                        text: 'Нет',
                        value: '1'
                    },
                    {
                        text: 'Да',
                        value: '2'
                    },
                    {
                        text: 'Другой вариант',
                        value: '3'
                    }
                ];
                this.evacuationOptions = [
                    {
                        text: 'Нет',
                        value: '1'
                    },
                    {
                        text: 'Да',
                        value: '2'
                    },
                    {
                        text: 'Другой вариант',
                        value: '3'
                    }
                ];
                this.techSupportOptions = [
                    {
                        text: 'Нет',
                        value: '1'
                    },
                    {
                        text: 'Да',
                        value: '2'
                    },
                    {
                        text: 'Другой вариант',
                        value: '3'
                    }
                ];
                this.policeReferenceOptions = [
                    {
                        text: 'Нет',
                        value: '1'
                    },
                    {
                        text: 'Да',
                        value: '2'
                    },
                    {
                        text: 'Другой вариант',
                        value: '3'
                    }
                ];
                this.ageOptions = [
                    {
                        text: 'От 18 до 21',
                        value: '1'
                    },
                    {
                        text: 'От 21 до 30',
                        value: '2'
                    },
                    {
                        text: 'От 30 до 45',
                        value: '3'
                    },
                    {
                        text: 'Больше 45',
                        value: '4'
                    }
                ];
                this.experienceOptions = [
                    {
                        text: 'До года',
                        value: '1'
                    },
                    {
                        text: 'От 1 года до 3',
                        value: '2'
                    },
                    {
                        text: 'От 3 лет до 5',
                        value: '3'
                    },
                    {
                        text: 'Больше 5 лет',
                        value: '4'
                    }
                ];
                this.martialStatusOptions = [
                    {
                        text: 'Не женат/не замужем',
                        value: '1'
                    },
                    {
                        text: 'Женат/замужем',
                        value: '2'
                    },
                    {
                        text: 'Разведён/разведена',
                        value: '3'
                    }
                ];
                this.kidsOptions = [
                    {
                        text: 'Нет',
                        value: '0'
                    },
                    {
                        text: '1',
                        value: '1'
                    },
                    {
                        text: '2',
                        value: '2'
                    },
                    {
                        text: '3',
                        value: '3'
                    },
                    {
                        text: 'Больше 3-ех',
                        value: '4'
                    }
                ];
                this.driverOptions = [
                    {
                        text: '1',
                        value: '1'
                    },
                    {
                        text: '2',
                        value: '2'
                    },
                    {
                        text: '3',
                        value: '3'
                    },
                    {
                        text: '4',
                        value: '4'
                    },
                    {
                        text: '5',
                        value: '5'
                    },
                    {
                        text: 'Неограниченно',
                        value: '6'
                    }
                ];
                this.driverCountModel = null;
                this.driversCount = null;
                this.addDriversCount = function () {
                    this.driversCount++;
                    this.driversCountChange();
                };
                this.driversCountChange = function () {
                    this.driversCount = this.driverCountModel.value;
                    if (this.driversCount > 5) {
                        this.driversCount = 0;
                    }
                    if (this.isNumeric(this.driversCount)) {
                        if (this.driversCount > this.cascoInsuranceForm.drivers.length) {
                            while (this.driversCount > this.cascoInsuranceForm.drivers.push(new casco.Driver())) { }
                        }
                        if (this.driversCount < this.cascoInsuranceForm.drivers.length) {
                            this.cascoInsuranceForm.drivers.splice(this.driversCount, this.cascoInsuranceForm.drivers.length - this.driversCount);
                        }
                    }
                };
                this.isNumeric = function (n) {
                    return !isNaN(parseFloat(n)) && isFinite(n);
                };
                this.lastBody = null;
                this.yearBigValue = function () {
                    var nowYear = new Date().getUTCFullYear();
                    if (this.cascoInsuranceForm.releaseYear > nowYear) {
                        this.cascoInsuranceForm.releaseYear = null;
                        this.cascoInsuranceForm.releaseYearIsLarge = true;
                    }
                    else {
                        this.cascoInsuranceForm.releaseYearIsLarge = false;
                    }
                };
                this.insuranceStartMinData.setDate(this.insuranceStartMinData.getDate() - 1);
                this.$rootScope.showFooter = true;
                this.$rootScope.showBlindStopper = false;
                this.cascoInsuranceForm = new casco.CascoInsuranceForm();
                this.openAboutCar = !$rootScope.isMobile;
                this.openDataDrivers = !$rootScope.isMobile;
                this.openListDrivers = !$rootScope.isMobile;
                this.openExtraOptions = !$rootScope.isMobile;
                this.openAdditionalServices = !$rootScope.isMobile;
                this.openPreviousInsurance = !$rootScope.isMobile;
                this.showPeriodStart = false;
                this.showBuyingDate = false;
                this.showStartUsingDate = false;
                this.antiTheftSystemAnotherFocused = false;
                this.searchSystemAnotherFocused = false;
                this.driverCountModel = { text: '1', value: '1' };
                this.driversCountChange();
                this.getRegions();
            }
            CASCOontroller.prototype.stringtoNumber = function (s) {
                var result = 0;
                var step1 = s.replace(' ', '.').replace(String.fromCharCode(160), '');
                var step2 = step1.replace(',', '');
                result = parseFloat(step2);
                console.log(result);
                return result;
            };
            CASCOontroller.prototype.getRegions = function () {
                var _this = this;
                var s = 'api/handbook/region/';
                this.$http.get(s)
                    .success(function (response) {
                    console.log(_this.regions);
                    _this.regions = response;
                    console.log(_this.regions);
                });
            };
            ;
            CASCOontroller.prototype.antiTheftSystemSelected = function (selected) {
                if (selected.value) {
                    this.antiTheftSystemAnotherFocused = true;
                }
            };
            CASCOontroller.prototype.searchSystemSelected = function (selected) {
                if (selected.value) {
                    this.searchSystemAnotherFocused = true;
                }
            };
            CASCOontroller.prototype.getCarModificationOptions = function () {
                var _this = this;
                var s = 'api/handbook/carModifications/' + this.cascoInsuranceForm.releaseYear + '/';
                s += this.cascoInsuranceForm.brand.originalObject.title + '/' + this.cascoInsuranceForm.model.originalObject.title + '/';
                s += this.cascoInsuranceForm.carBody.value + '/';
                this.$http.get(s)
                    .success(function (response) {
                    _this.modificationOption = response;
                });
            };
            ;
            CASCOontroller.prototype.getCarTransmissionOptions = function () {
                var _this = this;
                var s = 'api/handbook/carTransmission/' + this.cascoInsuranceForm.releaseYear + '/';
                s += this.cascoInsuranceForm.brand.originalObject.title + '/' + this.cascoInsuranceForm.model.originalObject.title + '/';
                s += this.cascoInsuranceForm.carBody.value + '/' + this.cascoInsuranceForm.modification.value + '/';
                this.$http.get(s)
                    .success(function (response) {
                    _this.transmissionOption = response;
                });
            };
            ;
            CASCOontroller.prototype.getCarDetailsOptions = function () {
                var _this = this;
                var s = 'api/handbook/carDetails/' + this.cascoInsuranceForm.releaseYear + '/';
                s += this.cascoInsuranceForm.brand.originalObject.title + '/' + this.cascoInsuranceForm.model.originalObject.title + '/';
                s += this.cascoInsuranceForm.carBody.value + '/' + this.cascoInsuranceForm.modification.value + '/';
                s += this.cascoInsuranceForm.transmission.value + '/';
                this.$http.get(s)
                    .success(function (response) {
                    console.log(response);
                    _this.cascoInsuranceForm.power = Number(response.EnginePower);
                    _this.cascoInsuranceForm.carCost = Number(response.Price);
                    console.log(response);
                    _this.cascoInsuranceForm.EngineHorsepower = response.EnginePower;
                    _this.cascoInsuranceForm.EnginePowerKWt = response.EnginePowerKWt;
                    _this.cascoInsuranceForm.GroupId = response.GroupId;
                    _this.cascoInsuranceForm.VehicleMarkModelCode = response.Id;
                    _this.cascoInsuranceForm.Model = response.Model;
                    _this.cascoInsuranceForm.Modification = response.Modification;
                    _this.cascoInsuranceForm.VehicleMarkModelRAMICode = response.RsaCode;
                    console.log(_this.cascoInsuranceForm);
                });
            };
            ;
            CASCOontroller.prototype.getCarBodyOptions = function () {
                var _this = this;
                if (!this.cascoInsuranceForm.model) {
                    return null;
                }
                if (!this.lastBody || this.lastBody !== this.cascoInsuranceForm.model.originalObject.title) {
                    this.lastBody = this.cascoInsuranceForm.model.originalObject.title;
                    var s = 'api/handbook/carBodies/' + this.cascoInsuranceForm.releaseYear + '/';
                    s += this.cascoInsuranceForm.brand.originalObject.title + '/' + this.cascoInsuranceForm.model.originalObject.title + '/';
                    this.$http.get(s)
                        .success(function (response) {
                        console.log(_this.carBodyOptions);
                        console.log(response);
                        _this.carBodyOptions = response;
                    });
                }
            };
            CASCOontroller.prototype.requestOffer = function () {
                var _this = this;
                if (true) {
                    //           if (this.submitValue === 'Получить предложение') {
                    console.log(this.cascoInsuranceForm);
                    if (!this.$scope.form.$valid || !this.cascoInsuranceForm.isAgreed) {
                        return;
                    }
                    if (this.cascoInsuranceForm.carBody.value == null ||
                        this.cascoInsuranceForm.franchise.value == null ||
                        this.cascoInsuranceForm.isIndividual.value == null ||
                        this.cascoInsuranceForm.isOwner.value == null ||
                        this.cascoInsuranceForm.wasInsurance.value == null ||
                        this.cascoInsuranceForm.wasClaims.value == null ||
                        this.cascoInsuranceForm.carClaimsOneYearAgo.value == null ||
                        this.cascoInsuranceForm.carClaimsTwoYearAgo.value == null ||
                        this.cascoInsuranceForm.carClaimsThreeYearAgo.value == null ||
                        this.cascoInsuranceForm.mutilationClaimsOneYearAgo.value == null ||
                        this.cascoInsuranceForm.mutilationClaimsTwoYearAgo.value == null ||
                        this.cascoInsuranceForm.mutilationClaimsThreeYearAgo.value == null ||
                        this.cascoInsuranceForm.isLeftSideRudder.value == null ||
                        this.cascoInsuranceForm.antiTheftSystem.value == null ||
                        this.cascoInsuranceForm.searchSystem.value == null ||
                        this.cascoInsuranceForm.commissioner == null ||
                        this.cascoInsuranceForm.evacuation == null ||
                        this.cascoInsuranceForm.techSupport == null ||
                        this.cascoInsuranceForm.policeReference == null ||
                        this.cascoInsuranceForm.InsuranceMode == null) {
                        return;
                    }
                    console.log(' ------ ');
                    var formClone = new casco.CascoInsuranceForm();
                    formClone.carBody = this.cascoInsuranceForm.carBody.value;
                    formClone.region = this.cascoInsuranceForm.region.originalObject.value;
                    formClone.franchise = this.cascoInsuranceForm.franchise.value;
                    formClone.isIndividual = this.cascoInsuranceForm.isIndividual.value;
                    formClone.isOwner = this.cascoInsuranceForm.isOwner.value;
                    formClone.wasInsurance = this.cascoInsuranceForm.wasInsurance.value.toString();
                    formClone.wasClaims = this.cascoInsuranceForm.wasClaims.value.toString();
                    formClone.carClaimsOneYearAgo = this.cascoInsuranceForm.carClaimsOneYearAgo.value.toString();
                    formClone.carClaimsTwoYearAgo = this.cascoInsuranceForm.carClaimsTwoYearAgo.value.toString();
                    formClone.carClaimsThreeYearAgo = this.cascoInsuranceForm.carClaimsThreeYearAgo.value.toString();
                    formClone.mutilationClaimsOneYearAgo = this.cascoInsuranceForm.mutilationClaimsOneYearAgo.value.toString();
                    formClone.mutilationClaimsTwoYearAgo = this.cascoInsuranceForm.mutilationClaimsTwoYearAgo.value.toString();
                    formClone.mutilationClaimsThreeYearAgo = this.cascoInsuranceForm.mutilationClaimsThreeYearAgo.value.toString();
                    formClone.isLeftSideRudder = this.cascoInsuranceForm.isLeftSideRudder.value;
                    formClone.antiTheftSystem = this.cascoInsuranceForm.antiTheftSystem.value.toString();
                    formClone.searchSystem = this.cascoInsuranceForm.searchSystem.value.toString();
                    formClone.commissioner = this.cascoInsuranceForm.commissioner.toString();
                    formClone.evacuation = this.cascoInsuranceForm.evacuation.toString();
                    formClone.techSupport = this.cascoInsuranceForm.techSupport.toString();
                    formClone.policeReference = this.cascoInsuranceForm.policeReference.toString();
                    formClone.modification = this.cascoInsuranceForm.modification.value;
                    formClone.brand = this.cascoInsuranceForm.brand.originalObject.value;
                    formClone.model = this.cascoInsuranceForm.model.originalObject.value;
                    formClone.drivers = [];
                    formClone.transmission = this.cascoInsuranceForm.transmission.value;
                    formClone.antiTheftSystem_another = this.cascoInsuranceForm.antiTheftSystem_another;
                    formClone.buyingDate = this.cascoInsuranceForm.buyingDate;
                    formClone.carCost = this.cascoInsuranceForm.carCost;
                    formClone.isAgreed = this.cascoInsuranceForm.isAgreed;
                    formClone.isCredit = this.cascoInsuranceForm.isCredit;
                    formClone.isGuarantee = this.cascoInsuranceForm.isGuarantee;
                    formClone.InsuranceMode = this.cascoInsuranceForm.InsuranceMode.value;
                    formClone.periodStart = this.cascoInsuranceForm.periodStart;
                    formClone.searchSystem_another = this.cascoInsuranceForm.searchSystem_another;
                    formClone.startUsingDate = this.cascoInsuranceForm.startUsingDate;
                    formClone.releaseYear = this.cascoInsuranceForm.releaseYear;
                    formClone.releaseYearIsLarge = this.cascoInsuranceForm.releaseYearIsLarge;
                    formClone.power = this.cascoInsuranceForm.power;
                    formClone.InsuranceMode = this.cascoInsuranceForm.InsuranceMode.toString();
                    formClone.EngineHorsepower = this.cascoInsuranceForm.EngineHorsepower;
                    formClone.EnginePowerKWt = this.cascoInsuranceForm.EnginePowerKWt;
                    formClone.GroupId = this.cascoInsuranceForm.GroupId;
                    formClone.VehicleMarkModelCode = this.cascoInsuranceForm.VehicleMarkModelCode.toString();
                    formClone.Model = this.cascoInsuranceForm.Model;
                    formClone.Modification = this.cascoInsuranceForm.Modification;
                    formClone.VehicleMarkModelRAMICode = this.cascoInsuranceForm.VehicleMarkModelRAMICode.toString();
                    formClone.city = this.cascoInsuranceForm.city.title;
                    console.log(formClone);
                    for (var i = 0; i < this.cascoInsuranceForm.drivers.length; i++) {
                        if (this.cascoInsuranceForm.drivers[i].martialStatus.value == null ||
                            this.cascoInsuranceForm.drivers[i].kids.value == null) {
                            return;
                        }
                        formClone.drivers[i] = new casco.Driver();
                        //formClone.drivers[i].age = this.carInsuranceForm.drivers[i].age.value;
                        //formClone.drivers[i].experience = this.carInsuranceForm.drivers[i].experience.value;
                        formClone.drivers[i].age = this.cascoInsuranceForm.drivers[i].age;
                        formClone.drivers[i].experience = this.cascoInsuranceForm.drivers[i].experience;
                        formClone.drivers[i].martialStatus = this.cascoInsuranceForm.drivers[i].martialStatus.value;
                        formClone.drivers[i].kids = this.cascoInsuranceForm.drivers[i].kids.value;
                        formClone.drivers[i].isMale = this.cascoInsuranceForm.drivers[i].isMale;
                    }
                    this.submitValue = 'Поиск предложений ...';
                    this.ModalService.showModal({
                        templateUrl: 'app/loading/loading.html',
                        controller: 'LoadingModalController',
                        controllerAs: 'loadingModalCtrl',
                        inputs: {}
                    });
                    window.scrollTo(0, 0);
                    this.CASCOService.loadOffers(formClone).success(function () {
                        _this.$rootScope.dismissModal('loading');
                        _this.$state.go('casco.offer');
                    });
                }
            };
            return CASCOontroller;
        })();
        casco.CASCOontroller = CASCOontroller;
        angular.module('nepereplaty').controller('nepereplaty.casco.CASCOController', CASCOontroller);
    })(casco = nepereplaty.casco || (nepereplaty.casco = {}));
})(nepereplaty || (nepereplaty = {}));
/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var casco;
    (function (casco) {
        var CASCOOfferController = (function () {
            function CASCOOfferController($state, $q, CASCOService, $rootScope) {
                this.$state = $state;
                this.$q = $q;
                this.CASCOService = CASCOService;
                this.$rootScope = $rootScope;
                if (this.CASCOService.getOffers() == null) {
                    this.$state.go('home');
                }
                this.offers = this.CASCOService.getOffers();
                this.canCompare = false;
                this.startData = this.offers.startData;
                this.endData = this.offers.endData;
                this.showMargin = $rootScope.isMobile;
            }
            CASCOOfferController.prototype.buyOffer = function (index) {
                this.CASCOService.offerIndex = index;
                this.$state.go('casco.details');
            };
            ;
            CASCOOfferController.prototype.onClickCompareChackBox = function () {
                var indexes = [];
                var index = 0;
                var offer;
                for (var i = 0; i < this.offers.Offers.length; ++i) {
                    offer = this.offers.Offers[i];
                    if (offer.isCompair) {
                        indexes.push(index);
                    }
                    index++;
                }
                if (indexes.length === 2) {
                    this.canCompare = true;
                }
                else {
                    this.canCompare = false;
                }
                console.log(this.canCompare);
            };
            ;
            CASCOOfferController.prototype.compare = function () {
                if (this.canCompare) {
                    this.$state.go('casco.compare');
                }
            };
            ;
            return CASCOOfferController;
        })();
        casco.CASCOOfferController = CASCOOfferController;
        angular.module('nepereplaty').controller('nepereplaty.casco.CASCOOfferController', CASCOOfferController);
    })(casco = nepereplaty.casco || (nepereplaty.casco = {}));
})(nepereplaty || (nepereplaty = {}));
/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var casco;
    (function (casco) {
        var CASCOCompareController = (function () {
            function CASCOCompareController($state, $q, CASCOService) {
                this.$state = $state;
                this.$q = $q;
                this.CASCOService = CASCOService;
                console.log('++++++++++++++++++____');
                this.offers = this.CASCOService.getOffers();
                if (this.offers.Offers[0].AdditionalOptions.length > this.offers.Offers[1].AdditionalOptions.length) {
                    this.AdditionalOptions = this.offers.Offers[0].AdditionalOptions;
                }
                else {
                    this.AdditionalOptions = this.offers.Offers[1].AdditionalOptions;
                }
                console.log('++++++++++++++++++____');
            }
            CASCOCompareController.prototype.back = function () {
                console.log('________________________________===================');
                this.$state.go('casco.offer');
            };
            ;
            return CASCOCompareController;
        })();
        casco.CASCOCompareController = CASCOCompareController;
        angular.module('nepereplaty').controller('nepereplaty.casco.CASCOCompareController', CASCOCompareController);
    })(casco = nepereplaty.casco || (nepereplaty.casco = {}));
})(nepereplaty || (nepereplaty = {}));
/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var casco;
    (function (casco) {
        var CASCODetailsController = (function () {
            function CASCODetailsController($http, $state, $q, CASCOService, auth, $scope, account, $rootScope, ModalService) {
                var _this = this;
                this.$http = $http;
                this.$state = $state;
                this.$q = $q;
                this.CASCOService = CASCOService;
                this.auth = auth;
                this.$scope = $scope;
                this.account = account;
                this.$rootScope = $rootScope;
                this.ModalService = ModalService;
                this.telCode = [
                    { text: '+7', value: '007' },
                    { text: '+1', value: '001' },
                    { text: '+33', value: '0033' },
                    { text: '+374', value: '00374' },
                    { text: '+25', value: '0024' },
                    { text: '+908', value: '00908' },
                ];
                if (this.CASCOService.getOffers() == null) {
                    this.$state.go('home');
                }
                this.personalData = !$rootScope.isMobile;
                this.openPassportData = !$rootScope.isMobile;
                this.openDataDriving = !$rootScope.isMobile;
                this.offers = this.CASCOService.getOffers();
                this.userData = new casco.CASCODetailsForm();
                this.startData = this.offers.startData;
                this.endData = this.endData = this.offers.endData;
                this.logoUrl = this.offers.Offers[this.CASCOService.offerIndex].Company.Logo;
                while (this.offers.DriversCount > this.userData.drivers.length) {
                    this.userData.drivers.push(new casco.DriversLicense());
                }
                if (!this.auth.getUserId()) {
                    this.login();
                }
                else {
                    account.getAccount().then(function (value) {
                        _this.manageData = value;
                        _this.setData();
                    });
                }
            }
            ;
            CASCODetailsController.prototype.register = function () {
                var _this = this;
                this.$rootScope.isModalShown = true;
                this.ModalService.showModal({
                    templateUrl: 'app/auth/register.html',
                    controller: 'RegisterModalController',
                    controllerAs: 'registerModalCtrl',
                    inputs: {
                        name: 'casco'
                    }
                }).then(function (modal) {
                    modal.close.then(function (result) {
                        if (result === 'login') {
                            _this.login();
                        }
                        else {
                            if (result === 'registered') {
                                _this.account.getAccount().then(function (value) {
                                    _this.manageData = value;
                                    _this.setData();
                                });
                            }
                            _this.$rootScope.isModalShown = false;
                        }
                        // Reset user password
                        //this.credentials.password = '';
                    });
                });
            };
            CASCODetailsController.prototype.login = function () {
                var _this = this;
                this.$rootScope.isModalShown = true;
                this.ModalService.showModal({
                    templateUrl: 'app/auth/login.html',
                    controller: 'LoginModalController',
                    controllerAs: 'loginModalCtrl',
                    inputs: {
                        name: 'casco'
                    }
                }).then(function (modal) {
                    modal.close.then(function (result) {
                        if (result === 'register') {
                            _this.register();
                        }
                        else {
                            if (result === 'logedin') {
                                _this.account.getAccount().then(function (value) {
                                    _this.manageData = value;
                                    _this.setData();
                                });
                            }
                            _this.$rootScope.isModalShown = false;
                        }
                        // Reset user password
                        //this.credentials.password = '';
                    });
                });
            };
            CASCODetailsController.prototype.editAccount = function () {
                var _this = this;
                this.account.editAccount(this.manageData).then(function (value) {
                    _this.account.getAccount().then(function (value) {
                        _this.manageData = value;
                        _this.setData();
                    });
                });
            };
            ;
            CASCODetailsController.prototype.updateMiddle = function () {
                if (this.validate(this.userData.Name) && this.validate(this.userData.Surname)) {
                    this.isMiddle = true;
                }
                else {
                    this.isMiddle = false;
                }
            };
            CASCODetailsController.prototype.driversYearCheck = function () {
                var nowYear = new Date().getUTCFullYear();
                for (var i = 0; i < this.userData.drivers.length; i++) {
                    if (this.userData.drivers[i].year > nowYear) {
                        this.userData.drivers[i].year = nowYear;
                    }
                }
            };
            CASCODetailsController.prototype.validate = function (strValue) {
                var objRegExp = /^[a-zA-Z ]+$/;
                return objRegExp.test(strValue);
            };
            CASCODetailsController.prototype.setData = function () {
                this.userData.Adress = this.manageData.Adress;
                this.userData.Birthday = this.manageData.Birthday;
                this.userData.City = this.manageData.City;
                this.userData.Email = this.manageData.Email;
                this.userData.IsMale = this.manageData.IsMale;
                this.userData.Middlename = this.manageData.Middlename;
                this.userData.Name = this.manageData.Name;
                this.userData.PassportIssued = this.manageData.PassportIssued;
                this.userData.PassportnNumber = this.manageData.PassportnNumber;
                this.userData.PassportSerial = this.manageData.PassportSerial;
                this.userData.PassportWhen = this.manageData.PassportWhen;
                this.userData.PassportWhere = this.manageData.PassportWhere;
                this.userData.Surname = this.manageData.Surname;
                this.userData.Mobile = Number(this.manageData.Mobile);
                this.userData.Telephone = Number(this.manageData.Telephone);
                if (this.manageData.MobileCode) {
                    if (this.manageData.MobileCode.text != null) {
                        this.userData.MobileCode = this.manageData.MobileCode;
                    }
                    else {
                        this.userData.MobileCode = { text: this.manageData.MobileCode, value: this.manageData.MobileCode };
                    }
                }
                else {
                    this.userData.MobileCode = { text: '--', value: null };
                }
                if (this.manageData.TelephoneCode) {
                    if (this.manageData.TelephoneCode.text != null) {
                        this.userData.TelephoneCode = this.manageData.TelephoneCode;
                    }
                    else {
                        this.userData.TelephoneCode = { text: this.manageData.TelephoneCode, value: this.manageData.TelephoneCode };
                    }
                }
                else {
                    this.userData.TelephoneCode = { text: '--', value: null };
                }
                this.updateMiddle();
            };
            CASCODetailsController.prototype.requestBuyOffer = function () {
                var _this = this;
                if (!this.$scope.form.$valid) {
                    return;
                }
                if (this.pasportWhere) {
                    this.userData.PassportWhere = this.pasportWhere.title;
                }
                if (this.city) {
                    this.userData.City = this.city.title;
                }
                if (this.userData.Adress == null ||
                    this.userData.City == null ||
                    this.userData.Email == null ||
                    this.userData.IsMale == null ||
                    this.userData.Name == null ||
                    this.userData.PassportIssued == null ||
                    this.userData.PassportnNumber == null ||
                    this.userData.PassportSerial == null ||
                    this.userData.PassportWhere == null ||
                    this.userData.Surname == null ||
                    this.userData.Mobile == null ||
                    this.userData.Telephone == null ||
                    this.userData.PassportWhen === undefined) {
                    return;
                }
                if (!this.isMiddle && this.userData.Middlename == null) {
                    return;
                }
                for (var i = 0; i < this.userData.drivers.length; i++) {
                    if (this.userData.drivers[i].number == null ||
                        this.userData.drivers[i].year == null) {
                        return;
                    }
                }
                this.manageData.Adress = this.userData.Adress;
                this.manageData.Birthday = this.userData.Birthday;
                this.manageData.City = this.userData.City;
                this.manageData.Email = this.userData.Email;
                this.manageData.IsMale = this.userData.IsMale;
                this.manageData.Middlename = this.userData.Middlename;
                this.manageData.Name = this.userData.Name;
                this.manageData.PassportIssued = this.userData.PassportIssued;
                this.manageData.PassportnNumber = this.userData.PassportnNumber;
                this.manageData.PassportSerial = this.userData.PassportSerial;
                this.manageData.PassportWhen = this.userData.PassportWhen;
                this.manageData.PassportWhere = this.userData.PassportWhere;
                this.manageData.Surname = this.userData.Surname;
                this.manageData.Mobile = this.userData.Mobile;
                this.manageData.Telephone = this.userData.Telephone;
                this.manageData.MobileCode = this.userData.MobileCode.value;
                this.manageData.TelephoneCode = this.userData.TelephoneCode.value;
                this.editAccount();
                this.CASCOService.buyerInfo = this.userData;
                var osagoModel = new nepereplaty.osago.OsagoOfferModel();
                osagoModel.basic.buyer = this.userData.Email;
                osagoModel.basic.companyId = this.offers.Offers[this.CASCOService.offerIndex].Company.Id;
                osagoModel.basic.cost = this.stringToFloat(this.CASCOService.getOffers().Offers[this.CASCOService.offerIndex].Price);
                osagoModel.basic.startDate = this.startData;
                osagoModel.basic.endDate = this.endData;
                osagoModel.basic.type = 'casco';
                osagoModel.osago.brand = this.offers.CarBrand.split('_')[0];
                osagoModel.osago.model = this.offers.CarModel.split('_')[0] + ' ' + this.offers.CarReleaseYear;
                for (var i = 0; i < this.CASCOService.driver.length; ++i) {
                    var d = this.CASCOService.driver[i];
                    osagoModel.drivers.push(new casco.DriverDetail(d.age, d.experience, d.isMale, d.kids, d.martialStatus));
                }
                this.$http.put('api/admin/casco', osagoModel).success(function (response) {
                    _this.CASCOService.offerId = response.offerId;
                    _this.$state.go('casco.payment');
                });
            };
            ;
            CASCODetailsController.prototype.stringToFloat = function (s) {
                var result = 0;
                var step1 = s.replace(',', '.');
                var step2 = step1.replace(/ /g, '');
                var step3 = step2.replace(' ', '').replace(String.fromCharCode(160), '');
                result = parseFloat(step3);
                return result;
            };
            return CASCODetailsController;
        })();
        casco.CASCODetailsController = CASCODetailsController;
        angular.module('nepereplaty').controller('nepereplaty.casco.CASCODetailsController', CASCODetailsController);
    })(casco = nepereplaty.casco || (nepereplaty.casco = {}));
})(nepereplaty || (nepereplaty = {}));
/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var casco;
    (function (casco) {
        var CASCOPaymentController = (function () {
            function CASCOPaymentController($state, $q, CASCOService) {
                this.$state = $state;
                this.$q = $q;
                this.CASCOService = CASCOService;
                if (this.CASCOService.getOffers() == null) {
                    this.$state.go('home');
                }
                this.offers = this.CASCOService.getOffers();
                this.offer = this.offers.Offers[this.CASCOService.offerIndex];
                this.osagoOffer = this.stringtoNumber(this.offer.osagoPrice);
                this.osagoInclude = false;
                this.updata();
                this.logoUrl = this.offers.Offers[this.CASCOService.offerIndex].Company.Logo;
                this.osagoOfferString = this.osagoOffer.toFixed(3);
                var scapeIndex = (this.osagoOffer / 1000).toFixed(0).length;
                this.osagoOfferString = this.osagoOfferString.slice(0, scapeIndex) + ' ' +
                    this.osagoOfferString.slice(scapeIndex, this.osagoOfferString.length - 1);
                this.startData = this.offers.startData;
                this.endData = this.endData = this.offers.endData;
            }
            ;
            CASCOPaymentController.prototype.updata = function () {
                if (this.osagoInclude) {
                    this.puymentCost = this.stringtoNumber(this.offer.Price) + this.osagoOffer;
                }
                else {
                    this.puymentCost = this.stringtoNumber(this.offer.Price);
                }
                this.puymentString = this.puymentCost.toFixed(3);
                var scapeIndex = (this.puymentCost / 1000).toFixed(0).length;
                this.puymentString = this.puymentString.slice(0, scapeIndex) + ' '
                    + this.puymentString.slice(scapeIndex, this.puymentString.length - 1);
            };
            ;
            CASCOPaymentController.prototype.stringtoNumber = function (s) {
                var result = 0;
                var step1 = s.replace(',', '.');
                var step2 = step1.replace(/ /g, '');
                var step3 = step2.replace(' ', '').replace(String.fromCharCode(160), '');
                result = parseFloat(step3);
                return result;
            };
            CASCOPaymentController.prototype.pay = function () {
                if (this.osagoInclude) {
                    this.CASCOService.totoalPrice = this.osagoOffer + this.stringtoNumber(this.offer.Price);
                }
                else {
                    this.CASCOService.totoalPrice = this.stringtoNumber(this.offer.Price);
                }
                this.$state.go('casco.finish');
            };
            return CASCOPaymentController;
        })();
        casco.CASCOPaymentController = CASCOPaymentController;
        angular.module('nepereplaty').controller('nepereplaty.casco.CASCOPaymentController', CASCOPaymentController);
    })(casco = nepereplaty.casco || (nepereplaty.casco = {}));
})(nepereplaty || (nepereplaty = {}));
/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var casco;
    (function (casco) {
        var CASCOFinishController = (function () {
            function CASCOFinishController($http, $state, $q, CASCOService) {
                this.$http = $http;
                this.$state = $state;
                this.$q = $q;
                this.CASCOService = CASCOService;
                if (this.CASCOService.getOffers() == null) {
                    this.$state.go('home');
                }
                this.offer = this.CASCOService.getOffers().Offers[this.CASCOService.offerIndex];
                this.data = this.CASCOService.buyerInfo;
                this.age = this.CASCOService.getOffers().DriversMinAge;
                this.orderNumber = this.CASCOService.offerId;
                this.startData = this.CASCOService.getOffers().startData;
                this.endData = this.CASCOService.getOffers().endData;
                this.price = this.CASCOService.totoalPrice;
                this.DriversCount = this.CASCOService.getOffers().DriversCount;
                this.priceString = this.price.toFixed(3);
                var scapeIndex = (this.price / 1000).toFixed(0).length;
                this.priceString = this.priceString.slice(0, scapeIndex) + ' ' +
                    this.priceString.slice(scapeIndex, this.priceString.length - 1);
                this.$http.get('../api/admin/purchas/' + this.CASCOService.offerId + '/'
                    + this.CASCOService.totoalPrice).success(function (response) {
                    console.log(response);
                });
            }
            CASCOFinishController.prototype.downloadPdf = function () {
                window.open('../../p/example.pdf');
            };
            ;
            return CASCOFinishController;
        })();
        casco.CASCOFinishController = CASCOFinishController;
        angular.module('nepereplaty').controller('nepereplaty.casco.CASCOFinishController', CASCOFinishController);
    })(casco = nepereplaty.casco || (nepereplaty.casco = {}));
})(nepereplaty || (nepereplaty = {}));
/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var house;
    (function (house) {
        var HOUSEController = (function () {
            function HOUSEController(
                //private close: any,
                $http, $state, $q, HOUSEService, $scope, ModalService, $timeout, $rootScope) {
                this.$http = $http;
                this.$state = $state;
                this.$q = $q;
                this.HOUSEService = HOUSEService;
                this.$scope = $scope;
                this.ModalService = ModalService;
                this.$timeout = $timeout;
                this.$rootScope = $rootScope;
                this.insuranceStartMinData = new Date();
                this.submitValue = 'Получить предложение';
                this.wallsOptions = [
                    {
                        text: 'Дерево',
                        value: '1'
                    },
                    {
                        text: 'Камень',
                        value: '0'
                    }
                ];
                this.AdditionalBuildingsOptions = [
                    {
                        text: 'Баня/Сауна',
                        value: '0'
                    },
                    {
                        text: 'Гараж',
                        value: '1'
                    },
                    {
                        text: 'Сарай',
                        value: '1'
                    },
                    {
                        text: 'Беседка',
                        value: '1'
                    },
                    {
                        text: 'Забор',
                        value: '2'
                    }
                ];
                this.estateCountModel = null;
                this.estatesCount = null;
                this.addEstatesCount = function () {
                    this.estatesCount++;
                    // this.houseInsuranceForm.releaseYear = '';
                    this.estatesCountChange();
                };
                this.estatesCountChange = function () {
                    if (this.isNumeric(this.estatesCount)) {
                        if (this.estatesCount > this.houseInsuranceForm.AdditionalStructure.length) {
                            while (this.estatesCount > this.houseInsuranceForm.AdditionalStructure.push(new house.AdditionalStructure())) {
                            }
                        }
                        if (this.estatesCount < this.houseInsuranceForm.AdditionalStructure.length) {
                            this.houseInsuranceForm.AdditionalStructure.splice(this.estatesCount, this.houseInsuranceForm.AdditionalStructure.length - this.estatesCount);
                        }
                    }
                };
                this.isNumeric = function (n) {
                    return !isNaN(parseFloat(n)) && isFinite(n);
                };
                /*yearBigValue(index: any): void {
                    var _year = this.houseInsuranceForm.estates[index].year;
                    var nowYear = new Date().getUTCFullYear();
                    if (_year > nowYear) {
                        _year = null;
                        this.houseInsuranceForm.estates[index].releaseYearIsLarge = true;
                    } else {
                        this.houseInsuranceForm.estates[index].releaseYearIsLarge = false;
                    }
                };*/
                this.yearBigValue = function () {
                    var nowYear = new Date().getUTCFullYear();
                    if (this.houseInsuranceForm.year > nowYear) {
                        this.houseInsuranceForm.year = nowYear;
                    }
                    else {
                    }
                };
                this.dataOnTheProperty = !$rootScope.isMobile;
                this.houseInsuranceForm = new house.HOUSEForm();
                this.$rootScope.showFooter = true;
                this.$rootScope.showBlindStopper = false;
                this.showPeriodStart = false;
                this.estatesCount = 0;
                this.estatesCountChange();
                this.getRegions();
                this.insuranceStartMinData.setDate(this.insuranceStartMinData.getDate() - 1);
            }
            ;
            HOUSEController.prototype.getRegions = function () {
                var _this = this;
                var s = 'api/handbook/region/';
                this.$http.get(s)
                    .success(function (response) {
                    console.log(_this.regions);
                    _this.regions = response;
                    console.log(_this.regions);
                });
            };
            ;
            HOUSEController.prototype.iscostIsLarg = function () {
                for (var i = 0; i < this.houseInsuranceForm.AdditionalStructure.length; i++) {
                    if (this.houseInsuranceForm.AdditionalStructure[i].cost > 200000) {
                        this.houseInsuranceForm.AdditionalStructure[i].cost = null;
                    }
                }
            };
            HOUSEController.prototype.requestOffer = function () {
                var _this = this;
                if (this.submitValue === 'Получить предложение') {
                    console.log(this.houseInsuranceForm.year < 1965, this.houseInsuranceForm.year > 2015, !this.houseInsuranceForm.region, this.houseInsuranceForm.cover.value == null);
                    if (this.houseInsuranceForm.year < 1965 ||
                        this.houseInsuranceForm.year > 2015 ||
                        !this.houseInsuranceForm.region ||
                        this.houseInsuranceForm.cover.value == null) {
                        return;
                    }
                    console.log('________');
                    var formClone = new house.HOUSEForm();
                    formClone.year = this.houseInsuranceForm.year;
                    formClone.rent = this.houseInsuranceForm.rent;
                    formClone.region = this.houseInsuranceForm.region.originalObject.value;
                    formClone.cover = this.houseInsuranceForm.cover.value;
                    formClone.startData = this.houseInsuranceForm.periodStart;
                    for (var i = 0; i < this.houseInsuranceForm.AdditionalStructure.length; ++i) {
                        if (this.houseInsuranceForm.AdditionalStructure[i].type.value == null ||
                            !this.houseInsuranceForm.AdditionalStructure[i].cost ||
                            this.houseInsuranceForm.AdditionalStructure[i].cost > 200000) {
                            return;
                        }
                        if (i > 0) {
                            formClone.AdditionalStructures += ', ';
                        }
                        formClone.AdditionalStructures += this.houseInsuranceForm.AdditionalStructure[i].type.text;
                        formClone.AdditionalStructure.push(new house.AdditionalStructure(this.houseInsuranceForm.AdditionalStructure[i].type.value, this.houseInsuranceForm.AdditionalStructure[i].cost));
                    }
                    this.submitValue = 'Поиск предложений ...';
                    this.ModalService.showModal({
                        templateUrl: 'app/loading/loading.html',
                        controller: 'LoadingModalController',
                        controllerAs: 'loadingModalCtrl',
                        inputs: {}
                    });
                    window.scrollTo(0, 0);
                    this.HOUSEService.loadOffers(formClone).success(function () {
                        _this.$rootScope.dismissModal('loading');
                        _this.$state.go('house.offer');
                    });
                }
            };
            return HOUSEController;
        })();
        house.HOUSEController = HOUSEController;
        angular.module('nepereplaty').controller('nepereplaty.house.HOUSEController', HOUSEController);
    })(house = nepereplaty.house || (nepereplaty.house = {}));
})(nepereplaty || (nepereplaty = {}));
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
/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var house;
    (function (house) {
        var HOUSEOfferController = (function () {
            function HOUSEOfferController($state, $q, HOUSEService, $rootScope) {
                this.$state = $state;
                this.$q = $q;
                this.HOUSEService = HOUSEService;
                this.$rootScope = $rootScope;
                if (this.HOUSEService.getOffers() == null) {
                    this.$state.go('home');
                }
                this.canCompare = false;
                this.content = this.HOUSEService.getOffers();
                this.content.submodule = 'Дом';
                this.content.termInsurance = '1 год';
                this.startData = this.content.startData;
                var ar = this.startData.split('-');
                this.startData = this.content.startData;
                this.endData = this.content.endData;
                this.showMargin = $rootScope.isMobile;
                var priceString = '';
                for (var i = 0; i < this.content.Offers.length; ++i) {
                    priceString = this.content.Offers[i].Total_SP.toFixed(3);
                    var scapeIndex = Math.floor(this.content.Offers[i].Total_SP / 1000).toFixed(0).length;
                    priceString = priceString.slice(0, scapeIndex) + ' ' +
                        priceString.slice(scapeIndex, priceString.length - 1);
                    this.content.Offers[i].Price = priceString;
                }
            }
            ;
            HOUSEOfferController.prototype.generationOffer = function (name, logo, companyName, price) {
                var result = new house.HOUSEInsuracneOffer();
                result.Company = new house.InsuracneCompany();
                result.Name = name;
                result.Company.Logo = logo;
                result.Company.Name = companyName;
                result.Company.Price = price;
                console.log(result.AdditionalOptions);
                result.AdditionalOptions = [];
                result.AdditionalOptions.push(new house.AdditionalOption(name + ' _ 1', name + ' Description 1'));
                result.AdditionalOptions.push(new house.AdditionalOption(name + ' _ 2', name + ' Description 2'));
                console.log(result.AdditionalOptions);
                return result;
            };
            HOUSEOfferController.prototype.buyOffer = function (index) {
                this.HOUSEService.offerIndex = index;
                this.HOUSEService.totoalPrice = this.HOUSEService.getOffers().Offers[index].Total_SP;
                this.$state.go('house.details');
            };
            ;
            HOUSEOfferController.prototype.onClickCompareChackBox = function () {
                var indexes = [];
                var offer;
                for (var i = 0; i < this.content.Offers.length; ++i) {
                    offer = this.content.Offers[i];
                    if (offer.isCompair) {
                        indexes.push(i);
                    }
                }
                if (indexes.length >= 2) {
                    this.canCompare = true;
                }
                else {
                    this.canCompare = false;
                }
                console.log(this.canCompare);
                console.log(indexes);
            };
            ;
            HOUSEOfferController.prototype.compare = function () {
                if (this.canCompare) {
                    this.$state.go('house.compare');
                }
            };
            ;
            return HOUSEOfferController;
        })();
        house.HOUSEOfferController = HOUSEOfferController;
        angular.module('nepereplaty').controller('nepereplaty.house.HOUSEOfferController', HOUSEOfferController);
    })(house = nepereplaty.house || (nepereplaty.house = {}));
})(nepereplaty || (nepereplaty = {}));
/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var house;
    (function (house) {
        var HOUSECompareController = (function () {
            function HOUSECompareController($state, $q, HOUSEService) {
                this.$state = $state;
                this.$q = $q;
                this.HOUSEService = HOUSEService;
                this.content = new house.HOUSEOffer();
                this.content = this.HOUSEService.getOffers();
                this.content.submodule = 'Дом';
                this.content.termInsurance = '1 год';
                this.startData = this.content.startData;
                var ar = this.startData.split('-');
                this.startData = ar[2] + '.' + ar[1] + '.' + ar[0];
            }
            ;
            HOUSECompareController.prototype.back = function () {
                console.log('________________________________===================');
                this.$state.go('house.offer');
            };
            ;
            HOUSECompareController.prototype.openPdf = function () {
                window.open('../../p/example.pdf');
            };
            return HOUSECompareController;
        })();
        house.HOUSECompareController = HOUSECompareController;
        angular.module('nepereplaty').controller('nepereplaty.house.HOUSECompareController', HOUSECompareController);
    })(house = nepereplaty.house || (nepereplaty.house = {}));
})(nepereplaty || (nepereplaty = {}));
/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var house;
    (function (house) {
        var HOUSEDetailsController = (function () {
            function HOUSEDetailsController($http, $state, $q, HOUSEService, auth, $scope, account, $rootScope, ModalService) {
                var _this = this;
                this.$http = $http;
                this.$state = $state;
                this.$q = $q;
                this.HOUSEService = HOUSEService;
                this.auth = auth;
                this.$scope = $scope;
                this.account = account;
                this.$rootScope = $rootScope;
                this.ModalService = ModalService;
                this.content = new house.HOUSEOffer();
                this.telCode = [
                    { text: '+7', value: '007' },
                    { text: '+1', value: '001' },
                    { text: '+33', value: '0033' },
                    { text: '+374', value: '00374' },
                    { text: '+25', value: '0024' },
                    { text: '+908', value: '00908' },
                ];
                if (this.HOUSEService.getOffers() == null) {
                    this.$state.go('home');
                }
                //            this.offers = this.HOUSEService.getOffers();
                this.content = this.HOUSEService.getOffers();
                this.content.submodule = 'Дом';
                this.content.termInsurance = '1 год';
                this.userData = new house.HOUSEDetailsForm();
                this.logoUrl = this.content.Offers[this.HOUSEService.offerIndex].Company.Logo;
                this.startData = this.content.startData;
                var ar = this.startData.split('-');
                this.startData = this.content.startData;
                this.endData = this.content.endData;
                this.minDate = new Date();
                this.minDate.setFullYear(1926);
                this.personalData = !$rootScope.isMobile;
                this.passportData = !$rootScope.isMobile;
                this.propertyDetails = !$rootScope.isMobile;
                //            while (this.offers.DriversCount > this.userData.drivers.length) {
                //                this.userData.drivers.push(new DriversLicense());
                //           }
                if (!this.auth.getUserId()) {
                    this.login();
                }
                else {
                    account.getAccount().then(function (value) {
                        _this.manageData = value;
                        _this.setData();
                    });
                }
                this.getRegions();
            }
            ;
            HOUSEDetailsController.prototype.getRegions = function () {
                var _this = this;
                var s = 'api/handbook/region/';
                this.$http.get(s)
                    .success(function (response) {
                    console.log(_this.regions);
                    _this.regions = response;
                    console.log(_this.regions);
                });
            };
            ;
            HOUSEDetailsController.prototype.register = function () {
                var _this = this;
                this.$rootScope.isModalShown = true;
                this.ModalService.showModal({
                    templateUrl: 'app/auth/register.html',
                    controller: 'RegisterModalController',
                    controllerAs: 'registerModalCtrl',
                    inputs: {
                        name: 'house'
                    }
                }).then(function (modal) {
                    modal.close.then(function (result) {
                        if (result === 'login') {
                            _this.login();
                        }
                        else {
                            if (result === 'registered') {
                                _this.account.getAccount().then(function (value) {
                                    _this.manageData = value;
                                    _this.setData();
                                });
                            }
                            _this.$rootScope.isModalShown = false;
                        }
                        // Reset user password
                        //this.credentials.password = '';
                    });
                });
            };
            HOUSEDetailsController.prototype.login = function () {
                var _this = this;
                this.$rootScope.isModalShown = true;
                this.ModalService.showModal({
                    templateUrl: 'app/auth/login.html',
                    controller: 'LoginModalController',
                    controllerAs: 'loginModalCtrl',
                    inputs: {
                        name: 'house'
                    }
                }).then(function (modal) {
                    modal.close.then(function (result) {
                        if (result === 'register') {
                            _this.register();
                        }
                        else {
                            if (result === 'logedin') {
                                _this.account.getAccount().then(function (value) {
                                    _this.manageData = value;
                                    _this.setData();
                                });
                            }
                            _this.$rootScope.isModalShown = false;
                        }
                        // Reset user password
                        //this.credentials.password = '';
                    });
                });
            };
            HOUSEDetailsController.prototype.editAccount = function () {
                var _this = this;
                this.account.editAccount(this.manageData).then(function (value) {
                    _this.account.getAccount().then(function (value) {
                        _this.manageData = value;
                        _this.setData();
                    });
                });
            };
            ;
            HOUSEDetailsController.prototype.updateMiddle = function () {
                if (this.validate(this.userData.Name) && this.validate(this.userData.Surname)) {
                    this.isMiddle = true;
                }
                else {
                    this.isMiddle = false;
                }
            };
            HOUSEDetailsController.prototype.validate = function (strValue) {
                var objRegExp = /^[a-zA-Z ]+$/;
                return objRegExp.test(strValue);
            };
            HOUSEDetailsController.prototype.setData = function () {
                this.userData.Adress = this.manageData.Adress;
                this.userData.Birthday = this.manageData.Birthday;
                this.userData.City = this.manageData.City;
                this.userData.Email = this.manageData.Email;
                this.userData.IsMale = (this.manageData.IsMale) ? 1 : 2;
                this.userData.Middlename = this.manageData.Middlename;
                this.userData.Name = this.manageData.Name;
                this.userData.PassportIssued = this.manageData.PassportIssued;
                this.userData.PassportnNumber = this.manageData.PassportnNumber;
                this.userData.PassportSerial = this.manageData.PassportSerial;
                this.userData.PassportWhen = this.manageData.PassportWhen;
                this.userData.PassportWhere = this.manageData.PassportWhere;
                this.userData.Surname = this.manageData.Surname;
                this.userData.Mobile = Number(this.manageData.Mobile);
                this.userData.Telephone = Number(this.manageData.Telephone);
                if (this.manageData.MobileCode) {
                    if (this.manageData.MobileCode.text != null) {
                        this.userData.MobileCode = this.manageData.MobileCode;
                    }
                    else {
                        this.userData.MobileCode = { text: this.manageData.MobileCode, value: this.manageData.MobileCode };
                    }
                }
                else {
                    this.userData.MobileCode = { text: '--', value: null };
                }
                if (this.manageData.TelephoneCode) {
                    if (this.manageData.TelephoneCode.text != null) {
                        this.userData.TelephoneCode = this.manageData.TelephoneCode;
                    }
                    else {
                        this.userData.TelephoneCode = { text: this.manageData.TelephoneCode, value: this.manageData.TelephoneCode };
                    }
                }
                else {
                    this.userData.TelephoneCode = { text: '--', value: null };
                }
                this.updateMiddle();
            };
            HOUSEDetailsController.prototype.requestBuyOffer = function () {
                var _this = this;
                console.log(this.userData);
                if (this.pasportWhere) {
                    this.userData.PassportWhere = this.pasportWhere.title;
                }
                if (this.city) {
                    this.userData.City = this.city.title;
                }
                if (this.userData.Adress == null ||
                    this.userData.City == null ||
                    this.userData.Email == null ||
                    this.userData.IsMale == null ||
                    this.userData.Name == null ||
                    this.userData.PassportIssued == null ||
                    this.userData.PassportnNumber == null ||
                    this.userData.PassportSerial == null ||
                    this.userData.PassportWhere == null ||
                    this.userData.Coincidence == null ||
                    this.userData.Surname == null ||
                    this.userData.Mobile == null ||
                    this.userData.Telephone == null ||
                    this.userData.PassportWhen === undefined) {
                    return;
                }
                if (!this.isMiddle && this.userData.Middlename == null) {
                    return;
                }
                this.HOUSEService.otherAndress.isAre = false;
                if (this.userData.Coincidence === 'false') {
                    if (this.userData.Region == null ||
                        this.userData.InformationCity == null ||
                        this.userData.FullAdress == null) {
                        return;
                    }
                    else {
                        this.HOUSEService.otherAndress.isAre = true;
                        this.HOUSEService.otherAndress.region = this.userData.Region.originalObject.value;
                        this.HOUSEService.otherAndress.city = this.userData.InformationCity.title;
                        this.HOUSEService.otherAndress.adress = this.userData.FullAdress;
                    }
                }
                if (this.userData.Coincidence === 'true') {
                    this.HOUSEService.otherAndress.region = this.userData.Region;
                    this.HOUSEService.otherAndress.city = this.userData.City;
                    this.HOUSEService.otherAndress.adress = this.userData.Adress;
                }
                this.manageData.Adress = this.userData.Adress;
                this.manageData.Birthday = this.userData.Birthday;
                this.manageData.City = this.userData.City;
                this.manageData.Email = this.userData.Email;
                this.manageData.IsMale = (this.userData.IsMale === 1) ? true : false;
                this.manageData.Middlename = this.userData.Middlename;
                this.manageData.Name = this.userData.Name;
                this.manageData.PassportIssued = this.userData.PassportIssued;
                this.manageData.PassportnNumber = this.userData.PassportnNumber;
                this.manageData.PassportSerial = this.userData.PassportSerial;
                this.manageData.PassportWhen = this.userData.PassportWhen;
                this.manageData.PassportWhere = this.userData.PassportWhere;
                this.manageData.Surname = this.userData.Surname;
                this.manageData.Mobile = this.userData.Mobile;
                this.manageData.Telephone = this.userData.Telephone;
                this.manageData.MobileCode = this.userData.MobileCode.value;
                this.manageData.TelephoneCode = this.userData.TelephoneCode.value;
                this.editAccount();
                this.HOUSEService.buyerInfo = this.userData;
                var model = new house.ApartmentOfferModel();
                model.basic.cost = this.HOUSEService.totoalPrice;
                model.basic.type = 'house';
                model.basic.buyer = this.userData.Email;
                model.basic.comments = '';
                model.basic.companyId = this.content.Offers[this.HOUSEService.offerIndex].Company.Id;
                model.basic.endDate = this.content.endData;
                model.basic.startDate = this.content.startData;
                model.home.address = this.HOUSEService.otherAndress.adress;
                model.home.city = this.HOUSEService.otherAndress.city;
                model.home.region = this.HOUSEService.otherAndress.region;
                this.$http.put('api/admin/home', model).success(function (response) {
                    _this.HOUSEService.offerId = response.offerId;
                    _this.$state.go('house.payment');
                });
            };
            ;
            return HOUSEDetailsController;
        })();
        house.HOUSEDetailsController = HOUSEDetailsController;
        angular.module('nepereplaty').controller('nepereplaty.house.HOUSEDetailsController', HOUSEDetailsController);
    })(house = nepereplaty.house || (nepereplaty.house = {}));
})(nepereplaty || (nepereplaty = {}));
/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var house;
    (function (house) {
        var HOUSEPaymentController = (function () {
            function HOUSEPaymentController($state, $q, HOUSEService) {
                this.$state = $state;
                this.$q = $q;
                this.HOUSEService = HOUSEService;
                this.content = new house.HOUSEOffer();
                this.additianalPay = [
                    {
                        b: false,
                        c: 700,
                        s: '700'
                    },
                    {
                        b: false,
                        c: 1000,
                        s: '1 000'
                    }
                ];
                if (this.HOUSEService.getOffers() == null) {
                    this.$state.go('home');
                }
                this.content = this.HOUSEService.getOffers();
                this.content.submodule = 'Дом';
                this.content.termInsurance = '1 год';
                this.logoUrl = this.content.Offers[this.HOUSEService.offerIndex].Company.Logo;
                this.offer = this.content.Offers[this.HOUSEService.offerIndex];
                var priceString = this.content.Offers[this.HOUSEService.offerIndex].Total_SP.toFixed(3);
                var scapeIndex = (this.content.Offers[this.HOUSEService.offerIndex].Total_SP / 1000).toFixed(0).length;
                priceString = priceString.slice(0, scapeIndex) + ' ' +
                    priceString.slice(scapeIndex, priceString.length - 1);
                this.content.Price = this.content.Offers[this.HOUSEService.offerIndex].Total_SP.toFixed(3);
                this.content.priceString = priceString;
                this.startData = this.content.startData;
                this.endData = this.content.endData;
            }
            ;
            HOUSEPaymentController.prototype.updata = function () {
                var total = 0;
                for (var i = 0; i < 2; ++i) {
                    if (this.additianalPay[i].b) {
                        total += this.additianalPay[i].c;
                    }
                }
                if (total > 0) {
                    this.add = true;
                    this.puymentCost = this.stringtoNumber(this.offer.Price) + total;
                }
                else {
                    this.add = false;
                    this.puymentCost = this.stringtoNumber(this.offer.Price);
                }
                this.puymentString = this.puymentCost.toFixed(3);
                var scapeIndex = Math.floor(this.puymentCost / 1000).toFixed(0).length;
                this.puymentString = this.puymentString.slice(0, scapeIndex) + ' '
                    + this.puymentString.slice(scapeIndex, this.puymentString.length - 1);
                this.additianalPayString = total.toFixed(3);
                scapeIndex = (total / 1000).toFixed(0).length;
                this.additianalPayString = this.additianalPayString.slice(0, scapeIndex) + ' '
                    + this.additianalPayString.slice(scapeIndex, this.additianalPayString.length - 1);
            };
            ;
            HOUSEPaymentController.prototype.stringtoNumber = function (s) {
                var result = 0;
                var step1 = s.replace(',', '.');
                var step2 = step1.replace(/ /g, '');
                var step3 = step2.replace(' ', '').replace(String.fromCharCode(160), '');
                result = parseFloat(step3);
                return result;
            };
            HOUSEPaymentController.prototype.pay = function () {
                var total = 0;
                for (var i = 0; i < 2; ++i) {
                    if (this.additianalPay[i].b) {
                        total += this.additianalPay[i].c;
                    }
                }
                if (total > 0) {
                    this.puymentCost = this.stringtoNumber(this.offer.Price) + total;
                }
                else {
                    this.puymentCost = this.stringtoNumber(this.offer.Price);
                }
                this.HOUSEService.totoalPrice = this.puymentCost;
                this.$state.go('house.finish');
            };
            return HOUSEPaymentController;
        })();
        house.HOUSEPaymentController = HOUSEPaymentController;
        angular.module('nepereplaty').controller('nepereplaty.house.HOUSEPaymentController', HOUSEPaymentController);
    })(house = nepereplaty.house || (nepereplaty.house = {}));
})(nepereplaty || (nepereplaty = {}));
/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var house;
    (function (house) {
        var HOUSEFinishController = (function () {
            function HOUSEFinishController($http, $state, $q, HOUSEService) {
                this.$http = $http;
                this.$state = $state;
                this.$q = $q;
                this.HOUSEService = HOUSEService;
                this.content = new house.HOUSEOffer();
                if (this.HOUSEService.getOffers() == null) {
                    this.$state.go('home');
                }
                this.offer = this.HOUSEService.getOffers().Offers[this.HOUSEService.offerIndex];
                this.data = this.HOUSEService.buyerInfo;
                this.orderNumber = 5;
                this.startData = this.content.startData;
                this.endData = this.content.endData;
                this.price = this.HOUSEService.totoalPrice;
                this.priceString = this.price.toFixed(3);
                var scapeIndex = (this.price / 1000).toFixed(0).length;
                this.priceString = this.priceString.slice(0, scapeIndex) + ' ' +
                    this.priceString.slice(scapeIndex, this.priceString.length - 1);
                this.content.name = this.data.Name + ' ' + this.data.Surname;
                this.content.orderNumber = this.HOUSEService.offerId.toString();
                this.content.insurancePolicy = this.offer.Company.Name + ' СТРАХОВАНИЕ';
                this.content.companyName = this.offer.Company.Name;
                this.content.startData = this.HOUSEService.getOffers().startData;
                this.content.endData = this.HOUSEService.getOffers().endData;
                this.content.submodule = 'Дом';
                this.content.priceString = this.priceString;
                if (this.HOUSEService.otherAndress.isAre) {
                    this.content.city = this.HOUSEService.otherAndress.city;
                    this.content.address = this.HOUSEService.otherAndress.adress;
                }
                else {
                    this.content.city = this.data.City;
                    this.content.address = this.data.Adress;
                }
                this.$http.get('../api/admin/purchas/' + this.content.orderNumber + '/'
                    + this.HOUSEService.totoalPrice).success(function (response) {
                    console.log(response);
                });
            }
            HOUSEFinishController.prototype.downloadPdf = function () {
                window.open('../../p/example.pdf');
            };
            ;
            return HOUSEFinishController;
        })();
        house.HOUSEFinishController = HOUSEFinishController;
        angular.module('nepereplaty').controller('nepereplaty.house.HOUSEFinishController', HOUSEFinishController);
    })(house = nepereplaty.house || (nepereplaty.house = {}));
})(nepereplaty || (nepereplaty = {}));
/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var apartment;
    (function (apartment) {
        var APARTMENTController = (function () {
            function APARTMENTController($http, $state, $q, APARTMENTService, $scope, ModalService, $timeout, $rootScope) {
                var _this = this;
                this.$http = $http;
                this.$state = $state;
                this.$q = $q;
                this.APARTMENTService = APARTMENTService;
                this.$scope = $scope;
                this.ModalService = ModalService;
                this.$timeout = $timeout;
                this.$rootScope = $rootScope;
                this.insuranceStartMinData = new Date();
                this.submitValue = 'Получить предложение';
                this.regions = [{
                        text: 'Москва и МО, Санкт-Петербург и ЛО',
                        value: 0
                    }, {
                        text: 'Другой регион',
                        value: 1
                    }];
                this.countryOptions = [{
                        text: 'Первый регион',
                        value: '1'
                    },
                    {
                        text: 'Второй регион',
                        value: '2'
                    },
                    {
                        text: 'Третий регион',
                        value: '3'
                    }
                ];
                this.insuranceStartMinData.setDate(this.insuranceStartMinData.getDate() - 1);
                this.$rootScope.showFooter = true;
                this.$rootScope.showBlindStopper = false;
                this.apartmentForm = new apartment.APARTMENTForm();
                this.showPeriodStart = false;
                this.dataOnTheProperty = !$rootScope.isMobile;
                this.$http.get('api/handbook/country')
                    .success(function (response) {
                    _this.countryOptions = response;
                });
            }
            ;
            APARTMENTController.prototype.requestOffer = function () {
                var _this = this;
                if (this.submitValue === 'Получить предложение') {
                    if (this.apartmentForm.area == null ||
                        this.apartmentForm.property == null ||
                        this.apartmentForm.region.value == null ||
                        this.apartmentForm.rent == null ||
                        this.apartmentForm.startData == null ||
                        this.apartmentForm.sum == null) {
                        return;
                    }
                    var form = new apartment.APARTMENTForm();
                    form.area = this.apartmentForm.area;
                    form.property = this.apartmentForm.property;
                    form.region = this.apartmentForm.region.value;
                    form.rent = this.apartmentForm.rent;
                    form.startData = this.apartmentForm.startData;
                    form.sum = this.apartmentForm.sum;
                    console.log(form);
                    this.submitValue = 'Поиск предложений ...';
                    this.ModalService.showModal({
                        templateUrl: 'app/loading/loading.html',
                        controller: 'LoadingModalController',
                        controllerAs: 'loadingModalCtrl',
                        inputs: {}
                    });
                    window.scrollTo(0, 0);
                    this.APARTMENTService.loadOffers(form).success(function () {
                        _this.$rootScope.dismissModal('loading');
                        _this.$state.go('apartment.offer');
                    });
                }
            };
            return APARTMENTController;
        })();
        apartment.APARTMENTController = APARTMENTController;
        angular.module('nepereplaty').controller('nepereplaty.apartment.APARTMENTController', APARTMENTController);
    })(apartment = nepereplaty.apartment || (nepereplaty.apartment = {}));
})(nepereplaty || (nepereplaty = {}));
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
/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var apartment;
    (function (apartment) {
        var APARTMENTOfferController = (function () {
            function APARTMENTOfferController($state, $q, APARTMENTService, $rootScope) {
                this.$state = $state;
                this.$q = $q;
                this.APARTMENTService = APARTMENTService;
                this.$rootScope = $rootScope;
                this.content = new apartment.APARTMENTOffer();
                if (this.APARTMENTService.getOffers() == null) {
                    this.$state.go('home');
                }
                this.canCompare = false;
                this.content = this.APARTMENTService.getOffers();
                this.content.submodule = 'Квартира';
                this.content.termInsurance = '1 год';
                this.startData = this.content.startData;
                this.endData = this.content.endData;
                this.showMargin = $rootScope.isMobile;
                var priceString = '';
                for (var i = 0; i < this.content.Offers.length; ++i) {
                    priceString = this.content.Offers[i].Total_SP.toFixed(3);
                    var scapeIndex = Math.floor(this.content.Offers[i].Total_SP / 1000).toFixed(0).length;
                    priceString = priceString.slice(0, scapeIndex) + ' ' +
                        priceString.slice(scapeIndex, priceString.length - 1);
                    this.content.Offers[i].Price = priceString;
                }
                console.log(this.content.Offers);
            }
            ;
            APARTMENTOfferController.prototype.buyOffer = function (index) {
                this.APARTMENTService.offerIndex = index;
                this.APARTMENTService.totoalPrice = this.APARTMENTService.getOffers().Offers[index].Total_SP;
                this.$state.go('apartment.details');
            };
            ;
            APARTMENTOfferController.prototype.onClickCompareChackBox = function () {
                var indexes = [];
                var offer;
                console.log(indexes);
                for (var i = 0; i < this.content.Offers.length; ++i) {
                    offer = this.content.Offers[i];
                    if (offer.isCompair) {
                        indexes.push(i);
                    }
                }
                if (indexes.length >= 2) {
                    this.canCompare = true;
                }
                else {
                    this.canCompare = false;
                }
            };
            ;
            APARTMENTOfferController.prototype.compare = function () {
                if (this.canCompare) {
                    this.$state.go('apartment.compare');
                }
            };
            ;
            return APARTMENTOfferController;
        })();
        apartment.APARTMENTOfferController = APARTMENTOfferController;
        angular.module('nepereplaty').controller('nepereplaty.apartment.APARTMENTOfferController', APARTMENTOfferController);
    })(apartment = nepereplaty.apartment || (nepereplaty.apartment = {}));
})(nepereplaty || (nepereplaty = {}));
/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var apartment;
    (function (apartment) {
        var APARTMENTCompareController = (function () {
            function APARTMENTCompareController($state, $q, APARTMENTService) {
                this.$state = $state;
                this.$q = $q;
                this.APARTMENTService = APARTMENTService;
                this.content = new apartment.APARTMENTOffer();
                this.content = this.APARTMENTService.getOffers();
                this.content.submodule = 'Квартира';
                this.content.termInsurance = '1 год';
                this.startData = this.content.startData;
                var ar = this.startData.split('-');
                this.startData = ar[2] + '.' + ar[1] + '.' + ar[0];
            }
            ;
            APARTMENTCompareController.prototype.back = function () {
                this.$state.go('apartment.offer');
            };
            ;
            return APARTMENTCompareController;
        })();
        apartment.APARTMENTCompareController = APARTMENTCompareController;
        angular.module('nepereplaty').controller('nepereplaty.apartment.APARTMENTCompareController', APARTMENTCompareController);
    })(apartment = nepereplaty.apartment || (nepereplaty.apartment = {}));
})(nepereplaty || (nepereplaty = {}));
/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var apartment;
    (function (apartment) {
        var APARTMENTDetailsController = (function () {
            function APARTMENTDetailsController($http, $state, $q, APARTMENTService, auth, $scope, account, $rootScope, ModalService) {
                var _this = this;
                this.$http = $http;
                this.$state = $state;
                this.$q = $q;
                this.APARTMENTService = APARTMENTService;
                this.auth = auth;
                this.$scope = $scope;
                this.account = account;
                this.$rootScope = $rootScope;
                this.ModalService = ModalService;
                this.content = new apartment.APARTMENTOffer();
                this.telCode = [
                    { text: '+7', value: '007' },
                    { text: '+1', value: '001' },
                    { text: '+33', value: '0033' },
                    { text: '+374', value: '00374' },
                    { text: '+25', value: '0024' },
                    { text: '+908', value: '00908' },
                ];
                if (this.APARTMENTService.getOffers() == null) {
                    this.$state.go('home');
                }
                this.content = this.APARTMENTService.getOffers();
                this.content.submodule = 'Квартира';
                this.content.termInsurance = '1 год';
                this.logoUrl = this.content.Offers[this.APARTMENTService.offerIndex].Company.Logo;
                this.userData = new apartment.APARTMENTDetailsForm();
                this.personalData = !$rootScope.isMobile;
                this.passportData = !$rootScope.isMobile;
                this.propertyDetails = !$rootScope.isMobile;
                this.startData = this.content.startData;
                this.endData = this.content.endData;
                this.minDate = new Date();
                this.minDate.setFullYear(1926);
                if (!this.auth.getUserId()) {
                    this.login();
                }
                else {
                    account.getAccount().then(function (value) {
                        _this.manageData = value;
                        _this.setData();
                    });
                }
                this.getRegions();
            }
            ;
            APARTMENTDetailsController.prototype.getRegions = function () {
                var _this = this;
                var s = 'api/handbook/region/';
                this.$http.get(s)
                    .success(function (response) {
                    console.log(_this.regions);
                    _this.regions = response;
                    console.log(_this.regions);
                });
            };
            ;
            APARTMENTDetailsController.prototype.register = function () {
                var _this = this;
                this.$rootScope.isModalShown = true;
                this.ModalService.showModal({
                    templateUrl: 'app/auth/register.html',
                    controller: 'RegisterModalController',
                    controllerAs: 'registerModalCtrl',
                    inputs: {
                        name: 'apartment'
                    }
                }).then(function (modal) {
                    modal.close.then(function (result) {
                        if (result === 'login') {
                            _this.login();
                        }
                        else {
                            if (result === 'registered') {
                                _this.account.getAccount().then(function (value) {
                                    _this.manageData = value;
                                    _this.setData();
                                });
                            }
                            _this.$rootScope.isModalShown = false;
                        }
                        // Reset user password
                        //this.credentials.password = '';
                    });
                });
            };
            APARTMENTDetailsController.prototype.login = function () {
                var _this = this;
                this.$rootScope.isModalShown = true;
                this.ModalService.showModal({
                    templateUrl: 'app/auth/login.html',
                    controller: 'LoginModalController',
                    controllerAs: 'loginModalCtrl',
                    inputs: {
                        name: 'apartment'
                    }
                }).then(function (modal) {
                    modal.close.then(function (result) {
                        if (result === 'register') {
                            _this.register();
                        }
                        else {
                            if (result === 'logedin') {
                                _this.account.getAccount().then(function (value) {
                                    _this.manageData = value;
                                    _this.setData();
                                });
                            }
                            _this.$rootScope.isModalShown = false;
                        }
                    });
                });
            };
            APARTMENTDetailsController.prototype.editAccount = function () {
                var _this = this;
                this.account.editAccount(this.manageData).then(function (value) {
                    _this.account.getAccount().then(function (value) {
                        _this.manageData = value;
                        _this.setData();
                    });
                });
            };
            ;
            APARTMENTDetailsController.prototype.updateMiddle = function () {
                console.log(this.validate(this.userData.Name) && this.validate(this.userData.Surname));
                if (this.validate(this.userData.Name) && this.validate(this.userData.Surname)) {
                    this.isMiddle = true;
                }
                else {
                    this.isMiddle = false;
                }
            };
            APARTMENTDetailsController.prototype.validate = function (strValue) {
                var objRegExp = /^[a-zA-Z]+$/;
                return objRegExp.test(strValue);
            };
            APARTMENTDetailsController.prototype.setData = function () {
                this.userData.Adress = this.manageData.Adress;
                this.userData.Birthday = this.manageData.Birthday;
                this.userData.City = this.manageData.City;
                this.userData.Email = this.manageData.Email;
                this.userData.IsMale = (this.manageData.IsMale) ? 1 : 2;
                this.userData.Middlename = this.manageData.Middlename;
                this.userData.Name = this.manageData.Name;
                this.userData.PassportIssued = this.manageData.PassportIssued;
                this.userData.PassportnNumber = this.manageData.PassportnNumber;
                this.userData.PassportSerial = this.manageData.PassportSerial;
                this.userData.PassportWhen = this.manageData.PassportWhen;
                this.userData.PassportWhere = this.manageData.PassportWhere;
                this.userData.Surname = this.manageData.Surname;
                this.userData.Mobile = Number(this.manageData.Mobile);
                this.userData.Telephone = Number(this.manageData.Telephone);
                if (this.manageData.MobileCode) {
                    if (this.manageData.MobileCode.text != null) {
                        this.userData.MobileCode = this.manageData.MobileCode;
                    }
                    else {
                        this.userData.MobileCode = { text: this.manageData.MobileCode, value: this.manageData.MobileCode };
                    }
                }
                else {
                    this.userData.MobileCode = { text: '--', value: null };
                }
                if (this.manageData.TelephoneCode) {
                    if (this.manageData.TelephoneCode.text != null) {
                        this.userData.TelephoneCode = this.manageData.TelephoneCode;
                    }
                    else {
                        this.userData.TelephoneCode = { text: this.manageData.TelephoneCode, value: this.manageData.TelephoneCode };
                    }
                }
                else {
                    this.userData.TelephoneCode = { text: '--', value: null };
                }
                this.updateMiddle();
            };
            APARTMENTDetailsController.prototype.requestBuyOffer = function () {
                var _this = this;
                console.log(this.userData);
                if (this.pasportWhere) {
                    this.userData.PassportWhere = this.pasportWhere.title;
                }
                if (this.city) {
                    this.userData.City = this.city.title;
                }
                if (this.userData.Adress == null ||
                    this.userData.City == null ||
                    this.userData.Email == null ||
                    this.userData.IsMale == null ||
                    this.userData.Name == null ||
                    this.userData.PassportIssued == null ||
                    this.userData.PassportnNumber == null ||
                    this.userData.PassportSerial == null ||
                    this.userData.PassportWhere == null ||
                    this.userData.Coincidence == null ||
                    this.userData.Surname == null ||
                    this.userData.Mobile == null ||
                    this.userData.Telephone == null ||
                    this.userData.PassportWhen === undefined) {
                    return;
                }
                if (!this.isMiddle && this.userData.Middlename == null) {
                    return;
                }
                this.APARTMENTService.otherAndress.isAre = false;
                if (this.userData.Coincidence === 'false') {
                    if (this.userData.Region == null ||
                        this.userData.InformationCity == null ||
                        this.userData.FullAdress == null) {
                        return;
                    }
                    else {
                        this.APARTMENTService.otherAndress.isAre = true;
                        this.APARTMENTService.otherAndress.region = this.userData.Region.originalObject.value;
                        this.APARTMENTService.otherAndress.city = this.userData.InformationCity;
                        this.APARTMENTService.otherAndress.adress = this.userData.FullAdress;
                    }
                }
                if (this.userData.Coincidence === 'true') {
                    this.APARTMENTService.otherAndress.region = this.userData.Region;
                    this.APARTMENTService.otherAndress.city = this.userData.City;
                    this.APARTMENTService.otherAndress.adress = this.userData.Adress;
                }
                this.manageData.Adress = this.userData.Adress;
                this.manageData.Birthday = this.userData.Birthday;
                this.manageData.City = this.userData.City;
                this.manageData.Email = this.userData.Email;
                this.manageData.IsMale = (this.userData.IsMale === 1) ? true : false;
                this.manageData.Middlename = this.userData.Middlename;
                this.manageData.Name = this.userData.Name;
                this.manageData.PassportIssued = this.userData.PassportIssued;
                this.manageData.PassportnNumber = this.userData.PassportnNumber;
                this.manageData.PassportSerial = this.userData.PassportSerial;
                this.manageData.PassportWhen = this.userData.PassportWhen;
                this.manageData.PassportWhere = this.userData.PassportWhere;
                this.manageData.Surname = this.userData.Surname;
                this.manageData.Mobile = this.userData.Mobile;
                this.manageData.Telephone = this.userData.Telephone;
                this.manageData.MobileCode = this.userData.MobileCode.value;
                this.manageData.TelephoneCode = this.userData.TelephoneCode.value;
                this.editAccount();
                this.APARTMENTService.buyerInfo = this.userData;
                var model = new apartment.ApartmentOfferModel();
                model.basic.cost = this.APARTMENTService.totoalPrice;
                model.basic.type = 'apartment';
                model.basic.buyer = this.userData.Email;
                model.basic.comments = '';
                model.basic.companyId = this.content.Offers[this.APARTMENTService.offerIndex].Company.Id;
                model.basic.endDate = this.content.endData;
                model.basic.startDate = this.content.startData;
                model.home.address = this.APARTMENTService.otherAndress.adress;
                model.home.city = this.APARTMENTService.otherAndress.city;
                model.home.region = this.APARTMENTService.otherAndress.region;
                this.$http.put('api/admin/home', model).success(function (response) {
                    _this.APARTMENTService.offerId = response.offerId;
                    _this.$state.go('apartment.payment');
                });
            };
            ;
            return APARTMENTDetailsController;
        })();
        apartment.APARTMENTDetailsController = APARTMENTDetailsController;
        angular.module('nepereplaty').controller('nepereplaty.apartment.APARTMENTDetailsController', APARTMENTDetailsController);
    })(apartment = nepereplaty.apartment || (nepereplaty.apartment = {}));
})(nepereplaty || (nepereplaty = {}));
/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var apartment;
    (function (apartment) {
        var APARTMENTPaymentController = (function () {
            function APARTMENTPaymentController($state, $q, APARTMENTService) {
                this.$state = $state;
                this.$q = $q;
                this.APARTMENTService = APARTMENTService;
                this.content = new apartment.APARTMENTOffer();
                this.additianalPay = [
                    {
                        b: false,
                        c: 700,
                        s: '700'
                    },
                    {
                        b: false,
                        c: 1000,
                        s: '1 000'
                    }
                ];
                if (this.APARTMENTService.getOffers() == null) {
                    this.$state.go('home');
                }
                this.content = this.APARTMENTService.getOffers();
                this.content.submodule = 'Дом';
                this.content.termInsurance = '1 год';
                this.logoUrl = this.content.Offers[this.APARTMENTService.offerIndex].Company.Logo;
                this.offer = this.content.Offers[this.APARTMENTService.offerIndex];
                var priceString = this.content.Offers[this.APARTMENTService.offerIndex].Total_SP.toFixed(3);
                var scapeIndex = (this.content.Offers[this.APARTMENTService.offerIndex].Total_SP / 1000).toFixed(0).length;
                priceString = priceString.slice(0, scapeIndex) + ' ' +
                    priceString.slice(scapeIndex, priceString.length - 1);
                this.content.Price = this.content.Offers[this.APARTMENTService.offerIndex].Total_SP.toFixed(3);
                this.content.priceString = priceString;
                this.startData = this.content.startData;
                this.endData = this.content.endData;
                this.updata();
            }
            ;
            APARTMENTPaymentController.prototype.updata = function () {
                var total = 0;
                for (var i = 0; i < 2; ++i) {
                    if (this.additianalPay[i].b) {
                        total += this.additianalPay[i].c;
                    }
                }
                if (total > 0) {
                    this.add = true;
                    this.puymentCost = this.stringtoNumber(this.offer.Price) + total;
                }
                else {
                    this.add = false;
                    this.puymentCost = this.stringtoNumber(this.offer.Price);
                }
                this.puymentString = this.puymentCost.toFixed(3);
                var scapeIndex = Math.floor(this.puymentCost / 1000).toFixed(0).length;
                this.puymentString = this.puymentString.slice(0, scapeIndex) + ' '
                    + this.puymentString.slice(scapeIndex, this.puymentString.length - 1);
                this.additianalPayString = total.toFixed(3);
                scapeIndex = (total / 1000).toFixed(0).length;
                this.additianalPayString = this.additianalPayString.slice(0, scapeIndex) + ' '
                    + this.additianalPayString.slice(scapeIndex, this.additianalPayString.length - 1);
            };
            ;
            APARTMENTPaymentController.prototype.stringtoNumber = function (s) {
                var result = 0;
                var step1 = s.replace(',', '.');
                var step2 = step1.replace(/ /g, '');
                var step3 = step2.replace(' ', '').replace(String.fromCharCode(160), '');
                result = parseFloat(step3);
                return result;
            };
            APARTMENTPaymentController.prototype.pay = function () {
                var total = 0;
                for (var i = 0; i < 2; ++i) {
                    if (this.additianalPay[i].b) {
                        total += this.additianalPay[i].c;
                    }
                }
                if (total > 0) {
                    this.puymentCost = this.stringtoNumber(this.offer.Price) + total;
                }
                else {
                    this.puymentCost = this.stringtoNumber(this.offer.Price);
                }
                this.APARTMENTService.totoalPrice = this.puymentCost;
                this.$state.go('apartment.finish');
            };
            return APARTMENTPaymentController;
        })();
        apartment.APARTMENTPaymentController = APARTMENTPaymentController;
        angular.module('nepereplaty').controller('nepereplaty.apartment.APARTMENTPaymentController', APARTMENTPaymentController);
    })(apartment = nepereplaty.apartment || (nepereplaty.apartment = {}));
})(nepereplaty || (nepereplaty = {}));
/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var apartment;
    (function (apartment) {
        var APARTMENTFinishController = (function () {
            function APARTMENTFinishController($http, $state, $q, APARTMENTService) {
                this.$http = $http;
                this.$state = $state;
                this.$q = $q;
                this.APARTMENTService = APARTMENTService;
                this.content = new apartment.APARTMENTOffer();
                if (this.APARTMENTService.getOffers() == null) {
                    this.$state.go('home');
                }
                this.offer = this.APARTMENTService.getOffers().Offers[this.APARTMENTService.offerIndex];
                this.data = this.APARTMENTService.buyerInfo;
                this.orderNumber = 5;
                this.startData = this.APARTMENTService.getOffers().startData;
                this.endData = this.APARTMENTService.getOffers().endData;
                this.price = this.APARTMENTService.totoalPrice;
                this.priceString = this.price.toFixed(3);
                var scapeIndex = (this.price / 1000).toFixed(0).length;
                this.priceString = this.priceString.slice(0, scapeIndex) + ' ' +
                    this.priceString.slice(scapeIndex, this.priceString.length - 1);
                this.content.name = this.data.Name + ' ' + this.data.Surname;
                this.content.orderNumber = this.APARTMENTService.offerId.toString();
                this.content.insurancePolicy = this.offer.Company.Name + ' СТРАХОВАНИЕ';
                this.content.companyName = this.offer.Company.Name;
                this.content.startData = this.startData;
                this.content.endData = this.endData;
                this.content.submodule = 'Квартира';
                this.content.priceString = this.priceString;
                if (this.APARTMENTService.otherAndress.isAre) {
                    this.content.city = this.APARTMENTService.otherAndress.city;
                    this.content.address = this.APARTMENTService.otherAndress.adress;
                }
                else {
                    this.content.city = this.data.City;
                    this.content.address = this.data.Adress;
                }
                this.$http.get('../api/admin/purchas/' + this.content.orderNumber + '/'
                    + this.APARTMENTService.totoalPrice).success(function (response) {
                    console.log(response);
                });
            }
            APARTMENTFinishController.prototype.downloadPdf = function () {
                window.open('../../p/example.pdf');
            };
            ;
            return APARTMENTFinishController;
        })();
        apartment.APARTMENTFinishController = APARTMENTFinishController;
        angular.module('nepereplaty').controller('nepereplaty.apartment.APARTMENTFinishController', APARTMENTFinishController);
    })(apartment = nepereplaty.apartment || (nepereplaty.apartment = {}));
})(nepereplaty || (nepereplaty = {}));
/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var traveling;
    (function (traveling) {
        var TRAVELINGController = (function () {
            function TRAVELINGController($http, $state, $q, TRAVELINGService, $scope, ModalService, $timeout, $rootScope) {
                var _this = this;
                this.$http = $http;
                this.$state = $state;
                this.$q = $q;
                this.TRAVELINGService = TRAVELINGService;
                this.$scope = $scope;
                this.ModalService = ModalService;
                this.$timeout = $timeout;
                this.$rootScope = $rootScope;
                this.submitValue = 'Получить предложение';
                this.regionOptions = [{
                        text: 'Первый регион',
                        value: '1'
                    },
                    {
                        text: 'Второй регион',
                        value: '2'
                    },
                    {
                        text: 'Третий регион',
                        value: '3'
                    }
                ];
                this.insuranceOptions = [
                    {
                        text: 'Разовая',
                        value: 1
                    },
                    {
                        text: 'Многократная на год',
                        value: 2
                    }
                ];
                this.durationOptions = [
                    {
                        text: 'Не более 30 дней',
                        value: 30
                    },
                    {
                        text: 'Не более 90 дней',
                        value: 90
                    }
                ];
                this.currencyAndSumOptions = [
                    {
                        text: 'Евро',
                        value: 'EUR'
                    },
                    {
                        text: 'Доллар',
                        value: 'USD'
                    }
                ];
                this.insuredOptions = [
                    {
                        text: '1',
                        value: '1'
                    },
                    {
                        text: '2',
                        value: '2'
                    },
                    {
                        text: '3',
                        value: '3'
                    },
                    {
                        text: '4',
                        value: '4'
                    },
                    {
                        text: '5',
                        value: '5'
                    }
                ];
                this.countryOptions = [{
                        text: 'Первый регион',
                        value: '1'
                    },
                    {
                        text: 'Второй регион',
                        value: '2'
                    },
                    {
                        text: 'Третий регион',
                        value: '3'
                    }
                ];
                this.insuredCountModel = null;
                this.insuredsCount = null;
                this.birthdaysValid = false;
                this.addInsuredrsCount = function () {
                    this.insuredsCount++;
                    this.insuredsCountChange();
                };
                this.insuredsCountChange = function () {
                    this.insuredsCount = this.insuredCountModel.value;
                    if (this.insuredsCount > 5) {
                        this.insuredsCount = 0;
                    }
                    console.log(this.travelingInsuranceForm.insureds);
                    if (this.isNumeric(this.insuredsCount)) {
                        if (this.insuredsCount > this.travelingInsuranceForm.insureds.length) {
                            while (this.insuredsCount > this.travelingInsuranceForm.insureds.push(new traveling.Insured())) { }
                        }
                        if (this.insuredsCount < this.travelingInsuranceForm.insureds.length) {
                            this.travelingInsuranceForm.insureds.splice(this.insuredsCount, this.travelingInsuranceForm.insureds.length - this.insuredsCount);
                        }
                    }
                    this.updataBirths();
                };
                this.countryCountModel = null;
                this.countriesCount = null;
                this.addCountriesCount = function () {
                    this.countriesCount++;
                    this.countriesCountChange();
                };
                this.isNumeric = function (n) {
                    return !isNaN(parseFloat(n)) && isFinite(n);
                };
                this.$rootScope.showFooter = true;
                this.$rootScope.showBlindStopper = false;
                this.dataOnInsured = !$rootScope.isMobile;
                this.dataTravel = !$rootScope.isMobile;
                this.protectionAdditionalRisks = !$rootScope.isMobile;
                this.travelingInsuranceForm = new traveling.TRAVELINGForm();
                this.showPeriodStart = false;
                this.showPeriodFinish = false;
                this.countriesCount = 1;
                this.countriesCountChange();
                this.insuredCountModel = { text: '1', value: '1' };
                this.insuredsCountChange();
                //   this.getRegions();
                $scope.vm = this;
                console.log(close);
                this.minStartData = new Date();
                this.minStartData.setDate(this.minStartData.getDate() + 2);
                this.minEndData = new Date(this.minStartData.getFullYear(), this.minStartData.getMonth(), this.minStartData.getDate() + 7);
                this.BirthDate = new Date(1926, this.minStartData.getMonth(), this.minStartData.getDate());
                this.$http.get('api/handbook/country')
                    .success(function (response) {
                    _this.countryOptions = response;
                });
            }
            TRAVELINGController.prototype.countryFunc = function (index) {
                $("#travelingCtrl_travelingInsuranceForm_city" + index + "_dropdown").hide();
                setTimeout(function () { $("#travelingCtrl_travelingInsuranceForm_city" + index + "_dropdown").show(); }, 10);
            };
            TRAVELINGController.prototype.updataBirths = function () {
                this.birthdaysValid = false;
                if (this.isNumeric(this.insuredsCount)) {
                    for (var i = 0; i < this.travelingInsuranceForm.insureds.length; ++i) {
                        console.log(this.travelingInsuranceForm.insureds[i].db);
                        if (this.travelingInsuranceForm.insureds[i].db == null) {
                            this.birthdaysValid = true;
                            break;
                        }
                    }
                }
                ;
            };
            TRAVELINGController.prototype.countriesCountChange = function () {
                if (this.isNumeric(this.countriesCount)) {
                    var currentCount = this.travelingInsuranceForm.countries.length;
                    if (this.countriesCount > currentCount) {
                        while (this.countriesCount > currentCount) {
                            var country = new traveling.TravelingCountry();
                            var self = this;
                            country.countryFunc = function (count, _self) {
                                return function (data) {
                                    if (_self.$rootScope.isMobile) {
                                        setTimeout(function () { _self.countryFunc(count); }, 50);
                                    }
                                    return data;
                                };
                            }(currentCount, self);
                            this.travelingInsuranceForm.countries.push(country);
                            currentCount = this.travelingInsuranceForm.countries.length;
                        }
                    }
                    if (this.countriesCount < currentCount) {
                        this.travelingInsuranceForm.countries.splice(this.countriesCount, currentCount - this.countriesCount);
                    }
                }
            };
            ;
            ;
            TRAVELINGController.prototype.updateEndDate = function () {
                this.minEndData = new Date(this.travelingInsuranceForm.periodStart.toString());
                this.minEndData.setDate(this.minEndData.getDate() + 6);
                console.log(this.minEndData);
            };
            TRAVELINGController.prototype.getRegions = function () {
                var _this = this;
                var s = 'api/handbook/country/';
                this.$http.get(s)
                    .success(function (response) {
                    _this.regions = response;
                });
            };
            ;
            /*yearBigValue(index: any): void {
                var _year = this.houseInsuranceForm.estates[index].year;
                var nowYear = new Date().getUTCFullYear();
                if (_year > nowYear) {
                    _year = null;
                    this.houseInsuranceForm.estates[index].releaseYearIsLarge = true;
                } else {
                    this.houseInsuranceForm.estates[index].releaseYearIsLarge = false;
                }
            };*/
            TRAVELINGController.prototype.requestOffer = function () {
                var _this = this;
                if (this.submitValue === 'Получить предложение') {
                    if (!this.travelingInsuranceForm.isAgreed) {
                        return;
                    }
                    this.firstbd = false;
                    for (var j = 0; j < this.travelingInsuranceForm.insureds.length; ++j) {
                        if (this.travelingInsuranceForm.insureds[j].bd == null) {
                            this.firstbd = true;
                            return;
                        }
                    }
                    if (this.travelingInsuranceForm.choiceInsurance.value == null ||
                        this.travelingInsuranceForm.currencyAndSum.value == null) {
                        return;
                    }
                    if (this.travelingInsuranceForm.choiceInsurance.value === 2 && this.travelingInsuranceForm.duration.value == null) {
                        return;
                    }
                    this.firstbd = true;
                    var formClone = new traveling.TRAVELINGForm();
                    formClone.chronic = this.travelingInsuranceForm.chronic;
                    formClone.currencyAndSum = this.travelingInsuranceForm.currencyAndSum.value;
                    formClone.leisureOrSports = this.travelingInsuranceForm.leisureOrSports;
                    formClone.periodFinish = this.travelingInsuranceForm.periodFinish;
                    formClone.periodStart = this.travelingInsuranceForm.periodStart;
                    formClone.pregnant = this.travelingInsuranceForm.pregnant;
                    formClone.choiceInsurance = this.travelingInsuranceForm.choiceInsurance.value;
                    formClone.duration = (this.travelingInsuranceForm.duration.value != null) ? this.travelingInsuranceForm.duration.value : '0';
                    for (var i = 0; i < this.travelingInsuranceForm.countries.length; ++i) {
                        formClone.countries.push(this.travelingInsuranceForm.countries[i].value.originalObject);
                    }
                    for (var j = 0; j < this.travelingInsuranceForm.insureds.length; ++j) {
                        formClone.insureds.push(this.travelingInsuranceForm.insureds[j].bd);
                    }
                    this.firstbd = true;
                    console.log(formClone);
                    this.submitValue = 'Поиск предложений ...';
                    this.ModalService.showModal({
                        templateUrl: 'app/loading/loading.html',
                        controller: 'LoadingModalController',
                        controllerAs: 'loadingModalCtrl',
                        inputs: {}
                    });
                    window.scrollTo(0, 0);
                    this.TRAVELINGService.loadOffers(formClone).success(function () {
                        _this.$scope.dismissModal('logedin');
                        //  console.log(this.$scope.dismissModal);
                        _this.$state.go('traveling.offer');
                    });
                }
            };
            return TRAVELINGController;
        })();
        traveling.TRAVELINGController = TRAVELINGController;
        angular.module('nepereplaty').controller('nepereplaty.traveling.TRAVELINGController', TRAVELINGController);
    })(traveling = nepereplaty.traveling || (nepereplaty.traveling = {}));
})(nepereplaty || (nepereplaty = {}));
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
/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var traveling;
    (function (traveling) {
        var TRAVELINGOfferController = (function () {
            function TRAVELINGOfferController($state, $q, TRAVELINGService, $rootScope) {
                this.$state = $state;
                this.$q = $q;
                this.TRAVELINGService = TRAVELINGService;
                this.$rootScope = $rootScope;
                this.content = new traveling.TRAVELINGOffer();
                this.canCompare = false;
                if (this.TRAVELINGService.getOffers() == null) {
                    this.$state.go('home');
                }
                this.content = this.TRAVELINGService.getOffers();
                this.startData = this.content.startData;
                this.endData = this.content.endData;
                this.showMargin = $rootScope.isMobile;
                var priceString = '';
                console.log(this.content);
                console.log(this.content.Offers);
                for (var i = 0; i < this.content.Offers.length; ++i) {
                    if (this.content.Offers[i].Total_SP > 1000) {
                        priceString = this.content.Offers[i].Total_SP.toFixed(3);
                        var scapeIndex = Math.floor(this.content.Offers[i].Total_SP / 1000).toFixed(0).length;
                        priceString = priceString.slice(0, scapeIndex) + ' ' +
                            priceString.slice(scapeIndex, priceString.length - 1);
                    }
                    else {
                        priceString = this.content.Offers[i].Total_SP.toFixed(2);
                    }
                    this.content.Offers[i].Price = priceString;
                }
                console.log(this.content.Offers);
                //   this.defaultValue();
            }
            ;
            TRAVELINGOfferController.prototype.generationOffer = function (name, logo, companyName, price) {
                var result = new traveling.TRAVELINGInsuracneOffer();
                result.Company = new traveling.InsuracneCompany();
                result.Name = name;
                result.Company.Logo = logo;
                result.Company.Name = companyName;
                result.Company.Price = price;
                console.log(result.AdditionalOptions);
                result.AdditionalOptions = [];
                result.AdditionalOptions.push(new traveling.AdditionalOption(name + ' _ 1', name + ' Description 1'));
                result.AdditionalOptions.push(new traveling.AdditionalOption(name + ' _ 2', name + ' Description 2'));
                console.log(result.AdditionalOptions);
                return result;
            };
            TRAVELINGOfferController.prototype.buyOffer = function (index) {
                this.TRAVELINGService.offerIndex = index;
                this.TRAVELINGService.totoalPrice = this.TRAVELINGService.getOffers().Offers[index].Total_SP;
                this.$state.go('traveling.details');
            };
            ;
            TRAVELINGOfferController.prototype.onClickCompareChackBox = function () {
                var indexes = [];
                var offer;
                console.log(indexes);
                for (var i = 0; i < this.content.Offers.length; ++i) {
                    offer = this.content.Offers[i];
                    if (offer.isCompair) {
                        indexes.push(i);
                    }
                }
                if (indexes.length >= 2) {
                    this.canCompare = true;
                }
                else {
                    this.canCompare = false;
                }
                console.log(this.canCompare);
                console.log(indexes);
            };
            ;
            TRAVELINGOfferController.prototype.compare = function () {
                if (this.canCompare) {
                    this.$state.go('traveling.compare');
                }
            };
            ;
            return TRAVELINGOfferController;
        })();
        traveling.TRAVELINGOfferController = TRAVELINGOfferController;
        /* content: APARTMENTOffer;
         canCompare: boolean;
         constructor(private $state: angular.ui.IStateService, private $q: angular.IQService, private HOUSEService: IAPARTMENTService) {
             this.canCompare = false;
             this.content = this.HOUSEService.getOffers();
    
             var priceString = '';
             for (var i = 0; i < this.content.offers.length; ++i) {
                 priceString = this.content.offers[i].Total_SP.toFixed(3);
                 var scapeIndex = (this.content.offers[i].Total_SP / 1000).toFixed(0).length;
                 priceString = priceString.slice(0, scapeIndex) + ' ' +
                 priceString.slice(scapeIndex, priceString.length - 1);
                 this.content.offers[i].Price = priceString;
             }
         };
    
         generationOffer(name: string, logo: string, companyName: string, price: string): APARTMENTInsuracneOffer {
             var result: APARTMENTInsuracneOffer = new APARTMENTInsuracneOffer();
             result.Company = new InsuracneCompany();
             result.Name = name;
             result.Company.Logo = logo;
             result.Company.Name = companyName;
             result.Company.Price = price;
             console.log(result.AdditionalOptions);
             result.AdditionalOptions = [];
             result.AdditionalOptions.push(new AdditionalOption(name + ' _ 1', name + ' Description 1'));
             result.AdditionalOptions.push(new AdditionalOption(name + ' _ 2', name + ' Description 2'));
             console.log(result.AdditionalOptions);
             return result;
         }
    
         buyOffer(index: any): void {
             this.HOUSEService.offerIndex = index;
             this.$state.go('house.details');
         };
         onClickCompareChackBox() {
             var indexes: number[] = [];
             var offer;
             for (var i = 0; i < this.content.offers.length; ++i) {
                 offer = this.content.offers[i];
                 if (offer.isCompair) {
                     indexes.push(i);
                 }
             }
             if (indexes.length >= 2) {
                 this.canCompare = true;
             } else {
                 this.canCompare = false;
             }
             console.log(this.canCompare);
             console.log(indexes);
         };
         compare(): void {
             if (this.canCompare) {
    
                 this.$state.go('house.compare');
             }
         };
     }*/
        angular.module('nepereplaty').controller('nepereplaty.traveling.TRAVELINGOfferController', TRAVELINGOfferController);
    })(traveling = nepereplaty.traveling || (nepereplaty.traveling = {}));
})(nepereplaty || (nepereplaty = {}));
/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var traveling;
    (function (traveling) {
        var TRAVELINGCompareController = (function () {
            function TRAVELINGCompareController($state, $q, TRAVELINGService) {
                this.$state = $state;
                this.$q = $q;
                this.TRAVELINGService = TRAVELINGService;
                this.content = new traveling.TRAVELINGOffer();
                this.content = this.TRAVELINGService.getOffers();
                this.startData = this.content.startData;
                this.endData = this.content.endData;
            }
            ;
            TRAVELINGCompareController.prototype.back = function () {
                console.log('________________________________===================');
                this.$state.go('traveling.offer');
            };
            ;
            TRAVELINGCompareController.prototype.openPdf = function () {
                window.open('../../p/example.pdf');
            };
            return TRAVELINGCompareController;
        })();
        traveling.TRAVELINGCompareController = TRAVELINGCompareController;
        angular.module('nepereplaty').controller('nepereplaty.traveling.TRAVELINGCompareController', TRAVELINGCompareController);
    })(traveling = nepereplaty.traveling || (nepereplaty.traveling = {}));
})(nepereplaty || (nepereplaty = {}));
/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var traveling;
    (function (traveling) {
        var TRAVELINGDetailsController = (function () {
            function TRAVELINGDetailsController($http, $state, $q, TRAVELINGService, auth, $scope, account, $rootScope, ModalService) {
                var _this = this;
                this.$http = $http;
                this.$state = $state;
                this.$q = $q;
                this.TRAVELINGService = TRAVELINGService;
                this.auth = auth;
                this.$scope = $scope;
                this.account = account;
                this.$rootScope = $rootScope;
                this.ModalService = ModalService;
                this.content = new traveling.TRAVELINGOffer();
                this.telCode = [
                    { text: '+7', value: '007' },
                    { text: '+1', value: '001' },
                    { text: '+33', value: '0033' },
                    { text: '+374', value: '00374' },
                    { text: '+25', value: '0024' },
                    { text: '+908', value: '00908' },
                ];
                if (this.TRAVELINGService.getOffers() == null) {
                    this.$state.go('home');
                }
                this.personalData = !$rootScope.isMobile;
                this.openTravelPassport = !$rootScope.isMobile;
                this.openPersonalData = !$rootScope.isMobile;
                this.openTravelData = !$rootScope.isMobile;
                this.content = this.TRAVELINGService.getOffers();
                this.startData = this.content.startData;
                this.endData = this.content.endData;
                this.logoUrl = this.content.Offers[this.TRAVELINGService.offerIndex].Company.Logo;
                this.userData = new traveling.TRAVELINGDetailsForm();
                if (!this.auth.getUserId()) {
                    this.login();
                }
                else {
                    account.getAccount().then(function (value) {
                        _this.manageData = value;
                        _this.setData();
                    });
                }
            }
            ;
            TRAVELINGDetailsController.prototype.register = function () {
                var _this = this;
                this.$rootScope.isModalShown = true;
                this.ModalService.showModal({
                    templateUrl: 'app/auth/register.html',
                    controller: 'RegisterModalController',
                    controllerAs: 'registerModalCtrl',
                    inputs: {
                        name: 'traveling'
                    }
                }).then(function (modal) {
                    modal.close.then(function (result) {
                        if (result === 'login') {
                            _this.login();
                        }
                        else {
                            if (result === 'registered') {
                                _this.account.getAccount().then(function (value) {
                                    _this.manageData = value;
                                    _this.setData();
                                });
                            }
                            _this.$rootScope.isModalShown = false;
                        }
                        // Reset user password
                        //this.credentials.password = '';
                    });
                });
            };
            TRAVELINGDetailsController.prototype.login = function () {
                var _this = this;
                this.$rootScope.isModalShown = true;
                this.ModalService.showModal({
                    templateUrl: 'app/auth/login.html',
                    controller: 'LoginModalController',
                    controllerAs: 'loginModalCtrl',
                    inputs: {
                        name: 'traveling'
                    }
                }).then(function (modal) {
                    modal.close.then(function (result) {
                        if (result === 'register') {
                            _this.register();
                        }
                        else {
                            if (result === 'logedin') {
                                _this.account.getAccount().then(function (value) {
                                    _this.manageData = value;
                                    _this.setData();
                                });
                            }
                            _this.$rootScope.isModalShown = false;
                        }
                    });
                });
            };
            TRAVELINGDetailsController.prototype.editAccount = function () {
                var _this = this;
                this.account.editAccount(this.manageData).then(function (value) {
                    _this.account.getAccount().then(function (value) {
                        _this.manageData = value;
                        //this.setData();
                    });
                });
            };
            ;
            TRAVELINGDetailsController.prototype.updateMiddle = function () {
                if (this.validate(this.manageData.Name) && this.validate(this.manageData.Surname)) {
                    this.isMiddle = true;
                }
                else {
                    this.isMiddle = false;
                }
            };
            TRAVELINGDetailsController.prototype.validate = function (strValue) {
                var objRegExp = /^[a-zA-Z ]+$/;
                return objRegExp.test(strValue);
            };
            TRAVELINGDetailsController.prototype.onMiddlesCahsnge = function () {
                for (var i = 0; i < this.userData.additiolData.length; ++i) {
                    if (this.validate(this.userData.additiolData[i].privateData.NamePolis)
                        && this.validate(this.userData.additiolData[i].privateData.SurnamePolis)) {
                        this.userData.additiolData[i].isMiddle = true;
                    }
                    else {
                        this.userData.additiolData[i].isMiddle = false;
                    }
                }
            };
            TRAVELINGDetailsController.prototype.setData = function () {
                this.userData.Adress = this.manageData.Adress;
                this.userData.Birthday = this.manageData.Birthday;
                this.userData.City = this.manageData.City;
                this.userData.Email = this.manageData.Email;
                this.userData.IsMale = (this.manageData.IsMale) ? 1 : 2;
                this.userData.Middlename = this.manageData.Middlename;
                this.userData.Name = this.manageData.Name;
                this.userData.PassportIssued = this.manageData.PassportIssued;
                this.userData.PassportnNumber = this.manageData.PassportnNumber;
                this.userData.PassportSerial = this.manageData.PassportSerial;
                this.userData.PassportWhen = this.manageData.PassportWhen;
                this.userData.PassportWhere = this.manageData.PassportWhere;
                this.userData.Surname = this.manageData.Surname;
                this.userData.Mobile = Number(this.manageData.Mobile);
                this.userData.Telephone = Number(this.manageData.Telephone);
                if (this.manageData.MobileCode) {
                    if (this.manageData.MobileCode.text != null) {
                        this.userData.MobileCode = this.manageData.MobileCode;
                    }
                    else {
                        this.userData.MobileCode = { text: this.manageData.MobileCode, value: this.manageData.MobileCode };
                    }
                }
                else {
                    this.userData.MobileCode = { text: '--', value: null };
                }
                if (this.manageData.TelephoneCode) {
                    if (this.manageData.TelephoneCode.text != null) {
                        this.userData.TelephoneCode = this.manageData.TelephoneCode;
                    }
                    else {
                        this.userData.TelephoneCode = { text: this.manageData.TelephoneCode, value: this.manageData.TelephoneCode };
                    }
                }
                else {
                    this.userData.TelephoneCode = { text: '--', value: null };
                }
                this.userData.additiolData = [];
                for (var i = 1; i < this.content.insureds.length; ++i) {
                    var item = new traveling.AdditionTrevalerData();
                    console.log(this.content.insureds[i].bd);
                    item.privateData.BirthdayPolis = this.content.insureds[i].bd;
                    item.privateData.age = this.content.insuredsAges.split(', ')[i];
                    this.userData.additiolData.push(item);
                }
                console.log(this.userData);
                this.updateMiddle();
                this.onMiddlesCahsnge();
            };
            TRAVELINGDetailsController.prototype.requestBuyOffer = function () {
                var _this = this;
                if (this.pasportWhere) {
                    this.userData.PassportWhere = this.pasportWhere.title;
                }
                if (this.city) {
                    this.userData.City = this.city.title;
                }
                console.log(this.userData.City == null, this.userData.Email == null, this.userData.IsMale == null, this.userData.Middlename == null, this.userData.Name == null, this.userData.PassportIssued == null, this.userData.PassportnNumber == null, this.userData.PassportSerial == null, this.userData.Surname == null, this.userData.Mobile == null, this.userData.Telephone == null);
                if (this.userData.Adress == null ||
                    this.userData.City == null ||
                    this.userData.Email == null ||
                    this.userData.IsMale == null ||
                    this.userData.Name == null ||
                    this.userData.PassportIssued == null ||
                    this.userData.PassportnNumber == null ||
                    this.userData.PassportSerial == null ||
                    this.userData.Surname == null ||
                    this.userData.Mobile == null ||
                    this.userData.Telephone == null ||
                    this.userData.PassportWhen === undefined) {
                    return;
                }
                if (this.userData.Middlename == null && !this.isMiddle) {
                    return;
                }
                for (var i = 0; i < this.userData.additiolData.length; i++) {
                    if (this.userData.additiolData[i].privateData.Gender == null ||
                        this.userData.additiolData[i].privateData.NamePolis == null ||
                        this.userData.additiolData[i].privateData.SurnamePolis == null ||
                        this.userData.additiolData[i].outBorderPassport.PassportIssuedHuman == null ||
                        this.userData.additiolData[i].outBorderPassport.PassportNameHuman == null ||
                        this.userData.additiolData[i].outBorderPassport.PassportnNumberHuman == null ||
                        this.userData.additiolData[i].outBorderPassport.PassportSerialHuman == null ||
                        this.userData.additiolData[i].outBorderPassport.PassportSurnameHuman == null) {
                        return;
                    }
                }
                this.manageData.Adress = this.userData.Adress;
                this.manageData.Birthday = this.userData.Birthday;
                this.manageData.City = this.userData.City;
                this.manageData.Email = this.userData.Email;
                this.manageData.IsMale = (this.userData.IsMale === 1) ? true : false;
                this.manageData.Middlename = this.userData.Middlename;
                this.manageData.Name = this.userData.Name;
                this.manageData.PassportIssued = this.userData.PassportIssued;
                this.manageData.PassportnNumber = this.userData.PassportnNumber;
                this.manageData.PassportSerial = this.userData.PassportSerial;
                this.manageData.PassportWhen = this.userData.PassportWhen;
                this.manageData.PassportWhere = this.userData.PassportWhere;
                this.manageData.Surname = this.userData.Surname;
                this.manageData.Mobile = this.userData.Mobile;
                this.manageData.Telephone = this.userData.Telephone;
                this.manageData.MobileCode = this.userData.MobileCode.value;
                this.manageData.TelephoneCode = this.userData.TelephoneCode.value;
                this.editAccount();
                this.TRAVELINGService.buyerInfo = this.userData;
                var model = new traveling.TravelingOfferModel();
                model.traveling.duration = parseFloat(this.content.travelingDur);
                model.traveling.countries = this.content.country;
                model.traveling.type = this.content.InsuranceType;
                model.insured.push(new traveling.InsuredModel(this.userData.Name, this.userData.Surname, this.userData.Middlename, parseFloat(this.content.insuredsAges.split(', ')[0])));
                for (var i = 1; i < this.userData.additiolData.length; i++) {
                    model.insured.push(new traveling.InsuredModel(this.userData.additiolData[i].privateData.NamePolis, this.userData.additiolData[i].privateData.SurnamePolis, this.userData.additiolData[i].privateData.PatronymicPolis, parseFloat(this.userData.additiolData[i].privateData.age)));
                }
                //           model.insured.name = this.userData.Name;
                //           model.insured.surName = this.userData.Surname;
                //           model.insured.age = parseFloat(this.content.age);
                //          model.insured.middleName = this.userData.Middlename;
                model.basic.cost = this.TRAVELINGService.totoalPrice;
                model.basic.type = 'traveling';
                model.basic.buyer = this.userData.Email;
                model.basic.startDate = this.content.startData;
                model.basic.endDate = this.content.endData;
                model.basic.companyId = this.content.Offers[this.TRAVELINGService.offerIndex].Company.Id;
                console.log(model);
                this.$http.put('api/admin/traveling', model).success(function (response) {
                    console.log(response);
                    _this.TRAVELINGService.offerId = response.offerId;
                    _this.$state.go('traveling.payment');
                });
            };
            ;
            return TRAVELINGDetailsController;
        })();
        traveling.TRAVELINGDetailsController = TRAVELINGDetailsController;
        angular.module('nepereplaty').controller('nepereplaty.traveling.TRAVELINGDetailsController', TRAVELINGDetailsController);
    })(traveling = nepereplaty.traveling || (nepereplaty.traveling = {}));
})(nepereplaty || (nepereplaty = {}));
/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var traveling;
    (function (traveling) {
        var TRAVELINGPaymentController = (function () {
            function TRAVELINGPaymentController($state, $q, TRAVELINGService) {
                this.$state = $state;
                this.$q = $q;
                this.TRAVELINGService = TRAVELINGService;
                this.content = new traveling.TRAVELINGOffer();
                this.additianalPay = [
                    {
                        b: false,
                        c: 1000,
                        s: '1 000'
                    },
                    {
                        b: false,
                        c: 500,
                        s: '500'
                    },
                    {
                        b: false,
                        c: 2000,
                        s: '2 000'
                    }
                ];
                if (this.TRAVELINGService.getOffers() == null) {
                    this.$state.go('home');
                }
                this.content = this.TRAVELINGService.getOffers();
                this.offer = this.content.Offers[this.TRAVELINGService.offerIndex];
                this.logoUrl = this.content.Offers[this.TRAVELINGService.offerIndex].Company.Logo;
                var priceString = this.content.Offers[this.TRAVELINGService.offerIndex].Total_SP.toFixed(3);
                var scapeIndex = (this.content.Offers[this.TRAVELINGService.offerIndex].Total_SP / 1000).toFixed(0).length;
                priceString = priceString.slice(0, scapeIndex) + ' ' +
                    priceString.slice(scapeIndex, priceString.length - 1);
                this.content.Price = this.content.Offers[this.TRAVELINGService.offerIndex].Total_SP.toFixed(3);
                this.content.priceString = priceString;
                this.startData = this.content.startData;
                this.endData = this.content.endData;
                this.updata();
            }
            ;
            TRAVELINGPaymentController.prototype.updata = function () {
                var total = 0;
                for (var i = 0; i < 3; ++i) {
                    if (this.additianalPay[i].b) {
                        total += this.additianalPay[i].c;
                    }
                }
                if (total > 0) {
                    this.add = true;
                    this.puymentCost = this.stringtoNumber(this.offer.Price) + total;
                }
                else {
                    this.add = false;
                    this.puymentCost = this.stringtoNumber(this.offer.Price);
                }
                this.puymentString = this.puymentCost.toFixed(3);
                var scapeIndex = Math.floor(this.puymentCost / 1000).toFixed(0).length;
                this.puymentString = this.puymentString.slice(0, scapeIndex) + ' '
                    + this.puymentString.slice(scapeIndex, this.puymentString.length - 1);
                if (total > 1000) {
                    this.additianalPayString = total.toFixed(3);
                    scapeIndex = (total / 1000).toFixed(0).length;
                    this.additianalPayString = this.additianalPayString.slice(0, scapeIndex) + ' '
                        + this.additianalPayString.slice(scapeIndex, this.additianalPayString.length - 1);
                }
                else {
                    this.additianalPayString = total.toFixed(2);
                }
            };
            ;
            TRAVELINGPaymentController.prototype.stringtoNumber = function (s) {
                var result = 0;
                var step1 = s.replace(',', '.');
                var step2 = step1.replace(/ /g, '');
                var step3 = step2.replace(' ', '').replace(String.fromCharCode(160), '');
                result = parseFloat(step3);
                return result;
            };
            TRAVELINGPaymentController.prototype.pay = function () {
                var total = 0;
                for (var i = 0; i < 3; ++i) {
                    if (this.additianalPay[i].b) {
                        total += this.additianalPay[i].c;
                    }
                }
                if (total > 0) {
                    this.puymentCost = this.stringtoNumber(this.offer.Price) + total;
                }
                else {
                    this.puymentCost = this.stringtoNumber(this.offer.Price);
                }
                this.TRAVELINGService.totoalPrice = this.puymentCost;
                this.$state.go('traveling.finish');
            };
            return TRAVELINGPaymentController;
        })();
        traveling.TRAVELINGPaymentController = TRAVELINGPaymentController;
        angular.module('nepereplaty').controller('nepereplaty.traveling.TRAVELINGPaymentController', TRAVELINGPaymentController);
    })(traveling = nepereplaty.traveling || (nepereplaty.traveling = {}));
})(nepereplaty || (nepereplaty = {}));
/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var traveling;
    (function (traveling) {
        var TRAVELINGFinishController = (function () {
            function TRAVELINGFinishController($http, $state, $q, TRAVELINGService) {
                this.$http = $http;
                this.$state = $state;
                this.$q = $q;
                this.TRAVELINGService = TRAVELINGService;
                this.content = new traveling.TRAVELINGOffer();
                if (this.TRAVELINGService.getOffers() == null) {
                    this.$state.go('home');
                }
                this.offer = this.TRAVELINGService.getOffers().Offers[this.TRAVELINGService.offerIndex];
                this.data = this.TRAVELINGService.buyerInfo;
                this.orderNumber = this.TRAVELINGService.offerId;
                this.startData = this.TRAVELINGService.getOffers().startData;
                this.price = this.TRAVELINGService.totoalPrice;
                if (this.price > 1000) {
                    this.priceString = this.price.toFixed(3);
                    var scapeIndex = (this.price / 1000).toFixed(0).length;
                    this.priceString = this.priceString.slice(0, scapeIndex) + ' ' +
                        this.priceString.slice(scapeIndex, this.priceString.length - 1);
                }
                else {
                    this.priceString = this.price.toFixed(2);
                }
                this.content.name = this.data.Name + ' ' + this.data.Surname;
                this.content.orderNumber = this.TRAVELINGService.offerId.toString();
                this.content.insurancePolicy = this.offer.Company.Name + ' СТРАХОВАНИЕ';
                this.content.insuredsCount = this.TRAVELINGService.getOffers().insuredsCount;
                this.content.companyName = this.offer.Company.Name;
                this.content.startData = this.TRAVELINGService.getOffers().startData;
                this.content.endData = this.TRAVELINGService.getOffers().endData;
                this.content.travelingDur = this.TRAVELINGService.getOffers().travelingDur;
                this.content.submodule = 'Квартира';
                this.content.priceString = this.priceString;
                this.BirthData = this.data.Birthday.toString();
                var ar = this.BirthData.split('-');
                this.BirthData = ar[2] + '.' + ar[1] + '.' + ar[0];
                this.$http.get('../api/admin/purchas/' + this.content.orderNumber + '/'
                    + this.TRAVELINGService.totoalPrice).success(function (response) {
                    console.log(response);
                });
            }
            TRAVELINGFinishController.prototype.downloadPdf = function () {
                console.log('_______________');
            };
            ;
            return TRAVELINGFinishController;
        })();
        traveling.TRAVELINGFinishController = TRAVELINGFinishController;
        angular.module('nepereplaty').controller('nepereplaty.traveling.TRAVELINGFinishController', TRAVELINGFinishController);
    })(traveling = nepereplaty.traveling || (nepereplaty.traveling = {}));
})(nepereplaty || (nepereplaty = {}));
/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var accident;
    (function (accident) {
        var ACCIDENTController = (function () {
            function ACCIDENTController($http, $state, $q, ACCIDENTService, $scope, ModalService, $timeout, $rootScope) {
                var _this = this;
                this.$http = $http;
                this.$state = $state;
                this.$q = $q;
                this.ACCIDENTService = ACCIDENTService;
                this.$scope = $scope;
                this.ModalService = ModalService;
                this.$timeout = $timeout;
                this.$rootScope = $rootScope;
                this.submitValue = 'Получить предложение';
                this.insuranceStartMinData = new Date();
                this.insuranceOptions = [
                    {
                        text: '1 месяц',
                        value: '1'
                    },
                    {
                        text: '3 месяца',
                        value: '3'
                    },
                    {
                        text: '6 месяцев',
                        value: '6'
                    },
                    {
                        text: '12 месяцев',
                        value: '12'
                    }
                ];
                this.countryOptions = [{
                        text: 'Первый регион',
                        value: '1'
                    },
                    {
                        text: 'Второй регион',
                        value: '2'
                    },
                    {
                        text: 'Третий регион',
                        value: '3'
                    }
                ];
                this.regionOptions = [{
                        text: 'Первый регион',
                        value: '1'
                    },
                    {
                        text: 'Второй регион',
                        value: '2'
                    },
                    {
                        text: 'Третий регион',
                        value: '3'
                    }
                ];
                this.yearBigValue = function () {
                    var nowYear = new Date().getUTCFullYear();
                    if (this.accidentInsuranceForm.year > nowYear) {
                        this.accidentInsuranceForm.year = null;
                        this.accidentInsuranceForm.releaseYearIsLarge = true;
                    }
                    else {
                        this.accidentInsuranceForm.releaseYearIsLarge = false;
                    }
                };
                this.insuranceStartMinData.setDate(this.insuranceStartMinData.getDate() - 1);
                this.accidentInsuranceForm = new accident.ACCIDENTForm();
                this.showPeriodStart = false;
                this.showPeriodFinish = false;
                this.$rootScope.showFooter = true;
                this.$rootScope.showBlindStopper = false;
                this.dataOnInsured = !$rootScope.isMobile;
                this.additionalInformation = !$rootScope.isMobile;
                this.$http.get('api/handbook/region')
                    .success(function (response) {
                    _this.regionOptions = response;
                    _this.$http.get('api/handbook/country')
                        .success(function (response) {
                        _this.countryOptions = response;
                    });
                });
            }
            ;
            ACCIDENTController.prototype.requestOffer = function () {
                var _this = this;
                if (this.submitValue === 'Получить предложение') {
                    console.log(this.accidentInsuranceForm);
                    if (this.accidentInsuranceForm.age == null ||
                        this.accidentInsuranceForm.amateurSports == null ||
                        this.accidentInsuranceForm.duration.value == null ||
                        this.accidentInsuranceForm.otherPerson == null || !this.isAgreed) {
                        return;
                    }
                    var formClone = new accident.ACCIDENTForm();
                    formClone.age = this.accidentInsuranceForm.age;
                    formClone.amateurSports = this.accidentInsuranceForm.amateurSports;
                    formClone.otherPerson = this.accidentInsuranceForm.otherPerson;
                    formClone.startData = this.accidentInsuranceForm.startData;
                    formClone.duration = this.accidentInsuranceForm.duration.value;
                    console.log(formClone);
                    this.submitValue = 'Поиск предложений ...';
                    this.ModalService.showModal({
                        templateUrl: 'app/loading/loading.html',
                        controller: 'LoadingModalController',
                        controllerAs: 'loadingModalCtrl',
                        inputs: {}
                    });
                    window.scrollTo(0, 0);
                    this.ACCIDENTService.loadOffers(formClone).success(function () {
                        _this.$scope.dismissModal('logedin');
                        //  console.log(this.$scope.dismissModal);
                        _this.$state.go('accident.offer');
                    });
                }
            };
            return ACCIDENTController;
        })();
        accident.ACCIDENTController = ACCIDENTController;
        angular.module('nepereplaty').controller('nepereplaty.accident.ACCIDENTController', ACCIDENTController);
    })(accident = nepereplaty.accident || (nepereplaty.accident = {}));
})(nepereplaty || (nepereplaty = {}));
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
/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var accident;
    (function (accident) {
        var ACCIDENTOfferController = (function () {
            function ACCIDENTOfferController($state, $q, ACCIDENTService, $rootScope) {
                this.$state = $state;
                this.$q = $q;
                this.ACCIDENTService = ACCIDENTService;
                this.$rootScope = $rootScope;
                this.content = new accident.ACCIDENTOffer();
                this.insuranceOptions = [
                    {
                        text: '1 месяц',
                        value: 1
                    },
                    {
                        text: '3 месяца',
                        value: 3
                    },
                    {
                        text: '6 месяцев',
                        value: 6
                    },
                    {
                        text: '12 месяцев',
                        value: 12
                    }
                ];
                this.canCompare = false;
                if (this.ACCIDENTService.getOffers() == null) {
                    this.$state.go('home');
                }
                this.content = this.ACCIDENTService.getOffers();
                this.startData = this.content.startData;
                this.endData = this.content.endData;
                this.showMargin = $rootScope.isMobile;
                for (var i = 0; i < this.insuranceOptions.length; i++) {
                    if (this.insuranceOptions[i].value === this.content.duration) {
                        this.duration = this.insuranceOptions[i].text;
                        break;
                    }
                }
                var priceString = '';
                for (var i = 0; i < this.content.Offers.length; ++i) {
                    if (this.content.Offers[i].Total_SP > 1000) {
                        priceString = this.content.Offers[i].Total_SP.toFixed(3);
                        var scapeIndex = Math.floor(this.content.Offers[i].Total_SP / 1000).toFixed(0).length;
                        priceString = priceString.slice(0, scapeIndex) + ' ' +
                            priceString.slice(scapeIndex, priceString.length - 1);
                    }
                    else {
                        priceString = this.content.Offers[i].Total_SP.toFixed(2);
                    }
                    this.content.Offers[i].Price = priceString;
                }
                console.log(this.content.Offers);
            }
            ;
            ACCIDENTOfferController.prototype.buyOffer = function (index) {
                this.ACCIDENTService.offerIndex = index;
                this.ACCIDENTService.totoalPrice = this.ACCIDENTService.getOffers().Offers[index].Total_SP;
                this.$state.go('accident.details');
            };
            ;
            ACCIDENTOfferController.prototype.onClickCompareChackBox = function () {
                var indexes = [];
                var offer;
                console.log(indexes);
                for (var i = 0; i < this.content.Offers.length; ++i) {
                    offer = this.content.Offers[i];
                    if (offer.isCompair) {
                        indexes.push(i);
                    }
                }
                if (indexes.length >= 2) {
                    this.canCompare = true;
                }
                else {
                    this.canCompare = false;
                }
                console.log(this.canCompare);
                console.log(indexes);
            };
            ;
            ACCIDENTOfferController.prototype.compare = function () {
                if (this.canCompare) {
                    this.$state.go('accident.compare');
                }
            };
            ;
            return ACCIDENTOfferController;
        })();
        accident.ACCIDENTOfferController = ACCIDENTOfferController;
        /* content: APARTMENTOffer;
         canCompare: boolean;
         constructor(private $state: angular.ui.IStateService, private $q: angular.IQService, private HOUSEService: IAPARTMENTService) {
             this.canCompare = false;
             this.content = this.HOUSEService.getOffers();
    
             var priceString = '';
             for (var i = 0; i < this.content.offers.length; ++i) {
                 priceString = this.content.offers[i].Total_SP.toFixed(3);
                 var scapeIndex = (this.content.offers[i].Total_SP / 1000).toFixed(0).length;
                 priceString = priceString.slice(0, scapeIndex) + ' ' +
                 priceString.slice(scapeIndex, priceString.length - 1);
                 this.content.offers[i].Price = priceString;
             }
         };
    
         generationOffer(name: string, logo: string, companyName: string, price: string): APARTMENTInsuracneOffer {
             var result: APARTMENTInsuracneOffer = new APARTMENTInsuracneOffer();
             result.Company = new InsuracneCompany();
             result.Name = name;
             result.Company.Logo = logo;
             result.Company.Name = companyName;
             result.Company.Price = price;
             console.log(result.AdditionalOptions);
             result.AdditionalOptions = [];
             result.AdditionalOptions.push(new AdditionalOption(name + ' _ 1', name + ' Description 1'));
             result.AdditionalOptions.push(new AdditionalOption(name + ' _ 2', name + ' Description 2'));
             console.log(result.AdditionalOptions);
             return result;
         }
    
         buyOffer(index: any): void {
             this.HOUSEService.offerIndex = index;
             this.$state.go('house.details');
         };
         onClickCompareChackBox() {
             var indexes: number[] = [];
             var offer;
             for (var i = 0; i < this.content.offers.length; ++i) {
                 offer = this.content.offers[i];
                 if (offer.isCompair) {
                     indexes.push(i);
                 }
             }
             if (indexes.length >= 2) {
                 this.canCompare = true;
             } else {
                 this.canCompare = false;
             }
             console.log(this.canCompare);
             console.log(indexes);
         };
         compare(): void {
             if (this.canCompare) {
    
                 this.$state.go('house.compare');
             }
         };
     }*/
        angular.module('nepereplaty').controller('nepereplaty.accident.ACCIDENTOfferController', ACCIDENTOfferController);
    })(accident = nepereplaty.accident || (nepereplaty.accident = {}));
})(nepereplaty || (nepereplaty = {}));
/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var accident;
    (function (accident) {
        var ACCIDENTCompareController = (function () {
            function ACCIDENTCompareController($state, $q, ACCIDENTService) {
                this.$state = $state;
                this.$q = $q;
                this.ACCIDENTService = ACCIDENTService;
                this.content = new accident.ACCIDENTOffer();
                this.insuranceOptions = [
                    {
                        text: '1 месяц',
                        value: 1
                    },
                    {
                        text: '3 месяца',
                        value: 3
                    },
                    {
                        text: '6 месяцев',
                        value: 6
                    },
                    {
                        text: '12 месяцев',
                        value: 12
                    }
                ];
                this.content = this.ACCIDENTService.getOffers();
                for (var i = 0; i < this.insuranceOptions.length; i++) {
                    if (this.insuranceOptions[i].value === this.content.duration) {
                        this.duration = this.insuranceOptions[i].text;
                        break;
                    }
                }
            }
            ;
            ACCIDENTCompareController.prototype.back = function () {
                this.$state.go('accident.offer');
            };
            ;
            ACCIDENTCompareController.prototype.openPdf = function () {
                window.open('../../p/example.pdf');
            };
            return ACCIDENTCompareController;
        })();
        accident.ACCIDENTCompareController = ACCIDENTCompareController;
        angular.module('nepereplaty').controller('nepereplaty.accident.ACCIDENTCompareController', ACCIDENTCompareController);
    })(accident = nepereplaty.accident || (nepereplaty.accident = {}));
})(nepereplaty || (nepereplaty = {}));
/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var accident;
    (function (accident) {
        var ACCIDENTDetailsController = (function () {
            function ACCIDENTDetailsController($http, $state, $q, ACCIDENTService, auth, $scope, account, $rootScope, ModalService) {
                var _this = this;
                this.$http = $http;
                this.$state = $state;
                this.$q = $q;
                this.ACCIDENTService = ACCIDENTService;
                this.auth = auth;
                this.$scope = $scope;
                this.account = account;
                this.$rootScope = $rootScope;
                this.ModalService = ModalService;
                this.content = new accident.ACCIDENTOffer();
                this.insuranceOptions = [
                    {
                        text: '1 месяц',
                        value: 1
                    },
                    {
                        text: '3 месяца',
                        value: 3
                    },
                    {
                        text: '6 месяцев',
                        value: 6
                    },
                    {
                        text: '12 месяцев',
                        value: 12
                    }
                ];
                this.telCode = [
                    { text: '+7', value: '007' },
                    { text: '+1', value: '001' },
                    { text: '+33', value: '0033' },
                    { text: '+374', value: '00374' },
                    { text: '+25', value: '0024' },
                    { text: '+908', value: '00908' },
                ];
                this.personalData = !$rootScope.isMobile;
                this.passportData = !$rootScope.isMobile;
                this.personalDataInsured = !$rootScope.isMobile;
                this.passportDataInsured = !$rootScope.isMobile;
                if (this.ACCIDENTService.getOffers() == null) {
                    this.$state.go('home');
                }
                this.content = this.ACCIDENTService.getOffers();
                this.userData = new accident.ACCIDENTDetailsForm();
                this.logoUrl = this.content.Offers[this.ACCIDENTService.offerIndex].Company.Logo;
                console.log(this.content);
                for (var i = 0; i < this.insuranceOptions.length; i++) {
                    if (this.insuranceOptions[i].value === this.content.duration) {
                        this.duration = this.insuranceOptions[i].text;
                        break;
                    }
                }
                if (!this.auth.getUserId()) {
                    this.login();
                }
                else {
                    account.getAccount().then(function (value) {
                        _this.manageData = value;
                        //                   this.authController.update();
                        _this.setData();
                    });
                }
            }
            ;
            ACCIDENTDetailsController.prototype.register = function () {
                var _this = this;
                this.$rootScope.isModalShown = true;
                this.ModalService.showModal({
                    templateUrl: 'app/auth/register.html',
                    controller: 'RegisterModalController',
                    controllerAs: 'registerModalCtrl',
                    inputs: {
                        name: 'accident'
                    }
                }).then(function (modal) {
                    modal.close.then(function (result) {
                        if (result === 'login') {
                            _this.login();
                        }
                        else {
                            if (result === 'registered') {
                                _this.account.getAccount().then(function (value) {
                                    _this.manageData = value;
                                    //                              this.authController.update();
                                    _this.setData();
                                });
                            }
                            else {
                                console.log(result);
                            }
                            _this.$rootScope.isModalShown = false;
                        }
                        // Reset user password
                        //this.credentials.password = '';
                    });
                });
            };
            ACCIDENTDetailsController.prototype.login = function () {
                var _this = this;
                this.$rootScope.isModalShown = true;
                this.ModalService.showModal({
                    templateUrl: 'app/auth/login.html',
                    controller: 'LoginModalController',
                    controllerAs: 'loginModalCtrl',
                    inputs: {
                        name: 'accident'
                    }
                }).then(function (modal) {
                    modal.close.then(function (result) {
                        if (result === 'register') {
                            _this.register();
                        }
                        else {
                            if (result === 'logedin') {
                                _this.account.getAccount().then(function (value) {
                                    _this.manageData = value;
                                    //                                this.authController.update();
                                    _this.setData();
                                });
                            }
                            _this.$rootScope.isModalShown = false;
                        }
                    });
                });
            };
            ACCIDENTDetailsController.prototype.editAccount = function () {
                var _this = this;
                this.account.editAccount(this.manageData).then(function (value) {
                    _this.account.getAccount().then(function (value) {
                        _this.manageData = value;
                        //                    this.authController.update();
                        _this.setData();
                    });
                });
            };
            ;
            ACCIDENTDetailsController.prototype.updateMiddle = function () {
                if (this.validate(this.userData.Name) && this.validate(this.userData.Surname)) {
                    this.isMiddle = true;
                }
                else {
                    this.isMiddle = false;
                }
                console.log(this.isMiddle);
            };
            ACCIDENTDetailsController.prototype.updateSecondMiddle = function () {
                if (this.validate(this.userData.additiolData.privateData.name) &&
                    this.validate(this.userData.additiolData.privateData.surName)) {
                    this.isSecondMiddle = true;
                }
                else {
                    this.isSecondMiddle = false;
                }
            };
            ACCIDENTDetailsController.prototype.validate = function (strValue) {
                var objRegExp = /^[a-zA-Z ]+$/;
                return objRegExp.test(strValue);
            };
            ACCIDENTDetailsController.prototype.setData = function () {
                console.log('setData');
                this.userData.Adress = this.manageData.Adress;
                this.userData.Birthday = this.manageData.Birthday;
                this.userData.City = this.manageData.City;
                this.userData.Email = this.manageData.Email;
                this.userData.IsMale = (this.manageData.IsMale) ? 1 : 2;
                this.userData.Middlename = this.manageData.Middlename;
                this.userData.Name = this.manageData.Name;
                this.userData.PassportIssued = this.manageData.PassportIssued;
                this.userData.PassportnNumber = this.manageData.PassportnNumber;
                this.userData.PassportSerial = this.manageData.PassportSerial;
                this.userData.PassportWhen = this.manageData.PassportWhen;
                this.userData.PassportWhere = this.manageData.PassportWhere;
                this.userData.Surname = this.manageData.Surname;
                this.userData.Mobile = Number(this.manageData.Mobile);
                this.userData.Telephone = Number(this.manageData.Telephone);
                console.log('Hello Moto 1');
                if (this.manageData.MobileCode) {
                    if (this.manageData.MobileCode.text != null) {
                        this.userData.MobileCode = this.manageData.MobileCode;
                    }
                    else {
                        this.userData.MobileCode = { text: this.manageData.MobileCode, value: this.manageData.MobileCode };
                    }
                }
                else {
                    this.userData.MobileCode = { text: '--', value: null };
                }
                if (this.manageData.TelephoneCode) {
                    if (this.manageData.TelephoneCode.text != null) {
                        this.userData.TelephoneCode = this.manageData.TelephoneCode;
                    }
                    else {
                        this.userData.TelephoneCode = { text: this.manageData.TelephoneCode, value: this.manageData.TelephoneCode };
                    }
                }
                else {
                    this.userData.TelephoneCode = { text: '--', value: null };
                }
                console.log('Hello Moto 2');
                if (!this.content.otherPerson) {
                    this.userData.additiolData.privateData.name = this.userData.Name;
                    this.userData.additiolData.privateData.surName = this.userData.Surname;
                    this.userData.additiolData.privateData.middleName = this.userData.Middlename;
                    this.userData.additiolData.privateData.Birthday = this.userData.Birthday;
                    this.userData.additiolData.privateData.isMale = this.userData.IsMale;
                    this.userData.additiolData.pasport.Document = 1;
                    this.userData.additiolData.pasport.number = this.userData.PassportnNumber;
                    this.userData.additiolData.pasport.serial = this.userData.PassportSerial;
                    this.userData.additiolData.pasport.where = this.userData.PassportWhere;
                    this.userData.additiolData.pasport.when = this.userData.PassportWhen;
                    this.userData.additiolData.pasport.issued = this.userData.PassportIssued;
                }
                if (this.userData.City == null) {
                    this.$scope.form.city.$invalid = true;
                    this.$scope.form.city1.$invalid = true;
                }
                console.log('Hello Moto 3');
                this.updateMiddle();
                this.updateSecondMiddle();
            };
            ACCIDENTDetailsController.prototype.requestBuyOffer = function () {
                var _this = this;
                console.log(this.userData);
                if (this.pasportWhere) {
                    this.userData.PassportWhere = this.pasportWhere.title;
                }
                if (this.city) {
                    this.userData.City = this.city.title;
                }
                console.log(this.userData);
                if (this.userData.Adress == null ||
                    this.userData.City == null ||
                    this.userData.Email == null ||
                    this.userData.IsMale == null ||
                    this.userData.Name == null ||
                    this.userData.PassportIssued == null ||
                    this.userData.PassportnNumber == null ||
                    this.userData.PassportSerial == null ||
                    this.userData.PassportWhere === undefined ||
                    this.userData.Surname == null ||
                    this.userData.Mobile == null ||
                    this.userData.Telephone == null) {
                    return;
                }
                console.log(this.isMiddle);
                if (this.userData.Middlename == null && !this.isMiddle) {
                    return;
                }
                if (this.content.otherPerson) {
                    if (this.userData.additiolData.pasport.Document === 0 ||
                        this.userData.additiolData.pasport.issued == null ||
                        this.userData.additiolData.pasport.number == null ||
                        this.userData.additiolData.pasport.serial == null ||
                        this.userData.additiolData.pasport.where === undefined ||
                        this.userData.additiolData.pasport.when == null) {
                        return;
                    }
                    if (this.userData.additiolData.privateData.Birthday == null ||
                        this.userData.additiolData.privateData.isMale === 0 ||
                        this.userData.additiolData.privateData.middleName == null ||
                        this.userData.additiolData.privateData.name == null ||
                        this.userData.additiolData.privateData.surName == null) {
                        return;
                    }
                }
                this.manageData.Adress = this.userData.Adress;
                this.manageData.Birthday = this.userData.Birthday;
                this.manageData.City = this.userData.City;
                this.manageData.Email = this.userData.Email;
                this.manageData.IsMale = (this.userData.IsMale === 1) ? true : false;
                this.manageData.Middlename = this.userData.Middlename;
                this.manageData.Name = this.userData.Name;
                this.manageData.PassportIssued = this.userData.PassportIssued;
                this.manageData.PassportnNumber = this.userData.PassportnNumber;
                this.manageData.PassportSerial = this.userData.PassportSerial;
                this.manageData.PassportWhen = this.userData.PassportWhen;
                this.manageData.PassportWhere = this.userData.PassportWhere;
                this.manageData.Surname = this.userData.Surname;
                this.manageData.Mobile = this.userData.Mobile;
                this.manageData.Telephone = this.userData.Telephone;
                this.manageData.MobileCode = this.userData.MobileCode.value;
                this.manageData.TelephoneCode = this.userData.TelephoneCode.value;
                this.editAccount();
                this.ACCIDENTService.buyerInfo = this.userData;
                var model = new accident.AccidentOfferModel();
                model.accident.amateurSports = this.content.amateurSports;
                model.accident.duration = this.content.duration;
                model.accident.isSelf = !this.content.otherPerson;
                model.insured.name = this.userData.Name;
                model.insured.surName = this.userData.Surname;
                model.insured.age = parseFloat(this.content.age);
                model.insured.middleName = this.userData.Middlename;
                model.basic.cost = this.ACCIDENTService.totoalPrice;
                model.basic.type = 'accident';
                model.basic.buyer = this.userData.Email;
                model.basic.startDate = this.content.startData;
                model.basic.endDate = this.content.endData;
                model.basic.companyId = this.content.Offers[this.ACCIDENTService.offerIndex].Company.Id;
                this.$http.put('api/admin/accident', model).success(function (response) {
                    console.log(response);
                    _this.ACCIDENTService.offerId = response.offerId;
                    _this.$state.go('accident.payment');
                });
            };
            ;
            return ACCIDENTDetailsController;
        })();
        accident.ACCIDENTDetailsController = ACCIDENTDetailsController;
        angular.module('nepereplaty').controller('nepereplaty.accident.ACCIDENTDetailsController', ACCIDENTDetailsController);
    })(accident = nepereplaty.accident || (nepereplaty.accident = {}));
})(nepereplaty || (nepereplaty = {}));
/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var accident;
    (function (accident) {
        var ACCIDENTPaymentController = (function () {
            function ACCIDENTPaymentController($state, $q, ACCIDENTService) {
                this.$state = $state;
                this.$q = $q;
                this.ACCIDENTService = ACCIDENTService;
                this.content = new accident.ACCIDENTOffer();
                this.additianalPay = [
                    {
                        b: false,
                        c: 50,
                        s: '50'
                    },
                    {
                        b: false,
                        c: 10,
                        s: '10'
                    }
                ];
                this.insuranceOptions = [
                    {
                        text: '1 месяц',
                        value: 1
                    },
                    {
                        text: '3 месяца',
                        value: 3
                    },
                    {
                        text: '6 месяцев',
                        value: 6
                    },
                    {
                        text: '12 месяцев',
                        value: 12
                    }
                ];
                if (this.ACCIDENTService.getOffers() == null) {
                    this.$state.go('home');
                }
                this.content = this.ACCIDENTService.getOffers();
                this.offer = this.content.Offers[this.ACCIDENTService.offerIndex];
                this.logoUrl = this.content.Offers[this.ACCIDENTService.offerIndex].Company.Logo;
                if (this.offer.Total_SP > 1000) {
                    var priceString = this.offer.Total_SP.toFixed(3);
                    var scapeIndex = (this.offer.Total_SP / 1000).toFixed(0).length;
                    priceString = priceString.slice(0, scapeIndex) + ' ' +
                        priceString.slice(scapeIndex, priceString.length - 1);
                    this.offer.Price = priceString;
                }
                else {
                    this.offer.Price = this.offer.Total_SP.toFixed(2);
                }
                for (var i = 0; i < this.insuranceOptions.length; i++) {
                    if (this.insuranceOptions[i].value === this.content.duration) {
                        this.duration = this.insuranceOptions[i].text;
                        break;
                    }
                }
                this.startData = this.content.startData;
                this.endData = this.content.endData;
                this.updata();
            }
            ;
            ACCIDENTPaymentController.prototype.updata = function () {
                var total = 0;
                for (var i = 0; i < 2; ++i) {
                    if (this.additianalPay[i].b) {
                        total += this.additianalPay[i].c;
                    }
                }
                if (total > 0) {
                    this.add = true;
                    this.puymentCost = this.stringtoNumber(this.offer.Price) + total;
                }
                else {
                    this.add = false;
                    this.puymentCost = this.stringtoNumber(this.offer.Price);
                }
                if (this.puymentCost > 1000) {
                    this.puymentString = this.puymentCost.toFixed(3);
                    var scapeIndex = Math.floor(this.puymentCost / 1000).toFixed(0).length;
                    this.puymentString = this.puymentString.slice(0, scapeIndex) + ' '
                        + this.puymentString.slice(scapeIndex, this.puymentString.length - 1);
                }
                else {
                    this.puymentString = this.puymentCost.toFixed(2);
                }
                if (total > 1000) {
                    this.additianalPayString = total.toFixed(3);
                    scapeIndex = (total / 1000).toFixed(0).length;
                    this.additianalPayString = this.additianalPayString.slice(0, scapeIndex) + ' '
                        + this.additianalPayString.slice(scapeIndex, this.additianalPayString.length - 1);
                }
                else {
                    this.additianalPayString = total.toFixed(2);
                }
            };
            ;
            ACCIDENTPaymentController.prototype.stringtoNumber = function (s) {
                var result = 0;
                var step1 = s.replace(',', '.');
                var step2 = step1.replace(/ /g, '');
                var step3 = step2.replace(' ', '').replace(String.fromCharCode(160), '');
                result = parseFloat(step3);
                return result;
            };
            ACCIDENTPaymentController.prototype.pay = function () {
                var total = 0;
                for (var i = 0; i < 2; ++i) {
                    if (this.additianalPay[i].b) {
                        total += this.additianalPay[i].c;
                    }
                }
                if (total > 0) {
                    this.puymentCost = this.stringtoNumber(this.offer.Price) + total;
                }
                else {
                    this.puymentCost = this.stringtoNumber(this.offer.Price);
                }
                this.ACCIDENTService.totoalPrice = this.puymentCost;
                this.$state.go('accident.finish');
            };
            return ACCIDENTPaymentController;
        })();
        accident.ACCIDENTPaymentController = ACCIDENTPaymentController;
        angular.module('nepereplaty').controller('nepereplaty.accident.ACCIDENTPaymentController', ACCIDENTPaymentController);
    })(accident = nepereplaty.accident || (nepereplaty.accident = {}));
})(nepereplaty || (nepereplaty = {}));
/// <reference path="../app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var accident;
    (function (accident) {
        var ACCIDENTFinishController = (function () {
            function ACCIDENTFinishController($http, $state, $q, ACCIDENTService) {
                this.$http = $http;
                this.$state = $state;
                this.$q = $q;
                this.ACCIDENTService = ACCIDENTService;
                this.content = new accident.ACCIDENTOffer();
                if (this.ACCIDENTService.getOffers() == null) {
                    this.$state.go('home');
                }
                this.data = this.ACCIDENTService.buyerInfo;
                this.offers = this.ACCIDENTService.getOffers();
                this.content.name = this.data.Surname + ' ' + this.data.Name;
                this.content.orderNumber = this.ACCIDENTService.offerId.toString();
                this.content.insurancePolicy = this.offers.Offers[this.ACCIDENTService.offerIndex].Name;
                this.content.companyName = this.offers.Offers[this.ACCIDENTService.offerIndex].Company.Name;
                this.content.age = this.offers.age;
                this.content.startData = this.offers.startData;
                var ar = this.offers.startData.split('.');
                var d = new Date(ar[2] + '-' + ar[1] + '-' + ar[0]);
                console.log(d);
                d.setMonth(d.getMonth() + this.offers.duration);
                console.log(d);
                this.content.endData = d.getDate().toString() + '.' + (d.getMonth() + 1).toString() + '.' + d.getFullYear().toString();
                this.content.passportData = this.data.additiolData.pasport.serial +
                    ' ' + this.data.additiolData.pasport.number +
                    ' ' + this.data.additiolData.pasport.where +
                    ' ' + this.data.additiolData.pasport.issued;
                if (this.ACCIDENTService.totoalPrice > 1000) {
                    var priceString = this.ACCIDENTService.totoalPrice.toFixed(3);
                    var scapeIndex = (this.ACCIDENTService.totoalPrice / 1000).toFixed(0).length;
                    priceString = priceString.slice(0, scapeIndex) + ' ' +
                        priceString.slice(scapeIndex, priceString.length - 1);
                    this.content.priceString = priceString;
                }
                else {
                    this.content.priceString = this.ACCIDENTService.totoalPrice.toFixed(2);
                }
                ;
                this.$http.get('../api/admin/purchas/' + this.content.orderNumber + '/'
                    + this.ACCIDENTService.totoalPrice).success(function (response) {
                    console.log(response);
                });
            }
            ACCIDENTFinishController.prototype.downloadPdf = function () {
                console.log('_______________');
            };
            ;
            return ACCIDENTFinishController;
        })();
        accident.ACCIDENTFinishController = ACCIDENTFinishController;
        angular.module('nepereplaty').controller('nepereplaty.accident.ACCIDENTFinishController', ACCIDENTFinishController);
    })(accident = nepereplaty.accident || (nepereplaty.accident = {}));
})(nepereplaty || (nepereplaty = {}));
/// <reference path="app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var config;
    (function (config) {
        var Language = (function () {
            function Language() {
            }
            // @ngInject
            Language.configureLang = function ($translateProvider) {
                $translateProvider.useStaticFilesLoader({
                    prefix: 'lang/',
                    suffix: '.json'
                });
                $translateProvider.preferredLanguage('pl_pl');
                $translateProvider.useSanitizeValueStrategy('sanitize');
                console.log('Language configured!');
            };
            return Language;
        })();
        config.Language = Language;
        angular.module('nepereplaty').config(Language.configureLang);
    })(config = nepereplaty.config || (nepereplaty.config = {}));
})(nepereplaty || (nepereplaty = {}));
/// <reference path="app.ts" />
var nepereplaty;
(function (nepereplaty) {
    var config;
    (function (config) {
        var Routes = (function () {
            function Routes() {
            }
            // @ngInject
            Routes.configureRoutes = function ($stateProvider, $urlRouterProvider, $locationProvider) {
                $urlRouterProvider.otherwise('/');
                // Base route sets
                $stateProvider
                    .state('protected', {
                    abstract: true,
                    template: '<div ui-view></div>',
                    resolve: {
                        authenticated: ['nepereplaty.auth.auth', function (auth) {
                                console.log('protecting route');
                                return auth.isAuthenticated();
                            }]
                    }
                })
                    .state('casco.compare', {
                    url: '/compare',
                    views: {
                        '@': {
                            templateUrl: 'app/casco/compare.html',
                            controller: 'nepereplaty.casco.CASCOCompareController',
                            controllerAs: 'cascoCompareCtrl'
                        }
                    }
                })
                    .state('home', {
                    url: '/',
                    templateUrl: 'app/home/home.html',
                    controller: 'nepereplaty.home.HomeController',
                    controllerAs: 'homeCtrl'
                })
                    .state('casco', {
                    url: '/casco',
                    templateUrl: 'app/casco/casco.html',
                    controller: 'nepereplaty.casco.CASCOController',
                    controllerAs: 'cascoCtrl'
                })
                    .state('traveling', {
                    url: '/traveling',
                    templateUrl: 'app/traveling/travelingnew.html',
                    controller: 'nepereplaty.traveling.TRAVELINGController',
                    controllerAs: 'travelingCtrl'
                })
                    .state('osago', {
                    url: '/osago',
                    templateUrl: 'app/osago/osago.html',
                    controller: 'nepereplaty.osago.OSAGOController',
                    controllerAs: 'osagoCtrl'
                })
                    .state('osago.offer', {
                    url: '/offer',
                    views: {
                        '@': {
                            templateUrl: 'app/osago/offer.html',
                            controller: 'nepereplaty.osago.OSAGOOfferController',
                            controllerAs: 'osagoOfferCtrl'
                        }
                    }
                })
                    .state('osago.details', {
                    url: '/details',
                    views: {
                        '@': {
                            templateUrl: 'app/osago/details.html',
                            controller: 'nepereplaty.osago.OSAGODetailsController',
                            controllerAs: 'osagoDetailsCtrl'
                        }
                    }
                })
                    .state('osago.payment', {
                    url: '/payment',
                    views: {
                        '@': {
                            templateUrl: 'app/osago/payment.html',
                            controller: 'nepereplaty.osago.OSAGOPaymentController',
                            controllerAs: 'osagoPaymentCtrl'
                        }
                    }
                })
                    .state('osago.finish', {
                    url: '/finish',
                    views: {
                        '@': {
                            templateUrl: 'app/osago/finish.html',
                            controller: 'nepereplaty.osago.OSAGOFinishController',
                            controllerAs: 'osagoFinishCtrl'
                        }
                    }
                })
                    .state('casco.offer', {
                    url: '/offer',
                    views: {
                        '@': {
                            templateUrl: 'app/casco/offer.html',
                            controller: 'nepereplaty.casco.CASCOOfferController',
                            controllerAs: 'cascoOfferCtrl'
                        }
                    }
                })
                    .state('casco.details', {
                    url: '/details',
                    views: {
                        '@': {
                            templateUrl: 'app/casco/details.html',
                            controller: 'nepereplaty.casco.CASCODetailsController',
                            controllerAs: 'cascoDetailsCtrl'
                        }
                    }
                })
                    .state('casco.payment', {
                    url: '/payment',
                    views: {
                        '@': {
                            templateUrl: 'app/casco/payment.html',
                            controller: 'nepereplaty.casco.CASCOPaymentController',
                            controllerAs: 'cascoPaymentCtrl'
                        }
                    }
                })
                    .state('casco.finish', {
                    url: '/finish',
                    views: {
                        '@': {
                            templateUrl: 'app/casco/finish.html',
                            controller: 'nepereplaty.casco.CASCOFinishController',
                            controllerAs: 'cascoFinishCtrl'
                        }
                    }
                })
                    .state('house', {
                    url: '/house',
                    templateUrl: 'app/house/house.html',
                    controller: 'nepereplaty.house.HOUSEController',
                    controllerAs: 'houseCtrl'
                })
                    .state('house.offer', {
                    url: '/offer',
                    views: {
                        '@': {
                            templateUrl: 'app/house/offer.html',
                            controller: 'nepereplaty.house.HOUSEOfferController',
                            controllerAs: 'houseOfferCtrl'
                        }
                    }
                })
                    .state('house.compare', {
                    url: '/compare',
                    views: {
                        '@': {
                            templateUrl: 'app/house/compare.html',
                            controller: 'nepereplaty.house.HOUSECompareController',
                            controllerAs: 'houseCompareCtrl'
                        }
                    }
                })
                    .state('house.details', {
                    url: '/details',
                    views: {
                        '@': {
                            templateUrl: 'app/house/details.html',
                            controller: 'nepereplaty.house.HOUSEDetailsController',
                            controllerAs: 'houseDetailsCtrl'
                        }
                    }
                })
                    .state('house.payment', {
                    url: '/payment',
                    views: {
                        '@': {
                            templateUrl: 'app/house/payment.html',
                            controller: 'nepereplaty.house.HOUSEPaymentController',
                            controllerAs: 'housePaymentCtrl'
                        }
                    }
                })
                    .state('house.finish', {
                    url: '/finish',
                    views: {
                        '@': {
                            templateUrl: 'app/house/finish.html',
                            controller: 'nepereplaty.house.HOUSEFinishController',
                            controllerAs: 'houseFinishCtrl'
                        }
                    }
                })
                    .state('apartment', {
                    url: '/apartment',
                    templateUrl: 'app/apartment/apartment.html',
                    controller: 'nepereplaty.apartment.APARTMENTController',
                    controllerAs: 'apartmentCtrl'
                })
                    .state('apartment.offer', {
                    url: '/offer',
                    views: {
                        '@': {
                            templateUrl: 'app/apartment/offer.html',
                            controller: 'nepereplaty.apartment.APARTMENTOfferController',
                            controllerAs: 'apartmentOfferCtrl'
                        }
                    }
                })
                    .state('apartment.compare', {
                    url: '/compare',
                    views: {
                        '@': {
                            templateUrl: 'app/apartment/compare.html',
                            controller: 'nepereplaty.apartment.APARTMENTCompareController',
                            controllerAs: 'apartmentCompareCtrl'
                        }
                    }
                })
                    .state('apartment.details', {
                    url: '/details',
                    views: {
                        '@': {
                            templateUrl: 'app/apartment/details.html',
                            controller: 'nepereplaty.apartment.APARTMENTDetailsController',
                            controllerAs: 'apartmentDetailsCtrl'
                        }
                    }
                })
                    .state('apartment.payment', {
                    url: '/payment',
                    views: {
                        '@': {
                            templateUrl: 'app/apartment/payment.html',
                            controller: 'nepereplaty.apartment.APARTMENTPaymentController',
                            controllerAs: 'apartmentPaymentCtrl'
                        }
                    }
                })
                    .state('apartment.finish', {
                    url: '/finish',
                    views: {
                        '@': {
                            templateUrl: 'app/apartment/finish.html',
                            controller: 'nepereplaty.apartment.APARTMENTFinishController',
                            controllerAs: 'apartmentFinishCtrl'
                        }
                    }
                })
                    .state('traveling.offer', {
                    url: '/offer',
                    views: {
                        '@': {
                            templateUrl: 'app/traveling/offer.html',
                            controller: 'nepereplaty.traveling.TRAVELINGOfferController',
                            controllerAs: 'travelingtOfferCtrl'
                        }
                    }
                })
                    .state('traveling.compare', {
                    url: '/compare',
                    views: {
                        '@': {
                            templateUrl: 'app/traveling/compare.html',
                            controller: 'nepereplaty.traveling.TRAVELINGCompareController',
                            controllerAs: 'travelingCompareCtrl'
                        }
                    }
                })
                    .state('traveling.details', {
                    url: '/details',
                    views: {
                        '@': {
                            templateUrl: 'app/traveling/details.html',
                            controller: 'nepereplaty.traveling.TRAVELINGDetailsController',
                            controllerAs: 'travelingDetailsCtrl'
                        }
                    }
                })
                    .state('traveling.payment', {
                    url: '/payment',
                    views: {
                        '@': {
                            templateUrl: 'app/traveling/payment.html',
                            controller: 'nepereplaty.traveling.TRAVELINGPaymentController',
                            controllerAs: 'travelingPaymentCtrl'
                        }
                    }
                })
                    .state('traveling.finish', {
                    url: '/finish',
                    views: {
                        '@': {
                            templateUrl: 'app/traveling/finish.html',
                            controller: 'nepereplaty.traveling.TRAVELINGFinishController',
                            controllerAs: 'travelingFinishCtrl'
                        }
                    }
                })
                    .state('accident', {
                    url: '/accident',
                    templateUrl: 'app/accident/accident.html',
                    controller: 'nepereplaty.accident.ACCIDENTController',
                    controllerAs: 'accidentCtrl'
                })
                    .state('accident.offer', {
                    url: '/offer',
                    views: {
                        '@': {
                            templateUrl: 'app/accident/offer.html',
                            controller: 'nepereplaty.accident.ACCIDENTOfferController',
                            controllerAs: 'accidentOfferCtrl'
                        }
                    }
                })
                    .state('accident.compare', {
                    url: '/compare',
                    views: {
                        '@': {
                            templateUrl: 'app/accident/compare.html',
                            controller: 'nepereplaty.accident.ACCIDENTCompareController',
                            controllerAs: 'accidentCompareCtrl'
                        }
                    }
                })
                    .state('accident.details', {
                    url: '/details',
                    views: {
                        '@': {
                            templateUrl: 'app/accident/details.html',
                            controller: 'nepereplaty.accident.ACCIDENTDetailsController',
                            controllerAs: 'accidentDetailsCtrl'
                        }
                    }
                })
                    .state('accident.payment', {
                    url: '/payment',
                    views: {
                        '@': {
                            templateUrl: 'app/accident/payment.html',
                            controller: 'nepereplaty.accident.ACCIDENTPaymentController',
                            controllerAs: 'accidentPaymentCtrl'
                        }
                    }
                })
                    .state('accident.finish', {
                    url: '/finish',
                    views: {
                        '@': {
                            templateUrl: 'app/accident/finish.html',
                            controller: 'nepereplaty.accident.ACCIDENTFinishController',
                            controllerAs: 'accidentFinishCtrl'
                        }
                    }
                })
                    .state('account', {
                    url: '/account',
                    templateUrl: 'app/account/account.html',
                    controller: 'nepereplaty.account.AccountController',
                    controllerAs: 'accountCtrl'
                });
                $locationProvider.html5Mode(true);
            };
            Routes.$inject = ['$stateProvider', '$urlRouterProvider'];
            return Routes;
        })();
        config.Routes = Routes;
        angular.module('nepereplaty').config(Routes.configureRoutes);
    })(config = nepereplaty.config || (nepereplaty.config = {}));
})(nepereplaty || (nepereplaty = {}));
/* App definitions */
/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../typings/angularjs/angular-cookies.d.ts" />
/// <reference path="../../typings/angularjs/angular-sanitize.d.ts" />
/// <reference path="../../typings/angular-translate/angular-translate.d.ts" />
/// <reference path="../../typings/angular-ui-router/angular-ui-router.d.ts" />
/// <reference path="../../typings/angularjs/angular-mocks.d.ts" />
/// <reference path="../../typings/jquery/jquery.d.ts" />
/* App initialization */
/// <reference path="init.ts" />
/* App components */
/// <reference path="auth/auth.service.ts" />
/// <reference path="auth/auth.controller.ts" />
/// <reference path="auth/login.controller.ts" />
/// <reference path="auth/register.controller.ts" />
/// <reference path="loading/loading.controller.ts" />
/// <reference path="account/account.service.ts" />
/// <reference path="account/account.controller.ts" />
/// <reference path="home/home.controller.ts" />
/// <reference path="home/carmodal.controller.ts" />
/// <reference path="home/appartment.controller.ts" />
/// <reference path="home/health.controller.ts" />
/// <reference path="osago/osago.service.ts" />
/// <reference path="osago/osago.controller.ts" />
/// <reference path="osago/osagoOffer.controller.ts" />
/// <reference path="osago/osagoDetails.controller.ts" />
/// <reference path="osago/osagoPaymeny.controller.ts" />
/// <reference path="osago/osagoFinish.controller.ts" />
/// <reference path="casco/casco.service.ts" />
/// <reference path="casco/casco.controller.ts" />
/// <reference path="casco/cascoOffer.controller.ts" />
/// <reference path="casco/cascoCompare.controller.ts" />
/// <reference path="casco/cascoDetails.controller.ts" />
/// <reference path="casco/cascoPaymeny.controller.ts" />
/// <reference path="casco/cascoFinish.controller.ts" />
/// <reference path="house/house.controller.ts" />
/// <reference path="house/house.service.ts" />
/// <reference path="house/houseOffer.controller.ts" />
/// <reference path="house/houseCompare.controller.ts" />
/// <reference path="house/houseDetails.controller.ts" />
/// <reference path="house/housePaymeny.controller.ts" />
/// <reference path="house/houseFinish.controller.ts" />
/// <reference path="apartment/apartment.controller.ts" />
/// <reference path="apartment/apartment.service.ts" />
/// <reference path="apartment/apartmentOffer.controller.ts" />
/// <reference path="apartment/apartmentCompare.controller.ts" />
/// <reference path="apartment/apartmentDetails.controller.ts" />
/// <reference path="apartment/apartmentPaymeny.controller.ts" />
/// <reference path="apartment/apartmentFinish.controller.ts" />
/// <reference path="traveling/traveling.controller.ts" />
/// <reference path="traveling/traveling.service.ts" />
/// <reference path="traveling/travelingOffer.controller.ts" />
/// <reference path="traveling/travelingCompare.controller.ts" />
/// <reference path="traveling/travelingDetails.controller.ts" />
/// <reference path="traveling/travelingPaymeny.controller.ts" />
/// <reference path="traveling/travelingFinish.controller.ts" />
/// <reference path="accident/accident.controller.ts" />
/// <reference path="accident/accident.service.ts" />
/// <reference path="accident/accidentOffer.controller.ts" />
/// <reference path="accident/accidentCompare.controller.ts" />
/// <reference path="accident/accidentDetails.controller.ts" />
/// <reference path="accident/accidentPaymeny.controller.ts" />
/// <reference path="accident/accidentFinish.controller.ts" />
/// <reference path="config.ts" />
/// <reference path="routes.ts" /> 
