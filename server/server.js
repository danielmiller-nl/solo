var http = require("http");
var serveStatic = require('serve-static');
var requestHandler = require('./textReader.js');

var port = 3000;

var ip = "127.0.0.1";

var server = http.createServer(requestHandler.requestHandler);
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);