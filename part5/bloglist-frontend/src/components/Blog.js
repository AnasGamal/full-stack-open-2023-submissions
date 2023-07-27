import { useState } from "react"
import blogService from '../services/blogs'

const Blog = ({blog}) => {
  const [displayedBlog, setDisplayedBlog] = useState(blog)

  const [detailsVisible, setdetailsVisible] = useState(false)
  const showWhenVisible = { display: detailsVisible ? '' : 'none' }

  const handleLikeClick = (blog) => {
    console.log('clicked')
    const blogObject = {
      user: blog.user.id,
      likes: displayedBlog.likes+1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
        blogService
        .update(blog.id, blogObject)
        .then(returnedBlog => {
          setDisplayedBlog(returnedBlog)
        })
  }

  const handleViewBlog = () => {
    setdetailsVisible(!detailsVisible)
  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
  <div style={blogStyle}>
    {blog.title}
    <button onClick={handleViewBlog}>
      {detailsVisible ? "hide" : "view"}
    </button>
    
    <div style={showWhenVisible}>
    <p>{blog.url}</p>
    <p>{displayedBlog.likes} <button onClick={() => handleLikeClick(blog)}>like</button></p>
    <p>{blog.author}</p>
    </div>
  </div>
  )
}

export default Blog