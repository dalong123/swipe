angular.module('SwipeAdmin')
.factory('GenreService', ['$scope', '$resource', GenreService]);
function GenreService() {
  // create a new object
	var GenreService = {};

	// get a single user
	GenreService.get = function(id) {
		return $http.get('localhost:8888/api/genres/' + id);
	};

	// get all users
	GenreService.all = function() {
		return $http.get('localhost:8888/api/genres/');
	};

	// create a user
	GenreService.create = function(userData) {
		return $http.post('localhost:8888/api/genres/', userData);
	};

	// update a user
	GenreService.update = function(id, userData) {
		return $http.put('localhost:8888/api/genres/' + id, userData);
	};

	// delete a user
	GenreService.delete = function(id) {
		return $http.delete('localhost:8888/api/genres/' + id);
	};

	// return our entire GenreService object
	return GenreService;
}
