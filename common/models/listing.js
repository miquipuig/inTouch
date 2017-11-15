'use strict';

module.exports = function(listing) {
  listing.beforeRemote('create', function(context, user, next) {
    context.args.data.date = Date.now();
    context.args.data.trainerPublisherId = context.req.accessToken.userId;

    next();

  });


  var app = require('../../server/server');
  listing.beforeRemote("prototype.__create__announcements", function(context, listing, next) {

    context.args.data.date = Date.now();
    context.args.data.trainerPublisherId = context.req.accessToken.userId;
    var listings = app.models.listing;

    listings.findById(context.req.params.id, function(err, instance) {

      context.args.data.nombre = instance.nombre;
      context.args.data.niveles = instance.niveles;
      context.args.data.descripcion = instance.descripcion;
      context.args.data.categorias = instance.categorias;
      context.args.data.utilitarios = instance.utilitarios;
      context.args.data.maxParticipantes = instance.maxParticipantes;
      context.args.data.duracion = instance.duracion;
      context.args.data.localizacion = instance.localizacion;
      context.args.data.grupos = instance.grupos;

      if (!(context.args.data.precio > 0)) {
        context.args.data.precio = instance.precio;
      }

      next();
    });



  });
};
