/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
import '@testing-library/cypress/add-commands'
//
// -- This is a parent command --
Cypress.Commands.add(
  'newMedicalRecord',
  ({
    observations,
    startDate = '01111996',
    endDate = '02111996',
    medicineSelected,
  }) => {
    cy.contains('Nuevo').click()
    cy.get('input[name="observations"]').type(observations)
    cy.contains('label', 'Desde').type(`{moveToStart}${startDate}`)
    cy.contains('label', 'Hasta').type(`{moveToStart}${endDate}`)
    medicineSelected.forEach((item) => {
      cy.findByLabelText(/Medicamentos/i).click()
      cy.findByRole('option', { name: item }).click()
    })
    cy.contains('Submit').click()
  }
)

//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
declare global {
  namespace Cypress {
    interface Chainable {
      newMedicalRecord(data: {
        observations: string
        startDate?: string
        endDate?: string
        medicineSelected: string[]
      }): Chainable<void>
    }
  }
}