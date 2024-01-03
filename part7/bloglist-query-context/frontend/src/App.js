import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useContext } from 'react'
import { NotificationContext } from './contexts/NotificationContext'
import "./index.css";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const { notification, setNotification } = useContext(NotificationContext);

  const queryClient = useQueryClient()

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
      // setBlogs(blogs.map((b) => (b.id !== returnedBlog.id ? b : returnedBlog)));
    });
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
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
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  // useEffect(() => {
  //   blogService.getAll().then((blogs) => setBlogs(blogs));
  // }, []);

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
  })

  const blogs = result.data


  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      setNotification("SUCCESS", `${user.name} logged in`, 10);
    } catch (exception) {
      setNotification("ERROR", "Wrong credentials", 10);
      console.log(notification)
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
            <BlogForm />
          </Togglable>
        </div>
      )}

      {result.isLoading ? (
        <div>Loading...</div>
      ) : (
        blogs.sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            handleLikeClick={() => handleLikeClick(blog)}
          />
        )))}
    </div>
  );
};

export default App;
