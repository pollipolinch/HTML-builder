const fs = require('fs');
const path = require('path');
const projectLink = path.join(__dirname, 'project-dist/bundle.css');
const stylesLink = path.join(__dirname, 'styles');
const createFile = fs.createWriteStream(projectLink);

async function addStyle(){
  const pages = await fs.promises.readdir(stylesLink, { withFileTypes: true });
  for(const page of pages) {
    const fileLink = path.join(stylesLink, page.name);
    if (page.isFile() && path.extname(page.name) === '.css') {
       fs.createReadStream(fileLink).pipe(createFile);
    }
  }
};
addStyle()