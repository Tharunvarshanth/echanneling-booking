var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cors = require('cors');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var jwt = require('jsonwebtoken');

var indexRouter = require('./src/routes/index');

const userroutes = require('./src/routes/userRoutes');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// End
app.use(cors())
app.use(bodyParser.json())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



const userRoutes = require('./src/routes/userRoutes');
const doctorRoutes = require('./src/routes/doctorRoutes')
const hospitalRoutes = require('./src/routes/hospitalRoutes')
const specializationRoutes = require('./src/routes/specializationRoutes')
const spedocRoutes = require('./src/routes/doctors-specializationRoutes')
const timescheduleRoutes  =require('./src/routes/time-scheduleRoutes')
const bookingRoutes = require('./src/routes/bookingRoutes')
app.use('/', indexRouter);
//routes


app.use('/api/user', userRoutes);
app.use('/api/doctor',doctorRoutes);
app.use('/api/hospital',hospitalRoutes);
app.use('/api/specialization',specializationRoutes)
app.use('/api/spedoc',spedocRoutes)
app.use('/api/ts',timescheduleRoutes)
app.use('/api/booking',bookingRoutes)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});




// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
 // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
