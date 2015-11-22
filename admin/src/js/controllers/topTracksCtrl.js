angular.module('SwipeAdmin').controller('TopTracksCtrl', TopTracksCtrl);

TopTracksCtrl.$inject = ['$scope','TopTracksService'];

function TopTracksCtrl($scope, TopTracksService){

  $scope.topTracks = TopTracksService.TopTracks.query();

  $scope.topTrack = TopTracksService.TopTrack.get({toptrack_id: $scope.topTracks[0]._id});

  $scope.RemoveSong = function(songIndex){
        $scope.topTracks[0].songs.splice(songIndex, 1);
  }

  $scope.SaveTopTracks= function() {
    TopTracksService.TopTracks.update($scope.topTracks, function(data) {
      alert("Top Tracks Saved!");

    },
    function(e) {
      // failure
      alert("Error");
    });
  }


};
