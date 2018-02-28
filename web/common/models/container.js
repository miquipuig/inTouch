'use strict';

module.exports = function(Container) {

    var qt = require('quickthumb');

    Container.afterRemote('upload', function(ctx, res, next) {

        //console.log(res.result.files);
        res.result.files
        
        var file = res.result.files.fileupload[0];
        //console.log(file);
        var file_path = "./server/storage/" + file.container + "/" + file.name;
        //console.log("Aqui");
        //console.log(file_path);
        var file_thumb_path = "./server/storage/" + file.container + "/thumb/" + file.name;

        /*qt.convert({
            src: file_path,
            dst: file_thumb_path,
            width: 100
        }, function (err, path) {
           
        });*/
        next();
       
    });

};