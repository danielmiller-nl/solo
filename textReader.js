var fs = require('fs');

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  "Content-Type": "application/json"
};

var requestHandler = function(request, response) {
  console.log("Serving request type " + request.method + " for url " + request.url);

  // var statusCode = 200;
  var key = request.url;
  var headers = defaultCorsHeaders;

  if(request.method === 'GET'){

    fs.readFile('enable1.txt', 'utf8', function (err, data) {
      if (err) throw err;
      var textArray = data.split("\n");
      response.writeHead(200, headers);
      response.end(JSON.stringify(textArray));
    });

  } else {

    response.writeHead(404, headers);
    response.end();

  }

};

exports.requestHandler = requestHandler;

