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

module.exports = {
  dummy,
  totalLikes,
};
