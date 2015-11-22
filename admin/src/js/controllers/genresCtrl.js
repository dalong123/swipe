angular.module('SwipeAdmin').controller('GenresCtrl', GenresCtrl);

GenresCtrl.$inject = ['$scope','GenreService'];

function GenresCtrl($scope, GenreService){

  $scope.genres = GenreService.Genres.query();

};
