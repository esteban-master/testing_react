import React from 'react'

import MedicalRecordObject from './MedicalRecordObject'

import MedicalRecordForm from '.'

describe.only('Medical Record Form', () => {
  test('Type observations', async () => {
    const message = 'Texto'
    const page = new MedicalRecordObject(
      <MedicalRecordForm onSubmit={() => {}} />
    )
    await page.writeObservations(message)
    expect(page.getScreen().getByLabelText('Observaciones')).toHaveValue(
      message
    )
  })

  test('Submit with medicines selected', async () => {
    const submitMock = jest.fn()
    const page = new MedicalRecordObject(
      <MedicalRecordForm onSubmit={submitMock} />
    )
    await page.selectMedicine()
    await page.submitForm()
    expect(submitMock).toHaveBeenCalledTimes(1)
    expect(submitMock).toHaveBeenCalledWith({
      endDate: undefined,
      medicinesSelected: [{ id: 1, label: 'Paracetamol' }],
      observations: '',
      startDate: undefined,
    })
  })

  test('Select dates', async () => {
    const submitMock = jest.fn()
    const page = new MedicalRecordObject(
      <MedicalRecordForm onSubmit={submitMock} />
    )

    const startDate = '08-07-2022'
    const endDate = '08-14-2022'

    await page.setStartDate(startDate)
    await page.setEndDate(endDate)
    await page.submitForm()

    expect(submitMock).toHaveBeenCalledTimes(1)
    expect(submitMock).toHaveBeenCalledWith({
      endDate: new Date(endDate),
      observations: '',
      startDate: new Date(startDate),
    })
  })
})
