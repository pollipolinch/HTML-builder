const fs = require('fs');
const path = require('path');
const folderLink = path.join(__dirname, 'files');
const newFolderLink = path.join(__dirname, 'files-copy');

fs.readdir(folderLink,{ withFileTypes: true },(errors, data) => {
    if (errors) throw errors;
    fs.mkdir(newFolderLink, { recursive: true}, errors => {
        if (errors) return console.error(errors.message);
      data.forEach(file => {
        const fileLink = path.join(__dirname, 'files', file.name);
        const newFileLink = path.join(__dirname, 'files-copy', file.name);
        fs.copyFile(fileLink, newFileLink, (errors) => {
            if (errors) return console.error(errors.message);
        });
      });
    }); 
  }
);
