(function (){
  angular
    .module('wingman')
    .service('uberServices',
      ['$resource', '$rootScope', '$http', 'BASE_URL', 'UBER_API_ME', 'UBER_API_EP', 'UBER_API_TIME', function ($resource, $rootScope, $http, BASE_URL, UBER_API_ME, UBER_API_EP, UBER_API_TIME){
      this.requestUberData = function (latitude, longitude, radius){
        var location = latitude + ',' + longitude;
        var queryOptions = {
          //insert query paramaters
        };

        //send to server api route
        var UberData = $resource(BASE_URL + '/api/venues', queryOptions);
        return UberData.query().$promise;
      };

      this.getMe = function (accessToken){
        $http({
          method: 'GET',
          url: UBER_API_ME,
          headers: {
            'Authorization': 'Bearer ' + accessToken
          }
        }).then(function (res){

        }).then(function (err){

        });
      };

      this.getPriceEstimate = function (accessToken){
        $http({
          method: 'GET',
          url: UBER_API_EP,
          headers: {
            'Authorization': 'Bearer ' + accessToken
          },
          params: {
            start_latitude: 21.308507,
            start_longitude: -157.818326,
            end_longitude: -157.8088867,
            end_latitude: 21.307977
          }
        }).then(function (res){
          console.log(res);
        }).then(function (err){
          console.error(err);
        });
      };

      this.getTimeEstimate = function (accessToken){
        $http({
          method: 'GET',
          url: UBER_API_TIME,
          headers: {
            'Authorization': 'Bearer ' + accessToken
          },
          params: {
            start_latitude: null,
            start_longitude: null
          }
        }).then(function (res){

        }).then(function (err){

        });
      };

    }]);
})();