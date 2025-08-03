import React from 'react'
import {
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
  InputLabel,
  type FormControlProps,
} from '@mui/material'

export interface SelectOption {
  value: string | number
  label: string
  disabled?: boolean
}

export interface FormSelectProps extends Omit<FormControlProps, 'onChange'> {
  label?: string
  value?: string | number
  options: SelectOption[]
  onChange?: (value: string | number) => void
  helperText?: string
  placeholder?: string
  variant?: 'outlined' | 'filled' | 'standard'
  size?: 'small' | 'medium'
  labelRequired?: boolean
  multiple?: boolean
  displayEmpty?: boolean
}

const FormSelect: React.FC<FormSelectProps> = ({
  label,
  value,
  options,
  onChange,
  error,
  helperText,
  placeholder,
  variant = 'outlined',
  size = 'medium',
  required,
  disabled,
  labelRequired,
  multiple = false,
  displayEmpty = false,
  fullWidth = true,
  ...props
}) => {
  const handleChange = (event: any) => {
    onChange?.(event.target.value)
  }

  const labelId = `select-label-${Math.random().toString(36).substr(2, 9)}`

  return (
    <FormControl
      error={error}
      required={required}
      disabled={disabled}
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      {...props}
    >
      {label && (
        <InputLabel id={labelId}>
          {labelRequired && required ? (
            <>
              {label} <span style={{ color: 'red' }}>*</span>
            </>
          ) : (
            label
          )}
        </InputLabel>
      )}
      <Select
        labelId={label ? labelId : undefined}
        label={label}
        value={value || (multiple ? [] : '')}
        onChange={handleChange}
        displayEmpty={displayEmpty}
        multiple={multiple}
      >
        {placeholder && (
          <MenuItem value="" disabled>
            {placeholder}
          </MenuItem>
        )}
        {options.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  )
}

export default FormSelect
