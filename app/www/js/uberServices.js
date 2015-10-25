(function (){
  angular
    .module('wingman')
    .service('uberServices', ['$resource', '$rootScope', 'BASE_URL', function ($resource, $rootScope, BASE_URL){

      this.getRideEstimate = function (){
        console.log(localStorage);

      };

    }]);


})();