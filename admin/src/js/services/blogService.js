angular.module('SwipeAdmin').factory('BlogService', BlogService);

BlogService.$inject = ['$q', '$http', '$resource'];

function BlogService($q,$http,$resource){
  var BlogService = {
          //arrays

          //methods
          CreateBlog: _create,
          GetAllBlogs: _all,
          UpdateBlog: _update,
          GetBlog: _get,
          DeleteBlog: _delete
      };

  return BlogService;

  // get a single blog
  function _get(id) {
    return $http.get('http://localhost:8888/api/blogs/' + id);
  };

  // get all blogs
  function _all() {
    return $http.get('http://localhost:8888/api/blogs/');
  };

  // create a blog
  function _create(userData) {
    return $http.post('http://localhost:8888/api/blogs/', userData);
  };

  // update a blog

  function _update(id, userData) {
    return $http.put('http://localhost:8888/api/blogs/' + id, userData);
  };

  // delete a blog
  function _delete(id) {
    return $http.delete('http://localhost:8888/api/blogs/' + id);
  };

};
