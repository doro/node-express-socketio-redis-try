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


module.exports.pop = qPop;
module.exports.push = qPush;
