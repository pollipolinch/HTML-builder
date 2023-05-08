const path = require('path');
const fs = require('fs');
const style = path.join(__dirname, 'styles')
const distStyle = path.join(__dirname, 'project-dist', 'style.css');
const distInd=path.join(__dirname, 'project-dist', 'index.html');
const assetLink = path.join(__dirname, 'assets');
const distAss = path.join(__dirname, 'project-dist', 'assets');
const compLink = path.join(__dirname, 'components');
const htmlReader = fs.createReadStream(path.join(__dirname, 'template.html'));
const distLink=path.join(__dirname, 'project-dist')
let htmlFile = '';

fs.mkdir(distLink, { recursive: true }, (errors) => {
    if (errors) throw errors;
});
htmlReader.on('error', (errors) => console.log(errors.message));
htmlReader.on('data', (ell) => {
    htmlFile = htmlFile + ell;
});
htmlReader.on('end', () => {
    fs.readdir(compLink, { withFileTypes: true }, (errors, pages) => {
        if (errors) throw errors;
        pages.forEach((page) => {
            const reader = fs.createReadStream(path.join(__dirname, 'components', page.name));
            const writer = fs.createWriteStream(distInd);
            reader.on('data', (ell) => {
                const result = {};
                result[page.name] = ell;
                const part = page.name.split('.')[0];
                htmlFile = htmlFile.replace(new RegExp(`{{${part}}}`), result[page.name]);
                writer.write(htmlFile);
        });
        reader.on('error', (error) => console.log(error.message));
    });
    });
});

fs.readdir(style, { withFileTypes: true }, (errors, pages) => {
    if (errors) throw errors;
    const findPage = pages.filter((page) => page.isFile());
    const pagesCss = findPage.filter((page) => page.name.split('.')[1] === 'css').reverse();
    fs.mkdir(distLink, { recursive: true }, (errors) => {
        if (errors) throw errors;
    });
    const writer = fs.createWriteStream(distStyle);
    pagesCss.forEach((page) => {
    const reader = fs.createReadStream(path.join(__dirname, 'styles', page.name));
    reader.on('data', (ell) => writer.write(ell));
    reader.on('error', (error) => console.log('Error', error.message));
    });
});

const filesCopy = (links, des) => {
    fs.mkdir(des, { recursive: true }, (errors) => {
        if (errors) throw errors;
    });
    fs.readdir(links, { withFileTypes: true }, (errors, pages) => {
        if (errors) throw errors;
        pages.forEach((page) => {
            let link = path.join(links, page.name);
            let dis = path.join(des, page.name);
            fs.stat(link, (errors, ell) => {
                if (errors) throw errors;
                if (ell.isDirectory()) {
                    filesCopy(link, dis);
                }
                if (ell.isFile()) {
                    fs.copyFile(link, dis, (errors) => {
                        if (errors) throw errors;
                    });
                }
            });
        });
    });
};

filesCopy(assetLink, distAss);