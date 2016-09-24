(function() {
	'use strict';

	angular
		.module('app', ['ui.router', 'ngMaterial'])

		.config(config)
		.run(run);

	function config($stateProvider, $urlRouterProvider) {
		//default route
		$urlRouterProvider.otherwise("/");

		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: 'home/index.html',
				controller: 'Home.IndexController',
				controllerAs: 'vm',
				data: { activeTab: 'home' }
			})
			.state('account', {
				url: '/account',
				templateUrl: 'account/index.html',
				controller: 'Account.IndexController',
				controllerAs: 'vm',
				data: { activeTab: 'account' }
			})
			.state('internships', {
				url: '/internships',
				templateUrl: 'internships/index.html',
				controller: 'Internships.IndexController',
				controllerAs : 'vm',
				data: { activeTab: 'internships' }
			});
	}
	function run($http, $rootScope, $window) {
		// add JWT token as default auth header
		$http.defaults.headers.common['Authorization'] = 'Bearer ' + $window.jwtToken;

		//update active tab on state change
		$rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
			$rootScope.activeTab = toState.data.activeTab;
		});
	}
	$(function () {
		// get JWT token from server
		$.get('/app/token', function(token) {
			window.jwtToken = token;
			angular.bootstrap(document, ['app']);
		});
	});
})();