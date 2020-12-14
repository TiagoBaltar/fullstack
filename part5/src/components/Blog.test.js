import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

describe('<Blog />', () => {
  test('at start the children are not displayed', () => {
    const blog = {
      author: 'myself',
      title: 'testTitle',
      url: 'URL',
    }

    const likeHandler = jest.fn()
    const removeHandler = jest.fn()

    const component = render(
      <Blog blog={blog} likeClick={likeHandler} removeClick={removeHandler} />
    )

    const hidden = component.container.querySelector('.togglableContent')
    const defaultView = component.container.querySelector('.defaultView')

    expect(hidden).toHaveStyle('display: none')
    expect(defaultView).toHaveTextContent('myself')
    expect(defaultView).toHaveTextContent('testTitle')
    expect(defaultView).not.toHaveTextContent('URL')
  })

  test('hidden values are shown after clicking show button', () => {
    const blog = {
      author: 'myself',
      title: 'testTitle',
      url: 'URL',
    }

    const likeHandler = jest.fn()
    const removeHandler = jest.fn()

    const component = render(
      <Blog blog={blog} likeClick={likeHandler} removeClick={removeHandler} />
    )

    const hidden = component.container.querySelector('.togglableContent')
    expect(hidden).toHaveStyle('display: none')

    const button = component.container.querySelector('.toggleViewButton')
    fireEvent.click(button)
    expect(hidden).not.toHaveStyle('display: none')
  })

  test('clicking the like multiple times', () => {
    const blog = {
      author: 'myself',
      title: 'testTitle',
      url: 'URL',
    }

    const likeHandler = jest.fn()
    const removeHandler = jest.fn()

    const component = render(
      <Blog blog={blog} likeClick={likeHandler} removeClick={removeHandler} />
    )

    const likeButton = component.container.querySelector('.likeButton')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(likeHandler.mock.calls).toHaveLength(2)
  })
})
