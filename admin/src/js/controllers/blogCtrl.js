angular.module('SwipeAdmin').controller('BlogCtrl', BlogCtrl);

BlogCtrl.$inject = ['$scope', '$stateParams', 'BlogService'];

function BlogCtrl($scope, $stateParams, BlogService) {

  var blogId = $stateParams.blogId;

  $scope.blog = BlogService.Blog.get({
    blog_id: blogId
  });

  $scope.SaveBlog = function() {
    BlogService.Blog.update({
        blog_id: $scope.blog._id
      }, $scope.blog,
      function(data) {
        alert("Blog Saved!");
      },
      function(e) {
        // failure
        alert("Error");
      });
  }

  $scope.DeleteBlog = function() {
    var confirmDelete = confirm("Are you sure you want to delete this? You won't be able to get it back!");
    if (confirmDelete === true) {
      $scope.blog.$delete();
    }
  }

};
