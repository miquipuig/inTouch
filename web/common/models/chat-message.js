'use strict';

module.exports = function(ChatMessage) {
  ChatMessage.beforeRemote('create', function(context, user, next) {
    context.args.data.date = Date.now();
    context.args.data.userMessageId = context.req.accessToken.userId;
    next();
  });
};
