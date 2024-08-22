(function () {
    'use strict';

    angular.module('umbraco.services')
        .factory('clientDrawerService', function ($http) {
            var service = {};

            service.getData = function () {
                return $http.get('/umbraco/backoffice/clientdrawer/data/getdata')
                    .then(function (response) {
                        return response.data;
                    });
            };

            service.getHeaderActionData = function () {
                return $http.get('/umbraco/backoffice/clientdrawer/data/getheaderactiondata')
                    .then(function (response) {
                        return response.data;
                    });
            };

            return service;
        });
})();