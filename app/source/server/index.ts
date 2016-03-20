/// <reference path="../../../typings/tsd.d.ts" />

import express = require('express');
import events = require('events');
import _url = require('url');
import eh = require('errorhandler');

import {configProvider} from './config/config';
import {loggerFabric} from './logger/log';

let logger = loggerFabric(module);
let _port = process.env.PORT || configProvider.get('appServer:port');

logger.info(`app port: ${_port}`);

let app = express();

app.use(express.static(__dirname + '/../browser'));

if (app.get('env') == 'development') {
    app.use(eh());    
} else {
    app.use(function (err, req, res, next) {
        logger.error('unhandled error', err)
        res.status(500).send('server error');
    })
}


app.listen(_port, function() {
    console.log('server | port listening:', _port);
});


// 

// app.use((err, req, res) => {
//     console.log(err);
// });

