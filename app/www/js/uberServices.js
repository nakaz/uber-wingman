(function (){
  angular
    .module('wingman')
    .service('uberServices', ['$resource', '$rootScope', 'BASE_URL',  function ($resource, $rootScope, BASE_URL){
      this.requestUberData = function (latitude, longitude, radius){
        var location = latitude + ',' + longitude;
        var queryOptions = {
          //insert query paramaters
        };

        //send to server api route
        var UberData = $resource(BASE_URL + '/api/venues', queryOptions);
        return UberData.query().$promise;
      };

    }]);
})();