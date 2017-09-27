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
  announcement.beforeRemote("prototype.__create__reservations", function(context, reservation, next) {
  
    context.args.data.date = Date.now();
    context.args.data.userReservationId = context.req.accessToken.userId;
    var announcements = app.models.announcement;
    
    console.log("paso el parametro Id: "+context.req.params.id);
      
    
    announcements.findById(context.req.params.id, function(err, instance) {

     console.log(instance);
     
     console.log(err);
      context.args.data.nombre = instance.nombre;
      context.args.data.niveles = instance.niveles;
      context.args.data.descripcion = instance.descripcion;
      context.args.data.categorias = instance.categorias;
      context.args.data.utilitarios = instance.utilitarios;
      context.args.data.maxParticipantes = instance.maxParticipantes;
      context.args.data.duracion = instance.duracion;
      context.args.data.localizacion = instance.localizacion;
      context.args.data.grupos = instance.grupos;
      context.args.data.precio = instance.precio;
      
      next();
    });


  });
};
