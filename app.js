// setup express
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser()); // to support http post

// setup redis
var redis = require('redis');
var client = redis.createClient();
var MESSAGE_QUEUE_NAME = "messages";


// Actions
var pushAction = function(req, res) {
  client.rpush(MESSAGE_QUEUE_NAME, req.body.msg, function(err, reply) {
    res.send("ok");
  });
};

var popAction = function(req, res) {
  client.lpop(MESSAGE_QUEUE_NAME, function(err, reply) {
    res.send(reply);
  });
};


// routes
app.post('/push', pushAction); 
app.get('/pop', popAction); 


// start server
var server = app.listen(8080, function() {
    console.log('Listening on port %d', server.address().port);
});
