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

    $scope.accessToken = localStorage.getItem("auth_token");

    var e_lat;
    var e_long;

    $scope.requestUber = function (){
      console.log('halsdfasdjasd');
      $rootScope.userLocation
        .then(function (position){
          var s_lat = position.coords.latitude;
          var s_long = position.coords.longitude;

          uberServices
            .requestRide(s_lat, s_long, e_lat, e_long, $scope.accessToken);
        }).catch(function (err){
          console.error(err);
        });

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
                for (var i = 0; i < venues.length; i++){
                  MarkerService.createMarkers(venues[i].geometry.location.lat, venues[i].geometry.location.lng, i+1, venues[i].name);
                }
                var markersArr = MarkerService.markers;
                var selectedMarker = null;
                $scope.onClick = function (){
                  selectedMarker = arguments[2];
                  $scope.name = selectedMarker.options.label;
                  e_lat = selectedMarker.latitude;
                  e_long = selectedMarker.longitude;

                  $rootScope.userLocation
                    .then(function(position){
                      var s_lat = position.coords.latitude;
                      var s_long = position.coords.longitude;

                      uberServices
                        .getUberData(s_lat, s_long, e_lat, e_long, $scope.accessToken)
                          .then(function (uberData){
                            var priceEstimate = uberData.priceEstimate;
                            var timeEstimate = uberData.timeEstimate;

                            $scope.price = priceEstimate.prices[0].estimate;
                            $scope.time = timeEstimate.times[0].estimate;
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