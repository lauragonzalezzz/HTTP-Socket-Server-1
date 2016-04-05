var net = require('net');
var fs = require('fs');
var server = net.createServer(function(request){


  request.on('data', function(data){
    var myData = "." + data.toString().split('\n')[0].split(' ')[1].toString();

    var date = new Date();
    date = date.toUTCString();

    fs.readFile(myData, function(err, data){
      if (err) {
        request.write("HTTP/1.1 404 Not Found \n" + "date: " + date + "\n" + "server: LG Servers \n\n")
      }
      else {
        request.write("HTTP/1.1 200 OK \n" + "date: " + date + "\n" + "server: LG Servers \n\n" + data);
      }
      request.end();
    });
  });
});

server.listen({port: 8080}, function(){
  var address = server.address();
});