(function () {
    'use strict';

    angular
        .module('app')
        .factory('DiscoverService', Service);

    function Service($http, $q) {
        var service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByCompany = GetByCompany;


        return service;

        function GetAll() {
            return $http.get('/api/discover/').then(handleSuccess, handleError);
        }
        function GetById(_id) {
            return $http.get('/api/discover/' + _id).then(handleSuccess, handleError);
        }
        function GetByCompany(username) {
            return $http.get('/api/discover/' + username).then(handleSuccess, handleError);
        }

        //private functions

        function handleSuccess(res) {
            return res.data;
        }
        function handleError(res) {
            return $q.reject(res.data);
        }
    }
})();