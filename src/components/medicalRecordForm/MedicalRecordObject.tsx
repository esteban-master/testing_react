import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

export default class MedicalRecordObject {
  private user

  constructor(component: JSX.Element) {
    this.user = userEvent.setup()
    render(component)
  }

  async selectMedicine() {
    await this.user.click(screen.getByLabelText('Medicamentos'))
    await this.user.click(screen.getByText('Paracetamol'))
  }

  async submitForm() {
    await this.user.click(screen.getByText('Submit'))
  }

  async writeObservations(text: string) {
    await this.user.type(screen.getByLabelText('Observaciones'), text)
  }

  async setStartDate(date: string) {
    await this.user.click(screen.getByLabelText('Desde'))
    await this.user.keyboard('{Backspace>8}')
    await this.user.type(screen.getByLabelText('Desde'), date)
  }

  async setEndDate(date: string) {
    await this.user.click(screen.getByLabelText('Hasta'))
    await this.user.keyboard('{Backspace>8}')
    await this.user.type(screen.getByLabelText('Hasta'), date)
  }

  getScreen() {
    return screen
  }
}
