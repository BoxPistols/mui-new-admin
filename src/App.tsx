import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@/contexts/ThemeContext'
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
import ComponentsPage from '@/pages/ComponentsPage'
import PlaygroundPage from '@/pages/PlaygroundPage'
import ThemeEditorPage from '@/pages/ThemeEditorPage'

function App() {
  return (
    <ThemeProvider>
      <CssBaseline enableColorScheme />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="home" element={<HomePage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="clients" element={<ClientsPage />} />
            <Route path="tasks" element={<TasksPage />} />
            <Route path="components" element={<ComponentsPage />} />
            <Route path="playground" element={<PlaygroundPage />} />
            <Route path="theme-editor" element={<ThemeEditorPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="feedback" element={<FeedbackPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
