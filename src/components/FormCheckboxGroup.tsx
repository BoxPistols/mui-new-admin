import {
  Checkbox,
  FormControl,
  FormControlLabel,
  type FormControlProps,
  FormGroup,
  FormHelperText,
  FormLabel,
} from '@mui/material'
import type React from 'react'

export interface CheckboxOption {
  value: string
  label: string
  disabled?: boolean
}

export interface FormCheckboxGroupProps
  extends Omit<FormControlProps, 'onChange'> {
  label?: string
  value?: string[]
  options: CheckboxOption[]
  onChange?: (value: string[]) => void
  helperText?: string
  row?: boolean
  labelRequired?: boolean
}

const FormCheckboxGroup: React.FC<FormCheckboxGroupProps> = ({
  label,
  value = [],
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
  const handleChange =
    (optionValue: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        onChange?.([...value, optionValue])
      } else {
        onChange?.(value.filter((v) => v !== optionValue))
      }
    }

  return (
    <FormControl
      error={error}
      required={required}
      disabled={disabled}
      {...props}
    >
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
      <FormGroup row={row}>
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            control={
              <Checkbox
                checked={value.includes(option.value)}
                onChange={handleChange(option.value)}
                disabled={option.disabled || disabled}
              />
            }
            label={option.label}
          />
        ))}
      </FormGroup>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  )
}

export default FormCheckboxGroup
