var net = require('net');
var stream = require('stream');

  var host = process.argv[2]
  if (host.indexOf(':') !== -1){
    var index = host.indexOf(':') + 3;
    host = host.slice(index, host.length);
  }
  var slash = host.indexOf('/');
  host = host.slice(0, slash);

  var path = process.argv[2];
  var pathBegin = path.indexOf('/');
  path = path.slice(pathBegin);


var client = net.createConnection({host: host, port: 80}, function(){

  var date = new Date();
  date = date.toUTCString();


  if (path === undefined){
    console.log(
      'Please indicate which file to access\n' +
      'Example: node client.js www.devleague.com');
    client.end();
  } else {
      client.write(
        'GET ' + path + ' HTTP/1.1\n' +
        'Date: ' + date + '\n' +
        'Host: '+ host +'\n' +
        'User-Agent: MEEEEeeeeEeEeEEee!\r\n\r\n')
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

