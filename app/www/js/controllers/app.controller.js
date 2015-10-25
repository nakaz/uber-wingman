(function (){

  angular.module('wingman')
    .controller('mainController', [
        '$rootScope',
        '$scope',
        'BASE_URL',
        'geolocation',
        'MarkerService',
        'uberServices',
        'googleServices',
        'uiGmapGoogleMapApi',
         mainController
      ]);

  function mainController ($rootScope, $scope, BASE_URL, geolocation, MarkerService, uberServices, googleServices, googleMaps) {
    $scope.uberLogin = function (){
      window.location.href = BASE_URL + '/login';
    };

    //pretend protyping
    $scope.chosen = false;
    $scope.chosed = function (){
      if ($scope.chosen === false){
        $scope.chosen = true;
        $scope.name = "Bevy Bar";
        $scope.price = "$5";
        $scope.time = "15";
      }else if ($scope.chosen === true){
        $scope.chosen = false;
        $scope.name = "";
        $scope.price = "";
        $scope.time = "";
      }
    };

    $scope.accessToken = localStorage.getItem("auth_token");

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
                for (var i = 0; i < venues.length; i++){
                  MarkerService.createMarkers(venues[i].geometry.location.lat, venues[i].geometry.location.lng, i+1, venues[i].name);
                }
                var markersArr = MarkerService.markers;
                var selectedMarker = null;
                $scope.onClick = function (){
                  selectedMarker = arguments[2];
                  $scope.name = selectedMarker.options.label;
                  var e_lat = selectedMarker.latitude;
                  var e_long = selectedMarker.longitude;

                  $rootScope.userLocation
                    .then(function(position){
                      var s_lat = position.coords.latitude;
                      var s_long = position.coords.longitude;

                      uberServices
                        .getUberData(s_lat, s_long, e_lat, e_long, $scope.accessToken)
                          .then(function (uberData){
                            console.log(uberData);
                          });
                    });
                };

                //when click request ride button, use uberServices.requestUberData(selectedMarker) to with selectedMarker values

                $scope.barMarkers = markersArr;
              });

          });
      })
      .catch(function(error){
        console.log(error);
      });
    }
})();