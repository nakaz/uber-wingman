(function (){
  angular
    .module('wingman')
    .factory('geolocation', ['$q', '$window', '$rootScope', '$ionicPlatform', function($q, $window, $rootScope, $ionicPlatform){

      return function(){
        var deferred = $q.defer();

        $ionicPlatform.ready(function (){
          if(!$window.navigator){
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