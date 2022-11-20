import type { QueryClient } from '@tanstack/react-query'

import { HealthProfessional } from './HealthProfessional'
import { MedicineLine } from './MedicineLine'
import { Patient } from './Patient'
import type {
  IHealthProfessional,
  IMedicalRecord,
  IMedicineLine,
  IPatient,
} from './types'

export class MedicalRecord {
  constructor(
    private readonly queryClient: QueryClient,
    private item: IMedicalRecord
  ) {}

  get healthProfessional() {
    const healthProfessionals = this.queryClient.getQueryData<{
      [key: number]: IHealthProfessional
    }>(['healthProfessionals'])

    return healthProfessionals
      ? new HealthProfessional(
          this.queryClient,
          healthProfessionals[this.item.healthProfessionalId]
        )
      : undefined
  }

  get medicineLines(): MedicineLine[] {
    const medicineLines = this.queryClient.getQueryData<{
      [key: number]: IMedicineLine
    }>(['medicineLines'])
    return medicineLines
      ? Object.values(medicineLines)
          .filter((item) => item.medicalRecordId === this.item.id)
          .map((item) => new MedicineLine(this.queryClient, item))
      : []
  }

  get patient(): Patient | undefined {
    const medicineLines = this.queryClient.getQueryData<{
      [key: number]: IPatient
    }>(['patients'])
    return medicineLines
      ? new Patient(this.queryClient, medicineLines[this.item.patientId])
      : undefined
  }

  get id() {
    return this.item.id
  }
}
