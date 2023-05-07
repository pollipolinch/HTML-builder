const fs = require('fs');
const path = require('path');
const folderLink = path.join(__dirname, 'secret-folder')
fs.readdir(folderLink,{ withFileTypes: true }, (errors, data) => {
    if (errors)
      console.log(errors);
    else {
      data.forEach(doc => {
        if (doc.isFile()) {
            let dataLink = path.join(path.dirname(__filename), 'secret-folder', doc.name);
          fs.stat(dataLink,(errors, info) => {
              if (errors){
            console.log(errors);
              } 
              console.log(`${doc.name.split('.')[0]} - ${doc.name.split('.')[1]} - ${ Math.round(info.size / 1024 * 1000) / 1000}kB`);
            });
        }
      });
    }
  });