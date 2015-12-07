angular.module('SwipeAdmin').factory('AuthToken', AuthToken);

AuthToken.$inject = ['$window'];

function AuthToken($window){

	var AuthToken = {
    //arrays

    //methods
    getToken: _getToken,
    setToken: _setToken
  };

  return AuthToken;

	// get the token out of local storage
	function _getToken() {
		return $window.localStorage.getItem('token');
	};

	// function to set token or clear token
	// if a token is passed, set the token
	// if there is no token, clear it from local storage
	function _setToken(token) {
		if (token)
			$window.localStorage.setItem('token', token);
	 	else
			$window.localStorage.removeItem('token');
	};

};
