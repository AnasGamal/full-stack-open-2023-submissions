const BlogForm = ({
    addBlog,
    newBlogTitle,
    handleBlogTitleChange,
    newBlogAuthor,
    handleBlogAuthorChange,
    newBlogUrl,
    handleBlogUrlChange
    }) => (
    <form onSubmit={addBlog}>
      <div>
      title
      <input
        value={newBlogTitle}
        onChange={handleBlogTitleChange}
      />
      </div>
      <div>
      author
      <input
        value={newBlogAuthor}
        onChange={handleBlogAuthorChange}
      />
      </div>
      <div>
      url
      <input
        value={newBlogUrl}
        onChange={handleBlogUrlChange}
      />
      </div>
      <button type="submit">save</button>
    </form>  
  )

export default BlogForm