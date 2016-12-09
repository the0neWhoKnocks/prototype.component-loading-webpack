describe('Chat', function(){
  var sandbox = undefined;
  var chat = undefined;
  
  beforeEach(function(){
    sandbox = sinon.sandbox.create();
    chat = new Chat();
  });
  
  afterEach(function(){
    sandbox.restore();
  });
  
  it("should be defined", function(){
    chat.should.be.a.function;
  });
  
  describe('_constructor', function(){
    it("should append to parent if defined", function(){
      var appendStub = sandbox.stub($.fn, 'appendTo', function(selector){
        return $('<div class="'+ selector.replace(/(.|#)/,'') +'" />');
      });
      
      chat.constructor({
        parent: '.test'
      });
      
      expect( chat.els.$container[0].outerHTML ).to.equal('<div class="test"></div>');
    });
    
    it("should cache elements", function(){
      chat.constructor();
      
      chat.els.$container[0].should.not.equal('');
      chat.els.$cta[0].should.not.equal('');
    });
    
    it("should call functions", function(){
      var addSpy = sandbox.spy(chat, 'addListeners');
      
      chat.constructor();
      
      addSpy.should.be.called;
    });
  });
  
  describe('addListeners', function(){
    it("should add listeners", function(){
      var offSpy = sandbox.spy($.fn, 'off');
      var onSpy = sandbox.spy($.fn, 'on');
      var ctaClickStub = sandbox.stub(chat, 'handleCtaClick', function(){});
      
      chat.addListeners();
      chat.els.$cta.click();
      
      offSpy.should.be.calledWith(chat.events.CLICK);
      onSpy.should.be.calledWith(chat.events.CLICK);
      ctaClickStub.should.be.called;
    });
  });
  
  describe('handleCtaClick', function(){
    it("should display alert message", function(){
      var alertStub = sandbox.stub(window, 'alert', function(){});
      
      chat.handleCtaClick();
      
      alertStub.should.be.called;
    });
  });
});