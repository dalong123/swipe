angular.module('SwipeAdmin').factory('BlogService', BlogService);

BlogService.$inject = ['$q', '$http', '$resource'];

function BlogService($q,$http,$resource){

  return{
    blogs: $resource('http://localhost:8888/api/blogs/:blog_id', null,
    {
        'update': { method:'PUT' }
    }),
    blog: $resource('http://localhost:8888/api/blogs')
  }
};
