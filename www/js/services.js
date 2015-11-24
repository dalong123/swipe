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

.factory('Pouch', function() {
  var db = new PouchDB('swipe'); // <--- this one uses any available adapter
  // var idb = new PouchDB('idbpouch', {adapter: 'idb'}); // <--- this one uses
  // IndexedDB
  //var websql = new PouchDB('websqlpouch', {adapter: 'websql'}); // <--- this
  //one uses WebSQL

  var pouchdbSupported = !!db.adapter;
  //$scope.idbSupported = !!idb.adapter;
  //$scope.websqlSupported = !!websql.adapter;
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

.factory('DataStore', function($http, $q, $timeout, $filter, LocalStorage, ApiFactory) {

  return {

    // This fucntion returns the results of a call to the api/blogs, api/genres,
    // etc. route
    getItemsAsync: function(itemTypeEnum) {

      var itemObject = LocalStorage.getObject(itemTypeEnum);

      var deferred = $q.defer();

      if (!angular.equals({}, itemObject))
      {
        $timeout(function(){
          deferred.resolve(itemObject);
        },100);
        return deferred.promise;
      }
      else
      {
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
      }

    },

    // This fucntion returns the results of a call to the api/blogs/id,
    // api/genres/id, etc. route
    getItemByIDAsync: function(itemId, itemTypeEnum) {

      var itemObject = LocalStorage.getObject(itemId);

      var deferred = $q.defer();

      if (itemTypeEnum !== 'blogs')
      {
        var itemObjects = LocalStorage.getObject(itemTypeEnum);

        if (!angular.equals({}, itemObjects))
        {
          var result = $filter('filter')(itemObjects, {_id: itemId})[0];
          $timeout(function()
          {
            deferred.resolve(result);
          },100);
          return deferred.promise;
        }
      }

      if (!angular.equals({}, itemObject))
      {
        $timeout(function()
        {
          deferred.resolve(itemObject);
        },100);
        return deferred.promise;
      }
      else
      {
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
    },

    /**
     * [function description]
     * @method function
     * @param  {String}  kimonoId   [The blog's unique kimonoID]
     * @param  {Boolean} isOnDemand [description]
     * @return {[type]}             [description]
     */
    getBlogFeedAsync: function(kimonoId, isOnDemand) {

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
