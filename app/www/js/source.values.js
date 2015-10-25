(function (){
  var LOCALHOST = 'localhost';
  angular
    .module('wingman')
    .value('BASE_URL', 'http://' + LOCALHOST + ':8080');
})();