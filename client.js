var net = require('net');

var client = net.createConnection({port: 8080}, function(){
  console.log('connected to server!');
  client.write('GET /index.html HTTP/1.1');
});

client.on('data', function(data){
  console.log(data.toString());
  client.end();
});

client.on('end', function(){
  console.log('disconnected from server');
});