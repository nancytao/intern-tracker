(function() {
    'use strict'; //makes JS almost have rules

    angular
        .module('app')
        .controller('Internships.IndexController', Controller);

    function Controller($window, $q, $log, $timeout, UserService, FlashService) {
        var vm = this;
        vm.user = null;
        vm.saveInternships = saveInternships;
        vm.deleteInternship = deleteInternship;
        vm.addInternship = addInternship;

        initController();

        function initController() {
            UserService.GetCurrent().then(function(user) {
                vm.user = user;
                if (!user.internships) {
                	user.internships = {};
                	user.internshipCount = 0;
                }
            });
        }

        function addInternship() {
        	vm.user.internships[vm.user.internshipCount] = {}
        	vm.user.internships[vm.user.internshipCount].id = vm.user.internshipCount;
        	vm.user.internships[vm.user.internshipCount].companyName = null;
        	vm.user.internships[vm.user.internshipCount].role = null;
        	vm.user.internships[vm.user.internshipCount].recruiter = null;
        	vm.user.internships[vm.user.internshipCount].location = null;
            vm.user.internships[vm.user.internshipCount].openDate = null;
            vm.user.internships[vm.user.internshipCount].closeDate = null;
        	vm.user.internships[vm.user.internshipCount].status = 'Pending';
            vm.user.internships[vm.user.internshipCount].payrate = null;
            vm.user.internships[vm.user.internshipCount].replyby = null;
        	vm.user.internshipCount++;
        	console.log(vm.user.internships);
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

        function deleteInternship(internshipId) {
        	delete vm.user.internships[internshipId];
        	UserService.Update(vm.user)
        		.then(function() {
        			FlashService.Success('Internship deleted');
        		})
        		.catch(function (error) {
        			FlashService.Error(error);
        		});
        }
    }
})();
