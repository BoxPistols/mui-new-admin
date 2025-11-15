import { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid2'
import Paper from '@mui/material/Paper'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import DownloadIcon from '@mui/icons-material/Download'
import UploadIcon from '@mui/icons-material/Upload'
import RefreshIcon from '@mui/icons-material/Refresh'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import Chip from '@mui/material/Chip'
import { useThemeContext } from '@/contexts/ThemeContext'
import { alpha } from '@mui/material/styles'

interface ColorInputProps {
  label: string
  value: string
  onChange: (value: string) => void
}

function ColorInput({ label, value, onChange }: ColorInputProps) {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <TextField
        label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        size="small"
        fullWidth
        InputProps={{
          startAdornment: (
            <Box
              sx={{
                width: 24,
                height: 24,
                borderRadius: 1,
                bgcolor: value,
                border: '1px solid',
                borderColor: 'divider',
                mr: 1,
              }}
            />
          ),
        }}
      />
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ width: 48, height: 40, cursor: 'pointer', border: 'none' }}
      />
    </Stack>
  )
}

export default function ThemeEditorPage() {
  const { mode, toggleMode, customTheme, updateTheme, resetTheme, exportTheme, importTheme } = useThemeContext()

  const getPaletteMain = (color: any) => (typeof color === 'object' && color?.main ? color.main : '#1976d2')
  const getTypographyValue = (value: any, defaultValue: any) => (typeof value === 'function' ? defaultValue : value || defaultValue)

  const [primaryColor, setPrimaryColor] = useState(getPaletteMain(customTheme.palette?.primary) || '#1976d2')
  const [secondaryColor, setSecondaryColor] = useState(getPaletteMain(customTheme.palette?.secondary) || '#dc004e')
  const [errorColor, setErrorColor] = useState(getPaletteMain(customTheme.palette?.error) || '#f44336')
  const [warningColor, setWarningColor] = useState(getPaletteMain(customTheme.palette?.warning) || '#ff9800')
  const [infoColor, setInfoColor] = useState(getPaletteMain(customTheme.palette?.info) || '#2196f3')
  const [successColor, setSuccessColor] = useState(getPaletteMain(customTheme.palette?.success) || '#4caf50')

  const [fontFamily, setFontFamily] = useState(
    getTypographyValue((customTheme.typography as any)?.fontFamily, '"Roboto", "Helvetica", "Arial", sans-serif')
  )
  const [fontSize, setFontSize] = useState(getTypographyValue((customTheme.typography as any)?.fontSize, 14))
  const [borderRadius, setBorderRadius] = useState(customTheme.shape?.borderRadius || 4)
  const [spacing, setSpacing] = useState(typeof customTheme.spacing === 'number' ? customTheme.spacing : 8)

  const applyTheme = () => {
    updateTheme({
      palette: {
        primary: { main: primaryColor },
        secondary: { main: secondaryColor },
        error: { main: errorColor },
        warning: { main: warningColor },
        info: { main: infoColor },
        success: { main: successColor },
      },
      typography: {
        fontFamily,
        fontSize,
      },
      shape: {
        borderRadius,
      },
      spacing,
    })
  }

  const handleReset = () => {
    resetTheme()
    setPrimaryColor('#1976d2')
    setSecondaryColor('#dc004e')
    setErrorColor('#f44336')
    setWarningColor('#ff9800')
    setInfoColor('#2196f3')
    setSuccessColor('#4caf50')
    setFontFamily('"Roboto", "Helvetica", "Arial", sans-serif')
    setFontSize(14)
    setBorderRadius(4)
    setSpacing(8)
  }

  const handleExport = () => {
    const themeJson = exportTheme()
    const blob = new Blob([themeJson], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'theme-config.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        importTheme(content)
      }
      reader.readAsText(file)
    }
  }

  const handleCopyJson = () => {
    navigator.clipboard.writeText(exportTheme())
  }

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography component="h2" variant="h6">
          Theme Editor
        </Typography>
        <Stack direction="row" spacing={1}>
          <IconButton onClick={toggleMode} color="inherit">
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <Button startIcon={<RefreshIcon />} onClick={handleReset} size="small">
            Reset
          </Button>
          <Button
            startIcon={<UploadIcon />}
            component="label"
            size="small"
          >
            Import
            <input type="file" hidden accept=".json" onChange={handleImport} />
          </Button>
          <Button startIcon={<DownloadIcon />} onClick={handleExport} size="small">
            Export
          </Button>
        </Stack>
      </Box>

      <Grid container spacing={3}>
        {/* Left Panel - Controls */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Stack spacing={3}>
            {/* Color Palette */}
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Color Palette
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Stack spacing={2}>
                  <ColorInput label="Primary" value={primaryColor} onChange={setPrimaryColor} />
                  <ColorInput label="Secondary" value={secondaryColor} onChange={setSecondaryColor} />
                  <ColorInput label="Error" value={errorColor} onChange={setErrorColor} />
                  <ColorInput label="Warning" value={warningColor} onChange={setWarningColor} />
                  <ColorInput label="Info" value={infoColor} onChange={setInfoColor} />
                  <ColorInput label="Success" value={successColor} onChange={setSuccessColor} />
                </Stack>
              </CardContent>
            </Card>

            {/* Typography */}
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Typography
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Stack spacing={2}>
                  <TextField
                    label="Font Family"
                    value={fontFamily}
                    onChange={(e) => setFontFamily(e.target.value)}
                    size="small"
                    fullWidth
                  />
                  <TextField
                    label="Base Font Size"
                    type="number"
                    value={fontSize}
                    onChange={(e) => setFontSize(Number(e.target.value))}
                    size="small"
                    fullWidth
                    InputProps={{
                      endAdornment: <Typography variant="caption" color="text.secondary">px</Typography>,
                    }}
                  />
                </Stack>
              </CardContent>
            </Card>

            {/* Spacing & Shape */}
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Spacing & Shape
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Stack spacing={2}>
                  <TextField
                    label="Spacing Unit"
                    type="number"
                    value={spacing}
                    onChange={(e) => setSpacing(Number(e.target.value))}
                    size="small"
                    fullWidth
                    helperText="Base unit for spacing throughout the app"
                    InputProps={{
                      endAdornment: <Typography variant="caption" color="text.secondary">px</Typography>,
                    }}
                  />
                  <TextField
                    label="Border Radius"
                    type="number"
                    value={borderRadius}
                    onChange={(e) => setBorderRadius(Number(e.target.value))}
                    size="small"
                    fullWidth
                    InputProps={{
                      endAdornment: <Typography variant="caption" color="text.secondary">px</Typography>,
                    }}
                  />
                </Stack>
              </CardContent>
            </Card>

            <Button variant="contained" size="large" fullWidth onClick={applyTheme}>
              Apply Theme
            </Button>
          </Stack>
        </Grid>

        {/* Right Panel - Preview */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Stack spacing={3}>
            {/* Preview Card */}
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Live Preview
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <Stack spacing={2}>
                  <Box>
                    <Typography variant="subtitle2" gutterBottom>
                      Colors
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                      <Chip label="Primary" color="primary" />
                      <Chip label="Secondary" color="secondary" />
                      <Chip label="Error" color="error" />
                      <Chip label="Warning" color="warning" />
                      <Chip label="Info" color="info" />
                      <Chip label="Success" color="success" />
                    </Stack>
                  </Box>

                  <Box>
                    <Typography variant="subtitle2" gutterBottom>
                      Buttons
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                      <Button variant="contained" size="small">Contained</Button>
                      <Button variant="outlined" size="small">Outlined</Button>
                      <Button variant="text" size="small">Text</Button>
                    </Stack>
                  </Box>

                  <Box>
                    <Typography variant="subtitle2" gutterBottom>
                      Typography Scale
                    </Typography>
                    <Stack spacing={0.5}>
                      <Typography variant="h1">H1 Heading</Typography>
                      <Typography variant="h2">H2 Heading</Typography>
                      <Typography variant="h3">H3 Heading</Typography>
                      <Typography variant="h4">H4 Heading</Typography>
                      <Typography variant="h5">H5 Heading</Typography>
                      <Typography variant="h6">H6 Heading</Typography>
                      <Typography variant="body1">Body 1</Typography>
                      <Typography variant="body2">Body 2</Typography>
                      <Typography variant="caption">Caption</Typography>
                    </Stack>
                  </Box>

                  <Box>
                    <Typography variant="subtitle2" gutterBottom>
                      Cards & Papers
                    </Typography>
                    <Paper elevation={2} sx={{ p: 2, mb: 1 }}>
                      Paper with elevation
                    </Paper>
                    <Paper variant="outlined" sx={{ p: 2 }}>
                      Paper outlined
                    </Paper>
                  </Box>
                </Stack>
              </CardContent>
            </Card>

            {/* Code Output */}
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="h6">
                    Theme JSON
                  </Typography>
                  <IconButton size="small" onClick={handleCopyJson}>
                    <ContentCopyIcon fontSize="small" />
                  </IconButton>
                </Box>
                <Divider sx={{ mb: 2 }} />
                <Paper
                  variant="outlined"
                  sx={{
                    p: 2,
                    maxHeight: 300,
                    overflow: 'auto',
                    bgcolor: (theme) => alpha(theme.palette.background.default, 0.5),
                  }}
                >
                  <pre style={{ margin: 0, fontSize: '0.75rem', fontFamily: 'monospace' }}>
                    {exportTheme()}
                  </pre>
                </Paper>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}
