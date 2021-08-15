var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session')
const mongoose=require('mongoose');

require('./models/userModel')
require('./models/typeModel')
require('./models/itemModel')
require('./models/guestModel')
require('./models/billModel')

     

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var itemRouter= require('./routes/item');
var item_apiRouter= require('./routes/item_api')
var billRouter= require('./routes/bill');



require('dotenv').config()
var app = express();
mongoose.connect(process.env.MONGODB,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>console.log(">>>>>oK"))
.catch((err)=>{})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

var hbs= require('hbs');
const { error } = require('console');

hbs.registerHelper('soSanh',function(a,b,t){
  return a.toString() == b.toString();

})

hbs.registerHelper('formatDate',function(a,t){
  let date = new Date(a)
  let month= date.getMonth()+1
  let year = date.getFullYear()
  month = month.toString().length == 1? '0'+month : month
  let dayofmonth = date.getDate().toString().length==1?'0'+date.getDate().toString():date.getDate().toString()
  return dayofmonth+'/'+month+'/'+year
})

hbs.registerHelper('getTypeName',function(typeid,type,t){
  return type.filter(item=>item._id.toString()==typeid.toString())[0].name

})
hbs.registerHelper('getGuestName',function(guestid,guest,t){
  return guest.filter(item=>item._id.toString()==guestid.toString())[0].fullname

})
hbs.registerHelper('getGuestPhone',function(guestid,guest,t){
  return guest.filter(item=>item._id.toString()==guestid.toString())[0].phone

})
hbs.registerHelper('itemNumber',function(value,t){
  return value+1

})
hbs.registerHelper('formatUpdateDate',function(a,t){
  let date = new Date(a)
  let month= date.getMonth()+1
  let year = date.getFullYear()
  month = month.toString().length == 1? '0'+month : month
  let dayofmonth = date.getDate().toString().length==1?'0'+date.getDate().toString():date.getDate().toString()
  return year+'-'+month+'-'+ dayofmonth;
})


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.JWT_SECRET_KEY,
  resave: true,
  saveUninitialized: true,
  cookie: {secure:false}
}))

//http://localhost:3000


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/items',itemRouter)
app.use('/api',item_apiRouter)
app.use('/bills',billRouter)






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
