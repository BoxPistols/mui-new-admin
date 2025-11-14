import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid2'
import Paper from '@mui/material/Paper'
import InfoRoundedIcon from '@mui/icons-material/InfoRounded'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Link from '@mui/material/Link'
import CodeIcon from '@mui/icons-material/Code'
import DesignServicesIcon from '@mui/icons-material/DesignServices'
import SpeedIcon from '@mui/icons-material/Speed'

export default function AboutPage() {
  const features = [
    {
      icon: <CodeIcon sx={{ fontSize: 40 }} />,
      title: 'Modern Tech Stack',
      description: 'Built with React, TypeScript, and Material-UI for a robust foundation.',
    },
    {
      icon: <DesignServicesIcon sx={{ fontSize: 40 }} />,
      title: 'Beautiful Design',
      description: 'Clean and intuitive interface following Material Design principles.',
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 40 }} />,
      title: 'High Performance',
      description: 'Optimized for speed and efficiency with modern build tools.',
    },
  ]

  const technologies = [
    'React 18',
    'TypeScript',
    'Material-UI v6',
    'Vite',
    'React Router',
    'Emotion',
  ]

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        About
      </Typography>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12 }}>
          <Paper
            sx={{
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <InfoRoundedIcon sx={{ fontSize: 64, color: 'primary.main' }} />
            <Typography variant="h4" gutterBottom>
              MUI New Admin Dashboard
            </Typography>
            <Typography variant="body1" color="text.secondary" textAlign="center" maxWidth="md">
              A modern and comprehensive admin dashboard template built with the latest web technologies.
              This application provides a solid foundation for building enterprise-level administrative interfaces.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Version 1.0.0 • Last updated: 2025
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {features.map((feature, index) => (
          <Grid key={index} size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 2 }}>
                <Box sx={{ color: 'primary.main' }}>{feature.icon}</Box>
                <Typography variant="h6">{feature.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}

        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Technologies Used
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 2 }}>
              {technologies.map((tech, index) => (
                <Chip key={index} label={tech} color="primary" variant="outlined" />
              ))}
            </Box>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Resources
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
              <Link href="https://mui.com/" target="_blank" rel="noopener">
                Material-UI Documentation
              </Link>
              <Link href="https://react.dev/" target="_blank" rel="noopener">
                React Documentation
              </Link>
              <Link href="https://www.typescriptlang.org/" target="_blank" rel="noopener">
                TypeScript Documentation
              </Link>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
