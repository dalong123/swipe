angular.module('starter.controllers', [])

/**
* 	With view caching in Ionic, Controllers are only called
*   when they are recreated or on app start, instead of every page change.
*   To listen for when this page is active (for example, to refresh data),
*   listen for the $ionicView.enter event:
*   $scope.$on('$ionicView.enter', function(e) {
*   });
*   We should tuck every call to a service inside the above function. This
*   guarantees that the only time we're pulling down data are when the applicable
*   view is being rendered. The call to the service should also be the very
*   first thing each controller does if it is pulling down data from a service.
*/

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

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
.controller('HomeCtrl', function($scope, $q, $ionicLoading, Sounds, Blog) {

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
    Sounds.getSoundsAsync().then(
      function(result) {
        // promise was fullfilled (regardless of outcome)
        // checks for information will be peformed here
        $scope.sounds = result;
      },
      function(error) {
        // handle errors here
        console.log(error.statusText);
      }
    );
    Blog.getFeedAsync("d3cthg28", 1).then(
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
 *
 */
.controller('BlogsCtrl', function($scope, $q, $ionicLoading, Blog, LocalStorage) {

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

    // Make calls to the API/Blog services as necessary and initialize all
    // view-centric variables
    var blogsLocalStore = LocalStorage.getObject('blogs');

    if(!angular.equals({}, blogsLocalStore))
    {
      $scope.blogs = blogsLocalStore;
      $ionicLoading.hide();
    }
    else {
      Blog.getBlogsAsync().then(
        function(result) {
          // promise was fullfilled (regardless of outcome)
          // checks for information will be peformed here
          $scope.blogs = result;
          LocalStorage.setObject('blogs', result);
          $ionicLoading.hide();
        },
        function(error) {
          // handle errors here
          console.log(error.statusText);
        }
      );
    }
  });
})

// We need to figure out a way to pass the entire blog object via the router,
// rather than fetching all of blogs.json and doing id filtering on it.
.controller('BlogCtrl', function($scope, $stateParams, $filter, $ionicSwipeCardDelegate, $ionicModal, $ionicLoading, Blog, LocalStorage){

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
    if(blogId === 'all'){
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
      cardTypes = LocalStorage.getObject('blogs');
      $scope.cards = Array.prototype.slice.call(cardTypes, 0, 0);
      $ionicLoading.hide();
    }
    else
    {
      var blogLocalStore = LocalStorage.getObject('blog' + blogId);

      if(!angular.equals({}, blogLocalStore))
      {
        $scope.blog = blogLocalStore;
        Blog.getFeedAsync($scope.blog.kimonoId, 1).then(
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
      } else {
        Blog.getBlogsAsync().then(
          function(result) {
            // promise was fullfilled (regardless of outcome)
            $scope.blog = $filter('filter')(result, {id:blogId})[0];
            LocalStorage.setObject('blog' + blogId, $scope.blog);
            Blog.getFeedAsync($scope.blog.kimonoId, 1).then(
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
      if($scope.currentIndex == cardTypes.length) {
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


.controller('SoundsCtrl', function($scope, $stateParams, $filter, $ionicSwipeCardDelegate, $ionicModal, $ionicLoading, Sounds){

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

    // the current index of the card being displayed to the user
    $scope.currentIndex = 0;

    Sounds.getSoundsAsync().then(
      function(result) {
        // promise was fullfilled (regardless of outcome)
        // checks for information will be peformed here
        cardTypes = result;
        $scope.cards = Array.prototype.slice.call(cardTypes, 0, 0);
        $ionicLoading.hide();
      },
      function(error) {
        // handle errors here
        console.log(error.statusText);
      }
    );

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
      if($scope.currentIndex == cardTypes.length) {
        $scope.currentIndex = 0;
      }
    };
  });
})

.controller('CardCtrl', function($scope, $ionicSwipeCardDelegate) {
  $scope.goAway = function() {
    var card = $ionicSwipeCardDelegate.getSwipeableCard($scope);
    card.swipe();
  };
});
