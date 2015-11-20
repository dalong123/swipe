angular.module('SwipeAdmin').controller('BlogsCtrl', BlogsCtrl);

BlogsCtrl.$inject = ['$scope','BlogService'];

function BlogsCtrl($scope, BlogService){

  $scope.blogs = BlogService.Blogs.query();

};
