// Load required packages
var Curator = require('../models/curator');

// Create endpoint /api/curators for POST
exports.postCurators = function(req, res) {
  // Create a new instance of the curator model
  var curator = new Curator();

  // Set the curator properties that came from the POST data
  curator.name = req.body.name;
  curator.description = req.body.description;
  curator.icon = req.body.icon;
  curator.songs = req.body.songs;

  // Save the curator and check for errors
  curator.save(function(err) {
    if (err)
      res.send(err);

    res.json({
      message: 'Curator added!',
      data: curator
    });
  });
};

// Create endpoint /api/curators for GET
exports.getCurators = function(req, res) {
  // Use the curator model to find all curators
  Curator.find({}, function(err, curators) {
    if (err)
      res.send(err);

    res.json(curators);
  });
};

// Create endpoint /api/curators/:curator_id for GET
exports.getCurator = function(req, res) {
  // Use the curator model to find a specific curator
  Curator.findById(req.params.curator_id, function(err, curator) {
    if (err)
      res.send(err);

    res.json(curator);
  });
};

// Create endpoint /api/curators/:curator_id for PUT
exports.putCurator = function(req, res) {
  // Use the curator model to find a specific curator
  Curator.findByIdAndUpdate(req.params.curator_id, {
    name: req.body.name,
    description: req.body.description,
    icon: req.body.icon,
    songs: req.body.songs
  }, function(err, num, raw) {
    if (err)
      res.send(err);

    res.json({
      message: num + ' updated'
    });
  });
};

// Create endpoint /api/curators/:curator_id for DELETE
exports.deleteCurator = function(req, res) {
  // Use the curator model to find a specific curator and remove it
  Curator.findByIdAndRemove(req.params.curator_id, function(err) {
    if (err)
      res.send(err);

    res.json({
      message: 'Curator deleted!'
    });
  });
};
