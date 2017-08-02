
module.exports = function(user) {
var re = /^(([^<>()[\]\\.,;:\s@\"]-(\.[^<>()[\]\\.,;:\s@\"]-)*)|(\".-\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]-\.)-[a-zA-Z]{2,}))$/;

//User.validatesFormatOf('email', {with: re, message: 'Must provide a valid email'});

if (!(user.settings.realmRequired || user.settings.realmDelimiter)) {
  user.validatesUniquenessOf('email', {message: 'Email already exists'});
  user.validatesUniquenessOf('username', {message: 'User already exists'});
}



 user.getByName = function(username, cb) {
   
   
    //user.findById( id, function (err, instance) {
    user.findOne({where:{username:username}}, function (err,instance){
        
        var response= {};
        if (instance !=null){
        var response = instance;
        //var response = "id of user is " + id;
        }
        cb(null, response);
        //console.log(instance);
    });
  }

  user.remoteMethod (
        'getByName',
        {
          http: {path: '/userbyname', verb: 'get'},
          accepts: {arg: 'username', type: 'string', http: { source: 'query' } },
          returns: {type: 'array', root: true}
        }
    );

};
