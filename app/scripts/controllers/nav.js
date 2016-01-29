'use strict';

/**
 * @ngdoc function
 * @name skinCareStaApp.controller:MainCtrl
 * @description
 * # NavCtrl
 * Controller of the skinCareStaApp
 */
angular.module('skinCareStaApp')
  .controller('NavCtrl', function ($scope, $location) {
      $scope.isActive = function(path){
          return path === $location.path();
      }
});
