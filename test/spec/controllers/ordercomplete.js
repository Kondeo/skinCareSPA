'use strict';

describe('Controller: OrdercompleteCtrl', function () {

  // load the controller's module
  beforeEach(module('skinCareStaApp'));

  var OrdercompleteCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    OrdercompleteCtrl = $controller('OrdercompleteCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(OrdercompleteCtrl.awesomeThings.length).toBe(3);
  });
});
