import { useNavigate } from 'react-router-dom'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded'
import Divider, { dividerClasses } from '@mui/material/Divider'
import { listClasses } from '@mui/material/List'
import ListItemIcon, { listItemIconClasses } from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Menu from '@mui/material/Menu'
import MuiMenuItem from '@mui/material/MenuItem'
import { paperClasses } from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import * as React from 'react'
import MenuButton from './MenuButton'

const MenuItem = styled(MuiMenuItem)({
  margin: '2px 0',
})

export default function OptionsMenu() {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleNavigate = (path: string) => {
    handleClose()
    navigate(path)
  }

  const handleLogout = () => {
    handleClose()
    // TODO: Implement logout logic
    console.log('Logout clicked')
  }

  return (
    <React.Fragment>
      <MenuButton
        aria-label="Open menu"
        onClick={handleClick}
        sx={{ borderColor: 'transparent' }}
      >
        <MoreVertRoundedIcon />
      </MenuButton>
      <Menu
        anchorEl={anchorEl}
        id="menu"
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        sx={{
          [`& .${listClasses.root}`]: {
            padding: '4px',
          },
          [`& .${paperClasses.root}`]: {
            padding: 0,
          },
          [`& .${dividerClasses.root}`]: {
            margin: '4px -4px',
          },
        }}
      >
        <MenuItem onClick={() => handleNavigate('/profile')}>Profile</MenuItem>
        <MenuItem onClick={() => handleNavigate('/profile')}>My account</MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>Add another account</MenuItem>
        <MenuItem onClick={() => handleNavigate('/settings')}>Settings</MenuItem>
        <Divider />
        <MenuItem
          onClick={handleLogout}
          sx={{
            [`& .${listItemIconClasses.root}`]: {
              ml: 'auto',
              minWidth: 0,
            },
          }}
        >
          <ListItemText>Logout</ListItemText>
          <ListItemIcon>
            <LogoutRoundedIcon fontSize="small" />
          </ListItemIcon>
        </MenuItem>
      </Menu>
    </React.Fragment>
  )
}
