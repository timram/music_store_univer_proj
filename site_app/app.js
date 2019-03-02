var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const session = require('express-session');
var logger = require('morgan');
const hbs = require('express-handlebars');
const RedisStore = require('connect-redis')(session);

const router = require('./routes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
 
app.engine('hbs', hbs({
  extname: 'hbs',
  defaultLayout: 'layout',
  layoutsDir: __dirname + '/views/layouts',
  partialsDir: __dirname + '/views/partials/'
}));
app.set('view engine', 'hbs'); 

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
  sotre: new RedisStore({
    host: 'localhost',
    port: 6379
  }),
  secret: 'some secret',
  resave: false,
  saveUninitialized: true,
  cookie: {}
}));

app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.disable('view cache')


app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

app.use(router);

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
