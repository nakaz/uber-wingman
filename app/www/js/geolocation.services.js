(function (){
  angular
    .module('wingman')
    .factory('geolocation', ['$q', '$window', '$rootScope', '$ionicPlatform', '$cordovaGeolocation', function($q, $window, $rootScope, $ionicPlatform, $cordovaGeolocation){

      return function(){
        var deferred = $q.defer();

        $ionicPlatform.ready(function (){
          if(ionic.Platform.isIOS() || ionic.Platform.isAndroid()){
            var posOptions = {timeout: 10000, enableHighAccuracy: false};

            $rootScope = $cordovaGeolocation
              .getCurrentPosition(posOptions)
              .then(function (position){
                deferred.resolve(position);
              })
              .catch(function (err){
                deferred.reject(err);
              });
          } else if(!$window.navigator){
            $rootScope.$apply(function(){
              deferred.reject(new Error("Geolocation not supported"));
            });
          } else {
            $window.navigator.geolocation.getCurrentPosition(function(position){
              $rootScope.$apply(function(){
                deferred.resolve(position);
              });
            }, function (error){
              $rootScope.$apply(function(){
                deferred.reject(error);
              });
            });
          }
        });

        return deferred.promise;
      };

    }]);
})();