"use strict";

//Lets define a port we want to listen to
const PORT = 8080;

//Init Vars
var express = require('express');
var fs = require('fs');

var app = express();

//Init Functions
//we allow CORS: http://enable-cors.org/server_expressjs.html
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.listen(PORT, function() {
  console.log('Example app listening on port ' + PORT + '!');
});

//GET methods
app.get('/getClients', function(req, res, next) {

  let assetsQuery = function(array, word) {
    let result = false;
    array.forEach(function(element, index, array) {
      if (element.toLowerCase().trim().includes(word))
        result = true;
    });
    return result;
  };

  //get parameters from GET: https://scotch.io/tutorials/use-expressjs-to-get-url-and-post-parameters
  var query = req.param('word');

  let dbQuery = JSON.parse(fs.readFileSync('mockData.json', 'utf8'));

  let result = [];
  if (query == null || query == "" || typeof query == 'undefined')
    result = dbQuery.mockupData;
  else {
    query = query.toLowerCase().trim();
    dbQuery.mockupData.forEach(function(element, index, array) {
      if (element.Company_Name.toLowerCase().trim().includes(query) || assetsQuery(element.Assets, query))
        result.push(element);
    });
  }

  res.send(result);
});