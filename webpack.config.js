var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/app/index.html',
  filename: 'index.html'
})

module.exports = {
  entry: [
    './app/index.js'
  ],
  output: {
    path: __dirname + '/dist',
    filename: "index_bundle.js"
  },
  module: {
    loaders: [
      {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader"
      }
    ]
  },
  plugins: [
      HTMLWebpackPluginConfig
  ]
}