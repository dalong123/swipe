// Load required packages
var Channel = require('../models/channel');

// Create endpoint /api/channels for POST
exports.postChannels = function(req, res) {
  // Create a new instance of the channel model
  var channel = new Channel();

  // Set the channel properties that came from the POST data
  channel.name = req.body.name;
  channel.description = req.body.description;
  channel.icon = req.body.icon;
  channel.songs = req.body.songs;

  // Save the channel and check for errors
  channel.save(function(err) {
    if (err)
      res.send(err);

    res.json({
      message: 'Channel added!',
      data: channel
    });
  });
};

// Create endpoint /api/channels for GET
exports.getChannels = function(req, res) {
  // Use the channel model to find all channels
  Channel.find({}, function(err, channels) {
    if (err)
      res.send(err);

    res.json(channels);
  });
};

// Create endpoint /api/channels/:channel_id for GET
exports.getChannel = function(req, res) {
  // Use the channel model to find a specific channel
  Channel.findById(req.params.channel_id, function(err, channel) {
    if (err)
      res.send(err);

    res.json(channel);
  });
};

// Create endpoint /api/channels/:channel_id for PUT
exports.putChannel = function(req, res) {
  // Use the channel model to find a specific channel
  Channel.findByIdAndUpdate(req.params.channel_id, {
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

// Create endpoint /api/channels/:channel_id for DELETE
exports.deleteChannel = function(req, res) {
  // Use the channel model to find a specific channel and remove it
  Channel.findByIdAndRemove(req.params.channel_id, function(err) {
    if (err)
      res.send(err);

    res.json({
      message: 'Channel deleted!'
    });
  });
};
