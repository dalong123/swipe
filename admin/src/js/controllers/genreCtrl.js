angular.module('SwipeAdmin').controller('GenreCtrl', GenreCtrl);

GenreCtrl.$inject = ['$scope', '$stateParams', 'GenreService'];

function GenreCtrl($scope, $stateParams, GenreService) {

  var genreId = $stateParams.genreId;

  $scope.genre = [];

  $scope.genre = GenreService.Genre.get({
    genre_id: genreId
  });

  $scope.sortableOptions = {
     containment: '#sortable-container'
   };
   

  $scope.AddSong = function(song) {
    $scope.genre.songs.push(song);
    $scope.newSong = {};
  }

  $scope.RemoveSong = function(songIndex) {
    var confirmDelete = confirm("Are you sure you want to delete this? You won't be able to get it back!");
    if (confirmDelete === true) {
      $scope.genre.songs.splice(songIndex, 1);
    }
  }

  $scope.SaveGenre = function() {
    GenreService.Genre.update({
        genre_id: $scope.genre._id
      }, $scope.genre,
      function(data) {
        alert("Genre Saved!");
      },
      function(e) {
        // failure
        alert("Error");
      });
  }

  $scope.DeleteGenre = function() {
    var confirmDelete = confirm("Are you sure you want to delete this? You won't be able to get it back!");
    if (confirmDelete === true) {
      GenreService.Genre.delete({
          genre_id: $scope.genre._id
        }, null,
        function(data) {
          alert("Genre Deleted!");
          window.location.href = "/#/genres";
        },
        function(e) {
          // failure
          alert("Error");
        });
    }
  }
};
