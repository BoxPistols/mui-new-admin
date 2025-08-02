import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CustomizedDataGrid from '../components/CustomizedDataGrid'

export default function ClientsPage() {
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Clients Management
      </Typography>
      <CustomizedDataGrid />
    </Box>
  )
}