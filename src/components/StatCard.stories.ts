import type { Meta, StoryObj } from '@storybook/react'
import { StatCard } from './StatCard'

const meta: Meta<typeof StatCard> = {
  title: 'Components/StatCard',
  component: StatCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
    },
    value: {
      control: 'text',
    },
    interval: {
      control: 'text',
    },
    trend: {
      control: 'select',
      options: ['up', 'down', 'neutral'],
    },
    data: {
      control: 'object',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Users',
    value: '14k',
    interval: 'Last 30 days',
    trend: 'up',
    data: [
      { month: 'Jan', users: 4000 },
      { month: 'Feb', users: 3000 },
      { month: 'Mar', users: 2000 },
      { month: 'Apr', users: 2780 },
      { month: 'May', users: 1890 },
      { month: 'Jun', users: 2390 },
    ],
  },
}

export const TrendDown: Story = {
  args: {
    title: 'Revenue',
    value: '$32.4k',
    interval: 'Last 30 days',
    trend: 'down',
    data: [
      { month: 'Jan', users: 2390 },
      { month: 'Feb', users: 1890 },
      { month: 'Mar', users: 2780 },
      { month: 'Apr', users: 2000 },
      { month: 'May', users: 3000 },
      { month: 'Jun', users: 4000 },
    ],
  },
}

export const TrendNeutral: Story = {
  args: {
    title: 'Sessions',
    value: '8.2k',
    interval: 'Last 30 days',
    trend: 'neutral',
    data: [
      { month: 'Jan', users: 2000 },
      { month: 'Feb', users: 2000 },
      { month: 'Mar', users: 2000 },
      { month: 'Apr', users: 2000 },
      { month: 'May', users: 2000 },
      { month: 'Jun', users: 2000 },
    ],
  },
}