angular.module('starter.controllers', [])

/**
* 	With the new view caching in Ionic, Controllers are only called
*   when they are recreated or on app start, instead of every page change.
*   To listen for when this page is active (for example, to refresh data),
*   listen for the $ionicView.enter event:
*   $scope.$on('$ionicView.enter', function(e) {
*   });
*   We should tuck every call to a service inside the above function. This
*   guarantees that the only time we're pulling down data are when the applicable
*   view is being rendered. The call to the service should also be the very
*   first thing each controller does if it is pulling down data from a service.
*   I set up the PostsCtrl as an example of some best practices I think we
*   should follow
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

/**
 *
 */
.controller('BlogsCtrl', function($scope, $q, LocalStorage, Blog) {

  // This is the ionic-specific funtion used to target the view's entry. As a
  // result of template caching, this controller is only called when one of its
  // views is rendered
  $scope.$on('$ionicView.enter', function(e) {
    // Make calls to the API/Blog services as necessary and initialize all
    // view-centric variables
    var blogsLocalStore = LocalStorage.getObject('tits');

    if(!angular.equals({}, blogsLocalStore))
    {
      return blogsLocalStore;
    }
    else {
      Blog.getBlogsAsync().then(
        function(result) {
          // promise was fullfilled (regardless of outcome)
          // checks for information will be peformed here
          $scope.blogs = result;
        },
        function(error) {
          // handle errors here
          console.log(error.statusText);
        }
      );
    }
  });
})

// We need to figure out a way to pass the entire blog object via the router
// rather than fetching all of blogs.json and doing id filtering on it.
.controller('BlogCtrl', function($scope, $stateParams, $filter, Blog){

  // take in the route param for the specific view (IT SHOULD BE A NUMBER)
  var blogId = $stateParams.blogId;

  if(blogId === 'all'){
    // Build out our blog object for the all blogs view. We need to apply scope
    // variables for everything used in the view
    $scope.blog = {

    }
  }
  else
  {
    Blog.getBlogsAsync().then(
      function(result) {
        // promise was fullfilled (regardless of outcome)
        $scope.blog = $filter('filter')(result, {id:blogId})[0];
      },
      function(error) {
        // handle errors here
        console.log(error.statusText);
      }
    );
  }
})
