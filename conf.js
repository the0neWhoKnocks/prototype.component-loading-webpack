var conf = {
  paths: {
    DEV: './dev',
    PUBLIC: './public'
  },
  port: 8080
};

conf.paths.INDEX = conf.paths.PUBLIC +'/index.html';
conf.paths.PUBLIC_JS = conf.paths.PUBLIC +'/js';
conf.paths.DEV_JS = conf.paths.DEV +'/js';
conf.paths.COMPONENTS = conf.paths.DEV_JS +'/components';
conf.paths.GLOB_PUBLIC_JS = conf.paths.PUBLIC_JS +'/**/*.js';
conf.paths.GLOB_EXCLUDE_MIN_PUBLIC_JS = '!'+ conf.paths.PUBLIC_JS +'/**/*.min.js';
conf.paths.GLOB_DEV_JS = conf.paths.DEV_JS +'/**/*.js';
conf.paths.GLOB_DEV_STYLES = conf.paths.DEV_JS +'/**/*.styl';
conf.paths.GLOB_DEV_TEMPLATES = conf.paths.DEV_JS +'/**/*.hbs';
conf.paths.GLOB_ALL_DEV = [
  conf.paths.GLOB_DEV_JS,
  conf.paths.GLOB_DEV_STYLES,
  conf.paths.GLOB_DEV_TEMPLATES
];
 
module.exports = conf;