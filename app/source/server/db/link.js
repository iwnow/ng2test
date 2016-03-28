/// <reference path="../../../../typings/tsd.d.ts" />
'use strict';
let logger = require('../logger/log')(module);
let mongoose = require('mongoose');
let config = require('../config/config');

let link = config.get('db:link');
let connectionString = config.get(`db:connectionStrings:${link}`);

logger.info(`database link: ${link} (${connectionString})`);

mongoose.connect(connectionString, null, function(err) {
    if (err)
        logger.error(err);
});

module.exports = mongoose;

    
