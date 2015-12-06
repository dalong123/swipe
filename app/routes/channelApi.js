var bodyParser = require('body-parser');
var channelController = require('../controllers/channel');

module.exports = function(app, express) {

  var router = express.Router();

  // Create endpoint handlers for /channels
  router.route('/channels')
    .post(channelController.postChannels);

  // Create endpoint handlers for /channels/:channel_id
  router.route('/channels/:channel_id')
    .put(channelController.putChannel)
    .delete(channelController.deleteChannel);

  return router;
};
