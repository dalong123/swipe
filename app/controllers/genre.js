// Load required packages
var Genre = require('../models/genre');

// Create endpoint /api/genres for POST
exports.postGenres = function(req, res) {
  // Create a new instance of the genre model
  var genre = new Genre();

  // Set the genre properties that came from the POST data
  genre.name = req.body.name;
  genre.icon = req.body.icon;
  genre.sounds = req.body.sounds;

  // Save the genre and check for errors
  genre.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Genre added!', data: genre });
  });
};

// Create endpoint /api/genres for GET
exports.getGenres = function(req, res) {
  // Use the genre model to find all genres
  Genre.find({}, function(err, genres) {
    if (err)
      res.send(err);

    res.json(genres);
  });
};

// Create endpoint /api/genres/:genre_id for GET
exports.getGenre = function(req, res) {
  // Use the genre model to find a specific genre
  Genre.findById(req.params.genre_id, function(err, genre) {
    if (err)
      res.send(err);

    res.json(genre);
  });
};

// Create endpoint /api/genres/:genre_id for PUT
exports.putGenre = function(req, res) {
  // Use the genre model to find a specific genre
  Genre.findByIdAndUpdate(req.params.genre_id, { songs: req.body.songs }, function(err, num, raw) {
    if (err)
      res.send(err);

    res.json({ message: num + ' updated' });
  });
};

// Create endpoint /api/genres/:genre_id for DELETE
exports.deleteGenre = function(req, res) {
  // Use the genre model to find a specific genre and remove it
  Genre.findByIdAndRemove(req.params.genre_id, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Genre deleted!' });
  });
};
