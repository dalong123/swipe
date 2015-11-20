angular.module('SwipeAdmin').controller('BlogsCtrl', BlogsCtrl);

BlogsCtrl.$inject = ['$scope','BlogService'];

function BlogsCtrl($scope, BlogService){
  // $scope.blog = {};
  $scope.currentBlogs = [];
  // $scope.currentBlog = {};

  $scope.currentBlogs = BlogService.blog.query();
  // $scope.currentBlog = $scope.currentBlogs[0];
  // console.log($scope.currentBlogs);
  // console.log($scope.currentBlog);



  // BlogService.GetAllBlogs().then(function(result){
  //   $scope.currentBlogs = result.data;
  //   $scope.currentBlog = result.data[0];
  // });
  //
  // $scope.AddBlog = function(){
  //   BlogService.blog.save($scope.blog,
  //                  function(data) {
  //                     alert("Saved!");
  //                     $scope.curator = {};
  //                  }, function(e) {
  //                     // failure
  //                     alert("Error");
  //                  });
  //   // BlogService.CreateBlog($scope.blog).then(function(result){
  //   //   $scope.blog = {};
  //   //   alert("Added!");
  //   // });
  // }
  //
  // $scope.UpdateBlog = function(blog){
  //   BlogService.blogs.update({blog_id: blog._id},blog,
  //                  function(data) {
  //                     alert("Saved!");
  //
  //                  }, function(e) {
  //                     // failure
  //                     alert("Error");
  //                  });
  //   // BlogService.UpdateBlog(blog._id).then(function(result){
  //   //   alert("Updated!");
  //   // });
  // }
};
