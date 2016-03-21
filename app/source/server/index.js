/// <reference path="../../../typings/tsd.d.ts" />
'use strict';
let express = require('express');
let events = require('events');
let url = require('url');
let errorhandler = require('errorhandler');
let morgan = require('morgan');
let bodyParser = require('body-parser');

let configProvider = require('./config/config');
let logger = require('./logger/log')(module);

let db = require('./db/createDb');

let _port = process.env.PORT || configProvider.get('appServer:port');

logger.info(`app port: ${_port}`);

let app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());


app.use(express.static(__dirname + '/../browser'));

app.use((err, req, res, next) => {
    logger.error(err);
    res.status(500).send('error server :( ');
});

if (app.get('env') == 'development') {
    app.use(errorhandler());    
} else {
    app.use((err, req, res, next) => {
        logger.error('unhandled error', err)
        res.status(500).send('server error');
    });
}


app.listen(_port, function() {
    console.log('server | port listening:', _port);
});