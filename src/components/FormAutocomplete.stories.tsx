import { Box, Paper, Stack, Typography } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import FormAutocomplete, { type AutocompleteOption } from './FormAutocomplete'

const meta: Meta<typeof FormAutocomplete> = {
  title: 'Forms/Autocomplete',
  component: FormAutocomplete,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'オートコンプリートコンポーネント。検索機能付きの選択肢から選択に使用します。',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof FormAutocomplete>

// 国・地域のオプション
const countryOptions: AutocompleteOption[] = [
  { label: '日本', value: 'jp' },
  { label: 'アメリカ合衆国', value: 'us' },
  { label: 'イギリス', value: 'uk' },
  { label: 'ドイツ', value: 'de' },
  { label: 'フランス', value: 'fr' },
  { label: '中国', value: 'cn' },
  { label: '韓国', value: 'kr' },
  { label: 'カナダ', value: 'ca' },
  { label: 'オーストラリア', value: 'au' },
  { label: 'ブラジル', value: 'br' },
]

// 基本的な使用例
export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<AutocompleteOption | null>(null)

    return (
      <FormAutocomplete
        label="国・地域"
        options={countryOptions}
        value={value}
        onChange={(_, newValue) =>
          setValue(newValue as AutocompleteOption | null)
        }
        placeholder="国・地域を選択してください"
      />
    )
  },
}

// 複数選択
export const Multiple: Story = {
  render: () => {
    const [value, setValue] = useState<AutocompleteOption[]>([])

    return (
      <FormAutocomplete
        label="タグ"
        options={countryOptions}
        value={value}
        onChange={(_, newValue) => setValue(newValue as AutocompleteOption[])}
        multiple
        placeholder="複数のタグを選択してください"
      />
    )
  },
}

// 自由入力
export const FreeSolo: Story = {
  render: () => {
    const [value, setValue] = useState<string>('')

    return (
      <FormAutocomplete
        label="自由入力"
        options={countryOptions}
        value={value}
        onChange={(_, newValue) => setValue(newValue as string)}
        freeSolo
        placeholder="選択または自由入力してください"
      />
    )
  },
}

// エラー状態
export const WithError: Story = {
  render: () => {
    const [value, setValue] = useState<AutocompleteOption | null>(null)

    return (
      <FormAutocomplete
        label="国・地域"
        options={countryOptions}
        value={value}
        onChange={(_, newValue) =>
          setValue(newValue as AutocompleteOption | null)
        }
        error
        required
        labelRequired
        placeholder="国・地域を選択してください"
        helperText="この項目は必須です"
      />
    )
  },
}

// 読み込み中状態
export const Loading: Story = {
  render: () => {
    const [value, setValue] = useState<AutocompleteOption | null>(null)

    return (
      <FormAutocomplete
        label="国・地域"
        options={[]}
        value={value}
        onChange={(_, newValue) =>
          setValue(newValue as AutocompleteOption | null)
        }
        loading
        loadingText="読み込み中..."
        placeholder="国・地域を選択してください"
      />
    )
  },
}

// 無効状態
export const Disabled: Story = {
  render: () => (
    <FormAutocomplete
      label="国・地域"
      options={countryOptions}
      value={countryOptions[0]}
      disabled
      placeholder="国・地域を選択してください"
    />
  ),
}

// 全パターンの比較
export const AllVariants: Story = {
  render: () => (
    <Paper elevation={1} sx={{ p: 3, maxWidth: 800 }}>
      <Typography variant="h6" gutterBottom>
        FormAutocomplete - 全パターン
      </Typography>
      <Stack spacing={3}>
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            基本
          </Typography>
          <FormAutocomplete
            label="国・地域"
            options={countryOptions.slice(0, 5)}
            placeholder="選択してください"
          />
        </Box>

        <Box>
          <Typography variant="subtitle2" gutterBottom>
            必須項目
          </Typography>
          <FormAutocomplete
            label="必須項目"
            options={countryOptions.slice(0, 5)}
            required
            labelRequired
            placeholder="必須項目です"
            helperText="この項目は必須です"
          />
        </Box>

        <Box>
          <Typography variant="subtitle2" gutterBottom>
            複数選択
          </Typography>
          <FormAutocomplete
            label="複数選択"
            options={countryOptions.slice(0, 5)}
            multiple
            placeholder="複数選択可能"
          />
        </Box>

        <Box>
          <Typography variant="subtitle2" gutterBottom>
            自由入力
          </Typography>
          <FormAutocomplete
            label="自由入力"
            options={countryOptions.slice(0, 5)}
            freeSolo
            placeholder="選択または自由入力"
          />
        </Box>

        <Box>
          <Typography variant="subtitle2" gutterBottom>
            エラー状態
          </Typography>
          <FormAutocomplete
            label="エラー状態"
            options={countryOptions.slice(0, 5)}
            error
            helperText="エラーが発生しました"
            placeholder="エラー状態"
          />
        </Box>

        <Box>
          <Typography variant="subtitle2" gutterBottom>
            無効状態
          </Typography>
          <FormAutocomplete
            label="無効状態"
            options={countryOptions.slice(0, 5)}
            disabled
            placeholder="無効状態"
          />
        </Box>

        <Box>
          <Typography variant="subtitle2" gutterBottom>
            読み込み中
          </Typography>
          <FormAutocomplete
            label="読み込み中"
            options={[]}
            loading
            loadingText="読み込み中..."
            placeholder="読み込み中"
          />
        </Box>
      </Stack>
    </Paper>
  ),
}
