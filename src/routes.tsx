import { Button } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'

import type { Data } from './models'

const fetchData = async (): Promise<Data> => {
  const res = await fetch('/medical_records')
  return await res.json()
}

type Select<T extends keyof Data> = (data: Data) => Data[T]

export function useMedicalCare<T extends keyof Data>(select?: Select<T>) {
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
