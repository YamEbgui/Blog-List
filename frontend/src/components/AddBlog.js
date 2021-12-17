import React, { useState } from "react";
import blogService from "../services/blogService";
import Notification from "./Notification";

const AddBlog = ({ setBlogsState }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddBlog = async (event) => {
    event.preventDefault();
    try {
      const blog = await blogService.create({
        title,
        author,
        url,
      });
      setTitle("");
      setAuthor("");
      setUrl("");
      console.log(blog);
      setBlogsState([]);
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <div>
      <h2>create new blog</h2>
      <Notification message={errorMessage} />
      <form onSubmit={handleAddBlog}>
        <div>
          title
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AddBlog;
