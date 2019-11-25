const path = require('path')
const fs = require('fs')

function fromDir(startPath, filter, exclude = ['exclude'], finded = []) {
  if (!fs.existsSync(startPath)) {
    console.log("no dir ", startPath);
    return;
  }
  let files = fs.readdirSync(startPath);
  for (var i = 0; i < files.length; i++) {
    let filename = path.join(startPath, files[i]);
    let stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
      if (!exclude.find((path) => (new RegExp(path, ['i'])).test(filename))) {
        finded.concat(fromDir(filename, filter, exclude, finded))
      } else {
        console.log(filename)
      }
    } else if (filename.indexOf(filter) >= 0) {
      finded.push(filename)
    };
  };
  return finded
};

module.exports = fromDir