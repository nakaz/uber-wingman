(function (){
  angular
    .module('wingman')
    .service('uberServices',
      ['$resource', '$rootScope', '$http', 'BASE_URL', 'UBER_API_ME', 'UBER_API_EP', function ($resource, $rootScope, $http, BASE_URL, UBER_API_ME, UBER_API_EP){
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


        // var Me = $resource(UBER_API_ME, queryOptions, actions);
        // return Me.query().$promise;

      };

    }]);
})();

// $http({
//   method: 'GET',
//   url: '/someUrl'
// }).then(function successCallback(response) {
//     // this callback will be called asynchronously
//     // when the response is available
//   }, function errorCallback(response) {
//     // called asynchronously if an error occurs
//     // or server returns response with an error status.
//   });