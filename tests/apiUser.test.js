const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("../models/user");
const request = require("supertest");
const app = require("../app");
const listHelper = require("../utils/list_helper");

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("bulldog", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("creation succceeds with a fresh username", async () => {
    const usersAtStart = await listHelper.usersInDb();
    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    };

    await request(app)
      .post("/api/users")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await listHelper.usersInDb();
    console.log(usersAtStart);
    console.log(usersAtEnd);
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  afterAll(async () => {
    mongoose.connection.close();
    app.killServer();
  });

  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await listHelper.usersInDb();

    const newUser = {
      username: "root",
      name: "Superuser",
      password: "salainen",
    };

    const result = await request(app)
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.message).toContain("`username` to be unique");

    const usersAtEnd = await listHelper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});
