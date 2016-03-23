/// <reference path="../../../../typings/tsd.d.ts" />
'use strict';
let logger = require('../logger/log')(module);
let mongoClient = require('mongodb').MongoClient;

let config = require('../config/config');
let link = config.get('db:link');
let connectionString = config.get(`db:connectionStrings:${link}`);

logger.info(`database link: ${link} (${connectionString})`);

mongoClient.connect(connectionString)
    .then(db => {
        db.collection('test_users').count({}).then(n => logger.info(`count users: ${n}`));
        
    })
    .catch(e => {
       logger.error(e); 
    });
    
