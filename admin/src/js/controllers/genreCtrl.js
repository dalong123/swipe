angular.module('SwipeAdmin').controller('GenreCtrl', GenreCtrl);

GenreCtrl.$inject = ['$scope', '$stateParams', 'GenreService'];

function GenreCtrl($scope, $stateParams, GenreService) {

  var genreId = $stateParams.genreId;

  $scope.genre = GenreService.Genre.get({
    genre_id: genreId
  });
  //
  // $scope.SaveBlog = function() {
  //   GenreService.Genre.update({
  //       genre_id: $scope.genre._id
  //     }, $scope.genre,
  //     function(data) {
  //       alert("Blog Saved!");
  //     },
  //     function(e) {
  //       // failure
  //       alert("Error");
  //     });
  // }
  //
  // $scope.DeleteBlog = function() {
  //   var confirmDelete = confirm("Are you sure you want to delete this? You won't be able to get it back!");
  //   if (confirmDelete === true) {
  //     GenreService.Genre.delete({
  //       genre_id: $scope.genre._id
  //       },null,
  //       function(data) {
  //         alert("Genre Deleted!");
  //       },
  //       function(e) {
  //         // failure
  //         alert("Error");
  //       });
  //   }
  //}

};
