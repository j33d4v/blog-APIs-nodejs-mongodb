const createError = require('http-errors');
const express = require('express');
const path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
var passport = require('passport')

const bodyParser = require('body-parser')
const { connectToDatabase } = require("./db")



const userRoute = require('./routes/user')


connectToDatabase()
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app.use(logger('dev'));
// // app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, '../public')));

app.use(passport.initialize());



/* GET home page. */
app.get('/', function (req, res) {
  res.render('index', { title: 'Express' });
});

app.use('/users', userRoute);
// Router.use('/products', productRoute)
// Router.use('/business', businessRouter)
// Router.use('/categories', categoryRoute)

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// // error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
