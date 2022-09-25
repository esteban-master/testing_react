import NiceModal from '@ebay/nice-modal-react'
import { Button } from '@mui/material'
import React from 'react'
import './index.css'

import './App.css'
import type { MedicalRecordForm } from './components/newMedicalRecord'
import NewMedicalRecord from './components/newMedicalRecord'
import Routes from './routes'

NiceModal.register('newMedicalRecord', NewMedicalRecord)

const App: React.FC = () => {
  function handleSubmit(values: MedicalRecordForm) {
    return values
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
        Nuevo registro JAJAJA
      </Button>
      <Routes />
    </main>
  )
}

export default App
