var bodyParser = require('body-parser');
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
    .post(genreController.postGenres)
    .get(genreController.getGenres);

  // Create endpoint handlers for /genres/:genre_id
  router.route('/genres/:genre_id')
    .get(genreController.getGenre)
    .put(genreController.putGenre)
    .delete(genreController.deleteGenre);

  return router;
};
