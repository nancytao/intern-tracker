(function() {
    'use strict'; //makes JS almost have rules

    angular
        .module('app')
        .controller('Internships.IndexController', Controller);

    function Controller($window, UserService, FlashService) {
        var vm = this;
        vm.user = null;
        vm.saveInternships = saveInternships;

        initController();

        function initController() {
            //get current user
            UserService.GetCurrent().then(function(user) {
                vm.user = user;
                user.internships = {};
                user.internships.test = {};
                user.internships.test.name = 'Googel';
                user.internships.test.recruiter = 'Dat Boi';
            });
        }

        function saveInternships() {
        	UserService.Update(vm.user)
        		.then(function() {
        			FlashService.Success('Internships updated');
        		})
        		.catch(function (error) {
        			FlashService.Error(error);
        		});
        }
    }
})();