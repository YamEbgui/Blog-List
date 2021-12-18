import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";
import AddBlog from "./components/AddBlog";
import blogService from "./services/blogService";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);
  const blogFormRef = useRef();

  const loginForm = () => {
    return (
      <Togglable buttonLabel="login">
        <LoginForm setUser={setUser} setErrorMessage={setErrorMessage} />
      </Togglable>
    );
  };

  const addBlogForm = () => {
    return (
      <Togglable buttonLabel="New Blog" ref={blogFormRef}>
        <AddBlog
          setBlogsState={setBlogs}
          setErrorMessage={setErrorMessage}
          blogFormRef={blogFormRef}
        />
      </Togglable>
    );
  };

  const addLikeFunction = (blogId) => {
    return blogService.update(blogId);
  };

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };

  useEffect(() => {
    blogService.getAll().then((blogs) =>
      setBlogs(
        //sort blogs by number of likes
        blogs.sort(function (a, b) {
          return b.likes - a.likes;
        })
      )
    );
  }, [blogs]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} />

      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.name} logged-in</p>
          <button onClick={handleLogout}>Logout</button>
          {addBlogForm()}
        </div>
      )}

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} addLikeFunction={addLikeFunction} />
      ))}
    </div>
  );
};

export default App;
