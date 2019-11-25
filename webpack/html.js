const fromDir = require('./find-files-in')
const HtmlWebPackPlugin = require("html-webpack-plugin");

console.log('from dir')
console.log(fromDir)

const pugFiles = fromDir('./src', '.pug')

function generateHtmlPage(path) {
  return new HtmlWebPackPlugin({
    template: path,
    filename: path.replace('src','').replace('.pug', '.html')
  })
}

module.exports = pugFiles.map(generateHtmlPage)