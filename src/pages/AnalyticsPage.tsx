import AccessTimeIcon from '@mui/icons-material/AccessTime'
import DevicesIcon from '@mui/icons-material/Devices'
import DownloadIcon from '@mui/icons-material/Download'
import LanguageIcon from '@mui/icons-material/Language'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'
import PeopleIcon from '@mui/icons-material/People'
import RefreshIcon from '@mui/icons-material/Refresh'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import TrendingDownIcon from '@mui/icons-material/TrendingDown'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import VisibilityIcon from '@mui/icons-material/Visibility'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'

import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import LinearProgress from '@mui/material/LinearProgress'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import Tab from '@mui/material/Tab'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Tabs from '@mui/material/Tabs'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import ChartUserByCountry from '../components/ChartUserByCountry'
import PageViewsBarChart from '../components/PageViewsBarChart'
import SessionsChart from '../components/SessionsChart'

interface MetricCard {
  title: string
  value: string | number
  change: number
  changeType: 'increase' | 'decrease'
  icon: React.ReactNode
  color: string
}

interface TopPage {
  path: string
  views: number
  uniqueViews: number
  bounceRate: number
  avgTime: string
}

interface TrafficSource {
  source: string
  visitors: number
  percentage: number
  conversionRate: number
}

const metricsData: MetricCard[] = [
  {
    title: 'Total Page Views',
    value: '2.4M',
    change: 12.5,
    changeType: 'increase',
    icon: <VisibilityIcon />,
    color: 'primary',
  },
  {
    title: 'Unique Visitors',
    value: '48.2K',
    change: 8.3,
    changeType: 'increase',
    icon: <PeopleIcon />,
    color: 'success',
  },
  {
    title: 'Avg Session Duration',
    value: '4m 32s',
    change: -2.1,
    changeType: 'decrease',
    icon: <AccessTimeIcon />,
    color: 'warning',
  },
  {
    title: 'Bounce Rate',
    value: '32.4%',
    change: -5.2,
    changeType: 'decrease',
    icon: <TrendingDownIcon />,
    color: 'success',
  },
  {
    title: 'Mobile Users',
    value: '67.8%',
    change: 15.7,
    changeType: 'increase',
    icon: <DevicesIcon />,
    color: 'info',
  },
  {
    title: 'Conversion Rate',
    value: '3.2%',
    change: 0.8,
    changeType: 'increase',
    icon: <ShoppingCartIcon />,
    color: 'error',
  },
  {
    title: 'Revenue',
    value: '$124.5K',
    change: 22.1,
    changeType: 'increase',
    icon: <MonetizationOnIcon />,
    color: 'success',
  },
  {
    title: 'Countries',
    value: '89',
    change: 3.0,
    changeType: 'increase',
    icon: <LanguageIcon />,
    color: 'primary',
  },
]

const topPages: TopPage[] = [
  {
    path: '/dashboard',
    views: 45230,
    uniqueViews: 32100,
    bounceRate: 28.5,
    avgTime: '5m 23s',
  },
  {
    path: '/products',
    views: 38940,
    uniqueViews: 28650,
    bounceRate: 35.2,
    avgTime: '4m 12s',
  },
  {
    path: '/analytics',
    views: 29760,
    uniqueViews: 21840,
    bounceRate: 31.8,
    avgTime: '6m 45s',
  },
  {
    path: '/users',
    views: 25130,
    uniqueViews: 19230,
    bounceRate: 29.3,
    avgTime: '3m 58s',
  },
  {
    path: '/settings',
    views: 18920,
    uniqueViews: 15670,
    bounceRate: 42.1,
    avgTime: '2m 34s',
  },
]

const trafficSources: TrafficSource[] = [
  {
    source: 'Google Search',
    visitors: 28450,
    percentage: 45.2,
    conversionRate: 3.8,
  },
  { source: 'Direct', visitors: 18920, percentage: 30.1, conversionRate: 4.2 },
  {
    source: 'Social Media',
    visitors: 8760,
    percentage: 13.9,
    conversionRate: 2.1,
  },
  { source: 'Email', visitors: 4230, percentage: 6.7, conversionRate: 5.6 },
  { source: 'Referrals', visitors: 2590, percentage: 4.1, conversionRate: 2.9 },
]

