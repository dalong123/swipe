var genreController = require('../controllers/genre');

module.exports = function(app, express) {

  var router = express.Router();

  // Create endpoint handlers for /genres
  router.route('/genres')
    .post(genreController.postGenres);

  // Create endpoint handlers for /genres/:genre_id
  router.route('/genres/:genre_id')
    .put(genreController.putGenre)
    .delete(genreController.deleteGenre);

  return router;
};
