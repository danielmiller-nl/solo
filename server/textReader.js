var fs = require('fs');
var finalhandler = require('finalhandler');
var serveStatic = require('serve-static');
var _ = require('underscore');

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": 'Content-type',
  "access-control-max-age": 10, // Seconds.
  //"Content-Type": "application/json"
};
var serve = serveStatic('../client/', {'index': ['index.html', 'index.htm']});
var requestHandler = function(request, response) {
  console.log("Serving request type " + request.method + " for url " + request.url);

  // var statusCode = 200;
  var key = request.url;
  var headers = defaultCorsHeaders;

  if(request.method === 'GET'){

    fs.readFile(__dirname +'/enable1.txt', 'utf8', function (err, data) {
      if (err) throw err;
      var textArray = data.split("\n");
      var threeLetterWordsObject = arrayValsToObjectKeys(getThreeLetterWords(textArray));
      var count = 0;
      response.writeHead(200, headers);
      var done = finalhandler(request, response);
      console.log("response ",response.data);
      serve(request, response, done);
      response.end(JSON.stringify(threeLetterWordsObject));
    });

  } else if (request.method === 'OPTIONS') {

    response.writeHead(200, headers);
    response.end(/*request.url*/);

  } 
  else {

    response.writeHead(404, headers);
    response.end();

  }

};

var arrayValsToObjectKeys = function(array){
  return _.object(array,_.map(array,function(i){return true;}));
}

var getThreeLetterWords = function(allWords){
  return _.filter(allWords,function(word){
    return word.length == 3;
  });
}

exports.requestHandler = requestHandler;

