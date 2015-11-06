angular.module('starter.services', [])

.factory('LocalStorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}])

/**
 *
 */
.factory('Blog', function($http, $q, $filter, LocalStorage) {

  /**
   * [defer description]
   * @method defer
   * @return {[type]} [description]
   */
  var deferred = $q.defer();

  return {

    /**
     * [function description]
     * @method function
     * @return {[type]} [description]
     */
    getBlogs: function() {
      // Get the blogs object from localStorage, regardless of whether it's
      // defined or not
      var blogsLocalStore = LocalStorage.getObject('blogs');
      if(blogsLocalStore !== undefined){
        return blogsLocalStore;
      } else {
        getBlogsAsync().then(
          function(result) {
            // promise was fullfilled (regardless of outcome)
            // checks for information will be peformed here
            LocalStorage.setObject('blogs', result);
            return result;
          },
          function(error) {
            // handle errors here
            console.log(error.statusText);
          }
        );
      }
    },

    /**
     * [function description]
     * @method function
     * @return {[type]} [description]
     */
    getBlogsAsync: function() {
      return $http.get('blogs.json')
        .then(function(response) {
          // promise is fulfilled
          deferred.resolve(response.data);
          return deferred.promise;
        }, function(response) {
          // the following line rejects the promise
          deferred.reject(response);
          return deferred.promise;
        });
    },

    /**
     * [function description]
     * @method function
     * @param  {[type]}  kimonoId   [description]
     * @param  {Boolean} isOnDemand [description]
     * @return {[type]}             [description]
     */
    getFeedAsync: function(kimonoId, isOnDemand) {
      return $http.get('blogs.json')
        .then(function(response) {
          // promise is fulfilled
          deferred.resolve(response.data);
          return deferred.promise;
        }, function(response) {
          // the following line rejects the promise
          deferred.reject(response);
          return deferred.promise;
        });
    }
  }
});
