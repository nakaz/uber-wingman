(function (){
  angular
    .module('wingman')
    .service('uberServices',
      ['$resource', '$rootScope', '$http', 'BASE_URL', 'UBER_API_ME', 'UBER_API_EP', 'UBER_API_TIME', function ($resource, $rootScope, $http, BASE_URL, UBER_API_ME, UBER_API_EP, UBER_API_TIME){

      this.getMe = function (accessToken){
        $http({
          method: 'GET',
          url: UBER_API_ME,
          headers: {
            'Authorization': 'Bearer ' + accessToken
          }
        }).catch(function (err){
          console.error(err);
        });
      };

      this.getUberData = function (s_lat, s_long, e_lat, e_long, accessToken){

        return getPriceEstimate(s_lat, s_long, e_lat, e_long, accessToken)
          .then(function (price){
            return getTimeEstimate(s_lat, s_long, accessToken)
              .then(function (time){
                return {
                  priceEstimate: price.data,
                  timeEstimate: time.data
                };
              });
          })
          .then(function (obj){
            console.log(obj);
          });
      };

      function getPriceEstimate (s_lat, s_long, e_lat, e_long, accessToken){
        return $http({
          method: 'GET',
          url: UBER_API_EP,
          headers: {
            'Authorization': 'Bearer ' + accessToken
          },
          params: {
            start_latitude: s_lat,
            start_longitude: s_long,
            end_latitude: e_lat,
            end_longitude: e_long
          }
        }).catch(function (err){
          console.error(err);
        });
      }

      function getTimeEstimate (s_lat, s_long, accessToken){
        return $http({
          method: 'GET',
          url: UBER_API_TIME,
          headers: {
            'Authorization': 'Bearer ' + accessToken
          },
          params: {
            start_latitude: s_lat,
            start_longitude: s_long
          }
        }).catch(function (err){
          console.error(err);
        });
      }

    }]);
})();