'use strict';

module.exports = function(Chat) {
  var app = require('../../server/server');
  Chat.beforeRemote('create', function(context, user, next) {

    context.args.data.date = Date.now();
    context.args.data.clientChatId = context.req.accessToken.userId;
    

    var users = app.models.user;
    users.findById(context.args.data.trainerChatId, function(err, instance) {
 
      if (context.args.data.trainerName == null) {
        context.args.data.trainerName = instance.nombre;
      }

      users.findById(context.req.accessToken.userId, function(err, instance) {
       
        if (context.args.data.clientName == null) {
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
