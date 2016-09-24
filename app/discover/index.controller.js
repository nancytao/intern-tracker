(function() {
    'use strict'; //makes JS almost have rules

    angular
        .module('app')
        .controller('Discover.IndexController', Controller);

    function Controller($window, $q, $log, $timeout, UserService, FlashService) {
        var vm = this;
        vm.user = null;

        vm.simulateQuery = false;
        vm.isDisabled = false;

        vm.querySearch = querySearch;
        vm.selectedItemChange = selectedItemChange;
        vm.searchTextChange = searchTextChange;

        vm.internships = loadAll();
        vm.newInternship = newInternship

        initController();

        function initController() {
            UserService.GetCurrent().then(function(user) {
                vm.user = user;
            });
        }

        function newInternship(internship) {
            alert("Sorry! You'll need to populate " + internship);
        }

        function querySearch(query) {
            var results = query ? vm.internships.filter(createFilterFor(query)) : vm.internships;
            if (vm.simulateQuery) {
                deferred = $q.defer();
                $timeout(function() { deferred.resolve( results ); },
                    Math.random() * 1000, false);
                return deferred.promise;
            } else {
                return results;
            }
        }

        function searchTextChange(text) {
            //$log.info('Text changed to ' + text);
        }

        function selectedItemChange(item) {
            //$log.info('Item changed to ' + JSON.stringify(item));
        }

        function loadAll() {
            var allInternships = 'Google, Microsoft, Amazon, Palantir, Fitbit, Dropbox, Quora, Pinterest';
            return allInternships.split(/, +/g).map( function (internship) {
                return {
                    value : internship.toLowerCase(),
                    display : internship
                };
            });
        }

        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);
            return function filterFn(internship) {
                return (internship.value.indexOf(lowercaseQuery) === 0);
            };

        }

    }
})();
