
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODOMAIN || 'mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to Mongo');
});

var sass = require('node-sass');

var app = express();

// middleware

function secure (req, res, next) {
  if (!req.session.current_user) {
    return res.send(403);
  }
  next();
}

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(
     sass.middleware({
         src: __dirname + '/sass',
         dest: __dirname + '/public',
         debug: true
     })
 );
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.layout);

app.get('/skillsets.json', secure, routes.skillsets.index);
app.post('/skillsets.json', secure, routes.skillsets.create);
app.get('/skillsets/:id.json', secure, routes.skillsets.show);
app.put('/skillsets/:id.json', secure, routes.skillsets.update);
app.delete('/skillsets/:id.json', secure, routes.skillsets.delete);

app.get('/skills.json', secure, routes.skills.index);
app.post('/skills.json', secure, routes.skills.create);
app.get('/skills/:id.json', secure, routes.skills.show);
app.put('/skills/:id.json', secure, routes.skills.update);
app.delete('/skills/:id.json', secure, routes.skills.delete);

app.get('/reports.json', secure, routes.reports.show);

app.post('/sessions.json', routes.sessions.create);
app.delete('/sessions.json', routes.sessions.delete);

app.post('/users.json', routes.users.create);
app.put('/users/:id.json', secure, routes.users.update);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
