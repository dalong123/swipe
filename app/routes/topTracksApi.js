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
    .post(toptracksController.postTopTracks)
    .get(toptracksController.getTopTracks)
    .put(toptracksController.putTopTracks);

  return router;
};
