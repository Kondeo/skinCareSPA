'use strict';

/**
 * @ngdoc function
 * @name skinCareStaApp.controller:MainCtrl
 * @description
 * # NavCtrl
 * Controller of the skinCareStaApp
 */
angular.module('skinCareStaApp')
  .controller('NavCtrl', function ($scope, $location, CartService) {
      $scope.isActive = function(path){
          return path === $location.path();
      }
      $scope.cart = CartService.getCart();
});
