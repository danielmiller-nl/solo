// var http = require("http");
// var serveStatic = require('serve-static');
// var requestHandler = require('./textReader.js');

// var port = 3000;

// var ip = "127.0.0.1";

// var server = http.createServer(requestHandler.requestHandler);
// console.log("Listening on http://" + ip + ":" + port);
// server.listen(port, ip);

var express = require('express');
var app = express();
var wordRequestHandler = require('./textReader.js');
console.log("wordRequestHandler",wordRequestHandler);
app.get('/words', wordRequestHandler.requestHandler);

//   function(req, res){
//   res.mydata = {};
//   res.mydata.test = "test123456789";
//   res.send(res.mydata.test);
// });
app.use(express.static('./')); 
//app.get('/', requestHandler.requestHandler);
 console.log("Listening on" + process.env.PORT);
app.listen(process.env.PORT || 3000);