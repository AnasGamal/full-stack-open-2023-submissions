import { useState } from "react";
import blogService from "../services/blogs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from 'react'
import { NotificationContext } from '../contexts/NotificationContext'

const Blog = ({ blog, user }) => {
  const { notification, setNotification } = useContext(NotificationContext);
  const [displayedBlog, setDisplayedBlog] = useState(blog);
  const [detailsVisible, setdetailsVisible] = useState(false);
  const showWhenVisible = { display: detailsVisible ? "" : "none" };

  const queryClient = useQueryClient()

  const likeBlogMutation = useMutation({
    mutationFn: (blogObject) => blogService.update(blog.id, blogObject),
    onSuccess: () => {
      queryClient.invalidateQueries('blogs');
    },
  });

  const handleLikeClick = async (blog) => {
    await likeBlogMutation.mutateAsync({
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    });
    setNotification("SUCCESS", `Blog ${blog.title} by ${blog.author} liked.`, 10);
  };

  const removeBlogMutation = useMutation({
    mutationFn: (blogObject) => blogService.remove(blog.id),
    onSuccess: () => {
      queryClient.invalidateQueries('blogs');
    },
  });
  
  const handleViewBlog = () => {
    setdetailsVisible(!detailsVisible);
  };
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleRemoveClick = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removeBlogMutation.mutateAsync(blog)
        .then(() => {
          setNotification("SUCCESS", `Blog ${blog.title} by ${blog.author} removed.`, 10);
        })
        .catch((error) => {
          if (error.response.status === 401) {
            setNotification("ERROR", "You are not authorized to remove this blog.", 10);
          }
        });
    }
  };
  if (displayedBlog === null) {
    return null;
  }
  return (
    <div style={blogStyle} className="blog">
      {blog.title}
      <button
        id="blog-toggle-button"
        onClick={handleViewBlog}
        className="blogToggle"
      >
        {detailsVisible ? "hide" : "view"}
      </button>
      <div style={showWhenVisible} className="togglableContent">
        {detailsVisible ? (
          <>
            <p className="blogUrl">{blog.url}</p>
            <p className="blogLikes">
              {blog.likes}{" "}
              <button
                id="like-button"
                onClick={() => handleLikeClick(blog)}
                className="blogLikeButton"
              >
                like
              </button>
            </p>
            <p className="blogUser">{blog.user.name}</p>
            {user && user.username === blog.user.username ? (
              <p>
                <button
                  className="remove-button"
                  onClick={() => handleRemoveClick(blog)}
                >
                  remove
                </button>
              </p>
            ) : null}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Blog;
