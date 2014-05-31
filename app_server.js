// setup: express, public as static dir, routes
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser()); // to support http post
app.use(express.static(__dirname + '/public'));

module.exports = app;
