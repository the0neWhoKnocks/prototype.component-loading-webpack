describe('karma test with Chai', function() {
  it('should expose the Chai assert method', function() {
    assert.ok('everything', 'everything is ok');
  });

  it('should expose the Chai expect method', function() {
    expect('foo').to.not.equal('bar');
  });

  it('should expose the Chai should property', function() {
    should.exist(123);
    (1).should.not.equal(2);
  });
});