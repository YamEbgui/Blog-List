import React, { useState } from "react";
const Blog = ({ blog }) => {
  const [fullyDisplayed, setDisplay] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const buttonStyle = {
    display: "block",
    "margin-left": "auto",
    "margin-right": 0,
  };

  const toggleDisplayBlog = () => {
    setDisplay(!fullyDisplayed);
  };

  const fullDisplay = () => {
    return (
      <div style={blogStyle}>
        <button style={buttonStyle} onClick={toggleDisplayBlog}>
          hide
        </button>
        <p>{blog.title}</p>
        <p>{blog.author}</p>
        <a href={blog.url}>
          <p>{blog.url}</p>
        </a>
        <p>
          {"likes: " + blog.likes} <button>👍</button>
        </p>
        <p>{blog.user.name}</p>
      </div>
    );
  };

  const shortDisplay = () => {
    return (
      <div style={blogStyle}>
        <button style={buttonStyle} onClick={toggleDisplayBlog}>
          view
        </button>
        {blog.title} {blog.author}{" "}
      </div>
    );
  };

  return <div>{fullyDisplayed === true ? fullDisplay() : shortDisplay()}</div>;
};
export default Blog;
