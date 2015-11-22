var bodyParser = require('body-parser');
var cors = require('cors');
var toptracksController = require('../controllers/toptracks');
var jwt = require('jsonwebtoken');
var config = require('../../config');
var request = require('request');

// super secret for creating tokens
// var superSecret = config.secret;

module.exports = function(app, express) {

  var router = express.Router();

  // Create endpoint handlers for /toptracks
  router.route('/toptracks')
    .get(toptracksController.getTopTracks);

  // Create endpoint handlers for /genres/:genre_id
  router.route('/toptracks/:toptracks_id')
    .get(toptracksController.getTopTracksById)
    .put(toptracksController.putTopTracks);

  return router;
};
