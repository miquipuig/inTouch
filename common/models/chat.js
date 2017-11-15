'use strict';

module.exports = function(Chat) {
  var app = require('../../server/server');
  Chat.beforeRemote('create', function(context, user, next) {

    context.args.data.date = Date.now();
    context.args.data.clientChatId = context.req.accessToken.userId;
    

    var users = app.models.user;
    //**** Mejora possible: esto es mejorable para no que tener que entrar siembpre en el findId
    //*** se ha de realizar un control para ver que el id del trainer es correcto
    users.findById(context.args.data.trainerChatId, function(err, instance) {
      
      
      if (context.args.data.trainerName == null && instance != null ) {
        context.args.data.trainerName = instance.nombre;
      }

      users.findById(context.req.accessToken.userId, function(err, instance ) {
       
        if (context.args.data.clientName == null && instance != null) {
          context.args.data.clientName = instance.nombre;;
        }
        next();
      });

    });
  });


  Chat.beforeRemote("prototype.__create__messages", function(context, listing, next) {

    context.args.data.date = Date.now();
    context.args.data.userMessageId = context.req.accessToken.userId;
    next();
  });


}
