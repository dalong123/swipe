/**
 * Master Controller
 */

angular.module('SwipeAdmin')
    .controller('GenresCtrl', ['$scope', GenreService, GenresCtrl]);

function GenresCtrl($scope, GenreService) {

  $scope.users = GenreService.query();

}
