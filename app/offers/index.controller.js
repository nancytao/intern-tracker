(function() {
    'use strict'; //makes JS almost have rules lol

    angular
        .module('app')
        .controller('Offers.IndexController', Controller, ['$scope',
            function($scope) {
                $scope.offers = [
                    {
                        company: 'Google',
                        payrate: '30',
                        location: 'Boston, MA',
                        replyby: '2016-10-24',
                        role: 'Project Management Intern'
                    },
                    {
                        company: 'Bloomberg',
                        payrate: '25',
                        location: 'New York, NY',
                        replyby: '2016-10-21',
                        role: 'Software Engineer Intern'
                    },
                    {
                        company: 'Northrop Grumman',
                        payrate: '32',
                        location: 'McLean, VA',
                        replyby: '2016-09-30',
                        role: 'Security Intern'
                    },
                    {
                        company: 'ADP',
                        payrate: '27',
                        location: 'Alpharetta, GA',
                        replyby: '2016-10-14',
                        role: 'Software Engineer Intern'
                    }
                ];
            }]);

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