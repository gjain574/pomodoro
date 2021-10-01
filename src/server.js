var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');

var app = express();
var http = require('http').Server(app);

// app.use(express.static(path.resolve(__dirname, '../client/dist')));
// app.use(express.static(path.resolve(__dirname, '../client/public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/', require('./routes/index.js'));

// run http server here
http.listen(3000, 'localhost', function(){
  console.log('listening on *:3000');
});

