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

        initController();

        function initController() {
            UserService.GetCurrent().then(function(user) {
                vm.user = user;
                if (!user.offers) {
                    user.offers = {};
                    user.offerID = 0;
                }
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
            vm.user.internships[internshipId].status = 'Declined Offer';
            UserService.Update(vm.user)
                .then(function() {
                    FlashService.Success('Offer declined');
                })
                .catch(function (err) {
                    FlashService.Error(err);
                });
        }

        function deleteOffer(offerId) {
            delete vm.user.offers[offerId];
            UserService.Update(vm.user)
                .then(function() {
                    FlashService.Success('Internship deleted');
                })
                .catch(function (err) {
                    FlashService.Error(err);
                });
        }
    }
})();