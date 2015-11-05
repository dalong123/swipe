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

.factory('Blog', function($http) {
  var blogs = [{
    title: 'Pigeons & Planes',
    id: 1,
    image: '',
    url: '',
    kimonoId: ''
  }, {
    title: 'Soulection',
    id: 2,
    image: '',
    url: '',
    kimonoId: ''
  }, {
    title: 'HypeM',
    id: 3,
    image: '',
    url: '',
    kimonoId: ''
  }, {
    title: 'Pigeons & Planes',
    id: 4,
    image: '',
    url: '',
    kimonoId: ''
  }, {
    title: 'Pigeons & Planes',
    id: 5,
    image: '',
    url: '',
    kimonoId: ''
  }];

  return {
    getBlogs: function() {
      return blogs;
    }
  }
})

.factory('API', function($http) {
  return {

  }
});
