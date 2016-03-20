/// <reference path="../../../../typings/tsd.d.ts" />

import nconf = require('nconf');
import path = require('path');

export
let configProvider = 
    nconf.argv().env().file(path.join(__dirname, 'config.json'));
