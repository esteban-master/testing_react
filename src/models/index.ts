export interface Data {
  patients: HealthProfessional[]
  medicalCares: MedicalCare[]
  entities: Entity[]
  professions: HealthProfessional[]
  healthProfessionals: HealthProfessional[]
  medicines: Medicine[]
  medicalRecords: MedicalRecord[]
  medicineLines: MedicineLine[]
}

export interface Entity {
  id: number
  name: string
  taxNumber: string
  createdAt: string
  address: string
  photo: string
  uid: string
  phone: null | string
  age: number | null
  healthProfessionalId: number | null
  patientId: number | null
  updatedAt: string
}

export interface HealthProfessional {
  id: number
  entityId?: number
  createdAt: string
  professionId?: number
  name?: string
  updatedAt: string
}

export interface MedicalCare {
  id: number
  patientId: number
  createdAt: string
  healthProfessionalId: number
  attended: boolean
  date: string
  canceled: boolean
  updatedAt: string
}

export interface MedicalRecord {
  id: number
  startDate: string
  endDate: string
  patientId: number
  createdAt: string
  healthProfessionalId: number
  observations: string
  updatedAt: string
}

export interface MedicineLine {
  id: number
  medicineId: number
  medicalRecordId: number
  createdAt: string
  updatedAt: string
}

export interface Medicine {
  id: number
  name: string
  dose: string
  management: string
  createdAt: string
  updatedAt: string
}
