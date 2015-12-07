angular.module('SwipeAdmin').factory('AuthService', AuthService);

AuthService.$inject = ['$http', '$q', 'AuthToken'];

function AuthService($http, $q, AuthToken){

	// create auth factory object
	var authFactory = {};

	// log a user in
	authFactory.login = function(username, password) {

		// return the promise object and its data
		return $http.post('/api/auth', {
			username: username,
			password: password
		})
			.success(function(data) {
				AuthToken.setToken(data.token);
       			return data;
			});
	};

	// log a user out by clearing the token
	authFactory.logout = function() {
		// clear the token
		AuthToken.setToken();
	};

	// check if a user is logged in
	// checks if there is a local token
	authFactory.isLoggedIn = function() {
		if (AuthToken.getToken())
			return true;
		else
			return false;
	};

	// get the logged in user
	authFactory.getUser = function() {
		if (AuthToken.getToken())
			return $http.get('/api/me', { cache: true });
		else
			return $q.reject({ message: 'User has no token.' });
	};

	// authFactory.createSampleUser = function() {
	// 	$http.post('/api/sample');
	// };

	// return auth factory object
	return authFactory;
	
};
