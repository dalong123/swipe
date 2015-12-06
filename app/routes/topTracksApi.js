var toptracksController = require('../controllers/toptracks');

module.exports = function(app, express) {

  var router = express.Router();

  // Create endpoint handlers for /toptracks/:toptracks_id
  router.route('/toptracks/:toptracks_id')
    .put(toptracksController.putTopTracks);

  return router;
};
