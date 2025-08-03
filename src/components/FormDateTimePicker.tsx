import { FormControl, FormHelperText, FormLabel } from '@mui/material'
import {
  DatePicker,
  type DatePickerProps,
  DateTimePicker,
  type DateTimePickerProps,
  TimePicker,
  type TimePickerProps,
} from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs, { type Dayjs } from 'dayjs'
import type React from 'react'
import 'dayjs/locale/ja'

// dayjs日本語設定
dayjs.locale('ja')

export interface FormDatePickerProps
  extends Omit<DatePickerProps<Dayjs>, 'renderInput'> {
  label?: string
  helperText?: string
  error?: boolean
  required?: boolean
  labelRequired?: boolean
  variant?: 'outlined' | 'filled' | 'standard'
  size?: 'small' | 'medium'
  fullWidth?: boolean
}

export interface FormTimePickerProps
  extends Omit<TimePickerProps<Dayjs>, 'renderInput'> {
  label?: string
  helperText?: string
  error?: boolean
  required?: boolean
  labelRequired?: boolean
  variant?: 'outlined' | 'filled' | 'standard'
  size?: 'small' | 'medium'
  fullWidth?: boolean
}

export interface FormDateTimePickerProps
  extends Omit<DateTimePickerProps<Dayjs>, 'renderInput'> {
  label?: string
  helperText?: string
  error?: boolean
  required?: boolean
  labelRequired?: boolean
  variant?: 'outlined' | 'filled' | 'standard'
  size?: 'small' | 'medium'
  fullWidth?: boolean
}

const FormDatePicker: React.FC<FormDatePickerProps> = ({
  label,
  helperText,
  error,
  required,
  labelRequired,
  variant = 'outlined',
  size = 'medium',
  fullWidth = true,
  ...props
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ja">
      <FormControl error={error} required={required} fullWidth={fullWidth}>
        {label && (
          <FormLabel sx={{ mb: 1 }}>
            {labelRequired && required ? (
              <>
                {label} <span style={{ color: 'red' }}>*</span>
              </>
            ) : (
              label
            )}
          </FormLabel>
        )}
        <DatePicker
          {...props}
          slotProps={{
            textField: {
              variant,
              size,
              fullWidth,
              error,
            },
          }}
        />
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </LocalizationProvider>
  )
}

const FormTimePicker: React.FC<FormTimePickerProps> = ({
  label,
  helperText,
  error,
  required,
  labelRequired,
  variant = 'outlined',
  size = 'medium',
  fullWidth = true,
  ...props
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ja">
      <FormControl error={error} required={required} fullWidth={fullWidth}>
        {label && (
          <FormLabel sx={{ mb: 1 }}>
            {labelRequired && required ? (
              <>
                {label} <span style={{ color: 'red' }}>*</span>
              </>
            ) : (
              label
            )}
          </FormLabel>
        )}
        <TimePicker
          {...props}
          slotProps={{
            textField: {
              variant,
              size,
              fullWidth,
              error,
            },
          }}
        />
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </LocalizationProvider>
  )
}

const FormDateTimePicker: React.FC<FormDateTimePickerProps> = ({
  label,
  helperText,
  error,
  required,
  labelRequired,
  variant = 'outlined',
  size = 'medium',
  fullWidth = true,
  ...props
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ja">
      <FormControl error={error} required={required} fullWidth={fullWidth}>
        {label && (
          <FormLabel sx={{ mb: 1 }}>
            {labelRequired && required ? (
              <>
                {label} <span style={{ color: 'red' }}>*</span>
              </>
            ) : (
              label
            )}
          </FormLabel>
        )}
        <DateTimePicker
          {...props}
          slotProps={{
            textField: {
              variant,
              size,
              fullWidth,
              error,
            },
          }}
        />
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </LocalizationProvider>
  )
}

export { FormDatePicker, FormTimePicker, FormDateTimePicker }
