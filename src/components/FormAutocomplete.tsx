import React from "react";
import {
  Autocomplete,
  TextField,
  type AutocompleteProps,
  type TextFieldProps,
  FormControl,
  FormLabel,
  FormHelperText,
  Chip,
  Box,
} from "@mui/material";

export interface AutocompleteOption {
  label: string;
  value: string | number;
  disabled?: boolean;
  group?: string;
}

export interface FormAutocompleteProps<T extends AutocompleteOption>
  extends Omit<
    AutocompleteProps<T, boolean, boolean, boolean>,
    "renderInput" | "options"
  > {
  label?: string;
  options: T[];
  helperText?: string;
  placeholder?: string;
  variant?: "outlined" | "filled" | "standard";
  size?: "small" | "medium";
  labelRequired?: boolean;
  error?: boolean;
  required?: boolean;
  fullWidth?: boolean;
  loading?: boolean;
  loadingText?: string;
  noOptionsText?: string;
  renderOption?: AutocompleteProps<
    T,
    boolean,
    boolean,
    boolean
  >["renderOption"];
  getOptionLabel?: (option: T) => string;
  isOptionEqualToValue?: (option: T, value: T) => boolean;
}

const FormAutocomplete = <T extends AutocompleteOption>({
  label,
  options,
  helperText,
  placeholder,
  variant = "outlined",
  size = "medium",
  labelRequired,
  error,
  required,
  fullWidth = true,
  loading,
  loadingText = "読み込み中...",
  noOptionsText = "オプションがありません",
  getOptionLabel,
  isOptionEqualToValue,
  ...props
}: FormAutocompleteProps<T>) => {
  const defaultGetOptionLabel = (option: T) => option.label;
  const defaultIsOptionEqualToValue = (option: T, value: T) =>
    option.value === value.value;

  return (
    <FormControl error={error} required={required} fullWidth={fullWidth}>
      {label && (
        <FormLabel sx={{ mb: 1 }}>
          {labelRequired && required ? (
            <>
              {label} <span style={{ color: "red" }}>*</span>
            </>
          ) : (
            label
          )}
        </FormLabel>
      )}
      <Autocomplete
        options={options}
        getOptionLabel={getOptionLabel || defaultGetOptionLabel}
        isOptionEqualToValue={
          isOptionEqualToValue || defaultIsOptionEqualToValue
        }
        loading={loading}
        loadingText={loadingText}
        noOptionsText={noOptionsText}
        size={size}
        fullWidth={fullWidth}
        renderInput={(params) => (
          <TextField
            {...params}
            variant={variant}
            placeholder={placeholder}
            error={error}
            fullWidth={fullWidth}
          />
        )}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              variant="outlined"
              label={getOptionLabel ? getOptionLabel(option) : option.label}
              size={size}
              {...getTagProps({ index })}
              key={option.value}
            />
          ))
        }
        {...props}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default FormAutocomplete;
