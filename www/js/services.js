angular.module('swipe.services', [])

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
.factory('Blog', function($http, $q) {

  return {

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
})

.factory('ApiFactory', function($http) {
  return {

    performGET: function(itemTypeEnum) {
      return $http.get('http://localhost:8888/api/' + itemTypeEnum)
    },

    performItemGET: function(itemId, itemTypeEnum) {
      return $http.get('http://localhost:8888/api/' + itemTypeEnum + '/' + itemId)
    }

  }
})

.factory('DataStore', function($http, $q, LocalStorage, ApiFactory) {

  return {

    // This fucntion returns the results of a call to the api/blogs, api/genres, etc. route
    getItemsAsync: function(itemTypeEnum) {

      var itemObject = LocalStorage.getObject(itemTypeEnum);

      var deferred = $q.defer();

      // if(!angular.equals({}, itemObject))

      return ApiFactory.performGET(itemTypeEnum)
        .then(function(response) {
          // promise is fulfilled
          LocalStorage.setObject(itemTypeEnum, response.data);
          deferred.resolve(response.data);
          return deferred.promise;
        }, function(response) {
          // the following line rejects the promise
          deferred.reject(response);
          return deferred.promise;
        });

    },

    // This fucntion returns the results of a call to the api/blogs/id, api/genres/id, etc. route
    getItemByIDAsync: function(itemId, itemTypeEnum) {

      var itemObject = LocalStorage.getObject(itemId);

      var deferred = $q.defer();

      return ApiFactory.performItemGET(itemId, itemTypeEnum)
        .then(function(response) {
          // promise is fulfilled
          LocalStorage.setObject(itemId, response.data);
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
