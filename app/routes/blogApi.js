var bodyParser = require('body-parser');
var cors = require('cors');
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
    .post(blogController.postBlogs)
    .get(blogController.getBlogs);

  // Create endpoint handlers for /blogs/:blog_id
  router.route('/blogs/:blog_id')
    .get(blogController.getBlog)
    .put(blogController.putBlog)
    .delete(blogController.deleteBlog);

  /**
   * GET route for a single Kimono feed
   * @method route
   * @param  {String} '/getfeed/:kimono_id' [description]
   * @return {[type]}                       [description]
   */
  router.route('/blogs/getfeed/:kimono_id')

  // get all the users (accessed at GET http://localhost:8080/api/users)
  .get(function(req, res) {

    var kimonoId = req.params.kimono_id;

    /**
     * use Request to get json from Kimono
     */
    request('https://www.kimonolabs.com/api/' + kimonoId + apiKeyStr,
      function(err, response, body) {

        if (!err && response.statusCode == 200) {

          var bodyJSON = JSON.parse(body);
          var collection = bodyJSON.results.collection1;

          res.json(collection);
        }

      });
  });

  /**
   * GET
   */
  router.route('/blogs/getondemand/:kimono_id/:od_val')

  // get all the users (accessed at GET http://localhost:8080/api/users)
  .get(function(req, res) {

    var kimonoId = req.params.kimono_id,
      onDemandVal = req.params.od_val;

    /**
     * use Request to get json from Kimono
     */
    request('https://www.kimonolabs.com/api/json/ondemand/' + kimonoId + apiKeyStr + '&kimpath1=' + onDemandVal,
      function(err, response, body) {

        if (!err && response.statusCode == 200) {

          var bodyJSON = JSON.parse(body);
          var collection = bodyJSON.results.collection1;

          res.json(collection);
        }

      });
  });

  return router;
};
