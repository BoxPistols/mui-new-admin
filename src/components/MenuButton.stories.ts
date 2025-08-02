import type { Meta, StoryObj } from '@storybook/react'
import { MenuButton } from './MenuButton'
import DashboardIcon from '@mui/icons-material/Dashboard'
import AnalyticsIcon from '@mui/icons-material/Analytics'

const meta: Meta<typeof MenuButton> = {
  title: 'Components/MenuButton',
  component: MenuButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    showBadge: {
      control: 'boolean',
    },
    selected: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Dashboard: Story = {
  args: {
    children: 'Dashboard',
    startIcon: DashboardIcon,
    selected: true,
  },
}

export const Analytics: Story = {
  args: {
    children: 'Analytics',
    startIcon: AnalyticsIcon,
    selected: false,
  },
}

export const WithBadge: Story = {
  args: {
    children: 'Tasks',
    showBadge: true,
    selected: false,
  },
}