'use strict';

/**
 * @ngdoc service
 * @name skinCareStaApp.toasty
 * @description
 * # toasty
 * Service in the skinCareStaApp.
 * Using ngToast: http://tamerayd.in/ngToast/#
 */
angular.module('skinCareStaApp')
  .service('toasty', function (ngToast) {

      //Make some config variables
      //Timeout in milliseconds
      var timeout = 2500;

      return {

          show: function(text) {

              ngToast.create({
                  timeout: timeout,
                  content: text
              });
          },

          removeAll: function() {

              //Dismiss all toasts
              ngToast.dismiss();
          }
      }
  });

  //Configure our toasts
angular.module('skinCareStaApp')
  .config(['ngToastProvider', function(ngToast) {

    //Also configure our toasts here
    ngToast.configure({
        horizontalPosition: 'left',
        additionalClasses: 'toastAnimate',
        maxNumber: 3
    });

  }])
