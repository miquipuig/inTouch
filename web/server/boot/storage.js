'use strict';

var path = require('path');

module.exports = function(app) {

  var ds = app.loopback.createDataSource({
    connector: require('loopback-component-storage'),
    provider: 'filesystem',
    root: path.join(__dirname, '../', '../', 'storage'),
    
    // getFilename will be called multiple times for each "part" of the form upload
    getFilename: function (origFilename, req, res) {
        var origFilename = origFilename.name;
        // optimisticly get the extension
        var parts = origFilename.split('.'),
            extension = parts[parts.length-1];
        // Using a local timestamp + user id in the filename 
        var newFilename = (new Date()).getTime()+'_'+'id'+'_'+parts[parts.length-2]+'.'+extension;
        //console.log(app);
        return newFilename;
    }
  });
  var container = ds.createModel('container');
  //app.model(container);
};