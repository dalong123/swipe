var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// genre schema
var TopTracksSchema = new Schema({
  name: { type: String, default: '' },
  description: { type: String, default: '' },
  icon: { type: String, default: '' },
  songs: [{
    url: { type: String, default: '' }
  }],
  createdAt: Date,
  updatedAt: Date
});

// on every save, add the date
TopTracksSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();

  // change the updatedAt field to current date
  this.updatedAt = currentDate;

  // if createdAt doesn't exist, add to that field
  if (!this.createdAt)
    this.createdAt = currentDate;

  next();
});

module.exports = mongoose.model('TopTracks', TopTracksSchema);
