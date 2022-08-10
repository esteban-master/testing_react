import NiceModal from '@ebay/nice-modal-react'
import { act, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react'

import { getMedicalRecord } from '../../mocks/handlers'
import { server } from '../../mocks/server'
import NewMedicalRecord from '../components/newMedicalRecord'
import type { Medicine } from '../models'

import { renderWrapper } from './utils'

describe('Medical Record Form', () => {
  test('Type observations', async () => {
    const user = userEvent.setup()

    const ui = renderWrapper()
    act(() => {
      NiceModal.show(NewMedicalRecord)
    })
    await user.type(ui.getByLabelText('Observaciones'), 'Hola')

    expect(ui.getByLabelText('Observaciones')).toHaveValue('Hola')
  })

  test('Submit form with completed data', async () => {
    const submitMock = jest.fn()
    const user = userEvent.setup()
    const medicine: Medicine = {
      createdAt: '2022-06-15T01:36:37.805Z',
      dose: '2',
      id: 1,
      management: 'oral',
      name: 'Paracetamol',
      updatedAt: '2022-06-15T01:36:37.805Z',
    }

    server.use(getMedicalRecord({ medicines: [medicine] }))
    renderWrapper()

    act(() => {
      NiceModal.show(NewMedicalRecord, {
        defaultValues: { endDate: new Date(), startDate: new Date() },
        onSubmit: submitMock,
      })
    })

    const startDate = '08-07-2022'
    const endDate = '08-14-2022'

    await user.click(await screen.findByLabelText('Medicamentos'))
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
      medicinesSelected: [{ id: medicine.id, label: medicine.name }],
      observations: '',
      startDate: new Date(startDate),
    })
  })
})
