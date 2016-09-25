(function() {
	'use strict'; //don't do dumb stuff

	angular
		.module('app')
		.controller('Calendar.IndexController', Controller);

	function Controller(UserService) {
		var vm = this;
		vm.user = null;

		initController();

		function initController() {
			//get current user
			UserService.GetCurrent().then(function(user) {
				vm.user = user;
			});
		}
	}
})();