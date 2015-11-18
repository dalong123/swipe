var bodyParser = require('body-parser');
var User = require('../models/user');
var Blog = require('../models/blog');
var Genre = require('../models/genre');
var jwt = require('jsonwebtoken');
var config = require('../../config');
var request = require('request');

// super secret for creating tokens
// var superSecret = config.secret;

module.exports = function(app, express) {

  var router = express.Router();

  // test route to make sure everything is working
  // accessed at GET http://localhost:8080/api
  router.get('/', function(req, res) {
    res.json({
      message: 'Hello.'
    });
  });

  return router;
};
