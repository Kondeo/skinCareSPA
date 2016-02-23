'use strict';

describe('Service: toasty', function () {

  // load the service's module
  beforeEach(module('skinCareStaApp'));

  // instantiate service
  var toasty;
  beforeEach(inject(function (_toasty_) {
    toasty = _toasty_;
  }));

  it('should do something', function () {
    expect(!!toasty).toBe(true);
  });

});
