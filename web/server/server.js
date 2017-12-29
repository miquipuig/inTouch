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

//Autentificació de sockets
//-----------------------------------------------------------
if (require.main === module) {
  //Comment this app.start line and add following lines
  //app.start();
  app.io = require('socket.io')(app.start());

  var clients = [];
  require('socketio-auth')(app.io, {
    authenticate: function(socket, value, callback) {

      var AccessToken = app.models.accessToken;

      //get credentials sent by the client
      if (value.id != null) {
        var token = AccessToken.findById(value.id, function(err, tokenDetail) {
          if (err) throw err;
          if (tokenDetail != null) {


            /* console.log("premio");
             console.log(socket.id);
             console.log(tokenDetail);
             console.log(tokenDetail.userId);*/

            if (tokenDetail != null) {
              tokenDetail.updateAttribute("socketid", socket.id, function(err, instance) {

                callback(null, "true");
              });
            }
            else {
              callback(null, "false");
            }

          }
          else {
            callback(null, false);
          }
        });
      }
    }
  });


  app.io.on('connection', function(socket) {

    //app.io.emit('chat message', "Des del server: Un usuario connectandose");
    clients.push(socket.id);
    socket.on('disconnect', function() {

    });

    socket.on('chat message', function(msg) {
      //console.log('message: ' + msg);
      //A tots
      //app.io.emit('chat message', msg);
      //Solo a uno
      //socket.emit('chat message', msg);
      //app.io.sockets.connected[socket.id].emit('chat message',"He enviado un mensaje al resto del mundo");
    });

  });
}
//-----------------------------------------------------------
//Fi de l'Autentificació de sockets


//multiple nodes
//https://socket.io/docs/using-multiple-nodes/#nginx-configuration




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