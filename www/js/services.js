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
.factory('Blog', function($http, $q, $filter) {

  var deferred = $q.defer();

  return {
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
