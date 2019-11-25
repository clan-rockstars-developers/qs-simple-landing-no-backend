const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const html = require('./webpack/html')

const isProduction = process.env.NODE_ENV === 'production'

console.log('production', isProduction)

module.exports = {
  output: {
    path: path.join(process.cwd(), isProduction ? 'production' : 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },{
        test: /\.pug$/,
        use: [
          "html-loader",
          "pug-html-loader"
        ]
      },{
        test: /\.sass$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : "style-loader",
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: 'webpack/'
              }
            }
          },
          "sass-loader"
        ]
      }
    ]
  },
  plugins: [
    ...html,
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "chunk-[id].css"
    })
  ]
};