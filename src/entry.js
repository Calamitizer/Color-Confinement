//(function() {
    'use strict';

    var app = {
        initialize: function() {
            this.bindEvents();
        },
        bindEvents: function() {
            document.addEventListener('deviceready', this.onDeviceReady, true);
        },
        onDeviceReady: function() {
            angular.element(document).ready(function() {
                angular.bootstrap(document);
            })
        }
    };

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
        .config(compileConfig);

    compileConfig.$inject = [
        '$compileProvider'
    ];

    function compileConfig($compileProvider) {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
    }

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

    app.initialize();
//}());
