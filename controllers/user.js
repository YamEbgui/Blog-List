const bcrypt = require("bcrypt");
const userRouter = require("express").Router();
const User = require("../models/user");

userRouter.post("/", async (request, response) => {
  try {
    const { username, name, password } = request.body;

    //create hash password to save it in the database
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      name,
      passwordHash,
    });

    const savedUser = await user.save();
    response.json(savedUser);
  } catch (error) {
    console.log(error);
    response.status(400).json(error.errors.username);
  }
});

module.exports = userRouter;
