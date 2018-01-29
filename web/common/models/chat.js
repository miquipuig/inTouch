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


      if (context.args.data.trainerName == null && instance != null) {
        context.args.data.trainerName = instance.nombre;
      }

      users.findById(context.req.accessToken.userId, function(err, instance) {

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

    var chat = app.models.chat;
    var tokens = app.models.accessToken;
    var idcliente = "";
    //app.io.emit('chat message', "Entro en servicio");
    console.log("coses AAAAA enviades");
    chat.findById(context.req.params.id, function(err, instance) {
    
      if (instance != null) {
      console.log("Primer pas:",instance.clientChatId);
      console.log("context.req.accessToken.userId",context.req.accessToken.userId);
      console.log("instance.clientChatId:",instance.clientChatId);
      console.log("instance.trainerChatId:",instance.trainerChatId);
      
        if (instance.clientChatId.equals(context.req.accessToken.userId)) {
          
          idcliente = instance.trainerChatId;
        }
        else if (instance.trainerChatId.equals(context.req.accessToken.userId)) {
          idcliente = instance.clientChatId;
        }
        
        if (idcliente != "") {
            console.log("Me pasas un idcliente:",idcliente);
          tokens.findOne({ where: { userId: idcliente } }, function(err, instance) {

            if (instance != null) {
              console.log("El socket al que envio es:", instance);
              console.log("El  userId:", idcliente, instance.socketid);
              app.io.sockets.connected[instance.socketid].emit('chat message', '{"chatId": "' + context.req.params.id + '","userId": "' + idcliente + '","text":"' + context.args.data.text + '"}');
            }
            next();
          });
        }
        else {
          next();
        }
      }
    });

  });

  var tokens = app.models.accessToken;
  //context.req.params.id

}
