/// setups

// setup express
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser()); // to support http post
app.use(express.static(__dirname + '/public'));


var io = require('socket.io')

// setup redis
var redis = require('redis');
var redisClient = redis.createClient();
var MESSAGE_QUEUE_NAME = "messages";

/// fifo queue

// given a msg push it to the fifo queue, call cb with err and reply
qPush = function(msg, cb) {
  redisClient.rpush(MESSAGE_QUEUE_NAME, msg, function(err, reply) {
    cb(err, reply);
  });
};

// pop a message from the fifo queue, call cb with err and reply
// if no errors, the reply is the message
qPop = function(cb) {
  redisClient.lpop(MESSAGE_QUEUE_NAME, function(err, reply) {
    cb(err, reply);
  });
};

/// actions & routes

// Push action
// post, expect the body to have 'msg' key
// saves the msg in a queue
var pushAction = function(req, res) {
  qPush(req.body.msg, function(err, reply){
    res.send("ok");
  });
};

// Pop action
// get, send the first message in queue
var popAction = function(req, res) {
  qPop(function(err, reply) {
    res.send(reply);
  });
};


// routes
app.post('/push', pushAction); 
app.get('/pop', popAction); 

/// start server
var server = app.listen(8080, function() {
    console.log('Listening on port %d', server.address().port);
});

/// Socket.IO
var socket = io.listen(server);

socket.on('connection', function (client){
  console.log('socket connected!');

  client.on('messages-pop', function (data) {
    console.log('socket, pop:' + data);
    qPop(function(err, reply) {
      console.log('sending:' + reply);
      client.emit('messages', reply);
    });
  });

  client.on('messages-push', function (data) {
    console.log('socket, push:' + data);
    qPush(data, function(err, reply) {
    });
  });
});



