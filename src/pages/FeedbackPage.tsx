import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Rating from '@mui/material/Rating'
import FormLabel from '@mui/material/FormLabel'
import Stack from '@mui/material/Stack'

export default function FeedbackPage() {
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Feedback
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            We'd love to hear from you!
          </Typography>
          <Typography variant="body2" sx={{ mb: 3 }}>
            Please share your thoughts and suggestions to help us improve.
          </Typography>
          
          <Stack spacing={3}>
            <div>
              <FormLabel>Overall Rating</FormLabel>
              <Rating name="rating" defaultValue={4} size="large" />
            </div>
            
            <TextField
              label="Subject"
              variant="outlined"
              fullWidth
              placeholder="Brief description of your feedback"
            />
            
            <TextField
              label="Message"
              multiline
              rows={6}
              variant="outlined"
              fullWidth
              placeholder="Please provide detailed feedback..."
            />
            
            <TextField
              label="Email (optional)"
              variant="outlined"
              fullWidth
              placeholder="your.email@example.com"
            />
            
            <Button 
              variant="contained" 
              size="large" 
              sx={{ alignSelf: 'flex-start' }}
            >
              Submit Feedback
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  )
}