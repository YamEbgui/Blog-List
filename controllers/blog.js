const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogRouter.post("/", (request, response) => {
  try {
    let { title, author, url, likes } = request.body;
    if (!title || !author || !url) {
      return response.status(403).json("Invalid configuration to add blog");
    }
    if (!likes) {
      likes = 0;
    }
    const blog = new Blog({ title, author, url, likes });

    blog.save().then((result) => {
      response.status(201).json(result);
    });
  } catch (error) {
    response.status(400).json(error);
  }
});

module.exports = blogRouter;
