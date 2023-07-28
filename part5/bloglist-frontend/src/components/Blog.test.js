import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
const blog = {
  title: 'Component testing is done with react-testing-library',
  user: {
    name: 'User'
  },
  url: 'url-string',
  likes: 15
}
test('Blog renders title', () => {
  const { container } = render(<Blog blog={blog} />)

  const blogDiv = container.querySelector('.blog')
  expect(blogDiv).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
})

test('Blog renders user', async () => {
  const { container } = render(<Blog blog={blog} />)
  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)
  const blogUserP = container.querySelector('.blogUser')
  expect(blogUserP).toHaveTextContent(
    'User'
  )
})

test('Blog does not render author and url by default', () => {
  const { container } = render(<Blog blog={blog} />)
  const blogLikes = container.querySelector('.blogLikes')
  expect(blogLikes).toBeNull()
  const blogUrl = container.querySelector('.blogUrl')
  expect(blogUrl).toBeNull()
})