const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;
const link = path.join(__dirname, 'text.txt');

const output = fs.createWriteStream(link);

stdout.write('Привет! Введи любой текст\n');
stdin.on('data', data => {
  if (data.toString().trim() === 'exit'){
   exit()
  } else {
    output.write(data);
  }
});
process.on('SIGINT', exit)

function exit(){
    stdout.write('Спасибо, ввод закончен!');
    process.exit();
}