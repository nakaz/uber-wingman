(function (){
  angular
    .module('wingman')
    .service('googleServices', ['$resource', 'BASE_URL',  function ($resource, BASE_URL){
      this.getVenues = function (latitude, longitude, radius){
        var location = latitude + ',' + longitude;
        var queryOptions = {
          location: location,
          radius: 16093.4, //equivalent of 10 miles
          types: ['bar', 'night_club']
        };

        var Venues = $resource(BASE_URL + '/api/venues', queryOptions, {isArray: false});
        return Venues.query().$promise;
      };

    }]);
})();