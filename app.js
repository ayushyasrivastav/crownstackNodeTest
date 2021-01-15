const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser=  require('body-parser');
const cors=  require('cors');
const currencyRouter = require('./routes/currency');
var mongoose = require('mongoose');
const app = express();
// Mongoose connection with mongodb
mongoose.Promise = require('bluebird');
mongoose.connect("mongodb://localhost/crownstack" , { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => { // if all is ok we will be here
	console.log('Start');
  })
  .catch(err => { // if error we will be here
	  console.error('App starting error:', err.stack);
	  process.exit(1);
  });
// view engine setup
app.use(cors())
app.use(bodyParser.urlencoded({limit: "51200mb",extended: true,parameterLimit:51200000}));
app.use(bodyParser.json({limit: "51200mb"}));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/currency', currencyRouter);

module.exports = app;
