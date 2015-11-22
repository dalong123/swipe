angular.module('SwipeAdmin').factory('GenreService', GenreService);

GenreService.$inject = ['$resource'];

function GenreService($resource){

  return{

    // This should be named blog, as it returns a single blog object
    Genre: $resource('http://localhost:8888/api/genres/:genre_id', null,
    {
        'update': { method:'PUT' }
    }),
    // This should be named blogs, as it returns an array of blog objects
    Genres: $resource('http://localhost:8888/api/genres')
  }
};
