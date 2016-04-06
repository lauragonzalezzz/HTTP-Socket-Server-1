var net = require('net');
var stream = require('stream');

var client = net.createConnection({host: 'www.devleague.com', port: 80}, function(){
  var path = process.argv[2];

  var date = new Date();
  date = date.toUTCString();


  if (path === undefined){
    console.log(
      'Please indicate which file to access \n' +
      'Example: node client.js www.devleague.com');
    client.end();
  } else {
      client.write(
        'GET / HTTP/1.1 \n' +
        'Date: ' + date + '\n' +
        'Host: www.devleague.com \n' +
        'User-Agent: MEEEEeeeeEeEeEEee! \r\n\r\n')
  };
});


client.on('data', function(data){
  console.log(data.toString());

  var responseHeadersArr = [];
  var responseHeader = data.toString().split('\n\n')[0].split('\n');
  responseHeadersArr.push(responseHeader);

  client.end();
});

client.on('end', function(){
  console.log('disconnected from server');
});

