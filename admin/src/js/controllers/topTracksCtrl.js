angular.module('SwipeAdmin').controller('TopTracksCtrl', TopTracksCtrl);

TopTracksCtrl.$inject = ['$scope','TopTracksService'];

function TopTracksCtrl($scope, TopTracksService){

  TopTracksService.GetAllTopTracks().then(function(result){
      $scope.topTrack = result.data[0];
  });

  $scope.AddSong = function(song){
    $scope.topTrack.songs.push(song);
    $scope.newSong = {};
  }

  $scope.RemoveSong = function(songIndex){
        $scope.topTrack.songs.splice(songIndex, 1);
  }

  $scope.SaveTopTracks= function() {
    TopTracksService.UpdateTrack($scope.topTrack._id,$scope.topTrack).then(function(result){
      alert("Top Tracks Saved!");
    });
  }


};
