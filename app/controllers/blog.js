// Load required packages
var Blog = require('../models/blog');

//THIS CAN BE USED AS MIDDLEWARE TO CHECK IF THE USER IS LOGGED IN. THIS EXAMPLE
//RELIES ON SESSION, MOST LIKELY PROVIDED BY PASSPORT, BUT IT CAN EASILY BE PORTED
//TO SUPPORT JWT.
//EXAMPLE USAGE: app.post('/api/users', checkAdmin, db, routes.users.add);
exports.checkAdmin = function(request, response, next) {
  if (request.session && request.session.auth && request.session.userId && request.session.admin) {
    console.info('Access ADMIN: ' + request.session.userId);
    return next();
  } else {
    next('User is not an administrator.');
  }
};


// Create endpoint /api/blogs for POST
exports.postBlogs = function(req, res) {
  // Create a new instance of the blog model
  var blog = new Blog();

  // Set the blog properties that came from the POST data
  blog.title = req.body.title;
  blog.image = req.body.image;
  blog.url = req.body.url;
  blog.description = req.body.description;
  blog.kimonoId = req.body.kimonoId;
  blog.isOnDemand = req.body.isOnDemand;
  blog.onDemandVal = req.body.onDemandVal;

  // Save the blog and check for errors
  blog.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Blog added!', data: blog });
  });
};

// Create endpoint /api/blogs for GET
exports.getBlogs = function(req, res) {
  // Use the Blog model to find all blogs
  Blog.find({}, function(err, blogs) {
    if (err)
      res.send(err);

    res.json(blogs);
  });
};

// Create endpoint /api/blogs/:blog_id for GET
exports.getBlog = function(req, res) {
  // Use the Blog model to find a specific blog
  Blog.findById(req.params.blog_id, function(err, blog) {
    if (err)
      res.send(err);

    res.json(blog);
  });
};

// Create endpoint /api/blogs/:blog_id for PUT
exports.putBlog = function(req, res) {
  // Use the Blog model to find a specific blog
  Blog.findByIdAndUpdate(req.params.blog_id, { quantity: req.body.quantity }, function(err, num, raw) {
    if (err)
      res.send(err);

    res.json({ message: num + ' updated' });
  });
};

// Create endpoint /api/blogs/:blog_id for DELETE
exports.deleteBlog = function(req, res) {
  // Use the Blog model to find a specific blog and remove it
  Blog.findByIdAndRemove(req.params.blog_id, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Blog deleted!' });
  });
};
