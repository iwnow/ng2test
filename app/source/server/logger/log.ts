/// <reference path="../../../../typings/tsd.d.ts" />

import winston = require('winston');

let env =process.env.NODE_ENV;

export function loggerFabric(module: NodeModule) {
    
    let separator = process.platform.indexOf('win') > -1 ? '\\' : '/';
    let path = module.filename.split(separator).slice(-2).join(separator);
    
    return new winston.Logger({
        transports: [
            new winston.transports.Console({
                colorize: true,
                level: env == 'development' ? 'debug' : 'error',
                label: path
            })
        ]
    });
}