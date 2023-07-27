import { useState } from "react"

const Blog = ({blog}) => {

  const [detailsVisible, setdetailsVisible] = useState(false)
  const showWhenVisible = { display: detailsVisible ? '' : 'none' }

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
    <p>{blog.likes} <button>like</button></p>
    <p>{blog.author}</p>
    </div>
  </div>
  )
}

export default Blog