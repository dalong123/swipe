angular.module('SwipeAdmin').factory('BlogService', BlogService);

BlogService.$inject = ['$q', '$http', '$resource'];

function BlogService($q,$http,$resource){

  return {

    // This should be named blog, as it returns a single blog object
    Blog: $resource('http://localhost:8888/api/blogs/:blog_id', null,
    {
        'update': { method:'PUT' }
    }),

    // This should be named blogs, as it returns an array of blog objects
    Blogs: $resource('http://localhost:8888/api/blogs')
  }
};
