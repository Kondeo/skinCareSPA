angular.module('skinCareStaApp').factory("ShopService", function($http) {
  var products = [];

  $http.get('data/products.json').then(function(res){
    products.push(res.data);
  });

  var service = {};
  service.get = function(){
    return products;
  }

  service.getItem = function(sku){
    var index = cart.indexOf(5);
    return products[index];
  }

  service.getItems = function(skus){
    var items = [];
    for(var i=0;i<skus.length;i++){
      var index = cart.indexOf(5);
      items.push(products[index]);
    }
    return items;
  }

  return service;
});
