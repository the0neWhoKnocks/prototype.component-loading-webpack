//var stylus_plugin = require('stylus_plugin');

var path = require('path');
var webpack = require('webpack');
var node_modules_dir = path.resolve(__dirname, 'node_modules');

var config = {
  amd: { jQuery: true },
  entry: {
    'global': path.resolve(__dirname, './dev/js/global/global.js'),
    'global.min': path.resolve(__dirname, './dev/js/global/global.js'),
  },
  output: {
    path: path.resolve(__dirname, './public/js'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /jquery[\\\/]src[\\\/]selector\.js$/, 
        loader: 'amd-define-factory-patcher-loader'
      },
      {
        test: /jquery\.js$/,
        exclude: /node_modules/,
        loader: 'expose?$!expose?jQuery', // add $ & jQuery to window
      },
      {
        test: /nike\.js$/,
        exclude: /node_modules/,
        loader: 'expose?nike', // add $ & jQuery to window
      },
      {
        test: /\.js$/,
        exclude: [node_modules_dir],
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.styl$/, 
        loader: 'style-loader!css-loader!stylus-loader'
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true,
      warnings: false // being ignored for some reason
    })
  ],
  /*resolve: {
    alias: {
      jquery: path.resolve(__dirname, 'resources', 'js', 'jquery-1.11.3.min.js')
    }
  }*/
  /*,
  stylus: {
    use: [stylus_plugin()]
  }*/
};

module.exports = config;