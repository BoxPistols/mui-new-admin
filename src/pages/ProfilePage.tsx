import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid2'
import Paper from '@mui/material/Paper'
import Avatar from '@mui/material/Avatar'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Chip from '@mui/material/Chip'
import EditIcon from '@mui/icons-material/Edit'

export default function ProfilePage() {
  const accountInfo = [
    { label: 'User ID', value: '#12345' },
    { label: 'Member Since', value: 'January 2024' },
    { label: 'Last Login', value: 'Today at 10:30 AM' },
    { label: 'Account Status', value: 'Active', isChip: true },
  ]

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Profile
      </Typography>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Avatar
              sx={{
                width: 120,
                height: 120,
                bgcolor: 'primary.main',
                fontSize: 48,
              }}
            >
              JD
            </Avatar>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h5">John Doe</Typography>
              <Typography variant="body2" color="text.secondary">
                Administrator
              </Typography>
            </Box>
            <Button variant="outlined" startIcon={<EditIcon />} fullWidth>
              Change Avatar
            </Button>
          </Paper>

          <Card sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Account Information
              </Typography>
              <List dense>
                {accountInfo.map((info, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemText
                      primary={info.label}
                      secondary={
                        info.isChip ? (
                          <Chip label={info.value} color="success" size="small" sx={{ mt: 0.5 }} />
                        ) : (
                          info.value
                        )
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6">Personal Information</Typography>
              <Button variant="contained" startIcon={<EditIcon />}>
                Edit Profile
              </Button>
            </Box>

            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField label="First Name" defaultValue="John" fullWidth />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField label="Last Name" defaultValue="Doe" fullWidth />
                </Grid>
              </Grid>

              <TextField label="Email" type="email" defaultValue="john.doe@example.com" fullWidth />

              <TextField label="Phone Number" defaultValue="+1 (555) 123-4567" fullWidth />

              <TextField
                label="Bio"
                multiline
                rows={4}
                defaultValue="Experienced administrator with a passion for creating efficient systems and improving user experiences."
                fullWidth
              />

              <Divider />

              <Typography variant="h6">Address</Typography>

              <TextField label="Street Address" defaultValue="123 Main Street" fullWidth />

              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField label="City" defaultValue="San Francisco" fullWidth />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField label="State / Province" defaultValue="California" fullWidth />
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField label="Postal Code" defaultValue="94102" fullWidth />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField label="Country" defaultValue="United States" fullWidth />
                </Grid>
              </Grid>

              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button variant="outlined">Cancel</Button>
                <Button variant="contained">Save Changes</Button>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
