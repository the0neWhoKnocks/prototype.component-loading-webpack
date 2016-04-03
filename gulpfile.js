var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('gulp-webpack');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var webpackConf = require('./webpack.dev.config.js');

// TODO - add const's for paths to webpackConf so they're only in one place.


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
    if(watch) minifyAssets();
  })
  .pipe(gulp.dest('./public/js'));
}

function minifyAssets(){
  gutil.log('[MINIFY] started');
  gulp.src([
    './public/js/*.js', 
    '!./public/js/*.min.js'
  ])
  .pipe(uglify())
  .pipe(rename({
    suffix: '.min'
  }))
  .pipe(gulp.dest('./public/js'));
  gutil.log('[MINIFY] complete');
}

gulp.task('default', function() {
  gutil.log('Available opts: [webpack]');
});

gulp.task('webpack:build', function(callback){
  initWebpack();
  minifyAssets();
  callback();
});

gulp.task('webpack:watch', function(callback){
  initWebpack(true);
  callback();
});