import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid2'
import Paper from '@mui/material/Paper'
import HelpRoundedIcon from '@mui/icons-material/HelpRounded'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Rating from '@mui/material/Rating'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import SendIcon from '@mui/icons-material/Send'

export default function FeedbackPage() {
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Feedback
      </Typography>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <HelpRoundedIcon sx={{ fontSize: 40, color: 'primary.main' }} />
              <Box>
                <Typography variant="h5">We'd love to hear from you</Typography>
                <Typography variant="body2" color="text.secondary">
                  Your feedback helps us improve
                </Typography>
              </Box>
            </Box>

            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <FormControl>
                <FormLabel>How would you rate your experience?</FormLabel>
                <Box sx={{ mt: 1 }}>
                  <Rating name="rating" defaultValue={0} size="large" />
                </Box>
              </FormControl>

              <FormControl>
                <FormLabel>What type of feedback do you have?</FormLabel>
                <RadioGroup defaultValue="general" row sx={{ mt: 1 }}>
                  <FormControlLabel value="bug" control={<Radio />} label="Bug Report" />
                  <FormControlLabel value="feature" control={<Radio />} label="Feature Request" />
                  <FormControlLabel value="general" control={<Radio />} label="General Feedback" />
                </RadioGroup>
              </FormControl>

              <TextField
                required
                label="Subject"
                placeholder="Brief summary of your feedback"
                fullWidth
              />

              <TextField
                required
                label="Message"
                placeholder="Please provide detailed feedback..."
                multiline
                rows={6}
                fullWidth
              />

              <TextField label="Email (optional)" type="email" placeholder="your@email.com" fullWidth />

              <Button variant="contained" size="large" endIcon={<SendIcon />} sx={{ alignSelf: 'flex-start' }}>
                Submit Feedback
              </Button>
            </Box>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3, mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Other Ways to Reach Us
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
              <Box>
                <Typography variant="body2" fontWeight="bold">
                  Email
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  support@example.com
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" fontWeight="bold">
                  Documentation
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Check our docs for help
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" fontWeight="bold">
                  Community
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Join our Discord server
                </Typography>
              </Box>
            </Box>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Quick Tips
            </Typography>
            <Box component="ul" sx={{ pl: 2, mt: 2 }}>
              <Typography component="li" variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Be specific about the issue
              </Typography>
              <Typography component="li" variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Include screenshots if relevant
              </Typography>
              <Typography component="li" variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Describe steps to reproduce
              </Typography>
              <Typography component="li" variant="body2" color="text.secondary">
                Provide browser/device info
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
