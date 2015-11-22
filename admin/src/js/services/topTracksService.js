angular.module('SwipeAdmin').factory('TopTracksService', TopTracksService);

TopTracksService.$inject = ['$resource'];

function TopTracksService($resource){

  return{
      // This should be named blog, as it returns a single blog object
    TopTracks: $resource('http://localhost:8888/api/toptracks',null,
    {
      'update': {method: 'PUT'}
    })
  }
};
