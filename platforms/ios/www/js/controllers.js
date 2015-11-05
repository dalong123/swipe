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
.controller('PlaylistsCtrl', function($scope) {

})

/**
 *
 */
.controller('BlogsCtrl', function($scope) {
  $scope.blogs = [
    { title: 'Reggae', id: 1, img: '' },
    { title: 'Chill', id: 2, img: '' },
    { title: 'Dubstep', id: 3, img: '' },
    { title: 'Indie', id: 4, img: '' },
    { title: 'Rap', id: 5, img: '' },
    { title: 'Cowbell', id: 6, img: '' }
  ];
})

/**
 *
 */
 .controller('PostsCtrl', function($scope) {
//   // If you are calling to a service that returns a callback, create a variable
//   // of that type first and initialize it in the immediate $on function
//   var posts = [];
//
//   // This is the ionic-specific funtion used to target the view's entry. As a
//   // result of template caching, this controller is only called when one of its
//   // views is rendered
//   $scope.$on('$ionicView.enter', function(e) {
//     // Make calls to the API/Blog services as necessary and initialize all
//     // view-centric variables
//     API.getPostsAsync(function(results) {
//       console.log(results);
//       posts = results;
//     });
//   });
//
//   // Set the scoped variable to our localized variable that has since been
//   // populated by the call to the API service
//   $scope.posts = posts;
})

/**
 *
 */
.controller('PlaylistCtrl', function($scope, $stateParams) {
});
