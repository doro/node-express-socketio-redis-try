$(document).ready(function() {

  var cbPop = function(msg) {
    if (msg != null) $('#messages').prepend("<p>" + msg + "</p>");
  };


  $('#popBtn').on('click', function() {
    server.pop();
  });

  $('#pushBtn').on('click', function() {
    var msg = $('#text').val();
    server.push(msg);
  });

  server.init(cbPop);

});



// abstract the server websocket api
// server shold be init before use
// it has 2 method: pop, push to send and get messages from the server
var server = {

  _server: null,
  _cbPop: null,

  // cbPop should recieve one param, which is the message poped
  init: function(cbPop) {
    server._server = io.connect(location.protocol + '//' + location.host)
    server._cbPop = cbPop;

    server._server.on('messages', function (data) {
      server._cbPop(data);
    });
  },

  
  push: function(msg) {
    server._server.emit('messages-push', msg);
  },
  
  pop: function() {
    server._server.emit('messages-pop', "get");
  }
  

};
