var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session')

var app = express();

var randomstring = require('randomstring');
var mongoose = require('mongoose');

app.use(session({
    secret:'@#@$MYSIGN#@$#$',
    resave: false,
    saveUninitialized:true
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('views', 'views')
app.engine('html', require('ejs').renderFile);


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var user = mongoose.Schema({
    name:String,
    id:String,
    password:String,
    token:String,
    tag:String
});

var friends = mongoose.Schema({
    token:String,
    list:Array,
    result:Array
});

var battle = mongoose.Schema({
    user1Name:String,
    user2TName:String,
    receive:String,
    user1Data:String,
    user2Data:String,
    winner:String,
    loser:String,
    reward:String,
    target:String,
    battleText:String,
    roomToken:String
});

var battleModel = mongoose.model('battleModel',battle);
var userModel = mongoose.model('userModel',user);
var friendModel = mongoose.model('friendModel',friends);

require('./routes/auth')(app,userModel,randomstring ,session);
require('./routes/friend')(app,friendModel,userModel);
require('./routes/battle')(app,battleModel,randomstring,userModel)
require('./routes/route')(app);
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
