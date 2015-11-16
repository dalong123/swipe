var bodyParser 					 = require('body-parser');
var curatorController       = require('../controllers/curator');
var jwt        					 = require('jsonwebtoken');
var config     					 = require('../../config');
var request 	 					 = require('request');

// super secret for creating tokens
// var superSecret = config.secret;

module.exports = function(app, express) {

	var router = express.Router();

	// Create endpoint handlers for /curators
	router.route('/curators')
	  .post(curatorController.postCurators)
	  .get(curatorController.getCurators);

	// Create endpoint handlers for /curators/:curator_id
	router.route('/curators/:curator_id')
	  .get(curatorController.getCurator)
	  .put(curatorController.putCurator)
	  .delete(curatorController.deleteCurator);

	return router;
};
