$(document).ready(function() {

  var server = io.connect(location.protocol + '//' + location.host); 

  $('#popBtn').on('click', function() {
    server.emit('messages-pop', "get");
  });

  $('#pushBtn').on('click', function() {
    var msg = $('#text').val();
    server.emit('messages-push', msg);
  });

  server.on('messages', function (data) {
    if (data != null) $('#messages').prepend("<p>" + data + "</p>");
  });
});
