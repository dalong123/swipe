angular.module('starter.services', [])

/**
 * Very simple service that returns data from an unoffical HN api.
 */
.factory('Stories', function($http) {
  return {
    //Gets a list of the front page stories and calls the passed function with
    //that list.
    getStoriesAsync: function(callback) {
    var URL = 'http://node-hnapi.herokuapp.com/news';
    $http.get(URL).success(callback);
    },
    //Gets the story by the given ID, and calls the passed function with the
    //story object.
    getStoryByIDAsync: function(storyID, callback){
        var URL = 'http://node-hnapi.herokuapp.com/item/' + storyID;
        $http.get(URL).success(callback);
    }
  }
})

/**
 *
 */
.factory('Blog', function($http, $filter) {

  return {
    getBlogsAsync: function(callback) {
      $http.get('blogs.json').success(callback);
    },
    getBlog: function(blogId) {
      var blog = {};
      $http.get('blogs.json').success(function(data) {
        blog = $filter('filter')(data, {id:blogId})[0];
        console.log(blog.title);
        return blog;
      });
    }
  }
});

/**
 *
 */
// .factory('API', function($http) {
//   return {
//     getBlogsAsync: function(callback) {
//       var URL = 'http://node-hnapi.herokuapp.com/news';
//       $http.get(URL).success(callback);
//     },
//     getBlogAsync: function(kimonoId, callback) {
//       var URL = 'http://node-hnapi.herokuapp.com/item/' + kimonoId;
//       $http.get(URL).success(callback);
//     }
//   }
// });
