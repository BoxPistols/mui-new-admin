import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid2'
import PageViewsBarChart from '../components/PageViewsBarChart'
import SessionsChart from '../components/SessionsChart'
import ChartUserByCountry from '../components/ChartUserByCountry'

export default function AnalyticsPage() {
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Analytics Dashboard
      </Typography>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, lg: 9 }}>
          <PageViewsBarChart />
        </Grid>
        <Grid size={{ xs: 12, lg: 3 }}>
          <SessionsChart />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <ChartUserByCountry />
        </Grid>
      </Grid>
    </Box>
  )
}