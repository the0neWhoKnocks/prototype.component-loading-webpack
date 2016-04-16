import $ from 'jquery';
import './Reviews.styl';
import template from './Reviews.hbs';

class Reviews {
  constructor(opts){
    this.namespace = 'reviews';
    this.eventNamespace = '.'+this.namespace;
    this.jsPrefix = '.js-'+this.namespace;
    this.template = template;
    this.selectors = {
    };
    this.events = {
    };
    this.els = {
      $container: undefined
    };
    
    var containerParent = (opts && opts.parentSelector) ? opts.parentSelector : 'body';
    
    this.els.$container = $(template({})).appendTo(containerParent);
    
    if( opts && opts.reviews ){
      this.render(opts.reviews);
    }
  }
  
  render(reviews){
    if(!reviews) return false;
    
    this.els.$container.replaceWith(this.template({
      namespace: this.namespace,
      reviews: reviews
    }));
  }
}

window.Reviews = Reviews;
module.exports = Reviews;