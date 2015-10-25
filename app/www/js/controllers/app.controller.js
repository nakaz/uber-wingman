(function (){
  angular
    .module('wingman')
    .controller('mainController', ['$scope', '$http', 'BASE_URL', mainController]);

  function mainController ($scope, $http, BASE_URL){
    $scope.uberLogin = function (){
      window.location.href = BASE_URL + '/login';
    };
  }
})();