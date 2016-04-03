var path = require('path');
var webpack = require('webpack');
var node_modules_dir = path.resolve(__dirname, 'node_modules');

var config = {
  amd: { 
    jQuery: true 
  },
  
  entry: {
    app: path.resolve(__dirname, './dev/js/app.js'),
    vendor: [
      'jquery', 
      'handlebars'
    ]
  },
  
  output: {
    path: path.resolve(__dirname, './public/js'),
    filename: '[name].js'
  },
  
  resolve: {
    modulesDirectories: ['node_modules'],
    fallback: path.join(__dirname, 'node_modules'),
    alias: {
      'handlebars': 'handlebars/runtime.js' // so that I can include `handlebars` in `vendor` (not sure if it'll be needed)
    }
  },
  
  module: {
    loaders: [
      // patch jQuery's AMD structure so it plays nice
      {
        test: /jquery[\\\/]src[\\\/]selector\.js$/, 
        loader: 'amd-define-factory-patcher-loader'
      },
      // add `$` & `jQuery` to window
      {
        test: /jquery\.js$/,
        exclude: /node_modules/,
        loader: 'expose?$!expose?jQuery',
      },
      // add `nike` to window
      {
        test: /nike\.js$/,
        exclude: /node_modules/,
        loader: 'expose?nike',
      },
      // transpile JS files
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      // pre-process `.styl` files with Stylus
      {
        test: /\.styl$/, 
        loader: 'style-loader!css-loader!stylus-loader'
      },
      // allow Handlebars templates
      {
        test: /\.(hbs|handlebars)$/, 
        loader: 'handlebars-template-loader',
        query: {
          attributes: []
        }
      }
    ]
  },
  
  node: {
    fs: 'empty' // avoids error message (for Handlebars)
  },
  
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(true),
    // Ensures that anything in `vendor` isn't included in other chunks. Basically
    // telling it that if you require jQuery in one file, no need to include it
    // again because it'll be in the `vendor` bundle.
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js', Infinity)
  ]
};

module.exports = config;