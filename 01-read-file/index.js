const fs = require('fs');
const path = require('path')

const link = path.join(__dirname, 'text.txt');

let readStream = fs.createReadStream(link, 'utf8');

let res = ''
readStream.on('data', ell => res += ell );
readStream.on('end', () => console.log(res));
readStream.on('error', err => console.log(err.message));