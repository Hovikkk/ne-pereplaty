/// <reference path="app.ts" />

module admin.config {
	
	export class Language {
				
        // @ngInject
        static configureLang($translateProvider: angular.translate.ITranslateProvider) {
			$translateProvider.useStaticFilesLoader({
				prefix: 'lang/',
				suffix: '.json'
			});
			$translateProvider.preferredLanguage('pl_pl');
			$translateProvider.useSanitizeValueStrategy('sanitize');
			
			console.log('Language configured!');
        }
		
	}
	
    angular.module('admin').config(Language.configureLang);
	
}