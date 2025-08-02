import type { Meta, StoryObj } from '@storybook/react'import type { Meta, StoryObj } from '@storybook/react';

import { useState } from 'react'import FormSelect from './FormSelect';

import FormSelect from './FormSelect'

import { Box, Stack, Paper, Typography } from '@mui/material'const meta: Meta<typeof FormSelect> = {

  title: 'Forms/Select',

const meta: Meta<typeof FormSelect> = {  component: FormSelect,

  title: 'Forms/Select',};

  component: FormSelect,

  parameters: {export default meta;

    layout: 'centered',

    docs: {type Story = StoryObj<typeof FormSelect>;

      description: {

        component: 'セレクトボックスコンポーネント。ドロップダウンからの選択に使用します。',export const Default: Story = {

      },  args: {

    },    label: 'Country',

  },    options: [

  tags: ['autodocs'],      { value: 'us', label: 'United States' },

  argTypes: {      { value: 'ca', label: 'Canada' },

    variant: {      { value: 'mx', label: 'Mexico' },

      control: 'select',    ],

      options: ['outlined', 'filled', 'standard'],  },

      description: 'セレクトボックスのスタイル',};

    },
    size: {
      control: 'select',
      options: ['small', 'medium'],
      description: 'セレクトボックスのサイズ',
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
    multiple: {
      control: 'boolean',
      description: '複数選択可能かどうか',
    },
    labelRequired: {
      control: 'boolean',
      description: 'ラベルに必須マーク（*）を表示するかどうか',
    },
    displayEmpty: {
      control: 'boolean',
      description: '空の選択肢を表示するかどうか',
    },
  },
}

export default meta
type Story = StoryObj<typeof FormSelect>

const countryOptions = [
  { value: 'jp', label: '日本' },
  { value: 'us', label: 'アメリカ' },
  { value: 'uk', label: 'イギリス' },
  { value: 'de', label: 'ドイツ' },
  { value: 'fr', label: 'フランス' },
  { value: 'kr', label: '韓国' },
  { value: 'cn', label: '中国' },
]

const ageOptions = [
  { value: '10s', label: '10代' },
  { value: '20s', label: '20代' },
  { value: '30s', label: '30代' },
  { value: '40s', label: '40代' },
  { value: '50s', label: '50代' },
  { value: '60s', label: '60代以上' },
]

const priorityOptions = [
  { value: 1, label: '低' },
  { value: 2, label: '中' },
  { value: 3, label: '高' },
  { value: 4, label: '緊急' },
]

const categoryOptions = [
  { value: 'general', label: '一般' },
  { value: 'technical', label: '技術' },
  { value: 'billing', label: '請求' },
  { value: 'support', label: 'サポート' },
  { value: 'feedback', label: 'フィードバック', disabled: true },
]

const skillOptions = [
  { value: 'frontend', label: 'フロントエンド' },
  { value: 'backend', label: 'バックエンド' },
  { value: 'mobile', label: 'モバイル' },
  { value: 'devops', label: 'DevOps' },
  { value: 'design', label: 'デザイン' },
  { value: 'qa', label: 'QA' },
]

// 基本的な使用例
export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('')
    
    return (
      <FormSelect
        label="国・地域"
        value={value}
        options={countryOptions}
        onChange={setValue}
        placeholder="国・地域を選択してください"
      />
    )
  },
}

// 必須項目
export const Required: Story = {
  render: () => {
    const [value, setValue] = useState('')
    
    return (
      <FormSelect
        label="年代"
        value={value}
        options={ageOptions}
        onChange={setValue}
        required
        labelRequired
        placeholder="年代を選択してください"
      />
    )
  },
}

// 数値型の値
export const NumberValue: Story = {
  render: () => {
    const [value, setValue] = useState<string | number>('')
    
    return (
      <FormSelect
        label="優先度"
        value={value}
        options={priorityOptions}
        onChange={setValue}
        placeholder="優先度を選択してください"
      />
    )
  },
}

// エラー状態
export const WithError: Story = {
  render: () => {
    const [value, setValue] = useState('')
    
    return (
      <FormSelect
        label="カテゴリ"
        value={value}
        options={categoryOptions}
        onChange={setValue}
        error
        helperText="カテゴリを選択してください"
        required
        labelRequired
      />
    )
  },
}

// ヘルパーテキスト付き
export const WithHelperText: Story = {
  render: () => {
    const [value, setValue] = useState('jp')
    
    return (
      <FormSelect
        label="配送先の国・地域"
        value={value}
        options={countryOptions}
        onChange={setValue}
        helperText="商品の配送先を選択してください"
      />
    )
  },
}

// 無効状態
export const Disabled: Story = {
  render: () => {
    return (
      <FormSelect
        label="国・地域"
        value="jp"
        options={countryOptions}
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
      <FormSelect
        label="お問い合わせ種別"
        value={value}
        options={categoryOptions}
        onChange={setValue}
        helperText="フィードバックは現在受付停止中です"
        placeholder="種別を選択してください"
      />
    )
  },
}

// 複数選択
export const Multiple: Story = {
  render: () => {
    const [value, setValue] = useState<string | number>([])
    
    return (
      <FormSelect
        label="スキル"
        value={value}
        options={skillOptions}
        onChange={setValue}
        multiple
        helperText="複数選択可能です"
      />
    )
  },
}

