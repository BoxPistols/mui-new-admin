import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import type {} from '@mui/x-charts/themeAugmentation'
import type {} from '@mui/x-data-grid/themeAugmentation'
import type {} from '@mui/x-date-pickers/themeAugmentation'
import type {} from '@mui/x-tree-view/themeAugmentation'
import { useAppTheme } from './theme/AppTheme'
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from './theme/customizations'
import Layout from '@/components/Layout'
import DashboardPage from '@/pages/DashboardPage'
import HomePage from '@/pages/HomePage'
import AnalyticsPage from '@/pages/AnalyticsPage'
import ClientsPage from '@/pages/ClientsPage'
import TasksPage from '@/pages/TasksPage'
import SettingsPage from '@/pages/SettingsPage'
import AboutPage from '@/pages/AboutPage'
import FeedbackPage from '@/pages/FeedbackPage'
import ProfilePage from '@/pages/ProfilePage'

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
}

interface AppProps {
  disableCustomTheme?: boolean
}

function App({ disableCustomTheme }: AppProps = {}) {
  const theme = useAppTheme({
    disableCustomTheme,
    themeComponents: xThemeComponents,
  })

  const content = (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="clients" element={<ClientsPage />} />
          <Route path="tasks" element={<TasksPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="feedback" element={<FeedbackPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )

  if (disableCustomTheme) {
    return content
  }

  return <ThemeProvider theme={theme}>{content}</ThemeProvider>
}

export default App
