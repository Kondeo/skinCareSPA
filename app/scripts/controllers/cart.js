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

    $scope.checkoutPayPal = function (parms, clearCart) {

      // global data
      var data = {
        cmd: "_cart",
        business: parms.merchantID,
        upload: "1",
        rm: "2",
        charset: "utf-8"
      };

      // item data
      for (var i = 0; i < this.items.length; i++) {
        var item = this.items[i];
        var ctr = i + 1;
        data["item_number_" + ctr] = item.sku;
        data["item_name_" + ctr] = item.name;
        data["quantity_" + ctr] = item.quantity;
        data["amount_" + ctr] = item.price.toFixed(2);
      }

      // build form
      var form = $('<form></form>');
      form.attr("action", "https://www.paypal.com/cgi-bin/webscr");
      form.attr("method", "POST");
      form.attr("style", "display:none;");
      this.addFormFields(form, data);
      this.addFormFields(form, parms.options);
      $("body").append(form);

      form.submit();
      form.remove();
    }
  });