export default function AnalyticsPage() {
  const [currentTab, setCurrentTab] = useState(0)
  const [dateRange, setDateRange] = useState('30')
  const [refreshing, setRefreshing] = useState(false)

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue)
  }

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 2000)
  }

  interface TabPanelProps {
    children?: React.ReactNode
    index: number
    value: number
  }

  const TabPanel = ({ children, value, index }: TabPanelProps) => (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  )

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography component="h2" variant="h6">
          Analytics Dashboard
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <Box>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Time Period
            </Typography>
            <Select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              size="small"
              sx={{ minWidth: 120 }}
            >
              <MenuItem value="7">Last 7 days</MenuItem>
              <MenuItem value="30">Last 30 days</MenuItem>
              <MenuItem value="90">Last 3 months</MenuItem>
              <MenuItem value="365">Last year</MenuItem>
            </Select>
          </Box>
          <Button variant="outlined" startIcon={<DownloadIcon />} size="small">
            Export
          </Button>
          <IconButton
            onClick={handleRefresh}
            disabled={refreshing}
            color="primary"
          >
            <RefreshIcon />
          </IconButton>
        </Stack>
      </Box>

      {refreshing && <LinearProgress sx={{ mb: 2 }} />}

      <Grid container spacing={3} sx={{ mb: 3 }}>
        {metricsData.map((metric, _index) => (
          <Grid key={metric.title} size={{ xs: 12, sm: 6, md: 3 }}>
            <Card>
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Box>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      {metric.title}
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                      {metric.value}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      {metric.changeType === 'increase' ? (
                        <TrendingUpIcon
                          sx={{ fontSize: 16, color: 'success.main', mr: 0.5 }}
                        />
                      ) : (
                        <TrendingDownIcon
                          sx={{ fontSize: 16, color: 'error.main', mr: 0.5 }}
                        />
                      )}
                      <Typography
                        variant="body2"
                        color={
                          metric.changeType === 'increase'
                            ? 'success.main'
                            : 'error.main'
                        }
                      >
                        {Math.abs(metric.change)}%
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ ml: 0.5 }}
                      >
                        vs last period
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ color: `${metric.color}.main` }}>
                    {metric.icon}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Tabs value={currentTab} onChange={handleTabChange} sx={{ mb: 3 }}>
        <Tab label="Overview" />
        <Tab label="Traffic Sources" />
        <Tab label="Top Pages" />
        <Tab label="User Behavior" />
      </Tabs>

      <TabPanel value={currentTab} index={0}>
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
      </TabPanel>

      <TabPanel value={currentTab} index={1}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Traffic Sources Analysis
                </Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Source</TableCell>
                        <TableCell align="right">Visitors</TableCell>
                        <TableCell align="right">Percentage</TableCell>
                        <TableCell align="right">Conversion Rate</TableCell>
                        <TableCell align="right">Trend</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {trafficSources.map((source, _index) => (
                        <TableRow key={source.source}>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <LocationOnIcon
                                sx={{
                                  mr: 1,
                                  fontSize: 18,
                                  color: 'text.secondary',
                                }}
                              />
                              {source.source}
                            </Box>
                          </TableCell>
                          <TableCell align="right">
                            {source.visitors.toLocaleString()}
                          </TableCell>
                          <TableCell align="right">
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                              }}
                            >
                              <LinearProgress
                                variant="determinate"
                                value={source.percentage}
                                sx={{ width: 60, mr: 1 }}
                              />
                              {source.percentage}%
                            </Box>
                          </TableCell>
                          <TableCell align="right">
                            {source.conversionRate}%
                          </TableCell>
                          <TableCell align="right">
                            <TrendingUpIcon
                              sx={{ color: 'success.main', fontSize: 18 }}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Quick Stats
                </Typography>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Total Sessions
                    </Typography>
                    <Typography variant="h6">62,950</Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      New vs Returning
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      <Chip
                        label="New 68%"
                        color="primary"
                        size="small"
                        sx={{ mr: 1 }}
                      />
                      <Chip
                        label="Returning 32%"
                        color="secondary"
                        size="small"
                      />
                    </Box>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Peak Traffic Hour
                    </Typography>
                    <Typography variant="h6">2:00 PM - 3:00 PM</Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Most Active Day
                    </Typography>
                    <Typography variant="h6">Wednesday</Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={currentTab} index={2}>
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Top Performing Pages
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Page Path</TableCell>
                    <TableCell align="right">Views</TableCell>
                    <TableCell align="right">Unique Views</TableCell>
                    <TableCell align="right">Bounce Rate</TableCell>
                    <TableCell align="right">Avg Time</TableCell>
                    <TableCell align="right">Performance</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {topPages.map((page, index) => (
                    <TableRow key={page.path}>
                      <TableCell>
                        <Typography
                          variant="body2"
                          sx={{ fontFamily: 'monospace' }}
                        >
                          {page.path}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        {page.views.toLocaleString()}
                      </TableCell>
                      <TableCell align="right">
                        {page.uniqueViews.toLocaleString()}
                      </TableCell>
                      <TableCell align="right">
                        <Chip
                          label={`${page.bounceRate}%`}
                          color={
                            page.bounceRate < 30
                              ? 'success'
                              : page.bounceRate < 40
                                ? 'warning'
                                : 'error'
                          }
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="right">{page.avgTime}</TableCell>
                      <TableCell align="right">
                        <LinearProgress
                          variant="determinate"
                          value={100 - page.bounceRate}
                          color={
                            page.bounceRate < 30
                              ? 'success'
                              : page.bounceRate < 40
                                ? 'warning'
                                : 'error'
                          }
                          sx={{ width: 60 }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </TabPanel>

      <TabPanel value={currentTab} index={3}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Device Breakdown
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <DevicesIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Desktop"
                      secondary={
                        <Box>
                          <LinearProgress
                            variant="determinate"
                            value={32.2}
                            sx={{ mt: 1 }}
                          />
                          <Typography variant="body2" sx={{ mt: 1 }}>
                            32.2% • 20,250 sessions
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <DevicesIcon color="success" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Mobile"
                      secondary={
                        <Box>
                          <LinearProgress
                            variant="determinate"
                            value={67.8}
                            color="success"
                            sx={{ mt: 1 }}
                          />
                          <Typography variant="body2" sx={{ mt: 1 }}>
                            67.8% • 42,700 sessions
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Browser Usage
                </Typography>
                <List>
                  {[
                    { name: 'Chrome', percentage: 68.4 },
                    { name: 'Safari', percentage: 18.2 },
                    { name: 'Firefox', percentage: 8.9 },
                    { name: 'Edge', percentage: 4.5 },
                  ].map((browser, index) => (
                    <ListItem key={browser.name}>
                      <ListItemText
                        primary={browser.name}
                        secondary={
                          <Box>
                            <LinearProgress
                              variant="determinate"
                              value={browser.percentage}
                              sx={{ mt: 1 }}
                            />
                            <Typography variant="body2" sx={{ mt: 1 }}>
                              {browser.percentage}%
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>
    </Box>
  )
}
