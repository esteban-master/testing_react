import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'

import App from '../App'

import { renderWrapper } from './utils'


test('Button new register present in the document', async () => {
  const ui = renderWrapper(<App />)
  const buttonNewMedicalRecord = ui.getByRole('button', {
    name: /nuevo registro/i,
  })

  expect(buttonNewMedicalRecord).toBeInTheDocument()
})
test('Open new medical record', async () => {
  const user = userEvent.setup()
  const ui = renderWrapper(<App />)
  const buttonNewMedicalRecord = ui.getByRole('button', {
    name: /nuevo registro/i,
  })

  await user.click(buttonNewMedicalRecord)
  expect(screen.getByText('Nuevo registro médico')).toBeInTheDocument()
})
