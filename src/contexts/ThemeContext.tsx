import { createContext, useContext, useState, useEffect, useMemo, useCallback, ReactNode } from 'react'
import { ThemeProvider as MuiThemeProvider, createTheme, type PaletteMode } from '@mui/material/styles'
import type { ThemeOptions } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

// Extended mode type to include system preference
type ThemeMode = 'light' | 'dark' | 'system'

// Validation helpers
const isValidThemeMode = (mode: string): mode is ThemeMode => {
  return mode === 'light' || mode === 'dark' || mode === 'system'
}

const isValidTheme = (theme: unknown): theme is ThemeOptions => {
  if (!theme || typeof theme !== 'object') return false
  // Basic validation - can be extended
  return true
}

interface ThemeContextType {
  mode: ThemeMode
  effectiveMode: PaletteMode
  toggleMode: () => void
  setMode: (mode: ThemeMode) => void
  customTheme: ThemeOptions
  updateTheme: (theme: Partial<ThemeOptions>) => void
  resetTheme: () => void
  exportTheme: () => string
  importTheme: (themeJson: string) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const defaultTheme: ThemeOptions = {
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#dc004e',
      light: '#f48fb1',
      dark: '#c51162',
    },
    error: {
      main: '#f44336',
      light: '#e57373',
      dark: '#d32f2f',
    },
    warning: {
      main: '#ff9800',
      light: '#ffb74d',
      dark: '#f57c00',
    },
    info: {
      main: '#2196f3',
      light: '#64b5f6',
      dark: '#1976d2',
    },
    success: {
      main: '#4caf50',
      light: '#81c784',
      dark: '#388e3c',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    h1: { fontSize: '2.5rem', fontWeight: 500, lineHeight: 1.2 },
    h2: { fontSize: '2rem', fontWeight: 500, lineHeight: 1.3 },
    h3: { fontSize: '1.75rem', fontWeight: 500, lineHeight: 1.4 },
    h4: { fontSize: '1.5rem', fontWeight: 500, lineHeight: 1.4 },
    h5: { fontSize: '1.25rem', fontWeight: 500, lineHeight: 1.5 },
    h6: { fontSize: '1rem', fontWeight: 500, lineHeight: 1.6 },
  },
  spacing: 8,
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
    '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
    '0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)',
    '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
    '0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)',
    '0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)',
    '0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)',
    '0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)',
    '0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)',
    '0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)',
    '0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)',
    '0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)',
    '0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)',
    '0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)',
    '0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)',
    '0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)',
    '0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)',
    '0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)',
    '0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)',
    '0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)',
    '0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)',
    '0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)',
    '0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)',
    '0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)',
  ],
  transitions: {
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
  },
  zIndex: {
    mobileStepper: 1000,
    fab: 1050,
    speedDial: 1050,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },
}

interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [mode, setModeState] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem('theme-mode')
      if (saved && isValidThemeMode(saved)) {
        return saved
      }
    } catch (error) {
      console.error('Failed to load theme mode from localStorage:', error)
    }
    return 'system'
  })

  // Detect OS preference
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)', { noSsr: true })

  // Calculate effective mode based on user selection
  const effectiveMode: PaletteMode = useMemo(() => {
    if (mode === 'system') {
      return prefersDarkMode ? 'dark' : 'light'
    }
    return mode
  }, [mode, prefersDarkMode])

  const [customTheme, setCustomTheme] = useState<ThemeOptions>(() => {
    try {
      const saved = localStorage.getItem('custom-theme')
      if (saved) {
        const parsed = JSON.parse(saved)
        if (isValidTheme(parsed)) {
          return parsed
        }
      }
    } catch (error) {
      console.error('Failed to load custom theme from localStorage:', error)
    }
    return defaultTheme
  })

  useEffect(() => {
    try {
      localStorage.setItem('theme-mode', mode)
    } catch (error) {
      console.error('Failed to save theme mode to localStorage:', error)
    }
  }, [mode])

  useEffect(() => {
    try {
      localStorage.setItem('custom-theme', JSON.stringify(customTheme))
    } catch (error) {
      console.error('Failed to save custom theme to localStorage:', error)
    }
  }, [customTheme])

  const theme = useMemo(() => {
    const baseTheme = createTheme({
      ...customTheme,
      palette: {
        mode: effectiveMode,
        ...(customTheme.palette || {}),
        // Softer dark mode colors
        ...(effectiveMode === 'dark' && {
          background: {
            default: '#121212',
            paper: '#1e1e1e',
          },
          text: {
            primary: 'rgba(255, 255, 255, 0.87)',
            secondary: 'rgba(255, 255, 255, 0.6)',
            disabled: 'rgba(255, 255, 255, 0.38)',
          },
          divider: 'rgba(255, 255, 255, 0.12)',
        }),
      },
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            body: {
              transition: 'background-color 0.3s ease-in-out, color 0.3s ease-in-out',
            },
            '*': {
              transition: 'background-color 0.3s ease-in-out, color 0.3s ease-in-out, border-color 0.3s ease-in-out',
            },
          },
        },
      },
    })

    return baseTheme
  }, [effectiveMode, customTheme])

  const toggleMode = useCallback(() => {
    setModeState((prev) => {
      if (prev === 'light') return 'dark'
      if (prev === 'dark') return 'system'
      return 'light'
    })
  }, [])

  const setMode = useCallback((newMode: ThemeMode) => {
    if (isValidThemeMode(newMode)) {
      setModeState(newMode)
    }
  }, [])

  const updateTheme = useCallback((themeUpdate: Partial<ThemeOptions>) => {
    setCustomTheme((prev) => ({
      ...prev,
      ...themeUpdate,
      palette: {
        ...prev.palette,
        ...themeUpdate.palette,
      },
      typography: {
        ...prev.typography,
        ...themeUpdate.typography,
      },
    }))
  }, [])

  const resetTheme = useCallback(() => {
    setCustomTheme(defaultTheme)
    setModeState('system')
  }, [])

  const exportTheme = useCallback(() => {
    return JSON.stringify({ mode, customTheme }, null, 2)
  }, [mode, customTheme])

  const importTheme = useCallback((themeJson: string) => {
    try {
      const parsed = JSON.parse(themeJson)

      // Validate and import mode
      if (parsed.mode && isValidThemeMode(parsed.mode)) {
        setModeState(parsed.mode)
      }

      // Validate and import custom theme
      if (parsed.customTheme && isValidTheme(parsed.customTheme)) {
        setCustomTheme(parsed.customTheme)
      } else {
        throw new Error('Invalid theme structure')
      }
    } catch (error) {
      console.error('Failed to import theme:', error)
      throw error // Re-throw for caller to handle
    }
  }, [])

  const value: ThemeContextType = useMemo(
    () => ({
      mode,
      effectiveMode,
      toggleMode,
      setMode,
      customTheme,
      updateTheme,
      resetTheme,
      exportTheme,
      importTheme,
    }),
    [mode, effectiveMode, toggleMode, setMode, customTheme, updateTheme, resetTheme, exportTheme, importTheme]
  )

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  )
}

export function useThemeContext() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useThemeContext must be used within ThemeProvider')
  }
  return context
}
