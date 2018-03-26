'use strict';

module.exports = function(Storage) {

  Storage.afterRemote('upload', function(ctx, data, next) {
    var newName = "";
    
    try {
      newName=ctx.req.accessToken.userId;    
    }
    catch (error) {
      console.error(error);
    } 
    console.log(data.result.files);
    const container = data.result.files.fileupload[0].container;
    const oldname = data.result.files.fileupload[0].name;

    //const container = data.result.files.file[0];


    // file wants to be renamed
    if (newName) {

      // create new name with old ext
      //let ext = name.split('.').slice(-1).pop();
      //let newFullName = `${newName}.${ext}`;
      let newFullName = (new Date()).getTime() + "_" + newName + "_" + oldname;

      // pipe old file as new one with new name
      let dlStream = Storage.downloadStream(container, oldname);
      let ulStream = Storage.uploadStream(container, newFullName);
      dlStream.pipe(ulStream);
      ulStream.on('finish', () => {
        Storage.removeFile(container, oldname, (err) => {
          next();
        });
      });
    }
    else next();

  });

};
