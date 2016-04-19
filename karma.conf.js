var path = require('path');
var conf = require('./conf.js');
var wpConf = require('./webpack.dev.config.js');

module.exports = function(config) {
  wpConf.module.loaders.push(
    // transpile all files except testing sources with babel as usual
    {
      test: /\.js$/,
      exclude: [
        path.resolve(conf.paths.COMPONENTS),
        path.resolve('node_modules/')
      ],
      loader: 'babel'
    },
    // transpile and instrument only testing sources with isparta
    {
      test: /\.js$/,
      include: path.resolve(conf.paths.COMPONENTS),
      loader: 'isparta'
    }
  );
  
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'sinon-chai'],

    // list of files / patterns to load in the browser
    files: [
      './karma.bootstrap.js'
    ],

    // list of files to exclude
    exclude: [
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      './karma.bootstrap.js': ['webpack']
    },
    
    webpack: {
      cache: true,
      devtool: 'inline-source-map',
      watchDelay: 3 * 1e3,
      // *optional* babel options: isparta will use it as well as babel-loader
      babel: {
        presets: ['es2015']
      },
      // *optional* isparta options: istanbul behind isparta will use it
      isparta: {
        embedSource: true,
        noAutoWrap: true,
        // these babel options will be passed only to isparta and not to babel-loader
        babel: {
          presets: ['es2015']
        }
      },
      module: wpConf.module
    },
    
    webpackMiddleware: conf.middleware.webpack,

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: [
      'mocha', 
      'coverage', 
      //'coveralls'
    ],
    
    coverageReporter: {
      check: {
        // fails if global test coverage doesn't meet what's defined
        global: {
          statements: 100,
          branches: 100,
          functions: 100,
          lines: 100
        }
      },
      reporters: [
        // outputs to the CLI
        {
          type: 'text-summary'
        },
        // output HTML so it's easier to find what areas have missing tests
        {
          type: 'html',
          dir: './.coverage/'
        },
        // allows for coverage report to be exported to Coveralls
        {
          type: 'lcovonly',
          dir: './.coverage/',
          subdir: '.'
        }
      ]
    },

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
