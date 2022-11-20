export interface Data {
  patients: IPatient[]
  medicalCares: IMedicalCare[]
  entities: IEntity[]
  medicines: IMedicine[]
  medicalRecords: IMedicalRecord[]
  medicineLines: IMedicineLine[]
  healthProfessionals: IHealthProfessional[]
  professions: IProfession[]
}

export interface IEntity {
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

export interface IPatient {
  createdAt: string
  entityId: number
  id: number
  updatedAt: string
}

export interface IMedicalCare {
  id: number
  patientId: number
  createdAt: string
  healthProfessionalId: number
  attended: boolean
  date: string
  canceled: boolean
  updatedAt: string
}

export interface IMedicalRecord {
  id: number
  startDate: string
  endDate: string
  patientId: number
  createdAt: string
  healthProfessionalId: number
  observations: string
  updatedAt: string
}

export interface IMedicineLine {
  id: number
  medicineId: number
  medicalRecordId: number
  createdAt: string
  updatedAt: string
}

export interface IMedicine {
  id: number
  name: string
  dose: string
  management: string
  createdAt: string
  updatedAt: string
}

export interface IHealthProfessional {
  createdAt: string
  entityId: number
  id: number
  professionId: number
  updatedAt: string
}
export interface IProfession {
  createdAt: string
  name: string
  id: number
  updatedAt: string
}
