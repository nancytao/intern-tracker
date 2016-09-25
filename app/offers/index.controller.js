(function() {
    'use strict'; //makes JS almost have rules lol

    angular
        .module('app')
        .controller('Offers.IndexController', Controller);

    function Controller($window, UserService, FlashService) {
        var vm = this;
        vm.user = null;
        vm.saveOffers = saveOffers;

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

        function addOffer() {
            vm.user.offers[vm.user.offerID] = {};
            vm.user.offers[vm.user.offerID].id = vm.user.offerID;
            vm.user.offers[vm.user.offerID].company = null;
            vm.user.offers[vm.user.offerID].role =  null;
            vm.user.offers[vm.user.offerID].payrate = null;
            vm.user.offers[vm.user.offerID].location = null;
            vm.user.offers[vm.user.offerID].replyby = null;
            vm.user.offerID++;
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