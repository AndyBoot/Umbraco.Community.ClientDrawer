(function () {
    'use strict';

    angular.module('umbraco.services')
        .factory('clientDrawerService', function ($http) {
            var service = {};

            service.getData = function () {
                return $http.get('/umbraco/clientdrawer/data/getdata')
                    .then(function (response) {
                        return response.data;
                    });
            };

            service.getHeaderActionData = function () {
                return $http.get('/umbraco/clientdrawer/data/getheaderactiondata')
                    .then(function (response) {
                        return response.data;
                    });
            };

            return service;
        });
})();