import NiceModal from '@ebay/nice-modal-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'

import App from './App'

test('Button new register present in the document', async () => {
  render(
    <NiceModal.Provider>
      <App />
    </NiceModal.Provider>
  )

  const buttonNewMedicalRecord = screen.getByRole('button', {
    name: /nuevo registro/i,
  })

  expect(buttonNewMedicalRecord).toBeInTheDocument()
})
test('Open new medical record', async () => {
  const user = userEvent.setup()
  render(
    <NiceModal.Provider>
      <App />
    </NiceModal.Provider>
  )

  const buttonNewMedicalRecord = screen.getByRole('button', {
    name: /nuevo registro/i,
  })

  await user.click(buttonNewMedicalRecord)
  expect(screen.getByText('Nuevo registro médico')).toBeInTheDocument()
})
