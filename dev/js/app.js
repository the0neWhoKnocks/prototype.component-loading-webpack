import $ from 'jquery';
import './nike.js';

var app = {
  pageComponents: ['Chat', 'Reviews']
};


function loadAsyncScripts(files){
  var asyncFiles = [];
  var loadDefer = new $.Deferred();
  
  for(var i=0; i<files.length; i++){
    var defer = $.ajax({
      url: 'js/components/'+ files[i] +'.min.js',
      dataType: 'script',
      cache: true
    });
    
    asyncFiles.push(defer);
  }
  
  $.when.apply(null, asyncFiles).done(function(){
    nike.log('[ LOADED ]', files.join(', '));
    loadDefer.resolve();
  });
  
  return loadDefer.promise();
}

function transformRating(val){
  var ratingsOutOf = 5;
  return (val/ratingsOutOf)*100;
}

// Anything that needs to occur after the page has loaded.
$(function(){
  loadAsyncScripts(app.pageComponents)
    .done(function(){
      var msg = "Libs have been loaded.";
  
      $('.js-msg')
        .addClass('has--loaded')
        .html(msg);
      nike.log(msg);
      
      app.chat = new Chat();
      app.reviews = new Reviews({
        reviews: [
          {
            date: "2016-01-25",
            rating: transformRating(3),
            text: "Bane was a member of the League of Shadows. And then he was excommunicated. And any man who is too extreme for Ra's Al Ghul, is not to be trifled with.\n\nI believe whatever doesn't kill you simply makes you... stranger.",
            title: "I love products!",
            user: "SomeDude"
          },
          {
            date: "2015-05-03",
            rating: transformRating(1.5),
            text: "A hero can be anyone. Even a man knowing something as simple and reassuring as putting a coat around a young boy shoulders to let him know the world hadn't ended.",
            title: "A title",
            user: "UhLayDee"
          }
        ]
      });
    });
});