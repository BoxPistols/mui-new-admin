import { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid2'
import Paper from '@mui/material/Paper'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import SendIcon from '@mui/icons-material/Send'
import AddIcon from '@mui/icons-material/Add'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import Chip from '@mui/material/Chip'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`component-tabpanel-${index}`}
      aria-labelledby={`component-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  )
}

interface DemoSectionProps {
  title: string
  description?: string
  children: React.ReactNode
}

function DemoSection({ title, description, children }: DemoSectionProps) {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {description && (
        <Typography variant="body2" color="text.secondary" paragraph>
          {description}
        </Typography>
      )}
      <Paper variant="outlined" sx={{ p: 3, mt: 2 }}>
        {children}
      </Paper>
    </Box>
  )
}

export default function ComponentsPage() {
  const [value, setValue] = useState(0)

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Components Library
      </Typography>

      <Paper sx={{ mb: 3 }}>
        <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto">
          <Tab label="Buttons" />
          <Tab label="Inputs" />
          <Tab label="Data Display" />
          <Tab label="Feedback" />
          <Tab label="Navigation" />
        </Tabs>
      </Paper>

      {/* Buttons Tab */}
      <TabPanel value={value} index={0}>
        <DemoSection
          title="Basic Buttons"
          description="Buttons come in three variants: text (default), contained, and outlined."
        >
          <Stack direction="row" spacing={2}>
            <Button variant="text">Text</Button>
            <Button variant="contained">Contained</Button>
            <Button variant="outlined">Outlined</Button>
          </Stack>
        </DemoSection>

        <DemoSection title="Button Colors" description="Buttons support different color props.">
          <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
            <Button variant="contained" color="primary">
              Primary
            </Button>
            <Button variant="contained" color="secondary">
              Secondary
            </Button>
            <Button variant="contained" color="success">
              Success
            </Button>
            <Button variant="contained" color="error">
              Error
            </Button>
            <Button variant="contained" color="warning">
              Warning
            </Button>
            <Button variant="contained" color="info">
              Info
            </Button>
          </Stack>
        </DemoSection>

        <DemoSection title="Button Sizes" description="Buttons come in three sizes: small, medium, and large.">
          <Stack direction="row" spacing={2} alignItems="center">
            <Button variant="contained" size="small">
              Small
            </Button>
            <Button variant="contained" size="medium">
              Medium
            </Button>
            <Button variant="contained" size="large">
              Large
            </Button>
          </Stack>
        </DemoSection>

        <DemoSection title="Buttons with Icons" description="Add icons to buttons for clarity.">
          <Stack direction="row" spacing={2}>
            <Button variant="contained" startIcon={<SendIcon />}>
              Send
            </Button>
            <Button variant="contained" endIcon={<SendIcon />}>
              Send
            </Button>
            <Button variant="outlined" startIcon={<DeleteIcon />} color="error">
              Delete
            </Button>
          </Stack>
        </DemoSection>

        <DemoSection title="Icon Buttons" description="Icon buttons are commonly used in app bars and toolbars.">
          <Stack direction="row" spacing={2}>
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
            <IconButton aria-label="delete" disabled color="primary">
              <DeleteIcon />
            </IconButton>
            <IconButton color="secondary" aria-label="add">
              <AddIcon />
            </IconButton>
            <IconButton color="primary" aria-label="add">
              <AddIcon />
            </IconButton>
          </Stack>
        </DemoSection>

        <DemoSection title="Disabled Buttons" description="Buttons can be disabled.">
          <Stack direction="row" spacing={2}>
            <Button variant="text" disabled>
              Disabled
            </Button>
            <Button variant="contained" disabled>
              Disabled
            </Button>
            <Button variant="outlined" disabled>
              Disabled
            </Button>
          </Stack>
        </DemoSection>
      </TabPanel>

      {/* Inputs Tab */}
      <TabPanel value={value} index={1}>
        <Typography variant="h6" gutterBottom>
          Form Components
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          TextField, Select, Checkbox, Radio, Switch components will be added here.
        </Typography>
        <Paper variant="outlined" sx={{ p: 3, textAlign: 'center', minHeight: 200 }}>
          <Typography color="text.secondary">Input components coming soon...</Typography>
        </Paper>
      </TabPanel>

      {/* Data Display Tab */}
      <TabPanel value={value} index={2}>
        <DemoSection title="Chips" description="Chips are compact elements that represent an input, attribute, or action.">
          <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
            <Chip label="Default" />
            <Chip label="Primary" color="primary" />
            <Chip label="Success" color="success" />
            <Chip label="Error" color="error" />
          </Stack>
          <Divider sx={{ my: 2 }} />
          <Stack direction="row" spacing={1}>
            <Chip label="Clickable" onClick={() => alert('clicked')} />
            <Chip label="Deletable" onDelete={() => alert('delete')} />
            <Chip label="Outlined" variant="outlined" />
          </Stack>
        </DemoSection>

        <DemoSection title="Dividers" description="Dividers separate content into clear groups.">
          <Grid container spacing={2}>
            <Grid size={12}>
              <Box>
                <Typography>Content above</Typography>
                <Divider sx={{ my: 2 }} />
                <Typography>Content below</Typography>
              </Box>
            </Grid>
            <Grid size={12}>
              <Stack direction="row" spacing={2} divider={<Divider orientation="vertical" flexItem />}>
                <Typography>Item 1</Typography>
                <Typography>Item 2</Typography>
                <Typography>Item 3</Typography>
              </Stack>
            </Grid>
          </Grid>
        </DemoSection>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
          More data display components (Tables, Lists, Cards) will be added here.
        </Typography>
      </TabPanel>

      {/* Feedback Tab */}
      <TabPanel value={value} index={3}>
        <Typography variant="h6" gutterBottom>
          Feedback Components
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Alert, Snackbar, Dialog, Progress components will be added here.
        </Typography>
        <Paper variant="outlined" sx={{ p: 3, textAlign: 'center', minHeight: 200 }}>
          <Typography color="text.secondary">Feedback components coming soon...</Typography>
        </Paper>
      </TabPanel>

      {/* Navigation Tab */}
      <TabPanel value={value} index={4}>
        <Typography variant="h6" gutterBottom>
          Navigation Components
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Menu, Breadcrumbs, Drawer, Tabs components will be added here.
        </Typography>
        <Paper variant="outlined" sx={{ p: 3, textAlign: 'center', minHeight: 200 }}>
          <Typography color="text.secondary">Navigation components coming soon...</Typography>
        </Paper>
      </TabPanel>
    </Box>
  )
}
