var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Blog schema
var BlogSchema = new Schema({
  title: { type: String, default: '' },
  image: { type: String, default: '' },
  url: { type: String, default: '' },
  description: { type: String, default: '' },
  kimonoId: { type: String, default: '' },
  isOnDemand: { type: Boolean, default: false },
  onDemandVal: { type: String, default: '' },
  createdAt: Date,
  updatedAt: Date
});

// on every save, add the date
BlogSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();

  // change the updatedAt field to current date
  this.updatedAt = currentDate;

  // if createdAt doesn't exist, add to that field
  if (!this.createdAt)
    this.createdAt = currentDate;

  next();
});

module.exports = mongoose.model('Blog', BlogSchema);
