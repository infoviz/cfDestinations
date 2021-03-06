// Load NodeJS Modules 
var express = require('express');
var path = require('path');
var app = express();
app.use(express.static('public'));

// Load Local B1 Module
var b1 = require('./modules/erp/b1');
var b1Options = {
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  }
}
// Load Local ByD Module 
var byd = require('./modules/erp/byd');


var output = {};

/**
 * Expose /GetB1Items GET request
 * return SAP Business One Items
 */
app.get('/GetB1Items', function (req, res) { 
  b1.GetItems(b1Options, function (error, resp) {
    if (error) {
      console.error("Can't get Items from B1 Service Layer - " + error);
      res.send(error);
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.send(resp);
    }
  });
});

/**
 * Expose /GetByDItems GET request
 * return SAP ByDesign Items (Materials)
 */
app.get('/GetByDItems', function (req, res) { 
  byd.GetItems(b1Options, function (error, resp) {
    if (error) {
      console.error("Can't get Items from ByD Service Layer - " + error);
      res.send(error);
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.send(resp);
    }
  });
});

/**
 * Expose root patch
 * show index.html
 */
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

var port = process.env.PORT || 8080
app.listen(port, function () {
  console.log('Example app listening on port ' + port);
});