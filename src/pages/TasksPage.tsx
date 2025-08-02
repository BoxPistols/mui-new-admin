import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CustomizedTreeView from '../components/CustomizedTreeView'

export default function TasksPage() {
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Tasks Management
      </Typography>
      <CustomizedTreeView />
    </Box>
  )
}