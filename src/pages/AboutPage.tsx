import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

export default function AboutPage() {
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        About
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            MUI 6 Admin Dashboard
          </Typography>
          <Typography variant="body1" paragraph>
            A modern admin dashboard built with Material-UI 6 and React. This
            application provides a comprehensive suite of tools for data
            visualization, client management, and task tracking.
          </Typography>
          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            Technologies Used
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 1 }}>
            <Chip label="React 18" color="primary" />
            <Chip label="Material-UI 6" color="primary" />
            <Chip label="TypeScript 5" color="secondary" />
            <Chip label="Vite 5" color="secondary" />
            <Chip label="React Router 7" color="success" />
          </Stack>
          <Typography variant="body2" sx={{ mt: 3 }}>
            Version 1.0.0
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}
