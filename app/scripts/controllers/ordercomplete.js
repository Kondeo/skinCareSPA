'use strict';

/**
 * @ngdoc function
 * @name skinCareStaApp.controller:OrdercompleteCtrl
 * @description
 * # OrdercompleteCtrl
 * Controller of the skinCareStaApp
 */
angular.module('skinCareStaApp')
  .controller('OrdercompleteCtrl', function ($scope, $location, CartService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var query = $location.search();

    var order = CartService.getProducts(query.v);

    $scope.orderItems = order;

    $scope.total = 0;

    $scope.calcTotal = function(){
      var total = 0;
      for(var i=0;i<order.length;i++){
        if(order[i].item) total += parseInt(order[i].item.price);
      }
      $scope.total = total;
    }

    $scope.calcTotal();

  });
