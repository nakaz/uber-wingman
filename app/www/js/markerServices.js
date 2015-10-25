(function(){
  angular
    .module('wingman')
    .factory('MarkerService', function(){
      return {
        markers: [],
        createMarkers: function(x, y, id){
          var marker = {
            latitude: x,
            longitude: y,
            id: id,
            title: "m" + id,
          };
          this.markers.push(marker);
        },
        deleteMarkers: function() {
          this.markers.splice(0, this.markers.length);
        }
      };
    });
})();