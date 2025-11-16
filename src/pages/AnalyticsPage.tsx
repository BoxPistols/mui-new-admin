import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid2'
import Paper from '@mui/material/Paper'
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import TrendingDownIcon from '@mui/icons-material/TrendingDown'
import Stack from '@mui/material/Stack'

export default function AnalyticsPage() {
  const metrics = [
    { title: 'Total Users', value: '12,345', change: '+12%', trend: 'up' },
    { title: 'Revenue', value: '$98,765', change: '+8%', trend: 'up' },
    { title: 'Conversion Rate', value: '3.24%', change: '-2%', trend: 'down' },
    { title: 'Active Sessions', value: '1,234', change: '+15%', trend: 'up' },
  ]

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Analytics
      </Typography>
      <Grid container spacing={2} columns={12}>
        {metrics.map((metric, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
            <Card>
              <CardContent>
                <Stack spacing={1}>
                  <Typography color="text.secondary" variant="body2">
                    {metric.title}
                  </Typography>
                  <Typography variant="h4">{metric.value}</Typography>
                  <Stack direction="row" alignItems="center" spacing={0.5}>
                    {metric.trend === 'up' ? (
                      <TrendingUpIcon color="success" fontSize="small" />
                    ) : (
                      <TrendingDownIcon color="error" fontSize="small" />
                    )}
                    <Typography
                      variant="body2"
                      color={metric.trend === 'up' ? 'success.main' : 'error.main'}
                    >
                      {metric.change}
                    </Typography>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
        <Grid size={{ xs: 12 }}>
          <Paper
            sx={{
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 300,
              gap: 2,
            }}
          >
            <AnalyticsRoundedIcon sx={{ fontSize: 64, color: 'primary.main' }} />
            <Typography variant="h5" gutterBottom>
              Analytics Dashboard
            </Typography>
            <Typography variant="body1" color="text.secondary" textAlign="center">
              Track your performance metrics and gain insights into your business.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
