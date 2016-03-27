module.exports = {
  COUNTRY: 'US',
  LOCALE: 'en_US',
  log: function(){
    if( window.console ){
      window.console.log.apply(window.console, arguments);
    }
  },
  error: function(){
    if( window.error ){
      window.console.error.apply(window.console, arguments);
    }
  }
};