angular.module('SwipeAdmin').controller('AddGenreCtrl', AddGenreCtrl);

AddGenreCtrl.$inject = ['$scope', '$modalInstance', 'GenreService'];

function AddGenreCtrl($scope, $modalInstance, GenreService) {

  $scope.genre = {};
  $scope.genre.songs = [];

  $scope.AddSong = function(song){
    $scope.genre.songs.push(song);
    $scope.newSong = {};
  }

  $scope.RemoveSong = function(songIndex){
        $scope.genre.songs.splice(songIndex, 1);
  }

  $scope.SaveGenre = function(){
    GenreService.Genres.save($scope.genre,
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
