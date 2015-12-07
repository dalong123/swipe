/**
 * Master Controller
 */

angular.module('SwipeAdmin').controller('MasterCtrl', MasterCtrl);

MasterCtrl.$inject = ['$scope', '$cookieStore', 'AuthService'];

function MasterCtrl($scope, $cookieStore, AuthService) {
  /**
   * Sidebar Toggle & Cookie Control
   */
  var mobileView = 992;

  $scope.getWidth = function() {
    return window.innerWidth;
  };

  $scope.$watch($scope.getWidth, function(newValue, oldValue) {
    if (newValue >= mobileView) {
      if (angular.isDefined($cookieStore.get('toggle'))) {
        $scope.toggle = !$cookieStore.get('toggle') ? false : true;
      } else {
        $scope.toggle = true;
      }
    } else {
      $scope.toggle = false;
    }

  });

  $scope.toggleSidebar = function() {
    $scope.toggle = !$scope.toggle;
    $cookieStore.put('toggle', $scope.toggle);
  };

  window.onresize = function() {
    $scope.$apply();
  };

  //function to handle login form
  $scope.doLogin = function() {
    $scope.processing = true;

    // clear the error
    $scope.error = '';

    Auth.login($scope.loginData.username, $scope.loginData.password)
      .success(function(data) {
        $scope.processing = false;

        // if a user successfully logs in, redirect to users page
        if (data.success)
          $location.path('/users');
        else
          $scope.error = data.message;

      });
  };

  // function to handle logging out
  $scope.doLogout = function() {
    Auth.logout();
    //$location.path('/login');
  };
}
