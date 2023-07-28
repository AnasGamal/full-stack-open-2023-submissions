import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({
  blog,
  setMessage,
  setMessageType,
  user }) => {
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

  const handleRemoveClick = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      blogService
        .remove(blog.id)
        .then(() => {
          setDisplayedBlog(null)
          setMessageType('success')
          setMessage(`Successfully removed blog ${blog.title} by ${blog.author}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          if (error.response.status === 401) {
            setMessageType('error')
            setMessage(`${error.response.data.error}`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          }
        })
    }
  }
  if (displayedBlog === null) {
    return null
  }
  return (
    <div style={blogStyle} className='blog'>
      {blog.title}
      <button onClick={handleViewBlog} className='blogToggle'>
        {detailsVisible ? 'hide' : 'view'}
      </button>
      <div style={showWhenVisible} className='togglableContent'>
        { detailsVisible ? (
          <>
            <p className='blogUrl'>{blog.url}</p>
            <p className='blogLikes'>{displayedBlog.likes} <button onClick={() => handleLikeClick(blog)}>like</button></p>
            <p className='blogUser'>{blog.user.name}</p>
            {(user && user.username === blog.user.username) ? (
              <p><button onClick={() => handleRemoveClick(blog)}>remove</button></p>
            ) : null }
          </>
        ): null}
      </div>
    </div>
  )
}

export default Blog