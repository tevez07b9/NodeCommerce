var createError = require("http-errors");
var path = require("path");
// var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser')
var logger = require("morgan");
var express = require("express");
var mongoose = require("mongoose");
var cors = require("cors");
// var expressValidator  = require('express-validator');//req.checkbody()
const mongoConfig = require("./configs/mongo-config");
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

// const Product = require("./models/Product");

function exit() {
  mongoose.disconnect();
}

mongoose.connect(
  mongoConfig,
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
  function (error) {
    if (error) throw error;
    console.log(`connect mongodb success`);
  }
);

var app = express();
app.use(cors());

// Express validator
// app.use(expressValidator({
//   errorFormatter: function(param, msg, value) {
//     var namespace = param.split('.'),
//     root          = namespace.shift(),
//     formParam     = root;

//     while(namespace.lenght) {
//       formParam += '[' + namespace.shift() + ']';
//     }
//     return {
//       param : formParam,
//       msg   : msg,
//       value : value
//     };
//   }
// }));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());

//set static dir
app.use(express.static(path.join(__dirname, "public")));

//routers
// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // console.log(err);
  res.status(err.status || 500).json(err);
});

module.exports = app;
