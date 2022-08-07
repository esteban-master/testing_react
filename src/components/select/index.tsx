import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useState } from 'react'
// import {  } from '';
const CustomSelect = () => {
  const [value, setValue] = useState('ten')
  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="select">Age</InputLabel>
        <Select
          labelId="select"
          id="demo-simple-select"
          value={value}
          label="Age"
          onChange={(e) => setValue(e.target.value)}
        >
          <MenuItem value="ten">Ten</MenuItem>
          <MenuItem value="twenty">Twenty</MenuItem>
          <MenuItem value="thirty">Thirty</MenuItem>
        </Select>
      </FormControl>

      <p>Select: {value}</p>
    </div>
  )
}

export default CustomSelect;