// バリアント比較
export const Variants: Story = {
  render: () => {
    const [outlined, setOutlined] = useState('')
    const [filled, setFilled] = useState('')
    const [standard, setStandard] = useState('')
    
    return (
      <Stack spacing={3} sx={{ width: 300 }}>
        <FormSelect
          label="Outlined（推奨）"
          variant="outlined"
          value={outlined}
          options={countryOptions}
          onChange={setOutlined}
          placeholder="選択してください"
        />
        <FormSelect
          label="Filled"
          variant="filled"
          value={filled}
          options={countryOptions}
          onChange={setFilled}
          placeholder="選択してください"
        />
        <FormSelect
          label="Standard"
          variant="standard"
          value={standard}
          options={countryOptions}
          onChange={setStandard}
          placeholder="選択してください"
        />
      </Stack>
    )
  },
}

// サイズ比較
export const Sizes: Story = {
  render: () => {
    const [small, setSmall] = useState('')
    const [medium, setMedium] = useState('')
    
    return (
      <Stack spacing={3} sx={{ width: 300 }}>
        <FormSelect
          label="Small"
          size="small"
          value={small}
          options={countryOptions}
          onChange={setSmall}
          placeholder="Small size"
        />
        <FormSelect
          label="Medium"
          size="medium"
          value={medium}
          options={countryOptions}
          onChange={setMedium}
          placeholder="Medium size"
        />
      </Stack>
    )
  },
}

// 複数のセレクトボックス
export const MultipleSelects: Story = {
  render: () => {
    const [country, setCountry] = useState('')
    const [age, setAge] = useState('')
    const [priority, setPriority] = useState<string | number>('')
    const [skills, setSkills] = useState<string | number>([])
    
    return (
      <Stack spacing={3} sx={{ width: 400 }}>
        <FormSelect
          label="国・地域"
          value={country}
          options={countryOptions}
          onChange={setCountry}
          required
          labelRequired
          placeholder="国・地域を選択"
        />
        
        <FormSelect
          label="年代"
          value={age}
          options={ageOptions}
          onChange={setAge}
          helperText="お客様の年代を選択してください"
        />
        
        <FormSelect
          label="優先度"
          value={priority}
          options={priorityOptions}
          onChange={setPriority}
          required
          labelRequired
          error={priority === ''}
          helperText={priority === '' ? '優先度を選択してください' : undefined}
        />
        
        <FormSelect
          label="スキル（複数選択可）"
          value={skills}
          options={skillOptions}
          onChange={setSkills}
          multiple
          helperText="お持ちのスキルを選択してください"
        />
      </Stack>
    )
  },
}

// フォーム例
export const FormExample: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      country: '',
      age: '',
      category: '',
      priority: '' as string | number,
      skills: [] as string | number,
    })

    const handleChange = (field: string) => (value: string | number) => {
      setFormData(prev => ({
        ...prev,
        [field]: value,
      }))
    }

    const hasErrors = {
      country: formData.country === '',
      category: formData.category === '',
      priority: formData.priority === '',
    }

    return (
      <Box sx={{ width: 500, p: 3 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 3 }}>
            ユーザー情報登録
          </Typography>
          
          <Stack spacing={3}>
            <FormSelect
              label="国・地域"
              value={formData.country}
              options={countryOptions}
              onChange={handleChange('country')}
              required
              labelRequired
              error={hasErrors.country}
              helperText={hasErrors.country ? '国・地域を選択してください' : 'お住まいの国・地域を選択してください'}
              placeholder="国・地域を選択"
            />
            
            <FormSelect
              label="年代"
              value={formData.age}
              options={ageOptions}
              onChange={handleChange('age')}
              helperText="年代をお選びください（任意）"
              placeholder="年代を選択"
            />
            
            <FormSelect
              label="お問い合わせ種別"
              value={formData.category}
              options={categoryOptions}
              onChange={handleChange('category')}
              required
              labelRequired
              error={hasErrors.category}
              helperText={hasErrors.category ? 'お問い合わせ種別を選択してください' : 'フィードバックは現在受付停止中です'}
              placeholder="種別を選択"
            />
            
            <FormSelect
              label="優先度"
              value={formData.priority}
              options={priorityOptions}
              onChange={handleChange('priority')}
              required
              labelRequired
              error={hasErrors.priority}
              helperText={hasErrors.priority ? '優先度を選択してください' : 'お問い合わせの優先度を選択してください'}
              placeholder="優先度を選択"
            />
            
            <FormSelect
              label="関連スキル"
              value={formData.skills}
              options={skillOptions}
              onChange={handleChange('skills')}
              multiple
              helperText="お問い合わせに関連するスキルを選択してください（複数選択可、任意）"
            />
          </Stack>
          
          <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              入力内容:
            </Typography>
            <Typography variant="body2">
              国・地域: {formData.country || '未選択'}
            </Typography>
            <Typography variant="body2">
              年代: {formData.age || '未選択'}
            </Typography>
            <Typography variant="body2">
              種別: {formData.category || '未選択'}
            </Typography>
            <Typography variant="body2">
              優先度: {formData.priority || '未選択'}
            </Typography>
            <Typography variant="body2">
              スキル: {Array.isArray(formData.skills) && formData.skills.length > 0 ? formData.skills.join(', ') : '未選択'}
            </Typography>
          </Box>
        </Paper>
      </Box>
    )
  },
}
