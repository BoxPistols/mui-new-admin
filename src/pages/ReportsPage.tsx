import { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
import Divider from '@mui/material/Divider'
import LinearProgress from '@mui/material/LinearProgress'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Alert from '@mui/material/Alert'
import DownloadIcon from '@mui/icons-material/Download'
import AssessmentIcon from '@mui/icons-material/Assessment'
import ScheduleIcon from '@mui/icons-material/Schedule'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import BarChartIcon from '@mui/icons-material/BarChart'
import PieChartIcon from '@mui/icons-material/PieChart'
import TableViewIcon from '@mui/icons-material/TableView'
import DateRangeIcon from '@mui/icons-material/DateRange'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import TrendingDownIcon from '@mui/icons-material/TrendingDown'
import InsightsIcon from '@mui/icons-material/Insights'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import RefreshIcon from '@mui/icons-material/Refresh'

interface Report {
  id: number
  name: string
  description: string
  type: 'Analytics' | 'Financial' | 'User Activity' | 'Performance' | 'Sales'
  format: 'PDF' | 'Excel' | 'CSV' | 'JSON'
  lastGenerated: string
  status: 'Available' | 'Generating' | 'Failed' | 'Scheduled'
  size: string
  downloadCount: number
  schedule?: string
}

interface ReportTemplate {
  id: number
  name: string
  description: string
  category: string
  estimatedTime: string
  dataPoints: number
}

const mockReports: Report[] = [
  {
    id: 1,
    name: 'Monthly Analytics Report',
    description: 'Comprehensive analytics including page views, user behavior, and conversion metrics',
    type: 'Analytics',
    format: 'PDF',
    lastGenerated: '2024-02-01 09:30',
    status: 'Available',
    size: '2.4 MB',
    downloadCount: 15,
    schedule: 'Monthly - 1st day'
  },
  {
    id: 2,
    name: 'User Activity Summary',
    description: 'Daily active users, session duration, and engagement metrics',
    type: 'User Activity',
    format: 'Excel',
    lastGenerated: '2024-02-01 14:20',
    status: 'Available',
    size: '1.8 MB',
    downloadCount: 23,
    schedule: 'Daily - 2:00 PM'
  },
  {
    id: 3,
    name: 'Financial Dashboard Export',
    description: 'Revenue, expenses, and profit analysis with quarterly breakdown',
    type: 'Financial',
    format: 'CSV',
    lastGenerated: '2024-01-31 18:45',
    status: 'Available',
    size: '890 KB',
    downloadCount: 8
  },
  {
    id: 4,
    name: 'Performance Metrics',
    description: 'System performance, load times, and infrastructure metrics',
    type: 'Performance',
    format: 'JSON',
    lastGenerated: '2024-02-01 16:15',
    status: 'Generating',
    size: '-',
    downloadCount: 12
  },
  {
    id: 5,
    name: 'Sales Pipeline Report',
    description: 'Lead conversion, deal progression, and sales team performance',
    type: 'Sales',
    format: 'PDF',
    lastGenerated: '2024-01-30 12:00',
    status: 'Failed',
    size: '-',
    downloadCount: 5,
    schedule: 'Weekly - Monday'
  }
]

const reportTemplates: ReportTemplate[] = [
  {
    id: 1,
    name: 'Website Analytics Overview',
    description: 'Traffic, bounce rate, top pages, and user demographics',
    category: 'Analytics',
    estimatedTime: '5-10 minutes',
    dataPoints: 15
  },
  {
    id: 2,
    name: 'E-commerce Sales Analysis',
    description: 'Product performance, customer behavior, and revenue trends',
    category: 'Sales',
    estimatedTime: '10-15 minutes',
    dataPoints: 25
  },
  {
    id: 3,
    name: 'User Engagement Report',
    description: 'Session data, feature usage, and retention analysis',
    category: 'User Activity',
    estimatedTime: '8-12 minutes',
    dataPoints: 20
  },
  {
    id: 4,
    name: 'System Performance Audit',
    description: 'Server metrics, response times, and error rates',
    category: 'Performance',
    estimatedTime: '3-5 minutes',
    dataPoints: 12
  },
  {
    id: 5,
    name: 'Financial Summary',
    description: 'Income, expenses, profit margins, and budget analysis',
    category: 'Financial',
    estimatedTime: '15-20 minutes',
    dataPoints: 30
  },
  {
    id: 6,
    name: 'Customer Satisfaction Survey',
    description: 'Feedback scores, sentiment analysis, and improvement areas',
    category: 'Analytics',
    estimatedTime: '7-10 minutes',
    dataPoints: 18
  }
]

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>(mockReports)
  const [currentTab, setCurrentTab] = useState(0)
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<ReportTemplate | null>(null)
  const [generatingReports, setGeneratingReports] = useState<number[]>([])

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue)
  }

  const handleGenerateReport = (template: ReportTemplate) => {
    setSelectedTemplate(template)
    setOpenDialog(true)
  }

  const handleConfirmGenerate = () => {
    if (selectedTemplate) {
      setGeneratingReports([...generatingReports, selectedTemplate.id])
      setOpenDialog(false)
      
      // Simulate report generation
      setTimeout(() => {
        setGeneratingReports(generatingReports.filter(id => id !== selectedTemplate.id))
        // Add new report to list
        const newReport: Report = {
          id: Date.now(),
          name: selectedTemplate.name,
          description: selectedTemplate.description,
          type: selectedTemplate.category as any,
          format: 'PDF',
          lastGenerated: new Date().toLocaleString(),
          status: 'Available',
          size: `${Math.random() * 3 + 1}MB`,
          downloadCount: 0
        }
        setReports([newReport, ...reports])
      }, 3000)
    }
  }

  const handleDownloadReport = (reportId: number) => {
    setReports(reports.map(r => 
      r.id === reportId 
        ? { ...r, downloadCount: r.downloadCount + 1 }
        : r
    ))
    // Simulate download
    console.log(`Downloading report ${reportId}`)
  }

  const handleRegenerateReport = (reportId: number) => {
    setReports(reports.map(r => 
      r.id === reportId 
        ? { ...r, status: 'Generating' as const, lastGenerated: new Date().toLocaleString() }
        : r
    ))
    
    // Simulate regeneration
    setTimeout(() => {
      setReports(reports.map(r => 
        r.id === reportId 
          ? { ...r, status: 'Available' as const }
          : r
      ))
    }, 3000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'success'
      case 'Generating': return 'warning'
      case 'Failed': return 'error'
      case 'Scheduled': return 'info'
      default: return 'default'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Analytics': return 'primary'
      case 'Financial': return 'success'
      case 'User Activity': return 'info'
      case 'Performance': return 'warning'
      case 'Sales': return 'error'
      default: return 'default'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Analytics': return <BarChartIcon />
      case 'Financial': return <TrendingUpIcon />
      case 'User Activity': return <InsightsIcon />
      case 'Performance': return <AssessmentIcon />
      case 'Sales': return <TrendingDownIcon />
      default: return <TableViewIcon />
    }
  }

  const TabPanel = ({ children, value, index }: any) => (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  )

  const recentReports = reports.slice(0, 3)
  const availableReports = reports.filter(r => r.status === 'Available').length
  const generatingCount = reports.filter(r => r.status === 'Generating').length + generatingReports.length

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography component="h2" variant="h6">
          Reports & Analytics
        </Typography>
        <Button
          variant="contained"
          startIcon={<AssessmentIcon />}
          onClick={() => setCurrentTab(1)}
        >
          Generate Report
        </Button>
      </Box>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h6" color="primary">
                    {availableReports}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Available Reports
                  </Typography>
                </Box>
                <FileDownloadIcon color="primary" />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h6" color="warning.main">
                    {generatingCount}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Generating
                  </Typography>
                </Box>
                <ScheduleIcon color="warning" />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h6" color="success.main">
                    {reportTemplates.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Templates
                  </Typography>
                </Box>
                <PieChartIcon color="success" />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h6" color="info.main">
                    {reports.filter(r => r.schedule).length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Scheduled
                  </Typography>
                </Box>
                <CalendarTodayIcon color="info" />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Tabs value={currentTab} onChange={handleTabChange} sx={{ mb: 3 }}>
        <Tab label="Recent Reports" />
        <Tab label="Generate New" />
        <Tab label="All Reports" />
        <Tab label="Scheduled Reports" />
      </Tabs>

      <TabPanel value={currentTab} index={0}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Recently Generated Reports
        </Typography>
        <Grid container spacing={3}>
          {recentReports.map((report) => (
            <Grid key={report.id} size={{ xs: 12, md: 6, lg: 4 }}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="h6" sx={{ flexGrow: 1, mr: 2 }}>
                      {report.name}
                    </Typography>
                    <Stack direction="row" spacing={1}>
                      <Chip
                        label={report.type}
                        color={getTypeColor(report.type) as any}
                        size="small"
                        icon={getTypeIcon(report.type)}
                      />
                      <Chip
                        label={report.status}
                        color={getStatusColor(report.status) as any}
                        size="small"
                      />
                    </Stack>
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {report.description}
                  </Typography>
                  
                  <Stack spacing={1}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Typography variant="body2" color="text.secondary">
                        Format: {report.format}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Size: {report.size}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      Generated: {report.lastGenerated}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Downloads: {report.downloadCount}
                    </Typography>
                    {report.status === 'Generating' && (
                      <LinearProgress sx={{ mt: 1 }} />
                    )}
                  </Stack>
                </CardContent>
                
                <CardActions>
                  {report.status === 'Available' && (
                    <>
                      <Button 
                        size="small" 
                        startIcon={<DownloadIcon />}
                        onClick={() => handleDownloadReport(report.id)}
                      >
                        Download
                      </Button>
                      <IconButton 
                        size="small" 
                        onClick={() => handleRegenerateReport(report.id)}
                        color="primary"
                      >
                        <RefreshIcon />
                      </IconButton>
                    </>
                  )}
                  {report.status === 'Failed' && (
                    <Button 
                      size="small" 
                      color="error"
                      onClick={() => handleRegenerateReport(report.id)}
                    >
                      Retry
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      <TabPanel value={currentTab} index={1}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Report Templates
        </Typography>
        <Grid container spacing={3}>
          {reportTemplates.map((template) => (
            <Grid key={template.id} size={{ xs: 12, md: 6 }}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="h6" sx={{ flexGrow: 1, mr: 2 }}>
                      {template.name}
                    </Typography>
                    <Chip
                      label={template.category}
                      color={getTypeColor(template.category) as any}
                      size="small"
                    />
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {template.description}
                  </Typography>
                  
                  <Stack spacing={1}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <ScheduleIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        Estimated time: {template.estimatedTime}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <DateRangeIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        Data points: {template.dataPoints}
                      </Typography>
                    </Box>
                  </Stack>
                  
                  {generatingReports.includes(template.id) && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body2" color="primary" sx={{ mb: 1 }}>
                        Generating report...
                      </Typography>
                      <LinearProgress />
                    </Box>
                  )}
                </CardContent>
                
                <CardActions>
                  <Button 
                    variant="contained"
                    onClick={() => handleGenerateReport(template)}
                    disabled={generatingReports.includes(template.id)}
                    startIcon={<AssessmentIcon />}
                  >
                    Generate
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      <TabPanel value={currentTab} index={2}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Report Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Format</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Last Generated</TableCell>
                <TableCell>Size</TableCell>
                <TableCell>Downloads</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>
                    <Typography variant="body2" fontWeight="medium">
                      {report.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={report.type}
                      color={getTypeColor(report.type) as any}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{report.format}</TableCell>
                  <TableCell>
                    <Chip
                      label={report.status}
                      color={getStatusColor(report.status) as any}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{report.lastGenerated}</TableCell>
                  <TableCell>{report.size}</TableCell>
                  <TableCell>{report.downloadCount}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      {report.status === 'Available' && (
                        <>
                          <IconButton 
                            size="small" 
                            onClick={() => handleDownloadReport(report.id)}
                            color="primary"
                          >
                            <DownloadIcon />
                          </IconButton>
                          <IconButton 
                            size="small" 
                            onClick={() => handleRegenerateReport(report.id)}
                            color="primary"
                          >
                            <RefreshIcon />
                          </IconButton>
                        </>
                      )}
                      {report.status === 'Failed' && (
                        <Button 
                          size="small" 
                          color="error"
                          onClick={() => handleRegenerateReport(report.id)}
                        >
                          Retry
                        </Button>
                      )}
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      <TabPanel value={currentTab} index={3}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Scheduled Reports
        </Typography>
        <List>
          {reports.filter(report => report.schedule).map((report, index) => (
            <Box key={report.id}>
              <ListItem>
                <ListItemIcon>
                  <CalendarTodayIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary={report.name}
                  secondary={
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        {report.description}
                      </Typography>
                      <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                        <Chip label={report.schedule} size="small" color="info" />
                        <Chip label={report.format} size="small" variant="outlined" />
                      </Stack>
                    </Box>
                  }
                />
                <ListItemSecondaryAction>
                  <Stack direction="row" spacing={1}>
                    <Button size="small" variant="outlined">
                      Edit Schedule
                    </Button>
                    <Button size="small" color="error">
                      Remove
                    </Button>
                  </Stack>
                </ListItemSecondaryAction>
              </ListItem>
              {index < reports.filter(r => r.schedule).length - 1 && <Divider />}
            </Box>
          ))}
        </List>
        
        {reports.filter(r => r.schedule).length === 0 && (
          <Alert severity="info">
            No scheduled reports found. You can schedule reports to be generated automatically.
          </Alert>
        )}
      </TabPanel>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          Generate Report: {selectedTemplate?.name}
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {selectedTemplate?.description}
          </Typography>
          
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Output Format
              </Typography>
              <Select defaultValue="PDF" fullWidth>
                <MenuItem value="PDF">PDF</MenuItem>
                <MenuItem value="Excel">Excel</MenuItem>
                <MenuItem value="CSV">CSV</MenuItem>
                <MenuItem value="JSON">JSON</MenuItem>
              </Select>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Date Range
              </Typography>
              <TextField
                placeholder="Select date range"
                defaultValue="Last 30 days"
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography variant="body2" color="text.secondary">
                Estimated generation time: {selectedTemplate?.estimatedTime}
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleConfirmGenerate} variant="contained">
            Generate Report
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}