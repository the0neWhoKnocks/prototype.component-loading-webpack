import $ from 'jquery';
import './Chat.styl';
import template from './Chat.hbs';

class Chat {
  constructor(opts){
    this.namespace = 'chat';
    this.eventNamespace = '.'+this.namespace;
    this.jsPrefix = '.js-'+this.namespace;
    this.selectors = {
      CTA: this.jsPrefix +'CTA'
    };
    this.events = {
      CLICK: 'click'+ this.eventNamespace
    };
    this.markup = template({
      namespace: this.namespace
    });
    this.els = {
      $container: undefined,
      $cta: undefined
    };
    
    var containerParent = (opts && opts.parent) ? opts.parent : 'body';
    
    this.els.$container = $(this.markup).appendTo(containerParent);
    this.els.$cta = this.els.$container.find(this.selectors.CTA);
    
    this.addListeners();
  }
  
  addListeners(){
    this.els.$cta.on(this.events.CLICK, this.handleCtaClick.bind(this));
  }
  
  handleCtaClick(ev){
    alert('Start chat');
  }
}

module.exports = Chat;