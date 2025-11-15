import { NavLink, useLocation } from 'react-router-dom'
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded'
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded'
import HelpRoundedIcon from '@mui/icons-material/HelpRounded'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import InfoRoundedIcon from '@mui/icons-material/InfoRounded'
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded'
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded'
import WidgetsRoundedIcon from '@mui/icons-material/WidgetsRounded'
import ScienceRoundedIcon from '@mui/icons-material/ScienceRounded'
import PaletteRoundedIcon from '@mui/icons-material/PaletteRounded'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Stack from '@mui/material/Stack'

const mainListItems = [
  { text: 'Dashboard', icon: <DashboardRoundedIcon />, path: '/dashboard' },
  { text: 'Home', icon: <HomeRoundedIcon />, path: '/home' },
  { text: 'Analytics', icon: <AnalyticsRoundedIcon />, path: '/analytics' },
  { text: 'Clients', icon: <PeopleRoundedIcon />, path: '/clients' },
  { text: 'Tasks', icon: <AssignmentRoundedIcon />, path: '/tasks' },
  { text: 'Components', icon: <WidgetsRoundedIcon />, path: '/components' },
  { text: 'Playground', icon: <ScienceRoundedIcon />, path: '/playground' },
  { text: 'Theme Editor', icon: <PaletteRoundedIcon />, path: '/theme-editor' },
]

const secondaryListItems = [
  { text: 'Settings', icon: <SettingsRoundedIcon />, path: '/settings' },
  { text: 'About', icon: <InfoRoundedIcon />, path: '/about' },
  { text: 'Feedback', icon: <HelpRoundedIcon />, path: '/feedback' },
]

export default function MenuContent() {
  const location = useLocation()

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              component={NavLink}
              to={item.path}
              selected={location.pathname === item.path}
              sx={{
                '&.active': {
                  backgroundColor: 'action.selected',
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <List dense>
        {secondaryListItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              component={NavLink}
              to={item.path}
              selected={location.pathname === item.path}
              sx={{
                '&.active': {
                  backgroundColor: 'action.selected',
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  )
}
