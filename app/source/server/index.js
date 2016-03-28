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

let _port = process.env.PORT || configProvider.get('appServer:port');

logger.info(`app port: ${_port}`);

let app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.post('/api/login', function (req, res, next) {
    logger.info(req.body);
    res.status(200).send({
        result: 'ok',
        action: 'login'
    });
    next();
});

app.post('/api/register', function (req, res, next) {
    logger.info(req.body);
    res.status(200).send({
        result: 'ok',
        action: 'register'
    });
    next();
})

app.use(express.static(__dirname + '/../browser'));

if (app.get('env') == 'development') {
    app.use(errorhandler());    
} else {
    app.use(function(err, req, res, next) {
        logger.error('unhandled error', err)
        res.status(500).send('server error');
    });
}


app.listen(_port, function() {
    console.log('server | port listening:', _port);
});

let User = require('./db/models/user');
User.find({}, function(err, res) {
    console.log(res[0].getId());
});

