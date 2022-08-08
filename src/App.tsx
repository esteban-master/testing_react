import NiceModal from '@ebay/nice-modal-react'
import { Button } from '@mui/material'
import React from 'react'
import './index.css'

import './App.css'
import type { MedicalRecordForm } from './components/newMedicalRecord'
import NewMedicalRecord from './components/newMedicalRecord'

NiceModal.register('newMedicalRecord', NewMedicalRecord)

const App: React.FC = () => {
  function handleSubmit(values: MedicalRecordForm) {
    console.log('DATA', values)
  }

  return (
    <main className="App">
      <Button
        variant="contained"
        onClick={() =>
          NiceModal.show('newMedicalRecord', { onSubmit: handleSubmit })
        }
      >
        Nuevo registro
      </Button>
    </main>
  )
}

export default App
