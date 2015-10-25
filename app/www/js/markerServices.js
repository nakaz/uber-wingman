(function(){
  angular
    .module('wingman')
    .factory('MarkerService', function(){
      return {
        markers: [],
        createMarkers: function(x, y, id, label){
          var marker = {
            latitude: x,
            longitude: y,
            id: id,
            title: "m" + id,
            options: {
              clickable: true,
              label: label
            }
          };
          this.markers.push(marker);
        },
        deleteMarkers: function() {
          this.markers.splice(0, this.markers.length);
        }
      };
    });
})();