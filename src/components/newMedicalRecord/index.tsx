import NiceModal, { useModal } from '@ebay/nice-modal-react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Autocomplete,
} from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import React from 'react'
import { useForm, Controller } from 'react-hook-form'

import { useMedicalRecord } from '../../routes'

export type MedicalRecordForm = {
  endDate: Date
  startDate: Date
  observations: string
  medicinesSelected: { id: number; label: string }[]
}

const NewMedicalRecord = NiceModal.create(
  ({
    onSubmit,
    defaultValues,
  }: {
    onSubmit: (values: MedicalRecordForm) => void
    defaultValues: Partial<MedicalRecordForm>
  }) => {
    const { register, handleSubmit, setValue, control } =
      useForm<MedicalRecordForm>({
        defaultValues: {
          endDate: defaultValues?.endDate ? defaultValues.endDate : new Date(),
          medicinesSelected: defaultValues?.medicinesSelected
            ? defaultValues?.medicinesSelected
            : [],
          observations: defaultValues?.observations
            ? defaultValues.observations
            : '',
          startDate: defaultValues?.startDate
            ? defaultValues.startDate
            : new Date(),
        },
      })
    const modal = useModal()
    const { data, isSuccess, isLoading } = useMedicalRecord()

    function handleClose() {
      modal.remove()
    }

    function submit(values: MedicalRecordForm) {
      onSubmit(values)
      modal.remove()
    }

    return (
      <Dialog open={modal.visible} onClose={handleClose}>
        <DialogTitle>Nuevo registro médico</DialogTitle>
        <form onSubmit={handleSubmit(submit)}>
          <DialogContent>
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

            {isSuccess && !isLoading && (
              <Autocomplete
                multiple
                id="tags-outlined"
                options={data.medicines.map((item) => ({
                  id: item.id,
                  label: item.name,
                }))}
                getOptionLabel={(option) => option.label}
                defaultValue={[]}
                filterSelectedOptions
                onChange={(_, item) => setValue('medicinesSelected', item)}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Medicamentos"
                    placeholder="Seleccionar..."
                  />
                )}
              />
            )}
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="error"
              onClick={() => modal.remove()}
            >
              Cancelar
            </Button>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    )
  }
)

export default NewMedicalRecord
