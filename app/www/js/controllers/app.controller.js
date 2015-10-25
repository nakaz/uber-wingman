(function (){
  angular.module('wingman')
    .controller('mainController', [
        '$rootScope',
        '$scope',
        'geolocation',
        'googleServices',
        'uiGmapGoogleMapApi',
         mainController
      ]);

  function mainController ($rootScope, $scope, geolocation, googleServices, googleMaps) {
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