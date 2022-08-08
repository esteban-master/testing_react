import NiceModal from '@ebay/nice-modal-react'
// import { build, sequence, perBuild } from '@jackfranklin/test-data-bot'
import { render, act, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'

import NewMedicalRecord from '.'



describe('Medical Record Form', () => {
  test('Type observations', async () => {
    const user = userEvent.setup()

    // const { text } = buildLoginForm()

    render(<NiceModal.Provider />)
    act(() => {
      NiceModal.show(NewMedicalRecord)
    })
    await user.type(screen.getByLabelText('Observaciones'), 'Hola')

    expect(screen.getByLabelText('Observaciones')).toHaveValue('Hola')
  })

  test('Submit form with completed data', async () => {
    const submitMock = jest.fn()
    const user = userEvent.setup()
    render(<NiceModal.Provider />)

    act(() => {
      NiceModal.show(NewMedicalRecord, {
        defaultValues: { endDate: new Date(), startDate: new Date() },
        onSubmit: submitMock,
      })
    })

    const startDate = '08-07-2022'
    const endDate = '08-14-2022'

    await user.click(screen.getByLabelText('Medicamentos'))
    await user.click(screen.getByText('Paracetamol'))

    await user.click(screen.getByLabelText('Desde'))
    await user.keyboard('{Backspace>8}')
    await user.type(screen.getByLabelText('Desde'), startDate)

    await user.click(screen.getByLabelText('Hasta'))
    await user.keyboard('{Backspace>8}')
    await user.type(screen.getByLabelText('Hasta'), endDate)

    await user.click(screen.getByText('Submit'))

    expect(submitMock).toHaveBeenCalledTimes(1)
    expect(submitMock).toHaveBeenCalledWith({
      endDate: new Date(endDate),
      medicinesSelected: [{ id: 1, label: 'Paracetamol' }],
      observations: '',
      startDate: new Date(startDate),
    })
  })
})
