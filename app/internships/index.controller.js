(function() {
    'use strict'; //makes JS almost have rules

    angular
        .module('app')
        .controller('Internships.IndexController', Controller);

    function Controller($window, UserService, FlashService) {
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