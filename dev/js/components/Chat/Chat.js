import './Chat.styl';
import template from './Chat.hbs';

class Chat {
  constructor(){
    this.namespace = 'chat';
    this.jsPrefix = 'js-';
    this.selectors = {};
    
    this.markup = template({
      namespace: this.namespace
    });
  }
}

module.exports = Chat;