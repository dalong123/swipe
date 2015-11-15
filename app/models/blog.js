var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

// genre schema
var BlogSchema = new Schema({
	title: String,
	image: String,
	url: String,
	description: String,
	kimonoId: String,
	isOnDemand: Boolean,
	onDemandVal: String
});

module.exports = mongoose.model('Blog', BlogSchema);
