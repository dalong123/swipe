var bodyParser = require('body-parser');
var channelController = require('../controllers/user');
var jwt = require('jsonwebtoken');
var config = require('../../config');
var request = require('request');

// super secret for creating tokens
// var superSecret = config.secret;

module.exports = function(app, express) {

  var router = express.Router();

  // Create endpoint handlers for /users
  router.route('/users')
    .post(userController.postUsers)
    .get(userController.getUsers);

  // Create endpoint handlers for /users/:user_id
  router.route('/users/:user_id)')
    .get(channelController.getUser)
    .put(channelController.putUser)
    .delete(channelController.deleteUser);

  // api endpoint to get user information
  router.get('/me', function(req, res) {
    res.send(req.decoded);
  });

  return router;
  
};
