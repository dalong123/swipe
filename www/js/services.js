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
  // return {
  //   var blogs = [{
  //     title: 'Swipe down to clear the card',
  //     image: 'img/pic.png'
  //   }, {
  //     title: 'Where is this?',
  //     image: 'img/pic.png'
  //   }, {
  //     title: 'What kind of grass is this?',
  //     image: 'img/pic2.png'
  //   }, {
  //     title: 'What beach is this?',
  //     image: 'img/pic3.png'
  //   }, {
  //     title: 'What kind of clouds are these?',
  //     image: 'img/pic4.png'
  //   }];
  // }
})

.factory('API', function($http) {
  return {

  }
});
