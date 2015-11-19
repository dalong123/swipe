var bodyParser = require('body-parser');
var cors = require('cors');
var curatorController = require('../controllers/curator');
var jwt = require('jsonwebtoken');
var config = require('../../config');
var request = require('request');

// super secret for creating tokens
// var superSecret = config.secret;

module.exports = function(app, express) {

  var router = express.Router();

  // Create endpoint handlers for /curators
  router.route('/curators')
    .post(cors(), curatorController.postCurators)
    .get(cors(), curatorController.getCurators);

  // Create endpoint handlers for /curators/:curator_id
  router.route('/curators/:curator_id')
    .get(cors(), curatorController.getCurator)
    .put(cors(), curatorController.putCurator)
    .delete(cors(), curatorController.deleteCurator);

  return router;
};
