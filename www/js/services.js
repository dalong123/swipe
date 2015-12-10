angular.module('swipe.services', [])

.factory('ImageService', function() {

  return {

    getImageClass: function() {
      var classes = [
        "ferns-bg"
      ]
      return classes[Math.floor(Math.random() * classes.length)];
    }
  }
})

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
      return $http.get('/api/' + itemTypeEnum)
    },

    performItemGET: function(itemId, itemTypeEnum) {
      return $http.get('/api/' + itemTypeEnum + '/' + itemId)
    }

  }
})

.factory('DataStore', function($http, $q, $timeout, $filter, LocalStorage, ApiFactory) {

  return {

    // This fucntion returns the results of a call to the api/blogs, api/genres,
    // etc. route
    getItemsAsync: function(itemTypeEnum, forceDbCall) {

      // get the item from localStorage. This will return an empty array on the
      // first vist. Each object is named in localStorage by its path name. this
      // function saves as blogs, genres, channels, etc.
      var itemObject = LocalStorage.getObject(itemTypeEnum);

      // get the lastUpdatedTime for the current object from localStorage and
      // default to an empty string if it doesn't exist yet
      var itemLastUpdated = LocalStorage.get(itemTypeEnum + 'LastUpdated', '');

      // This boolean determines whether the data is fresh enough. If not, we'll
      // abandon localStorage and make a call to the API. Default to true so we
      // hit the API on the first call visit
      var dataIsOutDated = true;

      // Check to see if the item has been updated yet
      if (!angular.equals('', itemLastUpdated)) {

        // Convert the value saved in localStorage to a Date object
        var lastUpdatedTime = new Date(itemLastUpdated);

        // Create a new Date object that is set to an hour before the current time
        // TODO: THIS SHOULD BE A CONSTANT OF SOMESORT IN THE DATASTORE. THE VALUE
        // CURRENTLY SET TO '60' IS THE NUMBER OF MINUTES THAT WILL BE SUBTRACTED
        // FROM THE CURRENT TIME
        var timeOffset = new Date(Date.now() - 30*60000);

        // Set the data freshness boolean:
        // This evaluates to false if that data has been updated within the past
        // hour and true otherwise
        dataIsOutDated = (lastUpdatedTime.getTime() < timeOffset.getTime());

      }

      // All data returning from the DataStore is expected to be async, so we're
      // injecting $q into the factory, even when returning from LocalStorage,
      // which is a synchronous call
      var deferred = $q.defer();

      // if the item in LocalStorage is not empty, and the data was retrieved
      // from LocalStorage recently enough, and we have not requested a forced
      // database call, return the value from LocalStorage
      if (!angular.equals({}, itemObject) && !dataIsOutDated && !forceDbCall)
      {
        // use $timeout in order to make the synchronous call to LocalStorage async.
        // We're setting the timeout time to 0. This whole thing is a bit hacky.
        // TODO: MAKE THIS ASYNC RESOLUTION LESS HACKY
        $timeout(function()
        {
          deferred.resolve(itemObject);
        }, 0);

        console.log('serving local');
        return deferred.promise;

      }
      else
      {
        return ApiFactory.performGET(itemTypeEnum)
          .then(function(response) {
            // Save the object to localStorage using the name of the route as the key
            LocalStorage.setObject(itemTypeEnum, response.data);
            var currTime = new Date(Date.now());
            // set the item's last updated time to the current time
            LocalStorage.set(itemTypeEnum + 'LastUpdated', currTime);
            deferred.resolve(response.data);
            console.log('serving from db');
            return deferred.promise;
          }, function(response) {
            //return an error
            deferred.reject(response);
            return deferred.promise;
          });
      }

    },

    // This fucntion returns the results of a call to the api/blogs/_id,
    // api/genres/_id, etc. route
    getItemByIDAsync: function(itemId, itemTypeEnum) {

      var itemObject = LocalStorage.getObject(itemId);

      var deferred = $q.defer();

      // There's no data freshness detection in the single item retrieval. The
      // thinking behind that is that if a user is reaching a singular route (ie. blog),
      // they've hit the plural page (ie. blogs) right before and therefore
      // the single item is likely in LocalStorage (especially on a mobile device,
      // as it's not possible to access routes directly). This route will be hit so
      // infrequently that it won't hurt to query the db.
      //
      // Aside from the lack of data freshness checking, this function operates
      // almost identically to the one above. If the item exists in LocalStorage
      // return it, otherwise call the ApiFactory to query the db.
      if (!angular.equals({}, itemObject))
      {
        $timeout(function() {
          deferred.resolve(itemObject);
        }, 0);
        console.log('serving local');
        return deferred.promise;
      }
      else
      {
        var itemObjects = LocalStorage.getObject(itemTypeEnum);

        if (!angular.equals({}, itemObjects)) {
          var result = $filter('filter')(itemObjects, {
            _id: itemId
          })[0];
          LocalStorage.setObject(itemId, result);
          $timeout(function() {
            deferred.resolve(result);
          }, 0);
          console.log('serving local');
          return deferred.promise;
        }
        else
        {
          return ApiFactory.performItemGET(itemId, itemTypeEnum)
            .then(function(response) {
              LocalStorage.setObject(itemId, response.data);
              deferred.resolve(response.data);
              console.log('serving from db');
              return deferred.promise;
            }, function(response) {
              deferred.reject(response);
              return deferred.promise;
            });
        }
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
      var URL = '/api/blogs/getfeed/' + kimonoId;

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
