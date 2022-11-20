import type { QueryClient } from '@tanstack/react-query'

import { Patient } from './Patient'
import type { IMedicalCare, IPatient } from './types'

export class MedicalCare {
  constructor(
    private readonly queryClient: QueryClient,
    private item: IMedicalCare
  ) {}

  get patient(): Patient | undefined {
    const patients = this.queryClient.getQueryData<{ [key: number]: IPatient }>(
      ['patients']
    )
    return patients
      ? new Patient(this.queryClient, patients[this.item.patientId])
      : undefined
  }

  get id() {
    return this.item.id
  }
}
