import { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react'
import { ThemeProvider as MuiThemeProvider, createTheme, type PaletteMode } from '@mui/material/styles'
import type { ThemeOptions } from '@mui/material/styles'

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
    const saved = localStorage.getItem('theme-mode')
    return (saved as PaletteMode) || 'light'
  })

  const [customTheme, setCustomTheme] = useState<ThemeOptions>(() => {
    const saved = localStorage.getItem('custom-theme')
    return saved ? JSON.parse(saved) : defaultTheme
  })

  useEffect(() => {
    localStorage.setItem('theme-mode', mode)
  }, [mode])

  useEffect(() => {
    localStorage.setItem('custom-theme', JSON.stringify(customTheme))
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

  const toggleMode = () => {
    setModeState((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  const setMode = (newMode: PaletteMode) => {
    setModeState(newMode)
  }

  const updateTheme = (themeUpdate: Partial<ThemeOptions>) => {
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
  }

  const resetTheme = () => {
    setCustomTheme(defaultTheme)
    setModeState('light')
  }

  const exportTheme = () => {
    return JSON.stringify({ mode, customTheme }, null, 2)
  }

  const importTheme = (themeJson: string) => {
    try {
      const parsed = JSON.parse(themeJson)
      if (parsed.mode) setModeState(parsed.mode)
      if (parsed.customTheme) setCustomTheme(parsed.customTheme)
    } catch (error) {
      console.error('Failed to import theme:', error)
    }
  }

  const value: ThemeContextType = {
    mode,
    toggleMode,
    setMode,
    customTheme,
    updateTheme,
    resetTheme,
    exportTheme,
    importTheme,
  }

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
