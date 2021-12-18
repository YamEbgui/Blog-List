import React, { useState } from "react";
import blogService from "../services/blogService";

const Blog = ({ blog, addLikeFunction }) => {
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
    marginLeft: "auto",
    marginRight: 0,
  };

  const removeButtonStyle = {
    display: "block",
    backgroundColor: "blue",
  };

  const toggleDisplayBlog = () => {
    setDisplay(!fullyDisplayed);
  };

  const fullDisplay = () => {
    return (
      <div className="blog" style={blogStyle}>
        <button style={buttonStyle} onClick={toggleDisplayBlog}>
          hide
        </button>
        <p>{blog.title}</p>
        <p>{blog.author}</p>
        <p className="url">
          {"url: "} <a href={blog.url}>{blog.url}</a>
        </p>
        <p className="likes">
          {"likes: " + blog.likes}{" "}
          <button
            onClick={() => {
              addLikeFunction(blog.id);
            }}
          >
            👍
          </button>
        </p>
        <p>{blog.user.name}</p>
        <button
          style={removeButtonStyle}
          onClick={() => {
            if (window.confirm("Do you want to remove this blog?")) {
              return blogService.deleteBlog(blog.id);
            }
          }}
        >
          remove
        </button>
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
