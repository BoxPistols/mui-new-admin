import type { Meta, StoryObj } from '@storybook/react'import type { Meta, StoryObj } from '@storybook/react';

import { useState } from 'react'import FormCheckboxGroup from './FormCheckboxGroup';

import FormCheckboxGroup from './FormCheckboxGroup'

import { Box, Stack, Paper, Typography } from '@mui/material'const meta: Meta<typeof FormCheckboxGroup> = {

  title: 'Forms/CheckboxGroup',

const meta: Meta<typeof FormCheckboxGroup> = {  component: FormCheckboxGroup,

  title: 'Forms/CheckboxGroup',};

  component: FormCheckboxGroup,

  parameters: {export default meta;

    layout: 'centered',

    docs: {type Story = StoryObj<typeof FormCheckboxGroup>;

      description: {

        component: 'チェックボックスグループコンポーネント。複数選択のフォーム項目に使用します。',export const Default: Story = {

      },  args: {

    },    label: 'Interests',

  },    options: [

  tags: ['autodocs'],      { value: 'react', label: 'React' },

  argTypes: {      { value: 'vue', label: 'Vue' },

    row: {      { value: 'angular', label: 'Angular' },

      control: 'boolean',    ],

      description: '横並び表示するかどうか',  },

    },};

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
type Story = StoryObj<typeof FormCheckboxGroup>

const interestOptions = [
  { value: 'sports', label: 'スポーツ' },
  { value: 'music', label: '音楽' },
  { value: 'movies', label: '映画' },
  { value: 'books', label: '読書' },
  { value: 'travel', label: '旅行' },
  { value: 'cooking', label: '料理' },
]

const skillOptions = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue.js' },
  { value: 'angular', label: 'Angular' },
  { value: 'node', label: 'Node.js' },
]

const notificationOptions = [
  { value: 'email', label: 'メール通知' },
  { value: 'sms', label: 'SMS通知' },
  { value: 'push', label: 'プッシュ通知' },
  { value: 'newsletter', label: 'ニュースレター' },
  { value: 'marketing', label: 'マーケティング情報', disabled: true },
]

const permissionOptions = [
  { value: 'read', label: '閲覧' },
  { value: 'write', label: '編集' },
  { value: 'delete', label: '削除' },
  { value: 'admin', label: '管理者権限' },
]

// 基本的な使用例
export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([])
    
    return (
      <FormCheckboxGroup
        label="興味のある分野"
        value={value}
        options={interestOptions}
        onChange={setValue}
      />
    )
  },
}

// 必須項目
export const Required: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([])
    
    return (
      <FormCheckboxGroup
        label="スキル"
        value={value}
        options={skillOptions}
        onChange={setValue}
        required
        labelRequired
        helperText="少なくとも1つ選択してください"
      />
    )
  },
}

// 横並び表示
export const Row: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(['read'])
    
    return (
      <FormCheckboxGroup
        label="権限"
        value={value}
        options={permissionOptions}
        onChange={setValue}
        row
      />
    )
  },
}

// エラー状態
export const WithError: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([])
    
    return (
      <FormCheckboxGroup
        label="スキル"
        value={value}
        options={skillOptions}
        onChange={setValue}
        error
        helperText="少なくとも1つのスキルを選択してください"
        required
        labelRequired
      />
    )
  },
}

// ヘルパーテキスト付き
export const WithHelperText: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(['email'])
    
    return (
      <FormCheckboxGroup
        label="通知設定"
        value={value}
        options={notificationOptions}
        onChange={setValue}
        helperText="受信したい通知を選択してください（複数選択可）"
      />
    )
  },
}

// 無効状態
export const Disabled: Story = {
  render: () => {
    return (
      <FormCheckboxGroup
        label="興味のある分野"
        value={['sports', 'music']}
        options={interestOptions}
        disabled
      />
    )
  },
}

