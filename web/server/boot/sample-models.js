'use strict';
var async = require('async');
module.exports = function(app) {
  //data sources
  var mysqldev = app.dataSources.mysqldev; // 'name' of your mongo connector, you can find it in datasource.json

  //create all models
  async.parallel({
    users: async.apply(createUsers),
    //listings: async.apply(createlistings)
  }, function(err, results) {
    if (err) throw err;
    createlistings(results.users, function(err) {
      console.log('> models created sucessfully');
    });
  });
  //create reviewers
  function createUsers(cb) {
    mysqldev.automigrate('user', function(err) {
      if (err) return cb(err);
      var user = app.models.user;
      user.create([{
        name: "Angela",
        surname: "Food",
        telephone: "+34 956854745",
        interests: ["guitar", "tennis"],
        idDocument: "123456789A",
        address: "Calle Bilbao, 3 Barcelona",
        username: 'foo',
        email: 'foo@bar.com',
        password: 'intouch',
        favoriteListings: [4, 7, 8]
      }, {
        name: "John",
        surname: "Mayer",
        telephone: "+34 956854745",
        interests: ["it", "running"],
        idDocument: "999999999J",
        address: "Calle Paris, 255 Barcelona",
        username: 'john',
        email: 'john@doe.com',
        password: 'intouch',
        favoriteListings: [4, 7, 8]
      }, {
        name: "Jane",
        surname: "Foster",
        telephone: "+34 956854745",
        interests: ["cooking", "singing"],
        idDocument: "123456789A",
        address: "Calle Balmes, num 666 Barcelona",
        username: 'jane',
        email: 'jane@doe.com',
        password: 'intouch'

      }], cb);
    });
  }
  //create Listings
  function createlistings(users, cb) {
    mysqldev.automigrate('listing', function(err) {
      if (err) return cb(err);
      var listing = app.models.listing;
      var DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;
      listing.create([{
        date: Date.now() - (DAY_IN_MILLISECONDS * 4),
        niveles: [
          "a", "b"
        ],
        nombre: "Aprende guitarra en Poblenou",
        descripcion: "El mejor maestro de guitarra tiene la solución",
        precio: 0,
        categorias: [
          "a"
        ],
        utilitarios: [
          "a"
        ],
        maxParticipantes: 10,
        duracion: 40,
        localizacion: {
          "lat": 0,
          "lng": 0
        },
        grupos: true,
        trainerPublisherId: users[2].id

      }, {
        date: Date.now() - (DAY_IN_MILLISECONDS * 3),
        niveles: [
          "a", "b"
        ],
        nombre: "Clase de swing",
        descripcion: "El mejor maestro de guitarra tiene la solución",
        precio: 0,
        categorias: [
          "a"
        ],
        utilitarios: [
          "a"
        ],
        maxParticipantes: 10,
        duracion: 40,
        localizacion: {
          "lat": 0,
          "lng": 0
        },
        grupos: true,
        trainerPublisherId: users[1].id

      }], cb);
    });
  }
  //create reviews
  function createReviews(reviewers, coffeeShops, cb) {
    mysqldev.automigrate('Review', function(err) {
      if (err) return cb(err);
      var Review = app.models.Review;
      var DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;
      Review.create([{
        date: Date.now() - (DAY_IN_MILLISECONDS * 4),
        rating: 5,
        comments: 'A very good coffee shop.',
        publisherId: reviewers[0].id,
        coffeeShopId: coffeeShops[0].id,
      }, {
        date: Date.now() - (DAY_IN_MILLISECONDS * 3),
        rating: 5,
        comments: 'Quite pleasant.',
        publisherId: reviewers[1].id,
        coffeeShopId: coffeeShops[0].id,
      }, {
        date: Date.now() - (DAY_IN_MILLISECONDS * 2),
        rating: 4,
        comments: 'It was ok.',
        publisherId: reviewers[1].id,
        coffeeShopId: coffeeShops[1].id,
      }, {
        date: Date.now() - (DAY_IN_MILLISECONDS),
        rating: 4,
        comments: 'I go here everyday.',
        publisherId: reviewers[2].id,
        coffeeShopId: coffeeShops[2].id,
      }], cb);
    });
  }
};
