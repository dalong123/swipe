angular.module('SwipeAdmin').controller('AddGenreCtrl', AddGenreCtrl);

AddGenreCtrl.$inject = ['$scope', '$modalInstance', 'GenreService'];

function AddGenreCtrl($scope, $modalInstance, GenreService) {


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
