angular.module('SwipeAdmin').factory('AuthService', AuthService);

AuthService.$inject = ['$http', '$q', 'AuthToken'];

function AuthService($http, $q, AuthToken) {

  var AuthService = {
    //arrays

    //methods
    login: _login,
    logout: _logout,
    isLoggedIn: _isLoggedIn,
    getUser: _getUser
  };

  return AuthService;

  // log a user in
  function _login(username, password) {

    // return the promise object and its data
    return $http.post('http://localhost:8888/api/auth', {
        username: username,
        password: password
      })
      .success(function(data) {
        AuthToken.setToken(data.token);
        return data;
      });
  };

  // log a user out by clearing the token
  function _logout() {
    // clear the token
    AuthToken.setToken();
  };

  // check if a user is logged in
  // checks if there is a local token
  function _isLoggedIn() {
    if (AuthToken.getToken())
      return true;
    else
      return false;
  };

  // get the logged in user
  function _getUser() {
    if (AuthToken.getToken())
      return $http.get('http://localhost:8888/api/me', {
        cache: true
      });
    else
      return $q.reject({
        message: 'User has no token.'
      });
  };

};
