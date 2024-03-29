import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import { setNotification } from "./reducers/notificationReducer";
import { setBlogs } from "./reducers/blogReducer";
import { setUser } from "./reducers/userReducer";
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import "./index.css";

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const createBlog = (blogObject) => {
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
      // show success UI message
      dispatch(setNotification(`Successfully added ${returnedBlog.title} by ${returnedBlog.author}`, "success", 3));
    });
  };
  const handleLikeClick = (blog) => {
    console.log("clicked");
    const blogObject = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    };
    blogService.update(blog.id, blogObject).then((returnedBlog) => {
      dispatch(setBlogs(blogs.map((b) => (b.id !== returnedBlog.id ? b : returnedBlog))));
    });
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    dispatch(setUser(null));
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    blogService.getAll().then((blogs) => dispatch(setBlogs(blogs)));
    console.log("getting blogs");
    console.log(blogs)
    const listedBlogs = blogs
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setUser(user));
      setUsername("");
      setPassword("");
      dispatch(setNotification(`Successfully logged in as ${user.name}`, "success", 3));
      console.log("logged in");
    } catch (exception) {
      dispatch(setNotification("Wrong credentials", "error"))
      
      console.log("wrong credentials");
    }
    console.log("logging in with", username, password);
  };

  return (
    <div>
      <Notification />
      <h2>blogs</h2>
      {user === null && (
        <Togglable buttonLabel="Login">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={handleUsernameChange}
            handlePasswordChange={handlePasswordChange}
            handleLogin={handleLogin}
          />
        </Togglable>
      )}
      {user && (
        <div>
          {user.name && <p>{user.name} logged in</p>}
          <form onSubmit={handleLogout}>
            <button id="logout-button" type="submit">
              Log out
            </button>
          </form>

          <Togglable buttonLabel="new blog">
            <BlogForm createBlog={createBlog} />
          </Togglable>
        </div>
      )}
      {blogs
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            handleLikeClick={() => handleLikeClick(blog)}
          />
        ))}
    </div>
  );
};

export default App;
