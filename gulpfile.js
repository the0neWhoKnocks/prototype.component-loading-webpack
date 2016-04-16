var path = require('path');
var express = require('express');
var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('gulp-webpack');
var watch = require('gulp-watch');
var stream = require('webpack-stream');
var WebpackDevServer = require('webpack-dev-server');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var color = require('cli-color');
var karmaServer = require('karma').Server;
var opn = require('opn');
var webpackConf = require('./webpack.dev.config.js');
var conf = require('./conf.js');
var server = express();
var router = express.Router();
var http = require('http').Server(server);
var io = require('socket.io')(http);
var serverInitialized = false;


function initServer(){
  server.use(express.static(conf.paths.PUBLIC));
  server.get('/', function(req, res) {
    resRef = res;
    res.sendfile(conf.paths.INDEX);
  });
  
  io.on('connection', function(socket){
    gutil.log(color.green.bold('[SOCKET]'),'Connected');
    
    socket.on('disconnect', function(){
      gutil.log(color.yellow('[SOCKET]'),'Disconnected');
    });
  });
  
  http.listen(conf.port, function(err){
    if(err) throw new gutil.PluginError('[SERVER]', err);
    
    var url = 'http://localhost:'+ conf.port +'/';
    var msg = "\n\n"
      +"  █████████████████████████████████████████████\n"
      +"  █                                           █\n"
      +"  █  Server running @ "+ url +"  █\n"
      +"  █                                           █\n"
      +"  █████████████████████████████████████████████\n";
   
    gutil.log( color.green.bold(msg) );
    
    serverInitialized = true;
    
    opn(url, {
      app: ['chrome', '--incognito'],
      wait: false // no need to wait for app to close
    });
  });
}

function initWebpack(watchChanges){
  var wpConf = Object.create(webpackConf);
  
  if( watchChanges ) wpConf.watch = true;
  
  return webpack(wpConf, null, function(err, stats){
    if(err) throw new gutil.PluginError('webpack', err);
    
    gutil.log("\n\n\n"+stats.toString(conf.middleware.webpack.stats));
  })
  .pipe(gulp.dest(conf.paths.PUBLIC_JS));
}

function minifyAssets(filePaths, fileNames, callback){
  var sources = [
    conf.paths.GLOB_PUBLIC_JS,
    conf.paths.GLOB_EXCLUDE_MIN_PUBLIC_JS
  ];
  var msgPrefix = color.green.bold('[MINIFIED]');
  
  if( filePaths ) sources = filePaths;
  
  gulp.src(sources, {base:'./'})
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./'));
  
  if( fileNames ) gutil.log(msgPrefix, fileNames.join(', '));
  else gutil.log(msgPrefix, 'files');
  
  if( callback ) callback();
}

gulp.task('build', function(callback){
  initWebpack().on('end', function(){
    minifyAssets();
  });
  callback();
});

gulp.task('watch', function(callback){
  var files = [];
  var timer;
  
  // end/finish events don't fire with webpack watch, so setup up a watcher for .js files
  watch(
    [
      conf.paths.GLOB_PUBLIC_JS,
      conf.paths.GLOB_EXCLUDE_MIN_PUBLIC_JS
    ],
    {
      events: ['add', 'change'],
      name: '[WP Minifier]'
    },
    function(file){
      // Debounce and minify multiple files at once.
      if( timer ) clearTimeout(timer);
      // Work off the assumption that a user hasn't added, changed, or deleted a file within 300ms.
      var ev = file.event;
      
      files.push(file);
      
      timer = setTimeout(function(){
        var msgPrefix = color.green.bold('[WATCH]');
        var wasWere = 'was';
        var paths = [];
        var names = [];
        
        for(var i=0; i<files.length; i++){
          var file = files[i];
          var fileName = file.path.replace(file.base,'');
          paths.push(file.path);
          names.push(fileName);
        }
        
        if( names.length > 1 ) wasWere = 'were';
        
        gutil.log(msgPrefix, names.join(', '), wasWere, ev +((ev == 'add') ? 'ed' : 'd'));
        files = [];
        minifyAssets(paths, names, function(){
          if(serverInitialized){
            io.emit('RELOAD');
          }else{
            initServer();
          }
        });
      }, 300);
    }
  );
  
  watch(
    conf.paths.INDEX,
    {
      events: ['change'],
      name: '[WP Index]'
    },
    function(file){
      io.emit('RELOAD');
    }
  );
  
  initWebpack(true);
  callback();
});

gulp.task('test', function(done){
  new karmaServer({
    configFile: path.resolve('./karma.conf.js')
  }, done).start();
});

gulp.task('test:watch', function(done){
  new karmaServer({
    configFile: path.resolve('./karma.conf.js'),
    singleRun: false,
    autoWatch: true
  }, done).start();
});

gulp.task('default', [], function(){
  var cmds = "\n\n"
    +" Available commands:\n"
    +"\n"
    +" gulp build \n"
    +" gulp watch \n"
  
  gutil.log(cmds);
});