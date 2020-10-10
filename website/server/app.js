const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();
const routers = require('./routers');

const app = express();

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/', routers);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

module.exports = app;
