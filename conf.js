var conf = {
  paths: {
    DEV: './dev',
    PUBLIC: './public'
  },
  port: 8080,
  middleware: {
    webpack: {
      // controls what gets displayed in the CLI when WebPack compiles
      stats: {
        // With console colors
        colors: true,
        // add the hash of the compilation
        hash: false,
        // add webpack version information
        version: false,
        // add timing information
        timings: true,
        // add assets information
        assets: false,
        // add built modules information
        modules: false,
        // add information about cached (not built) modules
        cached: false,
        // add information about the reasons why modules are included
        reasons: false,
        // add the source code of modules
        source: false,
        // add details to errors (like resolving log)
        errorDetails: true,
        // add the origins of chunks and chunk merging info
        chunkOrigins: false,
        // Add messages from child loaders
        children: false
      }
    }
  }
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