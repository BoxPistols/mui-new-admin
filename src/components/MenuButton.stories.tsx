import type { Meta, StoryObj } from '@storybook/react'

import MenuButton from './MenuButton'
import NotificationsIcon from '@mui/icons-material/Notifications'
import MenuIcon from '@mui/icons-material/Menu'
import MoreVertIcon from '@mui/icons-material/MoreVert'

const meta: Meta<typeof MenuButton> = {
  title: 'Components/Buttons/MenuButton',
  component: MenuButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'バッジ機能付きのアイコンボタンコンポーネント。通知、メニュー、アクションボタンに使用されます。'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    showBadge: {
      control: 'boolean',
      description: 'バッジ（赤いドット）の表示/非表示を制御'
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    showBadge: false,
  },
  render: (args) => (
    <MenuButton {...args}>
      <NotificationsIcon />
    </MenuButton>
  ),
}

export const WithBadge: Story = {
  args: {
    showBadge: true,
  },
  render: (args) => (
    <MenuButton {...args}>
      <NotificationsIcon />
    </MenuButton>
  ),
}

export const MenuIconExample: Story = {
  args: {
    showBadge: false,
  },
  render: (args) => (
    <MenuButton {...args}>
      <MenuIcon />
    </MenuButton>
  ),
}

export const OptionsMenu: Story = {
  args: {
    showBadge: false,
  },
  render: (args) => (
    <MenuButton {...args}>
      <MoreVertIcon />
    </MenuButton>
  ),
}