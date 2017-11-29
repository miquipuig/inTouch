'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');
var LoopBackContext = require('loopback-context');
var app = module.exports = loopback();
boot(app, __dirname);

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

if (require.main === module) {
  //Comment this app.start line and add following lines
  //app.start();
  app.io = require('socket.io')(app.start());
  require('socketio-auth')(app.io, {
    authenticate: function (socket, value, callback) {    
        console.log(value);
        var AccessToken = app.models.AccessToken;
        
        //get credentials sent by the client
        var token = AccessToken.find({
          where:{id: value.id}
        }, function(err, tokenDetail){
          if (err) throw err;
          if(tokenDetail.length){
            callback(null, true);
            console.log("premio");
          } else {
            callback(null, true);
          }
        }); 
      } 
  });

  app.io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
  });
}


app.use(LoopBackContext.perRequest());
app.use(loopback.token());
app.use(function setCurrentUser(req, res, next) {
  if (!req.accessToken) {
    return next();
  }
  app.models.user.findById(req.accessToken.userId, function(err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(new Error('No user with this access token was found.'));
    }
    var loopbackContext = LoopBackContext.getCurrentContext();
    if (loopbackContext) {
      loopbackContext.set('currentUser', user);
    }
    next();
  });
});
