import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid2'
import Paper from '@mui/material/Paper'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import NotificationsIcon from '@mui/icons-material/Notifications'
import SecurityIcon from '@mui/icons-material/Security'
import LanguageIcon from '@mui/icons-material/Language'
import PaletteIcon from '@mui/icons-material/Palette'

export default function SettingsPage() {
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Settings
      </Typography>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <PaletteIcon color="primary" />
              <Typography variant="h6">Appearance</Typography>
            </Box>
            <FormGroup>
              <FormControlLabel control={<Switch defaultChecked />} label="Dark mode" />
              <FormControlLabel control={<Switch />} label="Compact mode" />
              <FormControlLabel control={<Switch defaultChecked />} label="Show animations" />
            </FormGroup>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <NotificationsIcon color="primary" />
              <Typography variant="h6">Notifications</Typography>
            </Box>
            <FormGroup>
              <FormControlLabel control={<Switch defaultChecked />} label="Email notifications" />
              <FormControlLabel control={<Switch defaultChecked />} label="Push notifications" />
              <FormControlLabel control={<Switch />} label="SMS notifications" />
            </FormGroup>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <SecurityIcon color="primary" />
              <Typography variant="h6">Security</Typography>
            </Box>
            <FormGroup>
              <FormControlLabel control={<Switch defaultChecked />} label="Two-factor authentication" />
              <FormControlLabel control={<Switch />} label="Login alerts" />
              <FormControlLabel control={<Switch defaultChecked />} label="Session timeout" />
            </FormGroup>
            <Divider sx={{ my: 2 }} />
            <Button variant="outlined" color="error" fullWidth>
              Change Password
            </Button>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <LanguageIcon color="primary" />
              <Typography variant="h6">Language & Region</Typography>
            </Box>
            <TextField
              select
              label="Language"
              defaultValue="en"
              fullWidth
              sx={{ mb: 2 }}
              SelectProps={{
                native: true,
              }}
            >
              <option value="en">English</option>
              <option value="ja">日本語</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
            </TextField>
            <TextField
              select
              label="Time Zone"
              defaultValue="utc"
              fullWidth
              SelectProps={{
                native: true,
              }}
            >
              <option value="utc">UTC</option>
              <option value="jst">JST (Tokyo)</option>
              <option value="est">EST (New York)</option>
              <option value="pst">PST (Los Angeles)</option>
            </TextField>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Paper
            sx={{
              p: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <SettingsRoundedIcon sx={{ fontSize: 48, color: 'primary.main' }} />
              <Box>
                <Typography variant="h6">System Settings</Typography>
                <Typography variant="body2" color="text.secondary">
                  Customize your experience
                </Typography>
              </Box>
            </Box>
            <Button variant="contained">Save Changes</Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
