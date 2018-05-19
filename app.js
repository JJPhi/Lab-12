var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var company = require('./routes/company');
var skill = require('./routes/skill');
var address = require('./routes/address');
var account = require('./routes/account');
var school = require('./routes/school');
var resume = require('./routes/resume');

var address1 = require('./routes/address1');
var event = require('./routes/event');
var attendee = require('./routes/attendee');
var parking = require('./routes/parking');
var info = require('./routes/info'); //test


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/company', company);
app.use('/skill', skill);
app.use('/address', address);
app.use('/account', account);
app.use('/school', school);
app.use('/resume', resume);

app.use('/address1', address1);
app.use('/event', event);
app.use('/attendee', attendee);
app.use('/parking', parking);
app.use('/info', info);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
