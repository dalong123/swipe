var User = require('../models/user');

/**
 * [function description]
 * @method function
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.postUsers = function(req, res) {
  var user = new User();
  user.name = req.body.name;
  user.username = req.body.username;
  user.password = req.body.password;

  user.save(function(err) {
    if (err) {
      // duplicate entry
      if (err.code == 11000)
        return res.json({
          success: false,
          message: 'A user with that username already exists.'
        });
      else
        return res.send(err);
    }
    // return a message
    res.json({
      message: 'User created'
    });
  });
};

/**
 * [function description]
 * @method function
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.getUsers = function(req, res) {
  User.find({}, function(err, users) {
    if (err) res.send(err);

    // return the users
    res.json(users);
  });
};

/**
 * [function description]
 * @method function
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.getUser = function(req, res) {
  User.findById(req.params.user_id, function(err, user) {
    if (err) res.send(err);

    // return that user
    res.json(user);
  });
};

/**
 * [function description]
 * @method function
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.putUser = function(req, res) {
  User.findById(req.params.user_id, function(err, user) {

    if (err) res.send(err);

    // set the new user information if it exists in the request
    if (req.body.name) user.name = req.body.name;
    if (req.body.username) user.username = req.body.username;
    if (req.body.password) user.password = req.body.password;

    // save the user
    user.save(function(err) {
      if (err) res.send(err);

      // return a message
      res.json({
        message: 'User updated'
      });
    });
  });
};

/**
 * [function description]
 * @method function
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.deleteUser = function(req, res) {
  User.remove({
    _id: req.params.user_id
  }, function(err, user) {

    if (err) res.send(err);

    res.json({
      message: 'Successfully deleted'
    });
  });
};
