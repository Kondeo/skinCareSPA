'use strict';

/**
 * @ngdoc function
 * @name skinCareStaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the skinCareStaApp
 */
angular.module('skinCareStaApp')
  .controller('MainCtrl', function ($scope, $http, CartService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.products = CartService.getProducts();

    $scope.addToCart = function(index){
        CartService.addItem(index);
    }
  });
