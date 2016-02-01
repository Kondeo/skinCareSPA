angular.module('skinCareStaApp').factory("CartService", function($http) {
  var cart;

  var products = [];

  var productLoader = $http.get('data/products.json').then(function(res){
    for(var i=0;i<res.data.length;i++){
      products.push(res.data[i]);
    }
  });

  if(localStorage.getItem("cart")){
      cart = JSON.parse(localStorage.getItem("cart"));
  } else {
      cart = [];
  }

  var service = {};

  service.getCart = function(){
      return cart;
  }

  service.getCartDetails = function(){
      var cartDetails = [];
      for(var i=0;i<cart.length;i++){
        var product = { "item": products[cart[i]], "cartId": i };
        cartDetails.push(product);
      }
      return cartDetails;
  }

  service.getProduct = function(sku){
      return products[products.indexOf(sku)];
  }

  service.getProducts = function(){
      return products;
  }

  service.addItem = function(sku){
      cart.push(sku);
      localStorage.setItem("cart", JSON.stringify(cart));
  }

  service.removeItem = function(sku){
      var index = cart.indexOf(sku);
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
  }
  service.clearCart = function(sku){
    cart.splice(0,cart.length);
    localStorage.removeItem("cart");
  }

  return service;
});
