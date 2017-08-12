const express = require('express');
const app = express();
const bodyParser = require('body-parser');
let port = 3000;

let chekHeader =   function(req, res, next){
  if (!req.headers.key) {
    res.status(401, 'Unauthorized');
    res.send({ error: 'Unauthorized'});
  } else {
    next();
  }
};

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
  res.status(200, 'OK');
  res.send('Hello, Express.js');
});

app.get('/hello', function(req, res) {
  res.status(200, 'OK');
  res.send('Hello, stranger');
});

app.get('/hello/:name', function(req, res) {
  res.status(200, 'OK');
  res.send('Hello, '+ req.params.name);
});

app.all('/sub/*', function(req, res) {
  res.send('You requested URI: '+req.hostname + ':' + port + req.originalUrl);
});


app.post('/post', chekHeader, function(req, res) {
  if ( Object.keys(req.body).length === 0 ) {
    res.status(404, 'Not found');
    res.send({ error: 'Not Found'});
  } else {
    res.status(200, 'OK');
    res.send(req.body);
  }
});

app.listen(port, function () {
  console.log('Listening on port ' + port);
});
