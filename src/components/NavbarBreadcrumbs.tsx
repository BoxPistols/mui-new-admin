import { Link, useLocation } from 'react-router-dom'
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded'
import Breadcrumbs, { breadcrumbsClasses } from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'
import MuiLink from '@mui/material/Link'
import { styled } from '@mui/material/styles'

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  [`& .${breadcrumbsClasses.separator}`]: {
    color: (theme.vars || theme).palette.action.disabled,
    margin: 1,
  },
  [`& .${breadcrumbsClasses.ol}`]: {
    alignItems: 'center',
  },
}))

// Map of paths to display names
const pathNameMap: Record<string, string> = {
  dashboard: 'Dashboard',
  home: 'Home',
  analytics: 'Analytics',
  clients: 'Clients',
  tasks: 'Tasks',
  components: 'Components',
  playground: 'Playground',
  'theme-editor': 'Theme Editor',
  settings: 'Settings',
  about: 'About',
  feedback: 'Feedback',
  profile: 'Profile',
}

export default function NavbarBreadcrumbs() {
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter((x) => x)

  return (
    <StyledBreadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextRoundedIcon fontSize="small" />}
    >
      {pathnames.length > 0 && (
        <MuiLink component={Link} to="/" underline="hover" color="inherit">
          <Typography variant="body1">Home</Typography>
        </MuiLink>
      )}
      {pathnames.map((pathname, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`
        const isLast = index === pathnames.length - 1
        const displayName = pathNameMap[pathname] || pathname.charAt(0).toUpperCase() + pathname.slice(1)

        return isLast ? (
          <Typography
            key={pathname}
            variant="body1"
            sx={{ color: 'text.primary', fontWeight: 600 }}
          >
            {displayName}
          </Typography>
        ) : (
          <MuiLink
            key={pathname}
            component={Link}
            to={routeTo}
            underline="hover"
            color="inherit"
          >
            <Typography variant="body1">{displayName}</Typography>
          </MuiLink>
        )
      })}
    </StyledBreadcrumbs>
  )
}
