'use strict';

/**
 * @ngdoc overview
 * @name skinCareStaApp
 * @description
 * # skinCareStaApp
 *
 * Main module of the application.
 */
angular
  .module('skinCareStaApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngToast'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl',
        controllerAs: 'contact'
      })
      .when('/cart', {
        templateUrl: 'views/cart.html',
        controller: 'CartCtrl',
        controllerAs: 'cart'
      })
      .when('/cart/complete', {
        templateUrl: 'views/ordercomplete.html',
        controller: 'OrdercompleteCtrl',
        controllerAs: 'orderComplete'
      })
      .otherwise({
        redirectTo: '/'
      });
  })

//Also doing some configurations for our taosts
.config(['ngToastProvider', function(ngToast) {

  //Also configure our toasts here
  ngToast.configure({
      horizontalPosition: 'left',
      additionalClasses: 'toasty'
  });

}]);
