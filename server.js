var net = require('net');
var fs = require('fs');
var server = net.createServer(function(request){

  var html404 = "<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"UTF-8\"><title>Element not found!</title><link rel=\"stylesheet\" href=\"/css/styles.css\"></head><body><h1>404</h1><h2>Element not found!</h2><p><a href=\"/\">back</a></p></body></html>";

  var helium = "<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"UTF-8\"><title>The Elements - Helium</title><link rel=\"stylesheet\" href=\"/css/styles.css\"></head><body><h1>Helium</h1><h2>H</h2><h3>Atomic number 2</h3><p>Helium is a chemical element with symbol He and atomic number 2. It is a colorless, odorless, tasteless, non-toxic, inert, monatomic gas that heads the noble gas group in the periodic table. Its boiling and melting points are the lowest among all the elements and it exists only as a gas except in extremely cold conditions.</p><p><a href=\"/\">back</a></p></body></html>";

  var hydrogen = "<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"UTF-8\"><title>The Elements - Hydrogen</title><link rel=\"stylesheet\" href=\"/css/styles.css\"></head><body><h1>Hydrogen</h1><h2>H</h2><h3>Atomic number 1</h3><p>Hydrogen is a chemical element with chemical symbol H and atomic number 1. With an atomic weight of 1.00794 u, hydrogen is the lightest element on the periodic table. Its monatomic form (H) is the most abundant chemical substance in the universe, constituting roughly 75% of all baryonic mass. Non-remnant stars are mainly composed of hydrogen in its plasma state. The most common isotope of hydrogen, termed protium (name rarely used, symbol 1H), has a single proton and zero neutrons.</p><p><a href=\"/\">back</a></p></body></html>";

  var index = "<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"UTF-8\"><title>The Elements</title><link rel=\"stylesheet\" href=\"/css/styles.css\"></head><body><h1>The Elements</h1><h2>These are all the known elements.</h2><h3>These are 2</h3><ol><li><a href=\"/hydrogen.html\">Hydrogen</a></li><li><a href=\"/helium.html\">Helium</a></li></ol></body></html>";



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



  // if (myData.indexOf("GET /404.html") !== -1){
  //   request.write(
  //     "HTTP/1.1 200 OK \n" + "date: " + date + "\n" + "server: LG Servers \n\n" + html404
  //    );
  // } else if (myData.indexOf("GET /helium.html") !== -1){
  //   request.write(
  //     "HTTP/1.1 200 OK \n" + "date: " + date + "\n" + "server: LG Servers \n\n" + helium
  //    );
  // } else if (myData.indexOf("GET /hydrogen.html") !== -1){
  //   request.write(
  //     "HTTP/1.1 200 OK \n" + "date: " + date + "\n" + "server: LG Servers \n\n" + hydrogen
  //    );
  // } else if ((myData.indexOf("GET /index.html") !== -1) || (myData.indexOf("GET / ") !== -1)){
  //   request.write(
  //     "HTTP/1.1 200 OK \n" + "date: " + date + "\n" + "server: LG Servers \n\n" + index
  //    );
  // } else if (myData.indexOf("GET /css/styles.css") !== -1){
  //   request.write(
  //     "HTTP/1.1 200 OK \n" + "date: " + date + "\n" + "server: LG Servers \n\n" + styles
  //     );
  // } else {
  //   request.write("HTTP/1.1 404 Not Found \n" + "date: " + date + "\n" + "server: LG Servers \n\n");
  // }



  request.on('end', function(){
    console.log('Socket connection ended');
  });

});

server.listen({port: 8080}, function(){
  var address = server.address();
  console.log('opened server on %d', address.port);
});