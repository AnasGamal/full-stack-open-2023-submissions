import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import blogService from "../services/blogs";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";

const BlogForm = () => {
  const [newBlogTitle, setNewBlogTitle] = useState("");
  const [newBlogAuthor, setNewBlogAuthor] = useState("");
  const [newBlogUrl, setNewBlogUrl] = useState("");
  const dispatch = useDispatch();

  const queryClient = useQueryClient();
  
  const newBlogMutation = useMutation({
    mutationFn: (blogObject) => blogService.create(blogObject),
    onSuccess: () => {
      queryClient.invalidateQueries('blogs');
    },
  });
  const createBlog = async (blogObject) => {  
    const returnedBlog = await newBlogMutation.mutateAsync(blogObject);
    dispatch(setNotification(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added.`, "success", 10))
  };

  const handleBlogTitleChange = (event) => {
    setNewBlogTitle(event.target.value);
  };

  const handleBlogAuthorChange = (event) => {
    setNewBlogAuthor(event.target.value);
  };
  const handleBlogUrlChange = (event) => {
    setNewBlogUrl(event.target.value);
  };

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
    });
    // Reset blog form values
    setNewBlogTitle("");
    setNewBlogAuthor("");
    setNewBlogUrl("");
  };

  return (
    <form onSubmit={addBlog}>
      <div>
        title
        <input
          value={newBlogTitle}
          onChange={handleBlogTitleChange}
          id="new-blog-title"
        />
      </div>
      <div>
        author
        <input
          value={newBlogAuthor}
          onChange={handleBlogAuthorChange}
          id="new-blog-author"
        />
      </div>
      <div>
        url
        <input
          value={newBlogUrl}
          onChange={handleBlogUrlChange}
          id="new-blog-url"
        />
      </div>
      <button id="submit-new-blog" type="submit">
        save
      </button>
    </form>
  );
};

export default BlogForm;