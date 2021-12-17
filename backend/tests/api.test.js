const mongoose = require("mongoose");
const Blog = require("../models/blog");
const User = require("../models/user");
const request = require("supertest");
const app = require("../app");
const mockUsers = [
  {
    username: "mluukkai",
  },
  {
    username: "hellas",
  },
];
let mockBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];

describe("get blogs api", () => {
  beforeEach(async () => {
    //This function set blog database to be empty and insert users to database
    //Also insert to the mock blogs id of user as property.
    await Blog.deleteMany({});
    await User.deleteMany({});
    await User.insertMany(mockUsers);
    const oneUser = await User.find({});
    mockBlogs = mockBlogs.map((blog) => {
      blog.user = oneUser[0].id;
      return blog;
    });
  });

  test("empty database return empty array", async () => {
    const response = await request(app).get("/api/blogs").expect(200);
    expect(response.body.length).toBe(0);
  });

  test("return multiply blogs from database", async () => {
    await Blog.insertMany(mockBlogs);
    const response = await request(app).get("/api/blogs").expect(200);
    expect(response.body.length).toBe(6);
  });

  test("check that blogs return from database with unique identifier (id)", async () => {
    await Blog.insertMany(mockBlogs);
    const response = await request(app).get("/api/blogs").expect(200);
    const existBlogs = response.body;
    expect(existBlogs[0].id).toBeDefined();
  });
});

describe("post blog api", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
  });

  test("add blog to database succesfully", async () => {
    const users = await User.find({});
    const mockBlog = {
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      user: users[0].id,
    };
    await request(app).post("/api/blogs").send(mockBlog).expect(201);
    const existBlogsDB = await Blog.find({});
    expect(existBlogsDB.length).toBe(1);

    const titles = existBlogsDB.map((blog) => blog.title);
    expect(titles).toContain("React patterns");
  });

  test("add blog that has no likes property automatically added to database with likes:0", async () => {
    const users = await User.find({});
    const mockBlog = {
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      user: users[0].id,
    };
    await request(app).post("/api/blogs").send(mockBlog).expect(201);
    const existBlogsDB = await Blog.find({ title: "React patterns" });
    expect(existBlogsDB.length).toBe(1);
    expect(existBlogsDB[0].likes).toBe(0);
  });

  test("add blog with no title property will failed", async () => {
    const users = await User.find({});
    const mockBlog = {
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      user: users[0].id,
    };
    await request(app).post("/api/blogs").send(mockBlog).expect(400);
    const existBlogsDB = await Blog.find({});
    expect(existBlogsDB.length).toBe(0);
  });

  test("add blog with no url property will failed", async () => {
    const users = await User.find({});
    const mockBlog = {
      title: "React patterns",
      author: "Michael Chan",
      likes: 7,
      user: users[0].id,
    };
    await request(app).post("/api/blogs").send(mockBlog).expect(400);
    const existBlogsDB = await Blog.find({});
    expect(existBlogsDB.length).toBe(0);
  });

  afterAll(async () => {
    await Blog.deleteMany({});
    mongoose.connection.close();
    app.killServer();
  });
});
