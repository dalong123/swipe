angular.module('swipe.controllers', [])

/**
 * 	With view caching in Ionic, Controllers are only called
 *   when they are recreated or on app start, instead of every page change.
 *   To listen for when this page is active (for example, to refresh data),
 *   listen for the $ionicView.enter event:
 *   $scope.$on('$ionicView.enter', function(e) {
 *   });
 */
.controller('AppCtrl', function($scope, $rootScope, $ionicModal, $timeout, ImageService) {

  $rootScope.bgImg = ImageService.getImageClass();

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

/**
 * [controller description]
 * @method controller
 * @param  {[type]}   'ModalCtrl'      [description]
 * @param  {[type]}   function($scope, $ionicModal   [description]
 * @return {[type]}                    [description]
 */
.controller('ModalCtrl', function($scope, $ionicModal) {

  $ionicModal.fromTemplateUrl('templates/post-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });

})

/**
 * [controller description]
 * @method controller
 * @param  {[type]}   'HomeCtrl'       [description]
 * @param  {[type]}   function($scope, $q,           $ionicLoading, Sounds, Blog [description]
 * @return {[type]}                    [description]
 */
.controller('HomeCtrl', function($scope, $ionicLoading, DataStore) {

  $scope.$on('$ionicView.enter', function(e) {

    $ionicLoading.show({
      content: 'Loading',
      template: '<ion-spinner icon="ripple"></ion-spinner>',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });

    $scope.date = new Date();
    // Make calls to the API/Blog services as necessary and initialize all
    // view-centric variables
    DataStore.getItemsAsync('toptracks', false).then(
      function(result) {
        // promise was fullfilled (regardless of outcome)
        // checks for information will be peformed here
        var topSongsObj = result[0];
        $scope.sounds = topSongsObj.songs;
        $ionicLoading.hide();
      },
      function(error) {
        // handle errors here
        console.log(error.statusText);
      }
    );
    DataStore.getBlogFeedAsync("d3cthg28", 1).then(
      function(response) {
        // promise was fullfilled (regardless of outcome)
        $scope.blogs = response;
        $ionicLoading.hide();
      },
      function(error) {
        // handle errors here
        console.log(error.statusText);
      }
    );
  });

})

/**
 * [controller description]
 * @method controller
 * @param  {[type]}   'BlogsCtrl'      [description]
 * @param  {[type]}   function($scope, $q,           $ionicLoading, Blog, LocalStorage [description]
 * @return {[type]}                    [description]
 */
.controller('BlogsCtrl', function($scope, $ionicLoading, DataStore) {

  // This is the ionic-specific funtion used to target the view's entry. As a
  // result of template caching, this controller is only called when one of its
  // views is rendered
  $scope.$on('$ionicView.enter', function(e) {

    $ionicLoading.show({
      content: 'Loading',
      template: '<ion-spinner icon="ripple"></ion-spinner>',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });

    DataStore.getItemsAsync('blogs', false).then(
      function(result) {
        $scope.blogs = result;
        $ionicLoading.hide();
      },
      function(error) {
        // handle errors here
        console.log(error.statusText);
      }
    );
  });

  $scope.doRefresh = function() {
    DataStore.getItemsAsync('blogs', true).then(
      function(result) {
        $scope.blogs = result;
        // Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');
      },
      function(error) {
        console.log(error.statusText);
      }
    );
  }
})

// We need to figure out a way to pass the entire blog object via the router,
// rather than fetching all of blogs.json and doing id filtering on it.
/**
 * [controller description]
 * @method controller
 * @param  {[type]}   'BlogCtrl'       [description]
 * @param  {[type]}   function($scope, $stateParams, $filter, $ionicSwipeCardDelegate, $ionicModal, $ionicLoading, Blog, LocalStorage [description]
 * @return {[type]}                    [description]
 */
.controller('BlogCtrl', function($scope, $stateParams, $ionicSwipeCardDelegate, $ionicModal, $ionicLoading, DataStore) {

  var blogId = '';
  var cardTypes = [];

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/post-modal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.$on('$ionicView.enter', function(e) {

    $ionicLoading.show({
      content: 'Loading',
      template: '<ion-spinner icon="ripple"></ion-spinner>',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });

    blogId = $stateParams.blogId;

    // the current index of the card being displayed to the user
    $scope.currentIndex = 0;

    // take in the route param for the specific view (IT SHOULD BE A NUMBER)
    if (blogId === 'all') {
      // Build out our blog object for the all blogs view. We need to apply scope
      // variables for everything used in the view
      $scope.blog = {
        "title": "All Blogs",
        "id": 0,
        "image": "https://pbs.twimg.com/profile_images/1682109813/PandP_BIG.jpg",
        "url": "",
        "description": "All Blogs",
        "kimonoId": "d3cthg28"
      }
      //cardTypes = LocalStorage.getObject('blogs');
      $scope.cards = Array.prototype.slice.call(cardTypes, 0, 0);
      $ionicLoading.hide();
    } else {
      DataStore.getItemByIDAsync(blogId, 'blogs').then(
        function(result) {
          // promise was fullfilled (regardless of outcome)
          $scope.blog = result;
          DataStore.getBlogFeedAsync(result.kimonoId, result.isOnDemand).then(
            function(res) {
              // promise was fullfilled (regardless of outcome)
              cardTypes = res;
              $scope.cards = Array.prototype.slice.call(cardTypes, 0, 0);
              $ionicLoading.hide();
            },
            function(error) {
              // handle errors here
              console.log(error.statusText);
            }
          );
        },
        function(error) {
          // handle errors here
          console.log(error.statusText);
        }
      );
    }

    $scope.cardSwiped = function(index) {
      $scope.addCard();
    };
    $scope.cardDestroyed = function(index) {
      $scope.cards.splice(index, 1);
    };
    $scope.addCard = function() {
      var newCard = cardTypes[$scope.currentIndex];
      $scope.cards.push(angular.extend({}, newCard));
      $scope.currentIndex++;
      if ($scope.currentIndex == cardTypes.length) {
        $scope.currentIndex = 0;
      }
    };
    // Open the login modal
    $scope.showAbout = function() {
      $scope.modal.show();
    };
    // Open the login modal
    $scope.closeAbout = function() {
      $scope.modal.hide();
    }
  });
})

/**
 * [controller description]
 * @method controller
 * @param  {[type]}   'SoundsCtrl'     [description]
 * @param  {[type]}   function($scope, $stateParams, $filter, $ionicSwipeCardDelegate, $ionicModal, $ionicLoading, Sounds [description]
 * @return {[type]}                    [description]
 */
.controller('ListItemsCtrl', function($scope, $stateParams, $ionicLoading, DataStore) {

  $scope.$on('$ionicView.enter', function(e) {

    $ionicLoading.show({
      content: 'Loading',
      template: '<ion-spinner icon="ripple"></ion-spinner>',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });

    $scope.itemType = $stateParams.itemType;

    DataStore.getItemsAsync($scope.itemType, false).then(
      function(result) {
        // promise was fullfilled (regardless of outcome)
        // checks for information will be peformed here
        $scope.items = result;
        $ionicLoading.hide();
      },
      function(error) {
        // handle errors here
        console.log(error.statusText);
      }
    );
  });

  $scope.doRefresh = function() {
    DataStore.getItemsAsync($scope.itemType, true).then(
      function(result) {
        $scope.items = result;
        // Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');
      },
      function(error) {
        console.log(error.statusText);
      }
    );
  }
})

/**
 * [controller description]
 * @method controller
 * @param  {[type]}   'SoundsCtrl'     [description]
 * @param  {[type]}   function($scope, $stateParams, $filter, $ionicSwipeCardDelegate, $ionicModal, $ionicLoading, Sounds [description]
 * @return {[type]}                    [description]
 */
.controller('SongCardsCtrl', function($scope, $stateParams, $ionicSwipeCardDelegate, $ionicModal, $ionicLoading, DataStore) {

  var cardTypes = [];

  $scope.$on('$ionicView.enter', function(e) {

    $ionicLoading.show({
      content: 'Loading',
      template: '<ion-spinner icon="ripple"></ion-spinner>',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });

    var itemType = $stateParams.itemType;
    var itemId = $stateParams.itemId;

    // the index of the current card being displayed to the user
    $scope.currentIndex = 0;

    if (angular.equals('toptracks', itemType)) {

      DataStore.getItemsAsync('toptracks', false).then(
        function(result) {
          // promise was fullfilled (regardless of outcome)
          // checks for information will be peformed here
          var topSongsObj = result[0];
          cardTypes = topSongsObj.songs;
          $scope.item = {
            'name': 'Top Tracks',
            'description': 'The current top tracks'
          };
          $scope.cards = Array.prototype.slice.call(cardTypes, 0, 0);
          $ionicLoading.hide();
        },
        function(error) {
          // handle errors here
          console.log(error.statusText);
        }
      );

    } else {

      DataStore.getItemByIDAsync(itemId, itemType).then(
        function(result) {
          // promise was fullfilled (regardless of outcome)
          // checks for information will be peformed here
          $scope.item = result
          cardTypes = $scope.item.songs;
          $scope.cards = Array.prototype.slice.call(cardTypes, 0, 0);
          $ionicLoading.hide();
        },
        function(error) {
          // handle errors here
          console.log(error.statusText);
        }
      );

    }

    $scope.cardSwiped = function(index) {
      $scope.addCard();
    };
    $scope.cardDestroyed = function(index) {
      $scope.cards.splice(index, 1);
    };
    $scope.addCard = function() {
      var newCard = cardTypes[$scope.currentIndex];
      $scope.cards.push(angular.extend({}, newCard));
      $scope.currentIndex++;
      if ($scope.currentIndex == cardTypes.length) {
        $scope.currentIndex = 0;
      }
    };
  });
})

/**
 * [controller description]
 * @method controller
 * @param  {[type]}   'CardCtrl'       [description]
 * @param  {[type]}   function($scope, $ionicSwipeCardDelegate [description]
 * @return {[type]}                    [description]
 */
.controller('CardCtrl', function($scope, $ionicSwipeCardDelegate) {
  $scope.goAway = function() {
    var card = $ionicSwipeCardDelegate.getSwipeableCard($scope);
    card.swipe();
  };
});
