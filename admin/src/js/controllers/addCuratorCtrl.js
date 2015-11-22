angular.module('SwipeAdmin').controller('AddCuratorCtrl', AddCuratorCtrl);

AddCuratorCtrl.$inject = ['$scope', '$modalInstance', 'CuratorService'];

function AddCuratorCtrl($scope, $modalInstance, CuratorService) {


  $scope.AddSong = function(song){
    if($scope.curator.songs == null){
      $scope.curator.songs = [];
    }
    $scope.curator.songs.push(song);
    $scope.newSong = {};
  }

  $scope.RemoveSong = function(songIndex){
        $scope.curator.songs.splice(songIndex, 1);
  }

  $scope.SaveCurator = function(){
    CuratorService.Curators.save($scope.curator,
      function(data) {
        alert("Curator Added!");
      },
      function(e) {
        // failure
        alert("Error");
      });
  }

  $scope.Close = function(){
    $modalInstance.close();
  }

};
