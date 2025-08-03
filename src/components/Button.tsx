import MuiButton, {
  type ButtonProps as MuiButtonProps,
} from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import { forwardRef } from 'react'

export interface ButtonProps extends MuiButtonProps {
  loading?: boolean
  loadingText?: string
  fullWidth?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      loading = false,
      loadingText,
      disabled,
      children,
      startIcon,
      endIcon,
      size = 'medium',
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading

    const getLoadingSize = () => {
      switch (size) {
        case 'small':
          return 16
        case 'large':
          return 24
        default:
          return 20
      }
    }

    const loadingIcon = loading ? (
      <CircularProgress
        size={getLoadingSize()}
        sx={{
          color: 'inherit',
          mr: loadingText ? 1 : 0,
        }}
      />
    ) : null

    const content = loading && loadingText ? loadingText : children

    return (
      <MuiButton
        ref={ref}
        disabled={isDisabled}
        startIcon={loading ? loadingIcon : startIcon}
        endIcon={!loading ? endIcon : undefined}
        size={size}
        {...props}
      >
        {content}
      </MuiButton>
    )
  },
)

Button.displayName = 'Button'

export default Button
