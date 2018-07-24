var express = require('express');
const Cors = require("cors");

var app = express();

//app.use(Cors());
app.get('/', function (req, res) {
  const a = {
    name : 'tnrms',
    age : 26,
  }
  res.send(a);
});

app.use(function(request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
