(function() {
    'use strict';

    /*
     * A simple static server used to test the app before mobile-specific tests.
     *
     */

    var express = require('express');
    var bodyParser = require('body-parser');
    var errorHandler = require('errorhandler');


    var hostname = process.env.HOSTNAME || 'localhost';
    var port = process.env.PORT || 3000;
    var publicDir = __dirname + '/dist';

    var cc = express();

    cc.get('/', function(req, res) {
        res.sendFile(publicDir + '/index.html');
    });

    cc.use(bodyParser.json());
    cc.use(bodyParser.urlencoded({
        extended: true
    }));
    cc.use(express.static(publicDir));
    cc.use(errorHandler({
        dumpExceptions: true,
        showStack: true
    }));

    console.log('Server showing %s listening at http://%s:%s', publicDir, hostname, port);
    cc.listen(port, hostname);











}());
