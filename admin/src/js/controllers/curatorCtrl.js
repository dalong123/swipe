angular.module('SwipeAdmin').controller('CuratorCtrl', CuratorCtrl);

CuratorCtrl.$inject = ['$scope', '$stateParams', 'CuratorService'];

function CuratorCtrl($scope, $stateParams, CuratorService) {

  var curatorId = $stateParams.curatorId;

  $scope.curator = [];

  $scope.curator = CuratorService.Curator.get({
    curator_id: curatorId
  });

  $scope.SaveCurator = function() {
    CuratorService.Curator.update({
        curator_id: $scope.curator._id
      }, $scope.curator,
      function(data) {
        alert("Curator Saved!");
      },
      function(e) {
        // failure
        alert("Error");
      });
  }

  $scope.AddSong = function(song){
    $scope.curator.songs.push(song);
    $scope.newSong = {};
  }

  $scope.RemoveSong = function(songIndex){
        $scope.curator.songs.splice(songIndex, 1);
  }

  $scope.DeleteCurator = function() {
    var confirmDelete = confirm("Are you sure you want to delete this? You won't be able to get it back!");
    if (confirmDelete === true) {
      CuratorService.Curator.delete({
        curator_id: $scope.curator._id
        },null,
        function(data) {
          alert("Curator Deleted!");
        },
        function(e) {
          // failure
          alert("Error");
        });
    }
  }

};
