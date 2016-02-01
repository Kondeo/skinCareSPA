'use strict';

/**
 * @ngdoc function
 * @name skinCareStaApp.controller:CartCtrl
 * @description
 * # CartCtrl
 * Controller of the skinCareStaApp
 */
angular.module('skinCareStaApp')
  .controller('CartCtrl', function ($scope, CartService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.total = 0;
    $scope.myCart = CartService.getCartDetails();

    $scope.clearCart = function(){
      CartService.clearCart();
      $scope.myCart = CartService.getCartDetails();
      $scope.calcTotal();
    }

    $scope.removeItem = function(sku){
      CartService.removeItem(sku);
      $scope.myCart = CartService.getCartDetails();
      $scope.calcTotal();
    }

    $scope.calcTotal = function(){
      var total = 0;
      for(var i=0;i<$scope.myCart.length;i++){
        total += parseInt($scope.myCart[i].item.price);
      }
      $scope.total = total;
    }

    $scope.calcTotal();
  });
