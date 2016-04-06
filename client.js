var net = require('net');
var myData = null;

  var host = process.argv[2]
  if (host.indexOf(':') !== -1){
    var index = host.indexOf(':') + 3;
    host = host.slice(index, host.length);
  }
  var slash = host.indexOf('/');
  host = host.slice(0, slash);
  port = 80;

  if (host.indexOf('www') === -1){
    host = 'localhost';
    port = 8080;
  }

  var path = process.argv[2];
  var pathBegin = path.indexOf('/');
  path = path.slice(pathBegin);


var client = net.createConnection({host: host, port: port}, function(){

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
  myData = data.toString();

  var responseHeadersArr = [];
  var responseHeader = data.toString().split('\n\n')[0].split('\n');
  responseHeadersArr.push(responseHeader);

  client.end();
});

client.on('end', function(){
  process.stdout.write(myData + "\n");
  console.log('disconnected from server');
});

