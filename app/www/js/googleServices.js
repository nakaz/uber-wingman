(function (){
  angular
    .module('wingman')
    .service('googleServices', ['$resource', 'BASE_URL',  function ($resource, BASE_URL){
      this.getVenues = function (latitude, longitude, radius){
        var location = latitude + ',' + longitude;
        var queryOptions = {
          location: location,
          radius: 3218.69, //equivalent of 2 miles
          types: 'bar'
        };

        var Venues = $resource(BASE_URL + '/api/venues', queryOptions);
        return Venues.query().$promise;
      };

    }]);
})();