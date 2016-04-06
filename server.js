var net = require('net');
var fs = require('fs');

var server = net.createServer(function(request){

//On receipt of data
  request.on('data', function(data){
    var myData = data.toString().split('\n')[0];
    var myMethod = myData.split(' ')[0];

    if (myMethod !== 'GET' && myMethod !== 'HEAD'){
      fs.readFile('./405.html', function(err, data){
        if (err){
          throw new Error(err);
        }
        else {
          request.write(
            "HTTP/1.1 405 Not Found \n" +
            "date: " + date + "\n" +
            "server: LG Servers \n\n" + data.toString());
        }
      });
    };

    var myFilePath = "." + myData.split(' ')[1].toString();

    var date = new Date();
    date = date.toUTCString();

    fs.readFile(myFilePath, function(err, data){

      if (err) {
        console.log('err',err);
        returnError(request, date);
      }
      else {
        request.write(
          "HTTP/1.1 200 OK \n" +
          "date: " + date + "\n" +
          "server: LG Servers \n\n" + data);
      request.end();
      }
    });
  });
}); //Ends server declaration

server.listen({port: 8080}, function(){
  var address = server.address();
});

function returnError(request, date){
  fs.readFile('./404.html', function(err, data){
    if (err){
      throw new Error(err);
    }
    request.write(
      "HTTP/1.1 404 Not Found \n" +
      "date: " + date + "\n" +
      "server: LG Servers \n\n" + data);
    request.end();
  });
};