(function (){

  angular.module('wingman')
    .controller('mainController', [
        '$rootScope',
        '$scope',
        'BASE_URL',
        'geolocation',
        'MarkerService',
        'googleServices',
        'uiGmapGoogleMapApi',
         mainController
      ]);

  function mainController ($rootScope, $scope, BASE_URL, geolocation, MarkerService, googleServices, googleMaps) {
    $scope.uberLogin = function (){
      window.location.href = BASE_URL + '/login';
    };

    $rootScope.userLocation
      .then(function(position){
        googleServices
          .getVenues(position.coords.latitude, position.coords.longitude)
          .then(function(venues) {
            googleMaps
              .then(function(maps){
                $scope.map = {
                  center: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                  },
                  zoom: 15,
                  options: {disableDefaultUI: true},
                  control: {},
                };
              });
            for (var i = 0; i < venues.length; i++){
              MarkerService.createMarkers(venues[i].geometry.location.lat, venues[i].geometry.location.lng, i+1, venues[i].name);
            }
            var markersArr = MarkerService.markers;

            $scope.onClick = function (){
              console.log('working');
            };

            $scope.barMarkers = markersArr;
          });
      })
      .catch(function(error){
        console.log(error);
      });
    }
})();