// 一部のオプションが無効
export const PartiallyDisabled: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(['email'])
    
    return (
      <FormCheckboxGroup
        label="通知設定"
        value={value}
        options={notificationOptions}
        onChange={setValue}
        helperText="マーケティング情報は現在準備中です"
      />
    )
  },
}

// 初期値あり
export const WithInitialValues: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(['javascript', 'react', 'typescript'])
    
    return (
      <FormCheckboxGroup
        label="技術スタック"
        value={value}
        options={skillOptions}
        onChange={setValue}
        helperText="現在使用している技術を選択してください"
      />
    )
  },
}

// 複数のチェックボックスグループ
export const MultipleGroups: Story = {
  render: () => {
    const [interests, setInterests] = useState<string[]>([])
    const [skills, setSkills] = useState<string[]>([])
    const [notifications, setNotifications] = useState<string[]>(['email'])
    
    return (
      <Stack spacing={4} sx={{ width: 400 }}>
        <FormCheckboxGroup
          label="興味のある分野"
          value={interests}
          options={interestOptions}
          onChange={setInterests}
          helperText="複数選択可能です"
          row
        />
        
        <FormCheckboxGroup
          label="技術スキル"
          value={skills}
          options={skillOptions}
          onChange={setSkills}
          required
          labelRequired
          error={skills.length === 0}
          helperText={skills.length === 0 ? '少なくとも1つ選択してください' : '使用可能な技術を選択してください'}
        />
        
        <FormCheckboxGroup
          label="通知設定"
          value={notifications}
          options={notificationOptions}
          onChange={setNotifications}
        />
      </Stack>
    )
  },
}

// フォーム例
export const FormExample: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      interests: [] as string[],
      skills: [] as string[],
      notifications: ['email'] as string[],
      permissions: ['read'] as string[],
    })

    const handleChange = (field: string) => (value: string[]) => {
      setFormData(prev => ({
        ...prev,
        [field]: value,
      }))
    }

    const hasErrors = {
      skills: formData.skills.length === 0,
    }

    return (
      <Box sx={{ width: 600, p: 3 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 3 }}>
            プロフィール詳細
          </Typography>
          
          <Stack spacing={4}>
            <FormCheckboxGroup
              label="興味のある分野"
              value={formData.interests}
              options={interestOptions}
              onChange={handleChange('interests')}
              helperText="趣味や興味のある分野を選択してください（任意）"
              row
            />
            
            <FormCheckboxGroup
              label="技術スキル"
              value={formData.skills}
              options={skillOptions}
              onChange={handleChange('skills')}
              required
              labelRequired
              error={hasErrors.skills}
              helperText={hasErrors.skills ? '少なくとも1つのスキルを選択してください' : 'あなたの技術スキルを選択してください'}
            />
            
            <FormCheckboxGroup
              label="通知設定"
              value={formData.notifications}
              options={notificationOptions}
              onChange={handleChange('notifications')}
              helperText="受信したい通知の種類を選択してください"
            />
            
            <FormCheckboxGroup
              label="権限設定"
              value={formData.permissions}
              options={permissionOptions}
              onChange={handleChange('permissions')}
              required
              labelRequired
              row
              helperText="必要な権限を選択してください"
            />
          </Stack>
          
          <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              選択内容:
            </Typography>
            <Typography variant="body2">
              興味分野: {formData.interests.length > 0 ? formData.interests.join(', ') : 'なし'}
            </Typography>
            <Typography variant="body2">
              スキル: {formData.skills.length > 0 ? formData.skills.join(', ') : 'なし'}
            </Typography>
            <Typography variant="body2">
              通知: {formData.notifications.length > 0 ? formData.notifications.join(', ') : 'なし'}
            </Typography>
            <Typography variant="body2">
              権限: {formData.permissions.length > 0 ? formData.permissions.join(', ') : 'なし'}
            </Typography>
          </Box>
        </Paper>
      </Box>
    )
  },
}
