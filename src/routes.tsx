import { Button } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'

import type { Data } from './models'

async function fetchData(): Promise<Data> {
  const res = await fetch('/medical_records')
  const data: Data = await res.json()
  return data
}

type Select<T> = (data: Data) => T

export function useMedicalRecord<T>(select?: Select<T>) {
  return useQuery(['medical_record'], fetchData, {
    select,
    staleTime: Infinity,
  })
}

const Home = () => {
  let navigate = useNavigate()
  return (
    <div>
      <Button onClick={() => navigate('/about')}>Ir a about</Button>
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
