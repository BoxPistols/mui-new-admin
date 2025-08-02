import type { Meta, StoryObj } from '@storybook/react'
import TextField from '@mui/material/TextField'

/**
 * MUI の `TextField` コンポーネントに対する Storybook 用の Story 定義。
 * `argTypes` で主要なプロパティに対するコントロールを提供し、
 * サンプルとして複数のユースケースを用意しています。
 */
const meta = {
  title: 'Form/TextField',
  component: TextField,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '入力フィールドの基本コンポーネント。\nMUI が提供する `TextField` をそのまま使用しています。',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['outlined', 'filled', 'standard'],
    },
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number'],
    },
    disabled: {
      control: 'boolean',
    },
    multiline: {
      control: 'boolean',
    },
    rows: {
      control: { type: 'number', min: 1, max: 10, step: 1 },
    },
    label: {
      control: 'text',
    },
    helperText: {
      control: 'text',
    },
    fullWidth: {
      control: 'boolean',
    },
  },
  args: {
    label: 'テキスト',
    variant: 'outlined',
    fullWidth: true,
  },
} satisfies Meta<typeof TextField>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Password: Story = {
  args: {
    type: 'password',
    label: 'パスワード',
  },
}

export const Multiline: Story = {
  args: {
    multiline: true,
    rows: 4,
    label: '詳細',
  },
}
