import express = require("express");
import fs = require('fs');

var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '../browser'));

// views is directory for all template files
// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');

app.get('/', (req, res) =>  {
  res.end('hello');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});