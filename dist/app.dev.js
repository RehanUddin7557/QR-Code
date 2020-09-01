"use strict";

var express = require('express'),
    bp = require('body-parser'),
    qrC = require('qrcode');

var app = express();
app.set('view engine', 'ejs');
app.use(bp.urlencoded({
  extended: false
}));
app.use(bp.json());
app.use(express["static"]('public'));
var port = process.env.PORT || 3000;
app.get('/', function (req, res) {
  res.render('app');
});
app.post('/scan', function (req, res) {
  var bDy = req.body;

  if (bDy.name && bDy.phone) {
    var temp = [];
    var name = {
      data: bDy.name
    };
    temp.push(name);
    var phone = {
      data: bDy.phone
    };
    temp.push(phone);
    qrC.toDataURL(temp, {
      errorCorrectionLevel: 'H'
    }, function (err, data) {
      if (err) res.send('<h1>Error occured</h1>');
      console.log(data);
      res.redirect('/');
    });
  } else {
    res.send('<h1>Empty Data</h1>');
  }
});
app.listen(port, function () {
  console.log("listen on localhost:".concat(port));
});