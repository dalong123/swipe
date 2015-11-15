var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

// genre schema
var GenreSchema = new Schema({
	name: String,
	icon: String,
	songs: [{ url: String }]
});

module.exports = mongoose.model('Genre', GenreSchema);
