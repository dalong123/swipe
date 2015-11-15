// Load required packages
var Blog = require('../models/blog');

// Create endpoint /api/blogs for POST
exports.postBlogs = function(req, res) {
  // Create a new instance of the blog model
  var blog = new Blog();

  // Set the blog properties that came from the POST data
  blog.title = req.body.title;
  blog.imgage = req.body.image;
  blog.url = req.body.url;
  blog.description = req.description;
  blog.kimonoId = req.kimonoId;
  blog.isOnDemand = req.isOnDemand;
  blog.onDemandVal = blog.onDemandVal;

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
  Blog.find({ _id: req.params.blog_id }, function(err, blog) {
    if (err)
      res.send(err);

    res.json(blog);
  });
};

// Create endpoint /api/blogs/:blog_id for PUT
exports.putBlog = function(req, res) {
  // Use the Blog model to find a specific blog
  Blog.update({ _id: req.params.blog_id }, { quantity: req.body.quantity }, function(err, num, raw) {
    if (err)
      res.send(err);

    res.json({ message: num + ' updated' });
  });
};

// Create endpoint /api/blogs/:blog_id for DELETE
exports.deleteBlog = function(req, res) {
  // Use the Blog model to find a specific blog and remove it
  Blog.remove({ _id: req.params.blog_id }, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Blog deleted!' });
  });
};
