describe('Reviews', function(){
  var sandbox = undefined;
  var reviews = undefined;
  var reviewsData = [
    {
      date: "2016-01-25",
      rating: '30',
      text: "Bane was a member of the League of Shadows. And then he was excommunicated. And any man who is too extreme for Ra's Al Ghul, is not to be trifled with.\n\nI believe whatever doesn't kill you simply makes you... stranger.",
      title: "I love products!",
      user: "SomeDude"
    }
  ];
  
  beforeEach(function(){
    sandbox = sinon.sandbox.create();
    reviews = new Reviews();
  });
  
  afterEach(function(){
    sandbox.restore();
  });
  
  it("should be defined", function(){
    reviews.should.be.a.function;
  });
  
  describe('_constructor', function(){
    var renderStub = undefined;
    
    beforeEach(function(){
      renderStub = sandbox.stub(reviews, 'render');
    });
    
    it("should append to parent if defined", function(){
      var appendStub = sandbox.stub($.fn, 'appendTo', function(selector){
        return $('<div class="'+ selector.replace(/(.|#)/,'') +'" />');
      });
      
      reviews.constructor({
        parentSelector: '.test'
      });
      
      expect( reviews.els.$container[0].outerHTML ).to.equal('<div class="test"></div>');
    });
    
    it("should cache elements", function(){
      reviews.constructor();
      
      reviews.els.$container[0].should.not.equal('');
    });
    
    it("shouldn't render without data", function(){
      reviews.constructor();
      
      renderStub.should.not.be.called;
    });
    
    it("should render when data provided", function(){
      reviews.constructor({
        reviews: [{}]
      });
      
      renderStub.should.be.called;
    });
  });
  
  describe('render', function(){
    it("shouldn't do anything if reviews data wasn't provided", function(){
      expect( reviews.render() ).to.be.false;
    });
    
    it("should swap out reviews content with provided data", function(){
      var ctx = {
        namespace: reviews.namespace,
        reviews: reviewsData
      };
      var markup = reviews.template(ctx);
      var replaceSpy = sandbox.spy(reviews.els.$container, 'replaceWith');
      var templateSpy = sandbox.spy(reviews, 'template');
      
      reviews.render(reviewsData);
      
      replaceSpy.should.be.calledWith(markup);
    });
  });
});