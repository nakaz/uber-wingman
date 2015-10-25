(function (){
  angular
    .module('wingman')
    .controller('mainController', ['$scope', mainController]);

  function mainController ($scope){
    $scope.login = function (){
      window.location.href = '/login';
    };
  }
})();