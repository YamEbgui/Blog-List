const bcrypt = require("bcrypt");
const userRouter = require("express").Router();
const User = require("../models/user");

userRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs");

  response.json(users);
});

userRouter.post("/", async (request, response) => {
  try {
    const { username, name, password } = request.body;
    if (username.length < 4 || password.length < 4) {
      return response
        .status(403)
        .send("Password and Username should be at least 4 chars");
    }
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
