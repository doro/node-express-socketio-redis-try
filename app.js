/// setups
var app   = require('./app_server');
var fifo  = require('./fifo');
var io    = require('socket.io');

/// actions & routes

// Push action
// post, expect the body to have 'msg' key
// saves the msg in a queue
var pushAction = function(req, res) {
  fifo.push(req.body.msg, function(err, reply){
    res.send("ok");
  });
};

// Pop action
// get, send the first message in queue
var popAction = function(req, res) {
  fifo.pop(function(err, reply) {
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

    fifo.pop(function(err, reply) {
      console.log('sending:' + reply);
      client.emit('messages', reply);
    });
  });

  client.on('messages-push', function (data) {
    console.log('socket, push:' + data);
    fifo.push(data, function(err, reply) {
    });
  });

});
