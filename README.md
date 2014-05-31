node-express-socketio-redis-try
===============================

just a small attempt at creating socket.io &amp; rest endpoints over express/Node.js and doing something with redis

### end points: ###
* GET /pop
  remove a message from a fifo queue and return it.
* POST /push 
  insert a message in a fifo queue.
  expect the body to be a json with an "msg" key and value, the value is the message to insert.

### dependencies: ###
* a redis server

#### libraries: ####
* express
* body-parser
* redis
* socket.io

