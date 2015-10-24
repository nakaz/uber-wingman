var express = require('express');
var app     = express();

app.get('/', function(req, res){
  res.send('hellow world');
});

app.listen(process.env.PORT || 8080, function(){
  console.log('Server is listening on port', process.env.PORT || 8080);
});