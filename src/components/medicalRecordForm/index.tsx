import { Autocomplete, Button, TextField } from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import React from 'react'
import { useForm, Controller } from 'react-hook-form'

const medicines = [
  { id: 1, label: 'Paracetamol' },
  { id: 2, label: 'Ibuprofeno' },
]

const MedicalRecordForm = ({ onSubmit }: any) => {
  const { register, handleSubmit, setValue, control } = useForm()

  const submit = (values: any) => {
    onSubmit(values)
  }

  return (
    <form onSubmit={handleSubmit(submit)}>
      <TextField
        label="Observaciones"
        type="text"
        {...register('observations')}
      />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Controller
          name="startDate"
          control={control}
          render={({ field }) => (
            <DesktopDatePicker
              {...field}
              label="Desde"
              inputFormat="MM-dd-yyyy"
              renderInput={(params) => <TextField {...params} />}
            />
          )}
        />
        <Controller
          name="endDate"
          control={control}
          render={({ field }) => (
            <DesktopDatePicker
              {...field}
              label="Hasta"
              inputFormat="MM-dd-yyyy"
              renderInput={(params) => <TextField {...params} />}
            />
          )}
        />
      </LocalizationProvider>

      <Autocomplete
        multiple
        id="tags-outlined"
        options={medicines}
        getOptionLabel={(option) => option.label}
        defaultValue={[]}
        filterSelectedOptions
        onChange={(_, item) => setValue('medicinesSelected', item)}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Medicamentos"
            placeholder="Ibuprofeno"
          />
        )}
      />
      <Button type="submit">Submit</Button>
    </form>
  )
}

export default MedicalRecordForm