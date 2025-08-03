import type { Meta, StoryObj } from '@storybook/react'
import Button from './Button'
import SaveIcon from '@mui/icons-material/Save'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['contained', 'outlined', 'text'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'error', 'warning', 'info', 'success'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    loading: {
      control: 'boolean',
    },
    loadingText: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
    fullWidth: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'contained',
    children: 'Primary Button',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'outlined',
    children: 'Secondary Button',
  },
}

export const Text: Story = {
  args: {
    variant: 'text',
    children: 'Text Button',
  },
}

export const Loading: Story = {
  args: {
    variant: 'contained',
    loading: true,
    children: 'Save Changes',
  },
}

export const LoadingWithCustomText: Story = {
  args: {
    variant: 'contained',
    loading: true,
    loadingText: 'Saving...',
    children: 'Save Changes',
  },
}

export const Disabled: Story = {
  args: {
    variant: 'contained',
    disabled: true,
    children: 'Disabled Button',
  },
}

export const WithIcon: Story = {
  args: {
    variant: 'contained',
    startIcon: <SaveIcon />,
    children: 'Save',
  },
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Button variant='contained' size='small'>
        Small
      </Button>
      <Button variant='contained' size='medium'>
        Medium
      </Button>
      <Button variant='contained' size='large'>
        Large
      </Button>
    </div>
  ),
}

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Button variant='contained'>Contained</Button>
      <Button variant='outlined'>Outlined</Button>
      <Button variant='text'>Text</Button>
    </div>
  ),
}

export const Colors: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '16px',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <Button variant='contained' color='primary'>
        Primary
      </Button>
      <Button variant='contained' color='secondary'>
        Secondary
      </Button>
      <Button variant='contained' color='error'>
        Error
      </Button>
      <Button variant='contained' color='warning'>
        Warning
      </Button>
      <Button variant='contained' color='info'>
        Info
      </Button>
      <Button variant='contained' color='success'>
        Success
      </Button>
    </div>
  ),
}

export const IconButtons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Button variant='contained' startIcon={<AddIcon />}>
        Add Item
      </Button>
      <Button variant='outlined' startIcon={<SaveIcon />}>
        Save
      </Button>
      <Button variant='text' startIcon={<DeleteIcon />} color='error'>
        Delete
      </Button>
    </div>
  ),
}

export const LoadingStates: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '16px',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <Button variant='contained' loading>
          Default Loading
        </Button>
        <Button variant='contained' loading loadingText='Saving...'>
          Custom Loading Text
        </Button>
      </div>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <Button variant='outlined' loading size='small'>
          Small Loading
        </Button>
        <Button variant='outlined' loading size='large'>
          Large Loading
        </Button>
      </div>
    </div>
  ),
}

export const FullWidth: Story = {
  render: () => (
    <div style={{ width: '300px' }}>
      <Button variant='contained' fullWidth>
        Full Width Button
      </Button>
    </div>
  ),
}
