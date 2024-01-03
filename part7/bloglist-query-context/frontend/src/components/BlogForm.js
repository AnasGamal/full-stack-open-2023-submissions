import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { NotificationContext } from "../contexts/NotificationContext";
import blogService from "../services/blogs";

const BlogForm = () => {
  const [newBlogTitle, setNewBlogTitle] = useState("");
  const [newBlogAuthor, setNewBlogAuthor] = useState("");
  const [newBlogUrl, setNewBlogUrl] = useState("");
  const { notification, setNotification } = useContext(NotificationContext);
  const queryClient = useQueryClient();
  const newBlogMutation = useMutation({
    mutationFn: (blogObject) => blogService.create(blogObject),
    onSuccess: () => {
      queryClient.invalidateQueries('blogs');
    },
  });
  const createBlog = async (blogObject) => {  
    await newBlogMutation.mutateAsync(blogObject);
    setNotification("SUCCESS", `a new blog ${returnedBlog.title} by ${returnedBlog.author} added.`, 10);
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
