import AddIcon from '@mui/icons-material/Add'
import ApiIcon from '@mui/icons-material/Api'
import BackupIcon from '@mui/icons-material/Backup'
import DeleteIcon from '@mui/icons-material/Delete'
import DownloadIcon from '@mui/icons-material/Download'

import EmailIcon from '@mui/icons-material/Email'
import NotificationsIcon from '@mui/icons-material/Notifications'
import RestoreIcon from '@mui/icons-material/Restore'
import SaveIcon from '@mui/icons-material/Save'
import SecurityIcon from '@mui/icons-material/Security'
import SettingsIcon from '@mui/icons-material/Settings'
import SmsIcon from '@mui/icons-material/Sms'
import StorageIcon from '@mui/icons-material/Storage'
import WebhookIcon from '@mui/icons-material/Webhook'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Divider from '@mui/material/Divider'
import FormControlLabel from '@mui/material/FormControlLabel'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
import ListItemText from '@mui/material/ListItemText'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import Select from '@mui/material/Select'
import Slider from '@mui/material/Slider'
import Stack from '@mui/material/Stack'
import Switch from '@mui/material/Switch'
import Tab from '@mui/material/Tab'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Tabs from '@mui/material/Tabs'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
// 型定義が見つからないため、Unstable_Grid2の型を明示的に定義
// Unstable_Grid2の代わりにGrid2として型を定義してインポート
import type { ComponentType } from 'react'
import { useState } from 'react'

// Unstable_Grid2の型がない場合の暫定対応
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Grid: ComponentType<Record<string, unknown>> = require('@mui/material/Unstable_Grid2').default

interface APIKey {
  id: number
  name: string
  key: string
  permissions: string[]
  lastUsed: string
  status: 'Active' | 'Inactive'
}

const mockAPIKeys: APIKey[] = [
  {
    id: 1,
    name: 'Analytics API',
    key: 'ak_live_1234567890abcdef',
    permissions: ['read', 'analytics'],
    lastUsed: '2024-02-01 14:30',
    status: 'Active',
  },
  {
    id: 2,
    name: 'User Management',
    key: 'ak_live_abcdef1234567890',
    permissions: ['read', 'write', 'users'],
    lastUsed: '2024-01-28 09:15',
    status: 'Active',
  },
  {
    id: 3,
    name: 'Integration Service',
    key: 'ak_live_fedcba0987654321',
    permissions: ['read'],
    lastUsed: '2024-01-20 16:45',
    status: 'Inactive',
  },
]

