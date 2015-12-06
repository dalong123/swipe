var bodyParser = require('body-parser');
var userController = require('../controllers/user');
var jwt = require('jsonwebtoken');
var config = require('../../config');
var request = require('request');

module.exports = function(app, express) {

  var router = express.Router();

  // Create endpoint handlers for /users
  router.route('/users')
    .post(userController.postUsers)
    .get(userController.getUsers);

  // Create endpoint handlers for /users/:user_id
  // router.route('/users/:user_id)')
  //   .get(userController.getUser)
  //   .put(userController.putUser)
  //   .delete(userController.deleteUser);

  // api endpoint to get user information
  router.get('/me', function(req, res) {
    res.send(req.decoded);
  });

  return router;

};
