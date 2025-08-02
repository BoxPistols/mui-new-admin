import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import FormRadioGroup from './FormRadioGroup';
import { Box, Stack, Paper, Typography } from '@mui/material'

const meta: Meta<typeof FormRadioGroup> = {
  title: 'Forms/RadioGroup',
  component: FormRadioGroup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'ラジオボタングループコンポーネント。単一選択のフォーム項目に使用します。',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    row: {
      control: 'boolean',
      description: '横並び表示するかどうか',
    },
    required: {
      control: 'boolean',
      description: '必須項目かどうか',
    },
    disabled: {
      control: 'boolean',
      description: '無効状態かどうか',
    },
    error: {
      control: 'boolean',
      description: 'エラー状態かどうか',
    },
    labelRequired: {
      control: 'boolean',
      description: 'ラベルに必須マーク（*）を表示するかどうか',
    },
  },
}

export default meta
type Story = StoryObj<typeof FormRadioGroup>

const genderOptions = [
  { value: 'male', label: '男性' },
  { value: 'female', label: '女性' },
  { value: 'other', label: 'その他' },
  { value: 'not_specified', label: '指定しない' },
]

const sizeOptions = [
  { value: 'xs', label: 'XS' },
  { value: 's', label: 'S' },
  { value: 'm', label: 'M' },
  { value: 'l', label: 'L' },
  { value: 'xl', label: 'XL' },
]

const priorityOptions = [
  { value: 'low', label: '低' },
  { value: 'medium', label: '中' },
  { value: 'high', label: '高' },
  { value: 'urgent', label: '緊急' },
]

const paymentOptions = [
  { value: 'credit', label: 'クレジットカード' },
  { value: 'bank', label: '銀行振込' },
  { value: 'cash', label: '現金' },
  { value: 'digital', label: '電子マネー', disabled: true },
]

// 基本的な使用例
export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('')
    
    return (
      <FormRadioGroup
        label="性別"
        value={value}
        options={genderOptions}
        onChange={setValue}
      />
    )
  },
}

// 必須項目
export const Required: Story = {
  render: () => {
    const [value, setValue] = useState('')
    
    return (
      <FormRadioGroup
        label="性別"
        value={value}
        options={genderOptions}
        onChange={setValue}
        required
        labelRequired
      />
    )
  },
}

// 横並び表示
export const Row: Story = {
  render: () => {
    const [value, setValue] = useState('')
    
    return (
      <FormRadioGroup
        label="サイズ"
        value={value}
        options={sizeOptions}
        onChange={setValue}
        row
      />
    )
  },
}

// エラー状態
export const WithError: Story = {
  render: () => {
    const [value, setValue] = useState('')
    
    return (
      <FormRadioGroup
        label="優先度"
        value={value}
        options={priorityOptions}
        onChange={setValue}
        error
        helperText="優先度を選択してください"
        required
        labelRequired
      />
    )
  },
}

// ヘルパーテキスト付き
export const WithHelperText: Story = {
  render: () => {
    const [value, setValue] = useState('')
    
    return (
      <FormRadioGroup
        label="お支払い方法"
        value={value}
        options={paymentOptions}
        onChange={setValue}
        helperText="ご希望のお支払い方法を選択してください"
      />
    )
  },
}

// 無効状態
export const Disabled: Story = {
  render: () => {
    return (
      <FormRadioGroup
        label="性別"
        value="male"
        options={genderOptions}
        disabled
      />
    )
  },
}

// 一部のオプションが無効
export const PartiallyDisabled: Story = {
  render: () => {
    const [value, setValue] = useState('')
    
    return (
      <FormRadioGroup
        label="お支払い方法"
        value={value}
        options={paymentOptions}
        onChange={setValue}
        helperText="電子マネーは現在ご利用いただけません"
      />
    )
  },
}

// 複数のラジオグループ
export const MultipleGroups: Story = {
  render: () => {
    const [gender, setGender] = useState('')
    const [size, setSize] = useState('')
    const [priority, setPriority] = useState('')
    
    return (
      <Stack spacing={4} sx={{ width: 400 }}>
        <FormRadioGroup
          label="性別"
          value={gender}
          options={genderOptions}
          onChange={setGender}
          required
          labelRequired
          row
        />
        
        <FormRadioGroup
          label="サイズ"
          value={size}
          options={sizeOptions}
          onChange={setSize}
          helperText="普段着用されているサイズを選択してください"
          row
        />
        
        <FormRadioGroup
          label="優先度"
          value={priority}
          options={priorityOptions}
          onChange={setPriority}
          required
          labelRequired
        />
      </Stack>
    )
  },
}

// フォーム例
export const FormExample: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      gender: '',
      size: '',
      payment: '',
      priority: '',
      notification: '',
    })

    const notificationOptions = [
      { value: 'email', label: 'メール通知' },
      { value: 'sms', label: 'SMS通知' },
      { value: 'push', label: 'プッシュ通知' },
      { value: 'none', label: '通知なし' },
    ]

    const handleChange = (field: string) => (value: string) => {
      setFormData(prev => ({
        ...prev,
        [field]: value,
      }))
    }

    return (
      <Box sx={{ width: 500, p: 3 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 3 }}>
            プロフィール設定
          </Typography>
          
          <Stack spacing={4}>
            <FormRadioGroup
              label="性別"
              value={formData.gender}
              options={genderOptions}
              onChange={handleChange('gender')}
              required
              labelRequired
              row
            />
            
            <FormRadioGroup
              label="サイズ"
              value={formData.size}
              options={sizeOptions}
              onChange={handleChange('size')}
              helperText="普段着用されているサイズを選択してください"
              row
            />
            
            <FormRadioGroup
              label="お支払い方法"
              value={formData.payment}
              options={paymentOptions}
              onChange={handleChange('payment')}
              required
              labelRequired
              helperText="電子マネーは現在準備中です"
            />
            
            <FormRadioGroup
              label="通知設定"
              value={formData.notification}
              options={notificationOptions}
              onChange={handleChange('notification')}
              helperText="お知らせの受信方法を選択してください"
            />
            
            <FormRadioGroup
              label="優先度"
              value={formData.priority}
              options={priorityOptions}
              onChange={handleChange('priority')}
              error={formData.priority === ''}
              helperText={formData.priority === '' ? '優先度を選択してください' : undefined}
              required
              labelRequired
            />
          </Stack>
        </Paper>
      </Box>
    )
  },
}
