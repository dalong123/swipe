angular.module('SwipeAdmin').factory('TopTracksService', TopTracksService);

TopTracksService.$inject = ['$resource','$http'];

function TopTracksService($resource,$http){


  var TopTracksService = {
          //arrays

          //methods
          GetAllTopTracks: _get,
          UpdateTrack: _update,
      };

  return TopTracksService;

  // get a single blog

  // get all blogs
  function _get() {
    return $http.get('http://localhost:8888/api/toptracks');
  };

  function _update(id, track){
    return $http.put('http://localhost:8888/api/toptracks/' + id, track);
  };


};
