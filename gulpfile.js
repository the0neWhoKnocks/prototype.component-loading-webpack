var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('gulp-webpack');
var watch = require('gulp-watch');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var webpackConf = require('./webpack.dev.config.js');

// TODO - add const's for paths in webpackConf & here so they're only in one place. Perhaps a common.js file.
// TODO - setup server for live-reload, also to ensure ajax requests work.

function trimStats(stats){
  var entries = Object.keys(stats.compilation.assets);
  
  for(var i=0; i<entries.length; i++){
    var entry = stats.compilation.assets[entries[i]];
    
    if( !entry.emitted ){
      delete stats.compilation.assets[entries[i]];
      stats.compilation.chunks.splice(i, 1);
    }
  }
  
  return stats;
}

function initWebpack(watch){
  var conf = Object.create(webpackConf);
  
  if( watch ) conf.watch = true;
  
  return webpack(conf, null, function(err, stats){
    if(err) throw new gutil.PluginError('webpack', err);
    
    // if watching, only show what was built
    if( watch ) stats = trimStats(stats);
    
    gutil.log(stats.toString({
      colors: true
    }));
    
    // if watching minify the changed files
    //if(watch) minifyAssets();
  })
  .pipe(gulp.dest('./public/js'));
}

function minifyAssets(filePath, fileName){
  var sources = [
    './public/js/*.js', 
    '!./public/js/*.min.js'
  ];
  
  if( filePath ) sources = filePath;
  
  gulp.src( sources )
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./public/js'));
  
  if( fileName ) gutil.log('[MINIFIED]', fileName);
  else gutil.log('[MINIFIED] files');
}

gulp.task('default', function() {
  gutil.log('Available opts: [webpack]');
});

gulp.task('webpack:build', function(callback){
  initWebpack().on('end', function(){
    minifyAssets();
  });
  callback();
});

gulp.task('webpack:watch', function(callback){
  // end/finish events don't fire with webpack watch, so setup up a watcher for .js files
  watch(
    ['./public/js/**/*.js', '!./public/js/**/*.min.js'],
    {
      events: ['add', 'change'],
      name: '[WP Minifier]'
    },
    function(file){
      var fileName = file.path.replace(file.base,'');
      gutil.log('[WATCH]', fileName, 'was '+ file.event +((file.event == 'add') ? 'ed' : 'd'));
      minifyAssets(file.path, fileName);
    }
  );
  initWebpack(true);
  callback();
});