'use strict';

module.exports = function(listing) {
  listing.beforeRemote('create', function(context, user, next) {
    context.args.data.date = Date.now();
    context.args.data.trainerPublisherId = context.req.accessToken.userId;
    context.args.data.trainerEmail= context.req.accessToken.email;
    next();
  });
};


 
