import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'

import CustomSelect from '../components/select'

describe.only('Select', () => {
  test('Find select Age', () => {
    render(<CustomSelect />)
    const select = screen.getByLabelText('Age')
    expect(select).toBeInTheDocument()
  })

  test('Select second option', async () => {
    const user = userEvent.setup()
    render(<CustomSelect />)
    await user.click(screen.getByLabelText('Age'))
    const secondOption = screen.getByRole('option', { name: 'Twenty' })
    await user.click(secondOption)

    expect(screen.getByText('Select: twenty')).toBeInTheDocument()
  })
})