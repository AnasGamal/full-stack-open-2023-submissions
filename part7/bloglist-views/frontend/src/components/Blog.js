import { useState } from "react";
import blogService from "../services/blogs";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { deleteBlog } from "../reducers/blogReducer";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch();
  const [displayedBlog, setDisplayedBlog] = useState(blog);
  const [detailsVisible, setdetailsVisible] = useState(false);
  const showWhenVisible = { display: detailsVisible ? "" : "none" };

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
    dispatch(setNotification(`Blog ${blog.title} by ${blog.author} liked.`, "success", 10));
  };

  const removeBlogMutation = useMutation({
    mutationFn: (blogObject) => blogService.remove(blog.id),
    onSuccess: () => {
      queryClient.invalidateQueries('blogs');
    },
  });
  
  const handleRemoveClick = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removeBlogMutation.mutateAsync(blog)
        .then(() => {
          dispatch(setNotification(`Blog ${blog.title} by ${blog.author} removed.`, "success", 10));
        })
        .catch((error) => {
          if (error.response.status === 401) {
            dispatch(setNotification("You are not authorized to remove this blog.", "error", 10));
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
