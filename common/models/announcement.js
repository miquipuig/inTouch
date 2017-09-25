'use strict';

module.exports = function(announcement) {
 announcement.beforeRemote('create', function(context, user, next) {
    context.args.data.date = Date.now();
    context.args.data.trainerPublisherId = context.req.accessToken.userId;
    context.args.data.trainerEmail= context.req.accessToken.email;
    console.log("Modelo creado");
    next();
  });
  
  
  var app = require('../../server/server');
  announcement.beforeRemote("prototype.__create__reservation", function(context, reservation, next) {
  
    context.args.data.date = Date.now();
    context.args.data.userReservationId = context.req.accessToken.userId;
    var reservations = app.models.reservation;

    reservations.findById(context.req.params.id, function(err, instance) {

      context.args.data.nombre = instance.nombre;
      context.args.data.niveles = instance.niveles;
      context.args.data.descripcion = instance.descripcion;
      context.args.data.categorias = instance.categorias;
      context.args.data.utilitarios = instance.utilitarios;
      context.args.data.maxParticipantes = instance.maxParticipantes;
      context.args.data.duracion = instance.duracion;
      context.args.data.localizacion = instance.localizacion;
      context.args.data.grupos = instance.grupos;

      next();
    });


  });
};
