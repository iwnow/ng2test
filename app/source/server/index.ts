/// <reference path="../../../typings/tsd.d.ts" />


import express = require('express');
import fs = require('fs');

var app = express();

app.set('port', (process.env.PORT || 5000));

// views is directory for all template files
// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');

// app.all('*', (req, res, next) =>  {
//   fs.readFile(__dirname + '/../browser/index.html', (e, data) => {
//       if (e) {
//         res.end(e.message);  
//       }
//       else {
//          res.end(data); 
//       }      
      
      
//   });
// });

app.use(express.static(__dirname + '/../browser'));

app.listen(app.get('port'), function() {
  console.log(' server | port listening:', app.get('port'));
});

async function g() {
    await delay(700);
}

async function delay(milliseconds: number) {
    return new Promise<void>(resolve => {
        setTimeout(resolve, milliseconds);
    });
}