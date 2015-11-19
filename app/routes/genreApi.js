var bodyParser = require('body-parser');
var cors = require('cors');
var genreController = require('../controllers/genre');
var jwt = require('jsonwebtoken');
var config = require('../../config');
var request = require('request');

// super secret for creating tokens
// var superSecret = config.secret;

module.exports = function(app, express) {

  var router = express.Router();

  // Create endpoint handlers for /genres
  router.route('/genres')
    .post(cors(), genreController.postGenres)
    .get(cors(), genreController.getGenres);

  // Create endpoint handlers for /genres/:genre_id
  router.route('/genres/:genre_id')
    .get(cors(), genreController.getGenre)
    .put(cors(), genreController.putGenre)
    .delete(cors(), genreController.deleteGenre);

  return router;
};
