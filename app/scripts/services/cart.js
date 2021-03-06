angular.module('skinCareStaApp')
.factory("CartService", function($http, toasty) {
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

  service.getPromise = function(){
    return productLoader;
  }

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

  service.getProduct = function(index){
      return products[products.indexOf(index)];
  }

  service.getProducts = function(indexes){
    if(indexes){
      var selectedProducts = [];
      for(var i=0;i<indexes.length;i++){
        var product = { "item": products[indexes[i]], "specId": i };
        selectedProducts.push(product);
      }
      return selectedProducts;
    } else {
      return products;
    }
  }

  service.addItem = function(index){
      cart.push(index);
      localStorage.setItem("cart", JSON.stringify(cart));

      //Toast the addition
      if(products[index]) toasty.show('Added ' + products[index].name + ' to your cart!');
      else toasty.show('Added the item to your cart!');
  }

  service.removeItem = function(index){
      var index = cart.indexOf(index);
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));

      //Toast the removal
      if(products[index]) toasty.show('Removed ' + products[index].name + ' to your cart!');
      else toasty.show('Removed the item from your cart!');
  }

  service.clearCart = function(){
    cart.splice(0,cart.length);
    localStorage.removeItem("cart");
  }

  return service;
});
