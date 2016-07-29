(function() {
    'use strict';

    var angular = require('angular');
    var Promise = require('bluebird');
    require('angular-route');

    console.log('past req');

    var app = {
        initialize: function() {
            if (typeof window.cordova === 'object') {
                this.bindEvents();
            } else {
                this.onDeviceReady();
            }
        },
        bindEvents: function() {
            document.addEventListener('deviceready', this.onDeviceReady, true);
        },
        onDeviceReady: function() {
            angular.element(document).ready(function() {
                console.log('bootstrapping');
                angular.bootstrap(document, ['cc']);
            })
        }
    };

    angular
        .module('cc', [
            'ngRoute',
            'cc.view',
            'cc.puzzle',
            'cc.color'
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
                templateUrl: 'views/main.html',
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
        .module('cc.view', []);

    angular
        .module('cc.view')
        .controller('FrameCtrl', FrameCtrl);

    FrameCtrl.$inject = [];

    function FrameCtrl() {
        var frameCtrl = this;
        frameCtrl.tagline = 'foo!';
    }


    /***********************************************************
     ***********************************************************/

    angular
        .module('cc.puzzle', [
            'cc.color'
        ]);

    angular
        .module('cc.puzzle')
        .factory('tileFactory', tileFactory);

    tileFactory.$inject = [
        'addMatch',
        //'puzzleData'
    ];





    function tileFactory(addMatch) {
        var Tile = function(params) {
            this.position = params.position;
            this.number = params.number;
            this.color = params.color;

            this.prevPosition = null;
        };

        Tile.prototype.updatePosition = function(newPosition) {
            this.prevPosition = this.position;
            this.position = newPosition;
        };

        addMatch(Tile);

        var build = function(params) {
            var tile = new Tile(params);
            //puzzleData.registerTile(tile);
            return tile;
        };

        return {
            build: build
        };
    }

    /*******************************************************
     *******************************************************/

    angular
        .module('cc.color', []);

    angular
        .module('cc.color')
        .constant('colorDefs', {
            K: [0, 0, 1],
            R: [1, 0, 0],
            G: [0, 1, 0],
            B: [0, 0, 1],
            C: [0, 1, 1],
            M: [1, 0, 1],
            Y: [1, 1, 0],
            W: [1, 1, 1]
        });

    angular
        .module('cc.color')
        .factory('colorFactory', colorFactory);

    colorFactory.$inject = [
        'addMatch'
    ];

    function colorFactory(addMatch) {
        var Color = function(triplet) {
            this.triplet = triplet;
            this.r = triplet[0];
            this.g = triplet[1];
            this.b = triplet[2];
        };

        addMatch(Color)

        var build = function(triplet) {
            return new Color(triplet);
        };

        return {
            build: build
        };
    }

    angular
        .module('cc.color')
        .factory('addMatch', addMatch);

    addMatch.$inject = [];

    function addMatch() {
        var getTriplet = function(obj) {
            var triplet;
            if (obj.hasOwnProperty('triplet')) {
                triplet = obj.triplet;
            } else if (obj.hasOwnProperty('color')) {
                triplet = obj.color.triplet;
            } else {
                console.log(new TypeError('Tried to match color with ' + obj));
            }
            return triplet;
        };

        var match = function(rhs) {
            var leftTriplet = getTriplet(this);
            var rightTriplet = getTriplet(rhs);
            return [0, 1, 2].every(function(i) {
                return leftTriplet[i] >= rightTriplet[i];
            });
        };

        var add = function(constructor) {
            constructor.match = match;
        };

        return add;
    }

    angular
        .module('cc.color')
        .factory('palette', palette);

    palette.$inject = [
        'colorDefs',
        'colorFactory'
    ];

    function palette(colorDefs, colorFactory) {
        var all = {};

        for (var color in colorDefs) {
            all[key] = colorFactory.build(colorDefs[key]);
        }

        var tileColors = [
            all.R,
            all.G,
            all.B
        ];

        var cursorColors = [
            all.C,
            all.M,
            all.Y
        ];
    }




















    app.initialize();
}());
