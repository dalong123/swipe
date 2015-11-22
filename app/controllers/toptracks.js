// Load required packages
var TopTracks = require('../models/toptracks');

// Create endpoint /api/toptracks for POST
exports.postTopTracks = function(req, res) {
  // Create a new instance of the toptracks model
  var toptracks = new TopTracks();

  // Set the toptracks properties that came from the POST data
  toptracks.name = req.body.name;
  toptracks.description = req.body.description;
  toptracks.icon = req.body.icon;
  toptracks.songs = req.body.songs;

  // Save the toptracks and check for errors
  toptracks.save(function(err) {
    if (err)
      res.send(err);

    res.json({
      message: 'TopTracks added!',
      data: toptracks
    });
  });
};

// Create endpoint /api/toptracks for GET
exports.getTopTracks = function(req, res) {
  // Use the toptracks model to find all toptracks
  TopTracks.find({}, function(err, toptracks) {
    if (err)
      res.send(err);

    res.json(toptracks);
  });
};

// Create endpoint /api/toptracks/:toptracks_id for GET
exports.getTopTracksById = function(req, res) {
  // Use the toptracks model to find a specific toptracks
  TopTracks.findById(req.params.toptracks_id, function(err, toptracks) {
    if (err)
      res.send(err);

    res.json(toptracks);
  });
};

// Create endpoint /api/toptracks/:toptracks_id for PUT
exports.putTopTracks = function(req, res) {
  // Use the toptracks model to find a specific toptracks
  TopTracks.findByIdAndUpdate(req.params.toptracks_id, {
    songs: req.body.songs
  }, function(err, num, raw) {
    if (err)
      res.send(err);

    res.json({
      message: num + ' updated'
    });
  });
};

// Create endpoint /api/toptracks/:toptracks_id for DELETE
exports.deleteTopTracks = function(req, res) {
  // Use the toptracks model to find a specific toptracks and remove it
  TopTracks.findByIdAndRemove(req.params.toptracks_id, function(err) {
    if (err)
      res.send(err);

    res.json({
      message: 'TopTracks deleted!'
    });
  });
};
