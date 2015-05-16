var express = require('express');
var path = require('path');
var http = require('http');
var bodyParser = require('body-parser');

var routes = require('./server/routes');
var app = express();

app.enable('trust proxy');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.locals.layout = 'layout.hbs';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes.router);
app.use('/api/v1', routes.apiRouter);

var port = process.env.PORT || 3000;

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var server = http.createServer(app).listen(port, function() {
    console.log('Listening on port ', port);
});
