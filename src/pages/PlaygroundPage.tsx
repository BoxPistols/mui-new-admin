import { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid2'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import InputLabel from '@mui/material/InputLabel'
import Switch from '@mui/material/Switch'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import SendIcon from '@mui/icons-material/Send'
import DeleteIcon from '@mui/icons-material/Delete'
import SaveIcon from '@mui/icons-material/Save'
import SyntaxHighlighter from '@mui/icons-material/Code'

type ButtonVariant = 'text' | 'outlined' | 'contained'
type ButtonColor = 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
type ButtonSize = 'small' | 'medium' | 'large'

const icons = {
  none: null,
  send: <SendIcon />,
  delete: <DeleteIcon />,
  save: <SaveIcon />,
}

export default function PlaygroundPage() {
  // Button Props State
  const [variant, setVariant] = useState<ButtonVariant>('contained')
  const [color, setColor] = useState<ButtonColor>('primary')
  const [size, setSize] = useState<ButtonSize>('medium')
  const [disabled, setDisabled] = useState(false)
  const [disableElevation, setDisableElevation] = useState(false)
  const [fullWidth, setFullWidth] = useState(false)
  const [startIcon, setStartIcon] = useState<keyof typeof icons>('none')
  const [endIcon, setEndIcon] = useState<keyof typeof icons>('none')
  const [buttonText, setButtonText] = useState('Click Me')

  // Generate code snippet
  const generateCode = () => {
    const props: string[] = []

    if (variant !== 'text') props.push(`variant="${variant}"`)
    if (color !== 'inherit') props.push(`color="${color}"`)
    if (size !== 'medium') props.push(`size="${size}"`)
    if (disabled) props.push('disabled')
    if (disableElevation) props.push('disableElevation')
    if (fullWidth) props.push('fullWidth')
    if (startIcon !== 'none') props.push(`startIcon={<${startIcon.charAt(0).toUpperCase() + startIcon.slice(1)}Icon />}`)
    if (endIcon !== 'none') props.push(`endIcon={<${endIcon.charAt(0).toUpperCase() + endIcon.slice(1)}Icon />}`)

    return `<Button ${props.join(' ')}>\n  ${buttonText}\n</Button>`
  }

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Interactive Playground
      </Typography>

      <Typography variant="body2" color="text.secondary" paragraph>
        Test and customize MUI components in real-time. Adjust the props below to see how they affect the component.
      </Typography>

      <Grid container spacing={3}>
        {/* Controls Panel */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Props Controller
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Stack spacing={2}>
                <TextField
                  label="Button Text"
                  value={buttonText}
                  onChange={(e) => setButtonText(e.target.value)}
                  fullWidth
                  size="small"
                />

                <FormControl fullWidth size="small">
                  <InputLabel>Variant</InputLabel>
                  <Select value={variant} label="Variant" onChange={(e) => setVariant(e.target.value as ButtonVariant)}>
                    <MenuItem value="text">Text</MenuItem>
                    <MenuItem value="outlined">Outlined</MenuItem>
                    <MenuItem value="contained">Contained</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth size="small">
                  <InputLabel>Color</InputLabel>
                  <Select value={color} label="Color" onChange={(e) => setColor(e.target.value as ButtonColor)}>
                    <MenuItem value="inherit">Inherit</MenuItem>
                    <MenuItem value="primary">Primary</MenuItem>
                    <MenuItem value="secondary">Secondary</MenuItem>
                    <MenuItem value="success">Success</MenuItem>
                    <MenuItem value="error">Error</MenuItem>
                    <MenuItem value="info">Info</MenuItem>
                    <MenuItem value="warning">Warning</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth size="small">
                  <InputLabel>Size</InputLabel>
                  <Select value={size} label="Size" onChange={(e) => setSize(e.target.value as ButtonSize)}>
                    <MenuItem value="small">Small</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="large">Large</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth size="small">
                  <InputLabel>Start Icon</InputLabel>
                  <Select value={startIcon} label="Start Icon" onChange={(e) => setStartIcon(e.target.value as keyof typeof icons)}>
                    <MenuItem value="none">None</MenuItem>
                    <MenuItem value="send">Send</MenuItem>
                    <MenuItem value="delete">Delete</MenuItem>
                    <MenuItem value="save">Save</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth size="small">
                  <InputLabel>End Icon</InputLabel>
                  <Select value={endIcon} label="End Icon" onChange={(e) => setEndIcon(e.target.value as keyof typeof icons)}>
                    <MenuItem value="none">None</MenuItem>
                    <MenuItem value="send">Send</MenuItem>
                    <MenuItem value="delete">Delete</MenuItem>
                    <MenuItem value="save">Save</MenuItem>
                  </Select>
                </FormControl>

                <Divider />

                <FormControlLabel
                  control={<Switch checked={disabled} onChange={(e) => setDisabled(e.target.checked)} />}
                  label="Disabled"
                />
                <FormControlLabel
                  control={<Switch checked={disableElevation} onChange={(e) => setDisableElevation(e.target.checked)} />}
                  label="Disable Elevation"
                />
                <FormControlLabel
                  control={<Switch checked={fullWidth} onChange={(e) => setFullWidth(e.target.checked)} />}
                  label="Full Width"
                />
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Preview Panel */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Stack spacing={3}>
            {/* Live Preview */}
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Live Preview
                </Typography>
                <Divider sx={{ mb: 3 }} />
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: 200,
                    bgcolor: 'background.default',
                    borderRadius: 1,
                    p: 3,
                  }}
                >
                  <Button
                    variant={variant}
                    color={color}
                    size={size}
                    disabled={disabled}
                    disableElevation={disableElevation}
                    fullWidth={fullWidth}
                    startIcon={icons[startIcon]}
                    endIcon={icons[endIcon]}
                  >
                    {buttonText}
                  </Button>
                </Box>
              </CardContent>
            </Card>

            {/* Code Output */}
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <SyntaxHighlighter />
                  <Typography variant="h6">Code</Typography>
                </Box>
                <Divider sx={{ mb: 2 }} />
                <Paper
                  variant="outlined"
                  sx={{
                    p: 2,
                    bgcolor: 'grey.50',
                    fontFamily: 'monospace',
                    fontSize: '0.875rem',
                    overflow: 'auto',
                  }}
                >
                  <pre style={{ margin: 0 }}>{generateCode()}</pre>
                </Paper>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{ mt: 2 }}
                  onClick={() => navigator.clipboard.writeText(generateCode())}
                >
                  Copy Code
                </Button>
              </CardContent>
            </Card>

            {/* Props Table */}
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Current Props
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Box component="table" sx={{ width: '100%', '& td': { py: 1 } }}>
                  <tbody>
                    <tr>
                      <td><strong>variant</strong></td>
                      <td>{variant}</td>
                    </tr>
                    <tr>
                      <td><strong>color</strong></td>
                      <td>{color}</td>
                    </tr>
                    <tr>
                      <td><strong>size</strong></td>
                      <td>{size}</td>
                    </tr>
                    <tr>
                      <td><strong>disabled</strong></td>
                      <td>{disabled.toString()}</td>
                    </tr>
                    <tr>
                      <td><strong>disableElevation</strong></td>
                      <td>{disableElevation.toString()}</td>
                    </tr>
                    <tr>
                      <td><strong>fullWidth</strong></td>
                      <td>{fullWidth.toString()}</td>
                    </tr>
                  </tbody>
                </Box>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}
