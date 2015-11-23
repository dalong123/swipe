var bodyParser = require('body-parser');
var cors = require('cors');
var channelController = require('../controllers/channel');
var jwt = require('jsonwebtoken');
var config = require('../../config');
var request = require('request');

// super secret for creating tokens
// var superSecret = config.secret;

module.exports = function(app, express) {

  var router = express.Router();

  // Create endpoint handlers for /channels
  router.route('/channels')
    .post(channelController.postChannels)
    .get(channelController.getChannels);

  // Create endpoint handlers for /channels/:channel_id
  router.route('/channels/:channel_id')
    .get(channelController.getChannel)
    .put(channelController.putChannel)
    .delete(channelController.deleteChannel);

  return router;
};
