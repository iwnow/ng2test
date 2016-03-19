/// <reference path="../../../typings/tsd.d.ts" />

import express = require('express');
import fs = require('fs');
import events = require('events');
import _url = require('url');

var app = express();

app.set('port', (process.env.PORT || 4444));

app.use(async (req, res, next) => {
    next();
});

app.use(express.static(__dirname + '/../browser'));

app.listen(app.get('port'), function() {
    console.log('server | port listening:', app.get('port'));
});


async function delay(ms:number) {
   return await new Promise((res) => {
       setTimeout(res, ms);
   });
}