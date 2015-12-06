var bodyParser = require('body-parser');
var blogController = require('../controllers/blog');
var jwt = require('jsonwebtoken');
var config = require('../../config');
var request = require('request');

// super secret for creating tokens
// var superSecret = config.secret;

module.exports = function(app, express) {

  var router = express.Router();
  var kimonoKey = config.kimonoKey;
  var apiKeyStr = '?apikey=' + kimonoKey;

  // Create endpoint handlers for /blogs
  router.route('/blogs')
    .post(blogController.postBlogs);

  // Create endpoint handlers for /blogs/:blog_id
  router.route('/blogs/:blog_id')
    .put(blogController.putBlog)
    .delete(blogController.deleteBlog);

  return router;
};
