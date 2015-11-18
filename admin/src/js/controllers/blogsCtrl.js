angular.module('SwipeAdmin').controller('BlogsCtrl', BlogsCtrl);

BlogsCtrl.$inject = ['$scope','BlogService'];

function BlogsCtrl($scope, BlogService){
  $scope.blog = {};
  $scope.currentBlogs = {};

  BlogService.GetAllBlogs().then(function(result){
    $scope.currentBlogs = result.data;
  });

  $scope.AddBlog = function(){
    BlogService.CreateBlog($scope.blog).then(function(result){
      $scope.blog = {};
      alert("Added!");
    });
  }

  $scope.UpdateBlog = function(blog){
    BlogService.UpdateBlog(blog._id).then(function(result){
      alert("Updated!");
    });
  }
};
