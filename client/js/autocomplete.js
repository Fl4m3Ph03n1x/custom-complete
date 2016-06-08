/*global angular*/

"use strict";
angular.module('MyApp', ['ngMaterial', 'ngMessages', 'material.svgAssetsCache', 'ngMdIcons']).controller('DemoCtrl', DemoCtrl);

function DemoCtrl($q, $log, $http) {

    this.searchText = null;

    this.querySearch = function(query) {
        let serverUrl = '//custom-material-autocomplete-fl4m3ph03n1x.c9users.io/getClients';
        let deferred = $q.defer();
        $http({
            method: 'GET',
            url: serverUrl,
            params: {
                word: query
            }

        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            $log.error(response);
        });

        return deferred.promise;
    };

    this.searchTextChange = function(text) {
        $log.info('Text changed to ' + text);
    }

    this.selectedItemChange = function(item) {
        $log.info('Item changed to ' + JSON.stringify(item));
    }
}