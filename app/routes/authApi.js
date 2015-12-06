var bodyParser = require('body-parser');
var authController = require('../controllers/auth');
var jwt = require('jsonwebtoken');
var request = require('request');

module.exports = function(app, express) {

  var router = express.Router();

  // Create endpoint handlers for /auth
  router.route('/auth')
    .post(authController.authenticate);

  return router;

};
