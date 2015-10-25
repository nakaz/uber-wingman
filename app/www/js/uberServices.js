(function (){
  angular
    .module('wingman')
    .service('uberServices',
      ['$resource', '$rootScope', '$http', 'BASE_URL', 'UBER_API_ME', 'UBER_API_EP', 'UBER_API_TIME', 'UBER_API_RIDE', function ($resource, $rootScope, $http, BASE_URL, UBER_API_ME, UBER_API_EP, UBER_API_TIME, UBER_API_RIDE){

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
            return obj;
          });
      };

      this.requestRide = function (s_lat, s_long, e_lat, e_long, accessToken){

        $http({
          method: 'POST',
          url: UBER_API_RIDE,
          headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Access-Control-Allow-Origin': '*'
          },
          data: {
            product_id: 'uberX',
            start_latitude: s_lat,
            start_longitude: s_long,
            end_latitude: e_lat,
            end_longitude: e_long
          }
        }).then(function (res){
          console.log(res);
        }).catch(function (err){
          console.log('over here herror');
          console.error(err);
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