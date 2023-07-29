import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const addBlog = jest.fn()
  const user = userEvent.setup()

  const { container } = render(<BlogForm addBlog={addBlog} />)

  const inputBlogTitle = container.querySelector('#new-blog-title')
  const inputBlogAuthor = container.querySelector('#new-blog-author')
  const inputBlogUrl = container.querySelector('#new-blog-url')
  const sendButton = container.querySelector('#submit-new-blog')

  await user.type(inputBlogTitle, 'Title')
  await user.type(inputBlogAuthor, 'Author')
  await user.type(inputBlogUrl, 'url')
  await user.click(sendButton)

  expect(addBlog.mock.calls).toHaveLength(1)
  console.log(addBlog.mock.calls)
  expect(addBlog.mock.calls[0][0].content).toBe('Author')
})