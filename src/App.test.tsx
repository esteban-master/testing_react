import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'

import App from './App'

test('Show App Component', () => {
  render(<App />)

  expect(screen.getByText('Hello Vite + React!')).toBeInTheDocument()
})

test('Working Counter', async () => {
  const user = userEvent.setup()
  const { getByText } = render(<App />)
  expect(getByText('Count is: 0')).toBeInTheDocument()

  const button = getByText(/Count is: \d/)

  await user.click(button)
  expect(getByText('Count is: 1')).toBeInTheDocument()

  await user.click(button)
  expect(getByText('Count is: 2')).toBeInTheDocument()

  await user.click(button)
  expect(getByText('Count is: 3')).toBeInTheDocument()
})
