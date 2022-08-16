import NiceModal from '@ebay/nice-modal-react'
import { act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react'

import { getMedicalRecord } from '../../mocks/handlers'
import { server } from '../../mocks/server'
import NewMedicalRecord from '../components/newMedicalRecord'

import { generateMedicine, generateMedicineList } from './factories/medicine'
import { renderWrapper } from './utils'

test('Show select with all medicines', async () => {
  const user = userEvent.setup()
  const medicines = generateMedicineList()

  server.use(getMedicalRecord({ medicines }))
  const { screen } = renderWrapper()
  act(() => {
    NiceModal.show(NewMedicalRecord)
  })

  await user.click(await screen.findByLabelText('Medicamentos'))

  medicines.forEach((medicine) =>
    expect(screen.getByText(medicine.name)).toBeInTheDocument()
  )
})

test('Submit form with completed data', async () => {
  const submitMock = jest.fn()
  const user = userEvent.setup()
  const medicine = generateMedicine()

  const { screen } = renderWrapper()
  server.use(getMedicalRecord({ medicines: [medicine] }))

  act(() => {
    NiceModal.show(NewMedicalRecord, {
      defaultValues: { endDate: new Date(), startDate: new Date() },
      onSubmit: submitMock,
    })
  })

  const startDate = '08-07-2022'
  const endDate = '08-14-2022'

  await user.click(await screen.findByLabelText('Medicamentos'))
  await user.click(screen.getByText(medicine.name))

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
