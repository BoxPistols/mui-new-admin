import {
  FormControl,
  FormControlLabel,
  type FormControlProps,
  FormGroup,
  FormHelperText,
  FormLabel,
  Switch,
} from '@mui/material'
import type React from 'react'

export interface SwitchOption {
  name: string
  label: string
  disabled?: boolean
}

export interface FormSwitchProps extends Omit<FormControlProps, 'onChange'> {
  label?: string
  checked?: boolean
  onChange?: (checked: boolean, name?: string) => void
  helperText?: string
  labelPlacement?: 'start' | 'end' | 'top' | 'bottom'
  name?: string
  labelRequired?: boolean
}

export interface FormSwitchGroupProps
  extends Omit<FormControlProps, 'onChange'> {
  label?: string
  switches: SwitchOption[]
  values?: Record<string, boolean>
  onChange?: (name: string, checked: boolean) => void
  helperText?: string
  labelRequired?: boolean
}

const FormSwitch: React.FC<FormSwitchProps> = ({
  label,
  checked = false,
  onChange,
  error,
  helperText,
  labelPlacement = 'end',
  required,
  disabled,
  name,
  labelRequired,
  ...props
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.checked, name)
  }

  return (
    <FormControl
      error={error}
      required={required}
      disabled={disabled}
      {...props}
    >
      <FormControlLabel
        control={
          <Switch
            checked={checked}
            onChange={handleChange}
            name={name}
            disabled={disabled}
          />
        }
        label={
          labelRequired && required && label ? (
            <>
              {label} <span style={{ color: 'red' }}>*</span>
            </>
          ) : (
            label
          )
        }
        labelPlacement={labelPlacement}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  )
}

const FormSwitchGroup: React.FC<FormSwitchGroupProps> = ({
  label,
  switches,
  values = {},
  onChange,
  error,
  helperText,
  required,
  disabled,
  labelRequired,
  ...props
}) => {
  const handleChange =
    (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(name, event.target.checked)
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
      <FormGroup>
        {switches.map((switchItem) => (
          <FormControlLabel
            key={switchItem.name}
            control={
              <Switch
                checked={values[switchItem.name] || false}
                onChange={handleChange(switchItem.name)}
                name={switchItem.name}
                disabled={switchItem.disabled || disabled}
              />
            }
            label={switchItem.label}
          />
        ))}
      </FormGroup>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  )
}

export { FormSwitch, FormSwitchGroup }
export default FormSwitch
