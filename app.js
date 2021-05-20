var createError = require('http-errors');
var express = require('express');
var path = require('path');
//la linea de abajo permite que las cookies esten disponibles, 
//si las borro dejan de funcionar(la de var y la de app.use)
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//agregado session
const session = require('express-session');

app.use(session( {
  secret: "proyecto integrador",
  resave: false,
  saveUninitialized: true
}));

app.use(function(req, res, next){
  res.locals = {
    
  }
  return next();
});

app.use('/index', indexRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
