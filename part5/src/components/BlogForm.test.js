import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const addBlog = jest.fn()

  const component = render(<BlogForm onSubmit={addBlog} />)

  const authorInput = component.container.querySelector('#author')
  const titleInput = component.container.querySelector('#title')
  const urlInput = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(authorInput, { target: { value: 'myself' } })
  fireEvent.change(titleInput, { target: { value: 'testTitle' } })
  fireEvent.change(urlInput, { target: { value: 'URL' } })
  fireEvent.submit(form)

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog).toBeCalledWith({
    author: 'myself',
    title: 'testTitle',
    url: 'URL',
  })
})
