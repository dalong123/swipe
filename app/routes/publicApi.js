var bodyParser = require('body-parser');
var toptracksController = require('../controllers/toptracks');
var channelController = require('../controllers/channel');
var genreController = require('../controllers/genre');
var blogController = require('../controllers/blog');

module.exports = function(app, express) {

  var router = express.Router();

  router.route('/toptracks')
    .get(toptracksController.getTopTracks);

  // Create endpoint handlers for /channels
  router.route('/channels')
    .get(channelController.getChannels);

  // Create endpoint handlers for /channels/:channel_id
  router.route('/channels/:channel_id')
    .get(channelController.getChannel);

  router.route('/genres')
    .get(genreController.getGenres);

  // Create endpoint handlers for /genres/:genre_id
  router.route('/genres/:genre_id')
    .get(genreController.getGenre);

  // Create endpoint handlers for /blogs
  router.route('/blogs')
    .get(blogController.getBlogs);

  // Create endpoint handlers for /blogs/:blog_id
  router.route('/blogs/:blog_id')
    .get(blogController.getBlog);

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
