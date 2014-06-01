var express  = require('express');
var app      = express();
var port     = process.env.PORT || 3000;
var passport = require('passport');
var http     = require('http');
var path     = require('path');
var server   = http.createServer(app);

require('./config/passport')(passport) // pass passport for configuration

app.configure(function() {

  // set up our express application
  app.use(express.logger('dev'));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.set('view engine', 'ejs'); // set up ejs for templating
  app.use(express.static(path.join(__dirname, 'public')));

  // required for passport
  app.use(express.session({ secret: 'iloveharborjsiloveharborjs' })); // session secret
  app.use(passport.initialize());
  app.use(passport.session());
});

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

server.listen(port);
console.log('aviie is running on port ' + port);
