(function (){
  var LOCALHOST = 'localhost';
  angular
    .module('wingman')
    .value('BASE_URL', 'http://' + LOCALHOST + ':8080')
    .value('UBER_API_ME', 'https://api.uber.com/v1/me')
    .value('UBER_API_EP', 'https://api.uber.com/v1/estimates/price')
    .value('UBER_API_TIME', 'https://api.uber.com/v1/estimates/time')
    .value('UBER_API_RIDE', 'https://sandbox-api.uber.com/v1/requests');
})();