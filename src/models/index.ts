export interface Data {
  patients: Patient[]
  medicalCares: MedicalCare[]
  entities: Entity[]
  medicines: Medicine[]
  medicalRecords: MedicalRecord[]
  medicineLines: MedicineLine[]
  healthProfessionals: HealthProfessional[]
  professions: Profession[]
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

export interface Patient {
  createdAt: string
  entityId: number
  id: number
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


export interface HealthProfessional {
  createdAt: string
  entityId: number
  id: number
  professionId: number
  updatedAt: string
}
export interface Profession {
  createdAt: string
  name: string
  id: number
  updatedAt: string
}
