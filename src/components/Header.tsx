import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded'
import Stack from '@mui/material/Stack'
import ColorModeIconDropdown from '.././theme/ColorModeIconDropdown'
import CustomDatePicker from './CustomDatePicker'
import MenuButton from './MenuButton'
import NavbarBreadcrumbs from './NavbarBreadcrumbs'

import Search from './Search'

export default function Header() {
  return (
    <Stack
      direction="row"
      className="hidden md:flex w-full items-center justify-between max-w-full md:max-w-screen-2xl pt-1.5"
      spacing={2}
    >
      <NavbarBreadcrumbs />
      <Stack direction="row" sx={{ gap: 1 }}>
        <Search />
        <CustomDatePicker />
        <MenuButton showBadge aria-label="Open notifications">
          <NotificationsRoundedIcon />
        </MenuButton>
        <ColorModeIconDropdown />
      </Stack>
    </Stack>
  )
}
