(function() {
    'use strict';

    var angular = require('angular');
    var Promise = require('bluebird');
    require('angular-route');

    console.log('past req');

    angular
        .module('cc', [
            'ngRoute',
            'cc.view'
        ]);

    angular
        .module('cc')
        .config(routeConfig);

    routeConfig.$inject = [
        '$routeProvider'
    ];

    function routeConfig($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/views/main.html',
                controller: 'FrameCtrl',
                controllerAs: 'frameCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    }

    /***********************************************************
     ***********************************************************/

    angular
        .module('cc.view', [])
        .controller('FrameCtrl', FrameCtrl);

    FrameCtrl.$inject = [];

    function FrameCtrl() {
        var frameCtrl = this;
        frameCtrl.tagline = 'foo!';
    }

}());
