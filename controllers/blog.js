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
    if (!title || !url) {
      return response.status(400).json("Invalid configuration to add blog");
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

blogRouter.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    if (!id) {
      return response.status(400).send("Id not recognized");
    }
    const removed = await Blog.findByIdAndRemove(id);
    if (removed.title !== undefined) {
      return response.status(200).json(removed);
    }
  } catch (error) {
    response.status(400).send(error);
  }
});

module.exports = blogRouter;
