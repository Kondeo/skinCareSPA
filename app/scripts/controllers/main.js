'use strict';

/**
 * @ngdoc function
 * @name skinCareStaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the skinCareStaApp
 */
angular.module('skinCareStaApp')
  .controller('MainCtrl', function ($scope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.products = [];

    var oReq = new XMLHttpRequest();
    oReq.onload = reqListener;
    oReq.open("get", "../data/products.json", true);
    oReq.send();

    function reqListener(e) {
        $scope.products = JSON.parse(this.responseText);
    }
  });
