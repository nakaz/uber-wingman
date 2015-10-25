(function (){

  angular.module('wingman')
    .controller('mainController', [
        '$rootScope',
        '$scope',
        'BASE_URL',
        'geolocation',
        'googleServices',
        'uiGmapGoogleMapApi',
         mainController
      ]);

  function mainController ($rootScope, $scope, BASE_URL, geolocation, googleServices, googleMaps) {
    $scope.uberLogin = function (){
      window.location.href = BASE_URL + '/login';
    };

    $rootScope.userLocation
      .then(function(position){
        $scope.position = position;
        $scope.map = {
          center: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          },
          zoom: 15,
          options: {disableDefaultUI: true},
          control: {}
        };
        googleServices
          .getVenues(position.coords.latitude, position.coords.longitude)
          .then(function(venues) {
            console.log(venues);
          });
      })
      .catch(function(error){
        console.log(error);
      });
    }
})();