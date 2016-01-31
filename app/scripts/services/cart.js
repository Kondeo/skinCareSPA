angular.module('skinCareStaApp').factory("CartService", function() {
  var cart;

  if(localStorage.getItem("cart")){
      cart = JSON.parse(localStorage.getItem("cart"));
  } else {
      cart = [];
  }

  var service = {};
  service.get = function(){
      return cart;
  }

  service.addItem = function(sku){
      cart.push(sku);
      localStorage.setItem("cart", JSON.stringify(cart));
  }

  service.removeItem = function(sku){
      var index = cart.indexOf(5);
      cart.splice(index, 1);
  }

  return service;
});
