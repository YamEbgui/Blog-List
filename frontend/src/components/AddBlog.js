import React, { useState } from "react";
import blogService from "../services/blogService";

const AddBlog = ({ setBlogsState, setErrorMessage, blogFormRef }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

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
      blogFormRef.current.toggleVisibility(); //call to function that make 'Add New Blog' section to be hidden
      console.log(blog);
      setBlogsState([]);
      setErrorMessage(`a new blog ${title} by ${author} added`);
    } catch (exception) {
      console.log(exception);
      setErrorMessage("Information Is Missing");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <div>
      <h2>create new blog</h2>
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
