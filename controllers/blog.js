const blogRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const Blog = require("../models/blog");
const User = require("../models/user");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

const getTokenFromRequest = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};

blogRouter.post("/", async (request, response) => {
  try {
    const token = getTokenFromRequest(request);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: "token missing or invalid" });
    }
    const resultUser = await User.findById(decodedToken.id);
    let { title, author, url, likes } = request.body;
    if (!title || !url) {
      return response.status(400).json("Invalid configuration to add blog");
    }
    if (!likes) {
      likes = 0;
    }
    const blog = new Blog({ title, author, url, likes, user: resultUser._id });

    const savedBlog = await blog.save();
    await resultUser.updateOne({
      $set: resultUser.blogs.concat(savedBlog._id),
    });
    return response.status(201).json(savedBlog);
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
