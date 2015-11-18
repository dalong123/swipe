// BASE SETUP
// ======================================

// CALL THE PACKAGES --------------------
var express    = require('express');			// call express
var app        = express(); 							// define our app using express
var bodyParser = require('body-parser'); 	// get body-parser
var morgan     = require('morgan'); 			// used to see requests
var mongoose   = require('mongoose');
var uriUtil 	 = require('mongodb-uri');
var moment		 = require('moment');
var config 	   = require('./config');
var path 	   	 = require('path');
var docs			 = require("express-mongoose-docs");

// APP CONFIGURATION ==================
// ====================================
// use body parser so we can grab information from POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configure our app to handle CORS requests
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
	next();
});

// log all requests to the console
app.use(morgan('dev'));

/*=============================================================================
START MONGODB SETUP
=============================================================================*/
/*
 * Mongoose by default sets the auto_reconnect option to true.
 * We're setting socket options at both the server and replica set level
 * to a 30 second connection timeout because it allows for plenty of time
 * in most operating environments.
 */
var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } };

/*
 * Mongoose uses a different connection string format than MongoDB's standard.
 * We're using the mongodb-uri library to convert from the standard format to
 * Mongoose's format.
 */
var mongooseUri = uriUtil.formatMongoose(config.database);
// connect to our database
mongoose.connect(mongooseUri, options);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
/*=============================================================================
END MONGODB SETUP
=============================================================================*/

// set static files location
// used for requests that our frontend will make
app.use(express.static(__dirname + '/www'));

app.use(express.static(__dirname + '/admin/dist'));

/*=============================================================================
START API SETUP
=============================================================================*/
var apiRoutes = require('./app/routes/api')(app, express);
app.use('/api', apiRoutes);
var blogApi		= require('./app/routes/blogApi')(app, express);
app.use('/api', blogApi);
var genreApi		= require('./app/routes/genreApi')(app, express);
app.use('/api', genreApi);
var curatorApi		= require('./app/routes/curatorApi')(app, express);
app.use('/api', curatorApi);
/*=============================================================================
END API SETUP
=============================================================================*/

app.get('/admin', function(req, res) {
	res.sendFile(path.join(__dirname + '/admin/dist/index.html'));
});

// Generate documentation for the API via
docs(app, mongoose); // 2nd param is optional

// MAIN CATCHALL ROUTE ---------------
// SEND USERS TO FRONTEND ------------
// has to be registered after API ROUTES
app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname + '/www/index.html'));
});

// START THE SERVER
// ====================================
app.listen(config.port);
console.log('Magic happens on port ' + config.port);
