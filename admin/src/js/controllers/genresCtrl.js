angular.module('SwipeAdmin').controller('GenresCtrl', GenresCtrl);

GenresCtrl.$inject = ['$scope','GenreService','$modal'];

function GenresCtrl($scope, GenreService,$modal){

  $scope.genres = GenreService.Genres.query();

  $scope.AddGenre = function(){
    var modalInstance = $modal.open({
      templateUrl: 'templates/addgenre.html',
      controller: AddGenreCtrl
    });
  }

};
