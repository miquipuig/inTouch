module.exports = function(user) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]-(\.[^<>()[\]\\.,;:\s@\"]-)*)|(\".-\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]-\.)-[a-zA-Z]{2,}))$/;

  //User.validatesFormatOf('email', {with: re, message: 'Must provide a valid email'});

  if (!(user.settings.realmRequired || user.settings.realmDelimiter)) {
    user.validatesUniquenessOf('email', { message: 'Email already exists' });
    user.validatesUniquenessOf('username', { message: 'User already exists' });
  }



  user.getByName = function(username, cb) {


    //user.findById( id, function (err, instance) {
    user.findOne({ where: { username: username } }, function(err, instance) {

      var response = {};
      if (instance != null) {
        var response = instance;
        //var response = "id of user is " + id;
      }
      cb(null, response);
      //console.log(instance);
    });
  }

  user.remoteMethod(
    'getByName', {
      http: { path: '/userbyname', verb: 'get' },
      accepts: { arg: 'username', type: 'string', http: { source: 'query' } },
      returns: { type: 'array', root: true }
    }
  );


//proves d'user identificat

  user.log = function(messageId, options) {
    const Message = this.app.models.Message;
    // IMPORTANT: forward the options arg
    return Message.findById(messageId, null, options)
      .then(msg => {
        const token = options && options.accessToken;
        const userId = token && token.userId;
        const user = userId ? 'user#' + userId : '<anonymous>';
        console.log('(%s) %s', user, msg.text);
      });
  };

  user.remoteMethod(
    'log', {
      http: { path: '/log/:messageId', verb: 'get' },
        accepts: {"arg": "messageId", "type": "number", "required": true},
        returns: {"arg": "options", "type": "object", "http": "optionsFromRequest"}
    }
  );


//Alta de 3 usuarios de ejemplo
  user.getExample = function(password, cb) {
       
      user.create([{
        nombre: "Angela",
        apellido: "Food",
        telefono: "+34 956854745",
        intereses: ["guitar","tennis"],
        identificacion: "123456789A",
        direccion: "Calle Bilbao, 3 Barcelona",
        username: 'foo',
        email: 'foo@bar.com',
        password: password
      }, {
   
        nombre: "John",
        apellido: "Mayer",
        telefono: "+34 956854745",
        intereses: ["it","running"],
        identificacion: "999999999J",
        direccion: "Calle Paris, 255 Barcelona",
        username: 'john',
        email: 'john@doe.com',
        password: password
      }, {
         nombre: "Jane",
        apellido: "Foster",
        telefono: "+34 956854745",
        intereses: ["cooking","singing"],
        identificacion: "123456789A",
        direccion: "Calle Balmes, num 666 Barcelona",
        username: 'jane',
        email: 'jane@doe.com',
        password: password
      }], cb);

  }

  user.remoteMethod(
    'getExample', {
      http: { path: '/get-example', verb: 'get' },
      accepts: { arg: 'password', type: 'string', http: { source: 'query' } },
      returns: { type: 'array', root: true }
    }
  );

};
