(function (){
  angular.module('wingman')
    .controller('mainController', [
        '$rootScope',
        '$scope',
        'geolocation',
        'uiGmapGoogleMapApi',
         mainController
      ]);

  function mainController ($rootScope, $scope, geolocation, googleMaps) {
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
      })
      .catch(function(error){
        console.log(error);
      });
    }
})();