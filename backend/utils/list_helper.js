const User = require("../models/user");
// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  } else {
    let newArray = [...blogs];
    newArray.shift();
    return blogs[0].likes + totalLikes(newArray);
  }
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return [];
  }
  const reducer = (previousValue, currentValue) => {
    if (previousValue.likes >= currentValue.likes) {
      return previousValue;
    } else {
      return currentValue;
    }
  };
  const fav = blogs.reduce(reducer);
  const { title, author, likes } = fav;
  return { title, author, likes };
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  usersInDb,
  dummy,
  totalLikes,
  favoriteBlog,
};
