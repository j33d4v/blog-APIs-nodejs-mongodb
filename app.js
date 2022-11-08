const createError = require('http-errors');
const express = require('express');
const path = require('path');
const passport = require('passport')

const bodyParser = require('body-parser')
const { connectToDatabase } = require("./db")


const indexRoute = require('./src/routes/index')

connectToDatabase()
const app = express();

// view engine setup
app.set('views', path.join(__dirname, '/src/views'));
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())


app.use(passport.initialize());



/* GET home page. */
app.get('/', function (req, res) {
  res.render('index', { title: 'Mojeeds Blog API' });
});

app.use('/api', indexRoute);


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
