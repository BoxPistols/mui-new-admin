import type { Meta, StoryObj } from '@storybook/react'
import { HighlightedCard } from './HighlightedCard'

const meta: Meta<typeof HighlightedCard> = {
  title: 'Components/HighlightedCard',
  component: HighlightedCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}