export default function SettingsPage() {
  const [currentTab, setCurrentTab] = useState(0)
  const [apiKeys, setApiKeys] = useState<APIKey[]>(mockAPIKeys)
  const [openApiDialog, setOpenApiDialog] = useState(false)
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    autoSave: true,
    debugMode: false,
    analyticsTracking: true,
    emailNotifications: true,
    smsNotifications: false,
    webhookUrl: 'https://api.example.com/webhook',
    sessionTimeout: 30,
    maxFileSize: 10,
    allowedFileTypes: 'jpg,png,pdf,doc,docx',
    backupFrequency: 'daily',
    dataRetention: 365,
    encryptionEnabled: true,
    twoFactorAuth: false,
    passwordExpiry: 90,
    loginAttempts: 3,
  })

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue)
  }

  const handleSettingChange = (
    setting: string,
    value: boolean | number | string,
  ) => {
    setSettings((prev) => ({ ...prev, [setting]: value }))
  }

  const handleSaveSettings = () => {
    console.log('Saving settings:', settings)
    // Simulate API call
  }

  const handleDeleteApiKey = (keyId: number) => {
    setApiKeys(apiKeys.filter((key) => key.id !== keyId))
  }

  const handleToggleApiKey = (keyId: number) => {
    setApiKeys(
      apiKeys.map((key) =>
        key.id === keyId
          ? {
              ...key,
              status:
                key.status === 'Active' ? 'Inactive' : ('Active' as const),
            }
          : key,
      ),
    )
  }

  interface TabPanelProps {
    children?: React.ReactNode
    value: number
    index: number
  }

  const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  )

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography component="h2" variant="h6">
          System Settings
        </Typography>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleSaveSettings}
        >
          Save Changes
        </Button>
      </Box>

      <Tabs value={currentTab} onChange={handleTabChange} sx={{ mb: 3 }}>
        <Tab label="General" icon={<SettingsIcon />} />
        <Tab label="Security" icon={<SecurityIcon />} />
        <Tab label="Notifications" icon={<NotificationsIcon />} />
        <Tab label="Storage" icon={<StorageIcon />} />
        <Tab label="API Keys" icon={<ApiIcon />} />
        <Tab label="Backup" icon={<BackupIcon />} />
      </Tabs>

      <TabPanel value={currentTab} index={0}>
          <Grid
            component="div"
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 3,
            }}
          >
            <Grid
              component="div"
              sx={{
                flexBasis: '100%',
                maxWidth: '100%',
                '@media (min-width:900px)': {
                  flexBasis: '50%',
                  maxWidth: '50%',
                },
              }}
            >
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Application Settings
                  </Typography>
                  <Stack spacing={2}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.notifications}
                          onChange={(e) =>
                            handleSettingChange('notifications', e.target.checked)
                          }
                        />
                      }
                      label="Enable notifications"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.darkMode}
                          onChange={(e) =>
                            handleSettingChange('darkMode', e.target.checked)
                          }
                        />
                      }
                      label="Dark mode"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.autoSave}
                          onChange={(e) =>
                            handleSettingChange('autoSave', e.target.checked)
                          }
                        />
                      }
                      label="Auto-save"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.debugMode}
                          onChange={(e) =>
                            handleSettingChange('debugMode', e.target.checked)
                          }
                        />
                      }
                      label="Debug mode"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.analyticsTracking}
                          onChange={(e) =>
                            handleSettingChange(
                              'analyticsTracking',
                              e.target.checked,
                            )
                          }
                        />
                      }
                      label="Analytics tracking"
                    />
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
            <Grid
              component="div"
              sx={{
                flexBasis: '100%',
                maxWidth: '100%',
                '@media (min-width:900px)': {
                  flexBasis: '50%',
                  maxWidth: '50%',
                },
              }}
            >
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Session & Performance
                  </Typography>
                  <Stack spacing={3}>
                    <Box>
                      <Typography variant="body2" gutterBottom>
                        Session Timeout (minutes)
                      </Typography>
                      <Slider
                        value={settings.sessionTimeout}
                        onChange={(_e, value) =>
                          handleSettingChange('sessionTimeout', value)
                        }
                        valueLabelDisplay="auto"
                        min={5}
                        max={120}
                        marks={[
                          { value: 5, label: '5m' },
                          { value: 30, label: '30m' },
                          { value: 60, label: '1h' },
                          { value: 120, label: '2h' },
                        ]}
                      />
                    </Box>
                    <Box>
                      <Typography variant="body2" gutterBottom>
                        Max File Upload Size (MB)
                      </Typography>
                      <Slider
                        value={settings.maxFileSize}
                        onChange={(_e, value) =>
                          handleSettingChange('maxFileSize', value)
                        }
                        valueLabelDisplay="auto"
                        min={1}
                        max={100}
                        marks={[
                          { value: 1, label: '1MB' },
                          { value: 10, label: '10MB' },
                          { value: 50, label: '50MB' },
                          { value: 100, label: '100MB' },
                        ]}
                      />
                    </Box>
                    <Box>
                      <Typography
                        variant="body2"
                        sx={{ mb: 0.5, fontWeight: 500 }}
                      >
                        Allowed File Types
                      </Typography>
                      <TextField
                        placeholder="Enter file extensions (e.g., jpg,png,pdf)"
                        value={settings.allowedFileTypes}
                        onChange={(e) =>
                          handleSettingChange('allowedFileTypes', e.target.value)
                        }
                        helperText="Comma-separated file extensions"
                        fullWidth
                        variant="outlined"
                      />
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
      </TabPanel>

      <TabPanel value={currentTab} index={1}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Authentication & Access
                </Typography>
                <Stack spacing={2}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.twoFactorAuth}
                        onChange={(e) =>
                          handleSettingChange('twoFactorAuth', e.target.checked)
                        }
                      />
                    }
                    label="Two-factor authentication"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.encryptionEnabled}
                        onChange={(e) =>
                          handleSettingChange(
                            'encryptionEnabled',
                            e.target.checked,
                          )
                        }
                      />
                    }
                    label="Data encryption"
                  />
                  <Box>
                    <Typography variant="body2" gutterBottom>
                      Password Expiry (days)
                    </Typography>
                    <Slider
                      value={settings.passwordExpiry}
                      onChange={(_e, value) =>
                        handleSettingChange('passwordExpiry', value)
                      }
                      valueLabelDisplay="auto"
                      min={30}
                      max={365}
                      marks={[
                        { value: 30, label: '30d' },
                        { value: 90, label: '90d' },
                        { value: 180, label: '180d' },
                        { value: 365, label: '1y' },
                      ]}
                    />
                  </Box>
                  <Box>
                    <Typography variant="body2" gutterBottom>
                      Max Login Attempts
                    </Typography>
                    <Slider
                      value={settings.loginAttempts}
                      onChange={(_e, value) =>
                        handleSettingChange('loginAttempts', value)
                      }
                      valueLabelDisplay="auto"
                      min={1}
                      max={10}
                      marks={[
                        { value: 1, label: '1' },
                        { value: 3, label: '3' },
                        { value: 5, label: '5' },
                        { value: 10, label: '10' },
                      ]}
                    />
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Security Policies
                </Typography>
                <Alert severity="info" sx={{ mb: 2 }}>
                  <AlertTitle>Security Status</AlertTitle>
                  Your system security is currently configured at:{' '}
                  <strong>High</strong>
                </Alert>
                <Stack spacing={3}>
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{ mb: 0.5, fontWeight: 500 }}
                    >
                      Security Level
                    </Typography>
                    <Select defaultValue="high" fullWidth>
                      <MenuItem value="low">Low - Basic protection</MenuItem>
                      <MenuItem value="medium">
                        Medium - Standard protection
                      </MenuItem>
                      <MenuItem value="high">
                        High - Enhanced protection
                      </MenuItem>
                      <MenuItem value="strict">
                        Strict - Maximum protection
                      </MenuItem>
                    </Select>
                  </Box>
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{ mb: 0.5, fontWeight: 500 }}
                    >
                      IP Restriction
                    </Typography>
                    <Select defaultValue="none" fullWidth>
                      <MenuItem value="none">No restrictions</MenuItem>
                      <MenuItem value="whitelist">Whitelist only</MenuItem>
                      <MenuItem value="blacklist">
                        Blacklist specific IPs
                      </MenuItem>
                      <MenuItem value="geolocation">Geolocation based</MenuItem>
                    </Select>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={currentTab} index={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Notification Channels
                </Typography>
                <Stack spacing={2}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.emailNotifications}
                        onChange={(e) =>
                          handleSettingChange(
                            'emailNotifications',
                            e.target.checked,
                          )
                        }
                      />
                    }
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <EmailIcon sx={{ mr: 1 }} />
                        Email notifications
                      </Box>
                    }
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.smsNotifications}
                        onChange={(e) =>
                          handleSettingChange(
                            'smsNotifications',
                            e.target.checked,
                          )
                        }
                      />
                    }
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <SmsIcon sx={{ mr: 1 }} />
                        SMS notifications
                      </Box>
                    }
                  />
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{ mb: 0.5, fontWeight: 500 }}
                    >
                      Webhook URL
                    </Typography>
                    <TextField
                      placeholder="Enter webhook URL"
                      value={settings.webhookUrl}
                      onChange={(e) =>
                        handleSettingChange('webhookUrl', e.target.value)
                      }
                      InputProps={{
                        startAdornment: (
                          <WebhookIcon
                            sx={{ mr: 1, color: 'text.secondary' }}
                          />
                        ),
                      }}
                      fullWidth
                      variant="outlined"
                    />
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Notification Types
                </Typography>
                <List>
                  {[
                    'System alerts',
                    'User registrations',
                    'Failed login attempts',
                    'Data backup completed',
                    'API rate limit warnings',
                    'Scheduled maintenance',
                  ].map((item, index) => (
                    <ListItem key={item}>
                      <ListItemIcon>
                        <NotificationsIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary={item} />
                      <ListItemSecondaryAction>
                        <Switch defaultChecked={index < 4} />
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={currentTab} index={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Data Retention
                </Typography>
                <Stack spacing={3}>
                  <Box>
                    <Typography variant="body2" gutterBottom>
                      Data Retention Period (days)
                    </Typography>
                    <Slider
                      value={settings.dataRetention}
                      onChange={(_e, value) =>
                        handleSettingChange('dataRetention', value)
                      }
                      valueLabelDisplay="auto"
                      min={30}
                      max={2555}
                      marks={[
                        { value: 30, label: '30d' },
                        { value: 365, label: '1y' },
                        { value: 1095, label: '3y' },
                        { value: 2555, label: '7y' },
                      ]}
                    />
                  </Box>
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{ mb: 0.5, fontWeight: 500 }}
                    >
                      Archive Location
                    </Typography>
                    <Select defaultValue="cloud" fullWidth>
                      <MenuItem value="local">Local Storage</MenuItem>
                      <MenuItem value="cloud">Cloud Storage</MenuItem>
                      <MenuItem value="hybrid">Hybrid (Local + Cloud)</MenuItem>
                    </Select>
                  </Box>
                  <Alert severity="warning">
                    Data older than the retention period will be automatically
                    purged.
                  </Alert>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Storage Statistics
                </Typography>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Total Storage Used
                    </Typography>
                    <Typography variant="h5">2.4 TB</Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Available Space
                    </Typography>
                    <Typography variant="h6">1.6 TB</Typography>
                  </Box>
                  <Divider />
                  <Box>
                    <Typography variant="body2" gutterBottom>
                      Storage Usage by Type
                    </Typography>
                    <Stack spacing={1}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Typography variant="body2">User Data</Typography>
                        <Typography variant="body2">1.2 TB</Typography>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Typography variant="body2">Analytics</Typography>
                        <Typography variant="body2">800 GB</Typography>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Typography variant="body2">Backups</Typography>
                        <Typography variant="body2">400 GB</Typography>
                      </Box>
                    </Stack>
                  </Box>
                </Stack>
              </CardContent>
              <CardActions>
                <Button size="small" startIcon={<StorageIcon />}>
                  Optimize Storage
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={currentTab} index={4}>
        <Box
          sx={{
            mb: 3,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6">API Keys Management</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenApiDialog(true)}
          >
            Generate New Key
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Key</TableCell>
                <TableCell>Permissions</TableCell>
                <TableCell>Last Used</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {apiKeys.map((apiKey) => (
                <TableRow key={apiKey.id}>
                  <TableCell>{apiKey.name}</TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      sx={{ fontFamily: 'monospace' }}
                    >
                      {apiKey.key.substring(0, 20)}...
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={0.5} flexWrap="wrap">
                      {apiKey.permissions.map((permission) => (
                        <Chip
                          key={permission}
                          label={permission}
                          size="small"
                          variant="outlined"
                        />
                      ))}
                    </Stack>
                  </TableCell>
                  <TableCell>{apiKey.lastUsed}</TableCell>
                  <TableCell>
                    <Chip
                      label={apiKey.status}
                      color={apiKey.status === 'Active' ? 'success' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <IconButton
                        size="small"
                        onClick={() => handleToggleApiKey(apiKey.id)}
                        color={
                          apiKey.status === 'Active' ? 'warning' : 'success'
                        }
                      >
                        {apiKey.status === 'Active' ? 'Disable' : 'Enable'}
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteApiKey(apiKey.id)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      <TabPanel value={currentTab} index={5}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Backup Configuration
                </Typography>
                <Stack spacing={3}>
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{ mb: 0.5, fontWeight: 500 }}
                    >
                      Backup Frequency
                    </Typography>
                    <Select
                      value={settings.backupFrequency}
                      onChange={(e) =>
                        handleSettingChange('backupFrequency', e.target.value)
                      }
                      fullWidth
                    >
                      <MenuItem value="hourly">Hourly</MenuItem>
                      <MenuItem value="daily">Daily</MenuItem>
                      <MenuItem value="weekly">Weekly</MenuItem>
                      <MenuItem value="monthly">Monthly</MenuItem>
                    </Select>
                  </Box>
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{ mb: 0.5, fontWeight: 500 }}
                    >
                      Backup Location
                    </Typography>
                    <Select defaultValue="cloud" fullWidth>
                      <MenuItem value="local">Local Storage</MenuItem>
                      <MenuItem value="cloud">Cloud Storage</MenuItem>
                      <MenuItem value="external">External Drive</MenuItem>
                    </Select>
                  </Box>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.encryptionEnabled}
                        onChange={(e) =>
                          handleSettingChange(
                            'encryptionEnabled',
                            e.target.checked,
                          )
                        }
                      />
                    }
                    label="Encrypt backups"
                  />
                </Stack>
              </CardContent>
              <CardActions>
                <Button startIcon={<BackupIcon />} variant="contained">
                  Backup Now
                </Button>
                <Button startIcon={<RestoreIcon />}>Restore</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Recent Backups
                </Typography>
                <List>
                  {[
                    {
                      date: '2024-02-01 03:00',
                      xs: '2.1 GB',
                      status: 'Success',
                    },
                    {
                      date: '2024-01-31 03:00',
                      xs: '2.0 GB',
                      status: 'Success',
                    },
                    {
                      date: '2024-01-30 03:00',
                      xs: '1.9 GB',
                      status: 'Success',
                    },
                    {
                      date: '2024-01-29 03:00',
                      xs: '1.8 GB',
                      status: 'Failed',
                    },
                  ].map((backup, _index) => (
                    <ListItem key={backup.date}>
                      <ListItemIcon>
                        <BackupIcon
                          color={
                            backup.status === 'Success' ? 'success' : 'error'
                          }
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={backup.date}
                        secondary={`${backup.xs} • ${backup.status}`}
                      />
                      <ListItemSecondaryAction>
                        <IconButton edge="end">
                          <DownloadIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      <Dialog
        open={openApiDialog}
        onClose={() => setOpenApiDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Generate New API Key</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <Box>
              <Typography variant="body2" sx={{ mb: 0.5, fontWeight: 500 }}>
                API Key Name
              </Typography>
              <TextField
                placeholder="Enter API key name"
                fullWidth
                variant="outlined"
              />
            </Box>
            <Box>
              <Typography variant="body2" sx={{ mb: 0.5, fontWeight: 500 }}>
                Permissions
              </Typography>
              <Select multiple defaultValue={['read']} fullWidth>
                <MenuItem value="read">Read</MenuItem>
                <MenuItem value="write">Write</MenuItem>
                <MenuItem value="delete">Delete</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
            </Box>
            <Box>
              <Typography variant="body2" sx={{ mb: 0.5, fontWeight: 500 }}>
                Expiration Date
              </Typography>
              <TextField type="date" fullWidth variant="outlined" />
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenApiDialog(false)}>Cancel</Button>
          <Button onClick={() => setOpenApiDialog(false)} variant="contained">
            Generate Key
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
