var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

// genre schema
var CuratorSchema = new Schema({
	name: String,
	description: String,
	icon: String,
	songs: [{ url: String }],
	createdAt: Date,
  updatedAt: Date
});

// on every save, add the date
CuratorSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();

  // change the updatedAt field to current date
  this.updatedAt = currentDate;

  // if createdAt doesn't exist, add to that field
  if (!this.createdAt)
    this.createdAt = currentDate;

  next();
});

module.exports = mongoose.model('Curator', CuratorSchema);
