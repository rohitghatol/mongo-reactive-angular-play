'use strict';

describe('Service: people', function () {

  // load the service's module
  beforeEach(module('appApp'));

  // instantiate service
  var people;
  beforeEach(inject(function (_people_) {
    people = _people_;
  }));

  it('should do something', function () {
    expect(!!people).toBe(true);
  });

});
