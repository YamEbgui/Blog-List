const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const blogRouter = require("./controllers/blog");
require("dotenv").config();
const PORT = process.env.PORT || 3003;

const mongoUrl = process.env.MONGO_URI;
mongoose.connect(mongoUrl);

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogRouter);

const listener = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.killServer = () => {
  listener.close();
};

module.exports = app;
