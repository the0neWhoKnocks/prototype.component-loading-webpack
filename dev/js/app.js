import $ from 'jquery';
import './nike.js';

// TODO - temp for testing
import Chat from './components/Chat/Chat.js';

// Anything that needs to occur after the page has loaded.
$(function(){
  var msg = "Libs have been loaded.";
  
  $('.js-msg').html(msg);
  nike.log(msg);
  
  // TODO - temp for testing
  var chat = new Chat();
});