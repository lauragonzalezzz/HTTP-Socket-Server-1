var net = require('net');
var stream = require('stream');

var client = net.createConnection({port: 8080}, function(){
  var path = process.argv[2];

  var date = new Date();
  date = date.toUTCString();

  // var responseHeaders = [];

  if (path === undefined){
    console.log(
      'Please indicate which file to access \n' +
      'Example: node client.js www.devleague.com');
    client.end();
  } else {
      client.write(
        'GET ' + path + ' HTTP/1.1 \n' +
        'Date: ' + date + '\n' +
        'Host: localhost' +
        'User-Agent: MEEEEeeeeEeEeEEee!')
  };
});


client.on('data', function(data){
  console.log(data.toString());

  client.end();
});

client.on('end', function(){
  console.log('disconnected from server');
});

