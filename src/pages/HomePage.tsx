import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid2'
import Paper from '@mui/material/Paper'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'

export default function HomePage() {
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Home
      </Typography>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, md: 12 }}>
          <Paper
            sx={{
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 400,
              gap: 2,
            }}
          >
            <HomeRoundedIcon sx={{ fontSize: 64, color: 'primary.main' }} />
            <Typography variant="h4" gutterBottom>
              Welcome to Admin Dashboard
            </Typography>
            <Typography variant="body1" color="text.secondary" textAlign="center">
              This is the home page. Navigate through the menu to explore different sections.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
