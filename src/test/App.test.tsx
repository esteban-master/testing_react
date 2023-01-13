import userEvent from '@testing-library/user-event'
import React from 'react'

import App from '../App'

import { renderWrapper } from './utils'

test.skip('Button new register present in the document', async () => {
  const { screen } = renderWrapper(<App />)
  const buttonNewMedicalRecord = screen.getByRole('button', {
    name: /nuevo registro/i,
  })

  expect(buttonNewMedicalRecord).toBeInTheDocument()
})
test.skip('Open new medical record', async () => {
  const user = userEvent.setup()
  const { screen } = renderWrapper(<App />)
  const buttonNewMedicalRecord = screen.getByRole('button', {
    name: /nuevo registro/i,
  })

  await user.click(buttonNewMedicalRecord)
  expect(screen.getByText('Nuevo registro médico')).toBeInTheDocument()
})
