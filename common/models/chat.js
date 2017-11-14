'use strict';

module.exports = function(Chat) {
  Chat.beforeRemote('create', function(context, user, next) {
    context.args.data.date = Date.now();
    context.args.data.clientChatId = context.req.accessToken.userId;
    next();
  });
  
  
  
  Chat.beforeRemote("prototype.__create__messages", function(context, listing, next) {

    context.args.data.date = Date.now();
    context.args.data.userMessageId = context.req.accessToken.userId;
    next();
});


}