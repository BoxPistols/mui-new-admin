import React from "react";
import {
  TextField,
  type TextFieldProps,
  FormControl,
  FormLabel,
  FormHelperText,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export interface FormTextFieldProps extends Omit<TextFieldProps, "variant"> {
  variant?: "outlined" | "filled" | "standard";
  showPassword?: boolean;
  onTogglePassword?: () => void;
  labelRequired?: boolean;
}

const FormTextField: React.FC<FormTextFieldProps> = ({
  type,
  showPassword,
  onTogglePassword,
  labelRequired,
  label,
  helperText,
  error,
  ...props
}) => {
  const isPasswordField = type === "password";
  const actualType = isPasswordField && showPassword ? "text" : type;

  const endAdornment = isPasswordField ? (
    <InputAdornment position="end">
      <IconButton
        aria-label="toggle password visibility"
        onClick={onTogglePassword}
        edge="end"
      >
        {showPassword ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </InputAdornment>
  ) : (
    props.InputProps?.endAdornment
  );

  return (
    <TextField
      type={actualType}
      label={
        labelRequired && label ? (
          <>
            {label} <span style={{ color: "red" }}>*</span>
          </>
        ) : (
          label
        )
      }
      helperText={helperText}
      error={error}
      InputProps={{
        ...props.InputProps,
        endAdornment,
      }}
      {...props}
    />
  );
};

export default FormTextField;
