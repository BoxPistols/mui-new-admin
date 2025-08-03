import {
  Autocomplete,
  TextField,
  FormControl,
  FormLabel,
  FormHelperText,
  Chip,
} from "@mui/material";

export interface AutocompleteOption {
  label: string;
  value: string | number;
  disabled?: boolean;
  group?: string;
}

export interface FormAutocompleteProps<T extends AutocompleteOption> {
  label?: string;
  options: T[];
  value?: any;
  onChange?: (event: any, value: any) => void;
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
  multiple?: boolean;
  freeSolo?: boolean;
  disabled?: boolean;
  groupBy?: (option: T) => string;
  getOptionLabel?: (option: T | string) => string;
  isOptionEqualToValue?: (option: T, value: T) => boolean;
}

const FormAutocomplete = <T extends AutocompleteOption>({
  label,
  options,
  value,
  onChange,
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
  multiple,
  freeSolo,
  disabled,
  groupBy,
  getOptionLabel,
  isOptionEqualToValue,
}: FormAutocompleteProps<T>) => {
  const defaultGetOptionLabel = (option: T | string) => {
    if (typeof option === "string") return option;
    return option.label;
  };
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
        value={value}
        onChange={onChange}
        getOptionLabel={getOptionLabel || defaultGetOptionLabel}
        isOptionEqualToValue={
          isOptionEqualToValue || defaultIsOptionEqualToValue
        }
        loading={loading}
        loadingText={loadingText}
        noOptionsText={noOptionsText}
        size={size}
        fullWidth={fullWidth}
        multiple={multiple}
        freeSolo={freeSolo}
        disabled={disabled}
        groupBy={groupBy}
        renderInput={(params) => (
          <TextField
            {...params}
            variant={variant}
            placeholder={placeholder}
            error={error}
            fullWidth={fullWidth}
          />
        )}
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((option, index) => (
            <Chip
              variant="outlined"
              label={
                getOptionLabel
                  ? getOptionLabel(option)
                  : defaultGetOptionLabel(option)
              }
              size={size}
              {...getTagProps({ index })}
              key={typeof option === "string" ? option : option.value}
            />
          ))
        }
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default FormAutocomplete;
