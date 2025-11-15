import { createContext, useContext, useState, useEffect, useMemo, useCallback, ReactNode } from 'react'
import { ThemeProvider as MuiThemeProvider, createTheme, type PaletteMode } from '@mui/material/styles'
import type { ThemeOptions } from '@mui/material/styles'

// Validation helpers
const isValidPaletteMode = (mode: string): mode is PaletteMode => {
  return mode === 'light' || mode === 'dark'
}

const isValidTheme = (theme: unknown): theme is ThemeOptions => {
  if (!theme || typeof theme !== 'object') return false
  // Basic validation - can be extended
  return true
}

interface ThemeContextType {
  mode: PaletteMode
  toggleMode: () => void
  setMode: (mode: PaletteMode) => void
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
    },
    secondary: {
      main: '#dc004e',
    },
    error: {
      main: '#f44336',
    },
    warning: {
      main: '#ff9800',
    },
    info: {
      main: '#2196f3',
    },
    success: {
      main: '#4caf50',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    h1: { fontSize: '2.5rem', fontWeight: 500 },
    h2: { fontSize: '2rem', fontWeight: 500 },
    h3: { fontSize: '1.75rem', fontWeight: 500 },
    h4: { fontSize: '1.5rem', fontWeight: 500 },
    h5: { fontSize: '1.25rem', fontWeight: 500 },
    h6: { fontSize: '1rem', fontWeight: 500 },
  },
  spacing: 8,
  shape: {
    borderRadius: 4,
  },
}

interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [mode, setModeState] = useState<PaletteMode>(() => {
    try {
      const saved = localStorage.getItem('theme-mode')
      if (saved && isValidPaletteMode(saved)) {
        return saved
      }
    } catch (error) {
      console.error('Failed to load theme mode from localStorage:', error)
    }
    return 'light'
  })

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
    return createTheme({
      ...customTheme,
      palette: {
        mode,
        ...(customTheme.palette || {}),
      },
    })
  }, [mode, customTheme])

  const toggleMode = useCallback(() => {
    setModeState((prev) => (prev === 'light' ? 'dark' : 'light'))
  }, [])

  const setMode = useCallback((newMode: PaletteMode) => {
    if (isValidPaletteMode(newMode)) {
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
    setModeState('light')
  }, [])

  const exportTheme = useCallback(() => {
    return JSON.stringify({ mode, customTheme }, null, 2)
  }, [mode, customTheme])

  const importTheme = useCallback((themeJson: string) => {
    try {
      const parsed = JSON.parse(themeJson)

      // Validate and import mode
      if (parsed.mode && isValidPaletteMode(parsed.mode)) {
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
      toggleMode,
      setMode,
      customTheme,
      updateTheme,
      resetTheme,
      exportTheme,
      importTheme,
    }),
    [mode, toggleMode, setMode, customTheme, updateTheme, resetTheme, exportTheme, importTheme]
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
