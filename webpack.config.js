var path = require('path');
var webpack = require("webpack");

module.exports = {
  context: __dirname,
  entry: './js/entry.js',
  output: {
    path: path.resolve(__dirname, './js'),
    filename: 'bundle.js',
  },

  module: {
    loaders: [
      {
        test: [/\.js?$/],
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '*']
  }
};
