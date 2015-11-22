angular.module('SwipeAdmin').controller('BlogsCtrl', BlogsCtrl);

BlogsCtrl.$inject = ['$scope','BlogService', '$modal'];

function BlogsCtrl($scope, BlogService,$modal){

  $scope.blogs = BlogService.Blogs.query();

  $scope.AddBlog = function(){
    var modalInstance = $modal.open({
      templateUrl: 'templates/addblog.html',
      controller: AddBlogCtrl
    });
  }

};
