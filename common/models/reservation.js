'use strict';

module.exports = function(reservation) {

reservation.beforeRemote('create', function(context, user, next) {
    context.args.data.date = Date.now();
    context.args.data.userReservationId = context.req.accessToken.userId;
    context.args.data.trainerEmail= context.req.accessToken.email;
    next();
  });


};
