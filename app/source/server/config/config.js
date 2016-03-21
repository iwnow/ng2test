/// <reference path="../../../../typings/tsd.d.ts" />
'use strict';
let nconf = require('nconf');
let path = require('path');

module.exports = nconf.argv().env().file(path.join(__dirname, 'config.json'));
