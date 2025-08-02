import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Stack from '@mui/material/Stack'
import { ThemeProvider, alpha } from '@mui/material/styles'
import * as React from 'react'
import type {} from '@mui/x-charts/themeAugmentation'
import type {} from '@mui/x-data-grid/themeAugmentation'
import type {} from '@mui/x-date-pickers/themeAugmentation'
import type {} from '@mui/x-tree-view/themeAugmentation'
import { Routes, Route } from 'react-router-dom'
import AppNavbar from './components/AppNavbar'
import SideMenu from './components/SideMenu'
import HomePage from './pages/HomePage'
import AnalyticsPage from './pages/AnalyticsPage'
import ClientsPage from './pages/ClientsPage'
import TasksPage from './pages/TasksPage'
import SettingsPage from './pages/SettingsPage'
import AboutPage from './pages/AboutPage'
import FeedbackPage from './pages/FeedbackPage'
import { useAppTheme } from './theme/AppTheme'
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from './theme/customizations'

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
}

interface DashboardProps {
  disableCustomTheme?: boolean
}

export default function Dashboard({ disableCustomTheme }: DashboardProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(true)
  
  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const theme = useAppTheme({
    disableCustomTheme,
    themeComponents: xThemeComponents,
  })

  const content = (
    <>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: 'flex' }}>
        <SideMenu open={sidebarOpen} />
        <AppNavbar sidebarOpen={sidebarOpen} onSidebarToggle={handleSidebarToggle} />
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: alpha(theme.palette.background.default, 1),
            overflow: 'auto',
            marginLeft: { xs: 0, md: sidebarOpen ? 0 : `-240px` },
            marginTop: 'calc(var(--template-frame-height, 0px) + 64px)',
            transition: theme.transitions.create('margin', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: 'center',
              mx: 3,
              pb: 10,
              pt: 2,
            }}
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/clients" element={<ClientsPage />} />
              <Route path="/tasks" element={<TasksPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/feedback" element={<FeedbackPage />} />
            </Routes>
          </Stack>
        </Box>
      </Box>
    </>
  )

  if (disableCustomTheme) {
    return content
  }

  return <ThemeProvider theme={theme}>{content}</ThemeProvider>
}
