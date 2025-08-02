import React from 'react'
import {
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormHelperText,
  Box,
  type FormControlProps,
} from '@mui/material'

export interface RadioOption {
  value: string
  label: string
  disabled?: boolean
}

export interface FormRadioGroupProps extends Omit<FormControlProps, 'onChange'> {
  label?: string
  value?: string
  options: RadioOption[]
  onChange?: (value: string) => void
  helperText?: string
  row?: boolean
  labelRequired?: boolean
}

const FormRadioGroup: React.FC<FormRadioGroupProps> = ({
  label,
  value,
  options,
  onChange,
  error,
  helperText,
  row = false,
  required,
  disabled,
  labelRequired,
  ...props
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value)
  }

  return (
    <FormControl error={error} required={required} disabled={disabled} {...props}>
      {label && (
        <FormLabel component="legend">
          {labelRequired && required ? (
            <>
              {label} <span style={{ color: 'red' }}>*</span>
            </>
          ) : (
            label
          )}
        </FormLabel>
      )}
      <RadioGroup value={value} onChange={handleChange} row={row}>
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
            disabled={option.disabled || disabled}
          />
        ))}
      </RadioGroup>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  )
}

export default FormRadioGroup
