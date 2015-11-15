var bodyParser = require('body-parser');
var User       = require('../models/user');
var jwt        = require('jsonwebtoken');
var config     = require('../../config');
var request 	 = require('request');

// super secret for creating tokens
// var superSecret = config.secret;

module.exports = function(app, express) {

	var apiRouter = express.Router();
	var kimonoKey = config.kimonoKey;
	var apiKeyStr = '?apikey=' + kimonoKey;

	// test route to make sure everything is working
	// accessed at GET http://localhost:8080/api
	apiRouter.get('/', function(req, res) {
		res.json({ message: 'hooray! welcome to our api!' });
	});

	/**
	 * GET route for a single Kimono feed
	 * @method route
	 * @param  {String} '/getfeed/:kimono_id' [description]
	 * @return {[type]}                       [description]
	 */
	apiRouter.route('/getfeed/:kimono_id')

		// get all the users (accessed at GET http://localhost:8080/api/users)
		.get(function(req, res) {

			var kimonoId = req.params.kimono_id;

			/**
			 * use Request to get json from Kimono
			 */
 			request('https://www.kimonolabs.com/api/' + kimonoId + apiKeyStr,
			function(err, response, body) {

				if (!err && response.statusCode == 200) {

					var bodyJSON = JSON.parse(body);
						var collection = bodyJSON.results.collection1;

					res.json(collection);
		    }

			});
		});

	/**
	 * GET
	 */
	apiRouter.route('/getondemand/:kimono_id/:od_val')

		// get all the users (accessed at GET http://localhost:8080/api/users)
		.get(function(req, res) {

			var kimonoId 		= req.params.kimono_id,
					onDemandVal = req.params.od_val;

			/**
			 * use Request to get json from Kimono
			 */
 			request('https://www.kimonolabs.com/api/json/ondemand/' + kimonoId + apiKeyStr + '&kimpath1=' + onDemandVal,
			function(err, response, body) {

				if (!err && response.statusCode == 200) {

					var bodyJSON = JSON.parse(body);
					var collection = bodyJSON.results.collection1;

					res.json(collection);
		    }

			});
		});

	return apiRouter;
};
