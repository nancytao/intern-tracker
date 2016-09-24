(function() {
    'use strict'; //makes JS almost have rules

    angular
        .module('app')
        .controller('Discover.IndexController', Controller);

    function Controller($window, $q, $log, $timeout, UserService, FlashService) {
        var vm = this;
        vm.user = null;
        vm.saveInternships = saveInternships;

        initController();

        function initController() {
            UserService.GetCurrent().then(function(user) {
                vm.user = user;
                user.internships = {};
                user.internships.test = {};
                user.internships.test.name = 'Googel';
                user.internships.test.recruiter = 'Dat Boi';
            });
        }
    }
})();
