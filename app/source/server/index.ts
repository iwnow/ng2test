import express = require('express');
import fs = require('fs');

var app = express();

app.set('port', (process.env.PORT || 5000));

// views is directory for all template files
// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/../browser'));

app.all('*', (req, res, next) =>  {
  fs.readFile(__dirname + '/../browser/index.html', (e, data) => {
      if (e) {
        res.end(e.message);  
      }
      else {
         res.end(data); 
      }      
      
  });
});



app.listen(app.get('port'), function() {
  console.log('server start app: ', app.get('port'));
});