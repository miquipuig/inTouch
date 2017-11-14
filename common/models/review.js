'use strict';

module.exports = function(review) {
  review.beforeRemote('create', function(context, user, next) {
    context.args.data.date = Date.now();
    context.args.data.clientChatId = context.req.accessToken.userId;
    next();
  });
};