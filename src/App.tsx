import NiceModal from '@ebay/nice-modal-react'
import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './index.css'

import './App.css'
import type { MedicalRecordForm } from './components/newMedicalRecord'
import NewMedicalRecord from './components/newMedicalRecord'
import Routes from './routes'

NiceModal.register('newMedicalRecord', NewMedicalRecord)

const App: React.FC = () => {
  const [values, setValues] = useState<null | { observations: string }>(null)
  const [data, setData] = useState(null)
  function handleSubmit(val: MedicalRecordForm) {
    setValues(val)
  }

  

  function getData() {
    fetch('/medical_records')
      .then((res) => res.json())
      .then(setData)
  }

  return (
    <main className="App">
      <Button
        variant="contained"
        onClick={() =>
          NiceModal.show('newMedicalRecord', {
            defaultValues: { endDate: new Date(), startDate: new Date() },
            onSubmit: handleSubmit,
          })
        }
      >
        Nuevo
      </Button>
      {values && (
        <div>
          <h1>{values.observations}</h1>
        </div>
      )}
      <Button onClick={() => getData()}>Get</Button>
      { data && data.medicines.map(item =>  <p>{item.name}</p> ) }
      <Routes />
    </main>
  )
}

export default App
