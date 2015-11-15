angular.module('starter.services', [])

/**
 * [factory description]
 * @method factory
 * @param  {[type]} 'LocalStorage'   [description]
 * @param  {[type]} ['$window'       [description]
 * @param  {[type]} function($window [description]
 * @return {[type]}                  [description]
 */
.factory('LocalStorage', ['$window', function($window) {

  return {

    /**
     * [function description]
     * @method function
     * @param  {[type]} key   [description]
     * @param  {[type]} value [description]
     * @return {[type]}       [description]
     */
    set: function(key, value) {
      $window.localStorage[key] = value;
    },

    /**
     * [function description]
     * @method function
     * @param  {[type]} key          [description]
     * @param  {[type]} defaultValue [description]
     * @return {[type]}              [description]
     */
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },

    /**
     * [function description]
     * @method function
     * @param  {[type]} key   [description]
     * @param  {[type]} value [description]
     * @return {[type]}       [description]
     */
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },

    /**
     * [function description]
     * @method function
     * @param  {[type]} key [description]
     * @return {[type]}     [description]
     */
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}])

/**
 * [factory description]
 * @method factory
 * @param  {[type]} 'Sounds'        [description]
 * @param  {[type]} function($http, $q            [description]
 * @return {[type]}                 [description]
 */
.factory('Sounds', function($http, $q) {

  return {

    /**
     * [function description]
     * @method function
     * @return {[type]} [description]
     */
    getSoundsAsync: function() {

      var deferred = $q.defer();

      return $http.get('sounds.json')
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
})

/**
 *
 */
.factory('Blog', function($http, $q, $filter) {

  return {

    /**
     * [function description]
     * @method function
     * @return {[type]} [description]
     */
    getBlogsAsync: function() {

      var deferred = $q.defer();
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
     * @param  {String}  kimonoId   [The blog's unique kimonoID]
     * @param  {Boolean} isOnDemand [description]
     * @return {[type]}             [description]
     */
    getFeedAsync: function(kimonoId, isOnDemand) {

      var deferred = $q.defer();
      var URL = 'http://localhost:8888/api/blogs/getfeed/' + kimonoId;

      return $http.get(URL)
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
