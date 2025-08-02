import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'
import Divider from '@mui/material/Divider'

export default function SettingsPage() {
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Settings
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            General Settings
          </Typography>
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Enable notifications"
          />
          <br />
          <FormControlLabel
            control={<Switch />}
            label="Dark mode"
          />
          <br />
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Auto-save"
          />
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom>
            Advanced Settings
          </Typography>
          <FormControlLabel
            control={<Switch />}
            label="Debug mode"
          />
          <br />
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Analytics tracking"
          />
        </CardContent>
      </Card>
    </Box>
  )
}