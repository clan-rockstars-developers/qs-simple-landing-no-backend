const fromDir = require('./find-files-in')
const HtmlWebPackPlugin = require("html-webpack-plugin");

const isProduction = process.env.NODE_ENV === 'production'

const pugFiles = fromDir('./src', '.pug')

function generateHtmlPage(path) {
  return new HtmlWebPackPlugin({
    template: path,
    filename: path.replace('src', '').replace('.pug', '.html'),
    minify: isProduction ? {
      collapseWhitespace: true,
      removeComments: true,
      minifyJS: true,
      minifyCSS: true
    } : {},
  })
}

module.exports = pugFiles.map(generateHtmlPage)