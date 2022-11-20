import { Button } from '@mui/material'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'

import { apiNormalization } from './api/helpers'
import { MedicalRecord } from './models'
import type { Data } from './models/types'

async function fetchData(): Promise<Data> {
  const res = await fetch('/medical_records')
  const data: Data = await res.json()
  return data
}

export function useMedicalRecord() {
  const queryClient = useQueryClient()
  const query = useQuery(['medical_record'], fetchData, {
    onSuccess: (data) => {
      Object.entries(data).forEach(([entity, items]) =>
        queryClient.setQueryData([entity], apiNormalization(items))
      )
    },
    staleTime: Infinity,
  })

  return {
    query,
    queryClient,
  }
}

const Home = () => {
  let navigate = useNavigate()
  const {
    query: { data, isLoading },
    queryClient,
  } = useMedicalRecord()
  return (
    <div>
      <Button onClick={() => navigate('/about')}>Ir a about</Button>

      <h2>Medical Records</h2>
      {data &&
        !isLoading &&
        data.medicalRecords.map((item) => {
          const medicalRecords = new MedicalRecord(queryClient, item)
          const healthProfessional = medicalRecords.healthProfessional?.entity
          const medicineLines = medicalRecords.medicineLines
          const patient = medicalRecords.patient
          return (
            <div key={medicalRecords.id}>
              <h2>Receta emitida por {healthProfessional?.name}</h2>
              <p>Para el paciente {patient?.entity?.name}</p>
              <p>Tiene {medicineLines.length} medicinas </p>
              <div>
                <ul>
                  {medicineLines.map((ml) => (
                    <li key={ml.id}>{ml.medicine?.name}</li>
                  ))}
                </ul>
              </div>
            </div>
          )
        })}
    </div>
  )
}
const About = () => {
  let navigate = useNavigate()
  return (
    <div>
      <Button onClick={() => navigate('/')}>Ir a home</Button>
    </div>
  )
}

const CustomRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}

export default CustomRoutes
