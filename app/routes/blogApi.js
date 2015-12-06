var blogController = require('../controllers/blog');

module.exports = function(app, express) {

  var router = express.Router();

  // Create endpoint handlers for /blogs
  router.route('/blogs')
    .post(blogController.postBlogs);

  // Create endpoint handlers for /blogs/:blog_id
  router.route('/blogs/:blog_id')
    .put(blogController.putBlog)
    .delete(blogController.deleteBlog);

  return router;
};
