(function() {
    'use strict'; //makes JS almost have rules lol

    angular
        .module('app')
        .controller('Offers.IndexController', Controller);

    function Controller($window, UserService, FlashService) {
        var vm = this;
        vm.user = null;
        vm.saveOffers = saveOffers;
        vm.rejectOffer = rejectOffer;
        vm.getLocations = getLocations;
        vm.internshipList = [];
        vm.sortType = 'companyName';


        initController();

        function initController() {
            UserService.GetCurrent().then(function(user) {
                vm.user = user;
                for (var internship in user.internships) {
                    vm.internshipList.push(user.internships[internship]);
                }
                console.log(internshipList);
            });
        }

        function saveOffers() {
            UserService.Update(vm.user)
                .then(function() {
                    FlashService.Success('Internships updated');
                })
                .catch(function (err) {
                    FlashService.Error(err);
                });
        }

        function rejectOffer(internshipId) {
            vm.internshipList.splice(vm.internshipList.indexOf(vm.user.internships[internshipId]), 1);
            vm.user.internships[internshipId].status = 'Declined';
            UserService.Update(vm.user)
                .then(function() {
                    FlashService.Success('Offer declined');
                })
                .catch(function (err) {
                    FlashService.Error(err);
                });
        }

        function getLocations() {
            var counter = 1;
            var string = 'http://maps.googleapis.com/maps/api/staticmap?size=800x600&maptype=roadmap&key=AIzaSyDodM8wUpuA2CAd6Fa1CEC0Drgv1vxsztM&format=png&visual_refresh=true';


            for (var key in vm.user.internships) {
                if (!vm.user.internships.hasOwnProperty(key)) {
                    continue;
                }

                var obj = vm.user.internships[key];
                for (var prop in obj) {
                    if (obj[prop] == "Offered") {
                        string += '&markers=size:mid%7Ccolor:0xff0000%7Clabel:' + counter + '%7C' + obj['location'].replace(/ /g, '+');
                        counter++;
                    }
                }
            }

            console.log(string);
            return string;
        }
    }
})();