var express = require('express');
var path = require('path');
var logger = require('morgan');
var cors = require('cors');

/* Update prices */
require('./getprices/getprices.js')

/* Routes */
var index = require('./routes/index');
var prices = require('./routes/prices');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));


app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', index);
app.use('/prices', prices);



module.exports = app;
