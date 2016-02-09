'use strict';

/**
 * @ngdoc function
 * @name skinCareStaApp.controller:CartCtrl
 * @description
 * # CartCtrl
 * Controller of the skinCareStaApp
 */
angular.module('skinCareStaApp')
  .controller('CartCtrl', function ($scope, $location, $http, CartService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.total = 0;
    $scope.myCart = [];
    $scope.CONST = {};

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
        if($scope.myCart[i].item) total += parseInt($scope.myCart[i].item.price);
      }
      $scope.total = total;
    }

    $http.get('data/constants.json').then(function(res){
      $scope.CONST = res.data;
    });

    $scope.completeLoad = function(){
      $scope.myCart = CartService.getCartDetails();
      $scope.calcTotal();
      var angularURL = $location.protocol() + "://" + location.host + "/#/";
      var cartParams = "?v=";
      var cartIds = CartService.getCart();
      for(var i=0;i<cartIds.length;i++){
        cartParams += cartIds[i] + ",";
      }
      $scope.completeURL = angularURL + "cart/complete" + cartParams;
      $scope.cancelURL = angularURL + "cart";
    }

    CartService.getPromise().then($scope.completeLoad);
  });
