var bodyParser = require('body-parser');
var authController = require('../controllers/auth');
var jwt = require('jsonwebtoken');
var request = require('request');

// super secret for creating tokens
//var superSecret = config.secret;

module.exports = function(app, express) {

  var router = express.Router();

  // Create endpoint handlers for /genres
  router.route('/auth')
    .post(authController.authenticate);

  return router;
  
};
