import { getMedicalRecord } from '../../mocks/handlers'
import { server } from '../../mocks/server'
import { generateMedicineList } from '../../src/test/factories/medicine'
describe('empty spec', () => {
  it('passes', () => {
    const medicines = generateMedicineList()
    cy.visit('http://localhost:5173/')
    cy.window().then((window: any) => {
      console.log({window})
      const { worker, rest } = window.msw
      worker.use(
        rest.get('/medical_records', (req, res, ctx) => {
          return res(ctx.status(200), ctx.json({medicines}))
        })
      )
    })
    const observations = 'Le duele mucho la rodilla'
    cy.newMedicalRecord({
      medicineSelected: medicines.map((item) => item.name),
      observations,
    })
    cy.contains(observations).should('be.visible')
  })
  // it('passes 2', () => {
  //   cy.visit('http://localhost:5173/')
  //   cy.contains('Get').click()
  //   cy.findByRole('button', { name: /get/i }).click()
  //   cy.findByText('Enalapril').should('be.visible')
  // })
})
