var net = require('net');

var client = net.createConnection({port: 8080}, function(){
  console.log('connected to server!');
});

client.on('end', function(){
  console.log('disconnected from server');
});