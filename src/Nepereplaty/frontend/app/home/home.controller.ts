/// <reference path="../app.ts" />

module nepereplaty.home {
	
    export class HomeController {
		
		constructor(private $state: angular.ui.IStateService,
                    private $scope: angular.IScope,
                    private $rootScope: any,
                    private ModalService: any) {
            this.$rootScope.showFooter = false;
        }

        carModal(): void {
            this.$rootScope.isModalShown = true;
            this.ModalService.showModal({
                templateUrl: 'app/home/car.modal.html',
                controller: 'CarModalController',
                controllerAs: 'carModalCtrl',
                inputs: {
                }
            }).then((modal): void => {
                modal.close.then((result: string): void => {
                    if (result === 'casco') {
                        this.$state.go('casco');
                    }
                    if (result === 'osago') {
                        this.$state.go('osago');
                    }
                    this.$rootScope.isModalShown = false;
                    
                    // Reset user password
                    //this.credentials.password = '';
                });
            });
        }

        gotoTraveling(): void {
            this.$state.go('traveling');
        }
        appartment(): void {
            this.$rootScope.isModalShown = true;
            this.ModalService.showModal({
                templateUrl: 'app/home/appartment.modal.html',
                controller: 'AppartmentController',
                controllerAs: 'appartmentCtrl',
                inputs: {
                }
            }).then((modal): void => {
                modal.close.then((result: string): void => {
                    if (result === 'house') {
                        this.$state.go('house');
                    }
                    if (result === 'apartment') {
                        this.$state.go('apartment');
                    }
                    this.$rootScope.isModalShown = false;
                    
                    // Reset user password
                    //this.credentials.password = '';
                });
            });
        }
        health(): void {
            this.$rootScope.isModalShown = true;
            this.ModalService.showModal({
                templateUrl: 'app/home/health.modal.html',
                controller: 'HealthController',
                controllerAs: 'healthCtrl',
                inputs: {
                }
            }).then((modal): void => {
                modal.close.then((result: string): void => {
                    if (result === 'accident') {
                        this.$state.go('accident');
                    }
                    if (result === 'medical') {
                        this.$state.go('medical');
                    }
                    this.$rootScope.isModalShown = false;
                    
                    // Reset user password
                    //this.credentials.password = '';
                });
            });
        }
	}
	
    angular.module('nepereplaty').controller('nepereplaty.home.HomeController', HomeController);
	
}