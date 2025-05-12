var createError = require('http-errors');
var http = require('http');
var express = require('express')

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var sendMailRouter = require('./routes/sendmail');
var usersRouter = require('./routes/users');
var oauthcallback = require('./routes/oauthcallback');

var cors = require('cors');
var corser = require("corser");
var Session = require('express-session');
const firebase = require('./config/firebase');

var app = express();
app.use(cors({origin: '*'}));
app.options('*', cors());
app.use(Session({
  cookie: { secure: false },
  secret: 'h0MxmGAkQfRMKB2GeEH-qGpX',
  resave: false,
  saveUninitialized: true
}));

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/sendmail', sendMailRouter);
app.use('/oauthCallback', oauthcallback);

app.post('/gks', async (req, res) => {
  try {
    await (new firebase()).saveGK(req.body.data)
    res.status(200).send("OK")
  } catch (err) {
    console.log(err)
  }
});

app.get('/gks', async (req, res) => {
  try {
    const data = await (new firebase()).getGKs();
    res.status(200).json(data)
  } catch (err) {
    console.log(err)
  }
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var port = 8081;
var server = http.createServer(app);
server.listen(port);
server.on('listening', function () {
  console.log(`listening to ${port}`);
});

module.exports = app;
