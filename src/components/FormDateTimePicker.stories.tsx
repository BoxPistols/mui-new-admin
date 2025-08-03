import { Box, Paper, Stack, Typography } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react'
import dayjs, { type Dayjs } from 'dayjs'
import { useState } from 'react'
import {
  FormDatePicker,
  FormDateTimePicker,
  FormTimePicker,
} from './FormDateTimePicker'

const meta: Meta<typeof FormDatePicker> = {
  title: 'Forms/DateTimePicker',
  component: FormDatePicker,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '日付・時刻ピッカーコンポーネント。日付のみ、時刻のみ、日時の選択に使用します。',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['outlined', 'filled', 'standard'],
      description: 'テキストフィールドのスタイル',
    },
    size: {
      control: 'select',
      options: ['small', 'medium'],
      description: 'テキストフィールドのサイズ',
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
    fullWidth: {
      control: 'boolean',
      description: '幅いっぱいに表示するかどうか',
    },
  },
}

export default meta
type Story = StoryObj<typeof FormDatePicker>

// 日付ピッカー - 基本
export const DatePickerDefault: Story = {
  render: () => {
    const [value, setValue] = useState<Dayjs | null>(null)

    return <FormDatePicker label="日付" value={value} onChange={setValue} />
  },
}

// 日付ピッカー - 必須項目
export const DatePickerRequired: Story = {
  render: () => {
    const [value, setValue] = useState<Dayjs | null>(null)

    return (
      <FormDatePicker
        label="生年月日"
        value={value}
        onChange={setValue}
        required
        labelRequired
        helperText="生年月日を選択してください"
      />
    )
  },
}

// 日付ピッカー - エラー状態
export const DatePickerWithError: Story = {
  render: () => {
    const [value, setValue] = useState<Dayjs | null>(null)

    return (
      <FormDatePicker
        label="開始日"
        value={value}
        onChange={setValue}
        error
        helperText="開始日を選択してください"
        required
        labelRequired
      />
    )
  },
}

// 日付ピッカー - 制限付き
export const DatePickerWithConstraints: Story = {
  render: () => {
    const [value, setValue] = useState<Dayjs | null>(dayjs())

    return (
      <Stack spacing={3} sx={{ width: 300 }}>
        <FormDatePicker
          label="今日以降の日付"
          value={value}
          onChange={setValue}
          minDate={dayjs()}
          helperText="今日以降の日付を選択してください"
        />

        <FormDatePicker
          label="過去の日付のみ"
          value={value}
          onChange={setValue}
          maxDate={dayjs()}
          helperText="過去の日付を選択してください"
        />

        <FormDatePicker
          label="今年内の日付"
          value={value}
          onChange={setValue}
          minDate={dayjs().startOf('year')}
          maxDate={dayjs().endOf('year')}
          helperText="今年内の日付を選択してください"
        />
      </Stack>
    )
  },
}

// 時刻ピッカー - 基本
export const TimePickerDefault: Story = {
  render: () => {
    const [value, setValue] = useState<Dayjs | null>(null)

    return <FormTimePicker label="時刻" value={value} onChange={setValue} />
  },
}

// 時刻ピッカー - 必須項目
export const TimePickerRequired: Story = {
  render: () => {
    const [value, setValue] = useState<Dayjs | null>(null)

    return (
      <FormTimePicker
        label="開始時刻"
        value={value}
        onChange={setValue}
        required
        labelRequired
        helperText="開始時刻を選択してください"
      />
    )
  },
}

// 時刻ピッカー - 制限付き
export const TimePickerWithConstraints: Story = {
  render: () => {
    const [value, setValue] = useState<Dayjs | null>(null)

    return (
      <Stack spacing={3} sx={{ width: 300 }}>
        <FormTimePicker
          label="営業時間内"
          value={value}
          onChange={setValue}
          minTime={dayjs().hour(9).minute(0)}
          maxTime={dayjs().hour(18).minute(0)}
          helperText="営業時間は9:00〜18:00です"
        />

        <FormTimePicker
          label="30分刻み"
          value={value}
          onChange={setValue}
          minutesStep={30}
          helperText="30分刻みで選択してください"
        />
      </Stack>
    )
  },
}

// 日時ピッカー - 基本
export const DateTimePickerDefault: Story = {
  render: () => {
    const [value, setValue] = useState<Dayjs | null>(null)

    return <FormDateTimePicker label="日時" value={value} onChange={setValue} />
  },
}

// 日時ピッカー - 必須項目
export const DateTimePickerRequired: Story = {
  render: () => {
    const [value, setValue] = useState<Dayjs | null>(null)

    return (
      <FormDateTimePicker
        label="予約日時"
        value={value}
        onChange={setValue}
        required
        labelRequired
        helperText="予約日時を選択してください"
      />
    )
  },
}

// 無効状態
export const Disabled: Story = {
  render: () => {
    return (
      <Stack spacing={3} sx={{ width: 300 }}>
        <FormDatePicker label="日付（無効）" value={dayjs()} disabled />

        <FormTimePicker label="時刻（無効）" value={dayjs()} disabled />

        <FormDateTimePicker label="日時（無効）" value={dayjs()} disabled />
      </Stack>
    )
  },
}

// バリアント比較
export const Variants: Story = {
  render: () => {
    const [value, setValue] = useState<Dayjs | null>(dayjs())

    return (
      <Stack spacing={3} sx={{ width: 300 }}>
        <FormDatePicker
          label="Outlined（推奨）"
          variant="outlined"
          value={value}
          onChange={setValue}
        />

        <FormDatePicker
          label="Filled"
          variant="filled"
          value={value}
          onChange={setValue}
        />

        <FormDatePicker
          label="Standard"
          variant="standard"
          value={value}
          onChange={setValue}
        />
      </Stack>
    )
  },
}

// サイズ比較
export const Sizes: Story = {
  render: () => {
    const [value, setValue] = useState<Dayjs | null>(dayjs())

    return (
      <Stack spacing={3} sx={{ width: 300 }}>
        <FormDatePicker
          label="Small"
          size="small"
          value={value}
          onChange={setValue}
        />

        <FormDatePicker
          label="Medium"
          size="medium"
          value={value}
          onChange={setValue}
        />
      </Stack>
    )
  },
}

// 複数の日時ピッカー
export const MultiplePickers: Story = {
  render: () => {
    const [startDate, setStartDate] = useState<Dayjs | null>(null)
    const [endDate, setEndDate] = useState<Dayjs | null>(null)
    const [startTime, setStartTime] = useState<Dayjs | null>(null)
    const [endTime, setEndTime] = useState<Dayjs | null>(null)
    const [deadline, setDeadline] = useState<Dayjs | null>(null)

    return (
      <Stack spacing={3} sx={{ width: 400 }}>
        <FormDatePicker
          label="開始日"
          value={startDate}
          onChange={setStartDate}
          required
          labelRequired
          helperText="プロジェクト開始日を選択してください"
          minDate={dayjs()}
        />

        <FormDatePicker
          label="終了日"
          value={endDate}
          onChange={setEndDate}
          required
          labelRequired
          helperText="プロジェクト終了日を選択してください"
          minDate={startDate || dayjs()}
          error={endDate && startDate && endDate.isBefore(startDate)}
        />

        <FormTimePicker
          label="開始時刻"
          value={startTime}
          onChange={setStartTime}
          helperText="作業開始時刻を選択してください"
        />

        <FormTimePicker
          label="終了時刻"
          value={endTime}
          onChange={setEndTime}
          helperText="作業終了時刻を選択してください"
          minTime={startTime}
        />

        <FormDateTimePicker
          label="締切日時"
          value={deadline}
          onChange={setDeadline}
          required
          labelRequired
          helperText="最終締切日時を選択してください"
          minDateTime={dayjs()}
        />
      </Stack>
    )
  },
}

// フォーム例
export const FormExample: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      eventDate: null as Dayjs | null,
      startTime: null as Dayjs | null,
      endTime: null as Dayjs | null,
      deadline: null as Dayjs | null,
      birthday: null as Dayjs | null,
    })

    const handleChange = (field: string) => (value: Dayjs | null) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }))
    }

    const hasErrors = {
      eventDate: !formData.eventDate,
      startTime: !formData.startTime,
      endTime:
        !formData.endTime ||
        (formData.startTime &&
          formData.endTime &&
          formData.endTime.isBefore(formData.startTime)),
      deadline: !formData.deadline,
    }

    return (
      <Box sx={{ width: 500, p: 3 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 3 }}>
            イベント登録フォーム
          </Typography>

          <Stack spacing={3}>
            <FormDatePicker
              label="イベント日"
              value={formData.eventDate}
              onChange={handleChange('eventDate')}
              required
              labelRequired
              error={hasErrors.eventDate}
              helperText={
                hasErrors.eventDate
                  ? 'イベント日を選択してください'
                  : 'イベントを開催する日を選択してください'
              }
              minDate={dayjs()}
            />

            <FormTimePicker
              label="開始時刻"
              value={formData.startTime}
              onChange={handleChange('startTime')}
              required
              labelRequired
              error={hasErrors.startTime}
              helperText={
                hasErrors.startTime
                  ? '開始時刻を選択してください'
                  : 'イベント開始時刻を選択してください'
              }
              minutesStep={15}
            />

            <FormTimePicker
              label="終了時刻"
              value={formData.endTime}
              onChange={handleChange('endTime')}
              required
              labelRequired
              error={hasErrors.endTime}
              helperText={
                hasErrors.endTime
                  ? formData.startTime &&
                    formData.endTime &&
                    formData.endTime.isBefore(formData.startTime)
                    ? '終了時刻は開始時刻より後に設定してください'
                    : '終了時刻を選択してください'
                  : 'イベント終了時刻を選択してください'
              }
              minTime={formData.startTime}
              minutesStep={15}
            />

            <FormDateTimePicker
              label="申込締切"
              value={formData.deadline}
              onChange={handleChange('deadline')}
              required
              labelRequired
              error={hasErrors.deadline}
              helperText={
                hasErrors.deadline
                  ? '申込締切を選択してください'
                  : '参加申込の締切日時を選択してください'
              }
              minDateTime={dayjs()}
              maxDateTime={formData.eventDate?.subtract(1, 'day')}
            />

            <FormDatePicker
              label="生年月日（任意）"
              value={formData.birthday}
              onChange={handleChange('birthday')}
              helperText="年齢確認用（任意項目）"
              maxDate={dayjs().subtract(13, 'year')}
            />
          </Stack>

          <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              入力内容:
            </Typography>
            <Typography variant="body2">
              イベント日:{' '}
              {formData.eventDate?.format('YYYY年MM月DD日') || '未選択'}
            </Typography>
            <Typography variant="body2">
              開始時刻: {formData.startTime?.format('HH:mm') || '未選択'}
            </Typography>
            <Typography variant="body2">
              終了時刻: {formData.endTime?.format('HH:mm') || '未選択'}
            </Typography>
            <Typography variant="body2">
              申込締切:{' '}
              {formData.deadline?.format('YYYY年MM月DD日 HH:mm') || '未選択'}
            </Typography>
            <Typography variant="body2">
              生年月日:{' '}
              {formData.birthday?.format('YYYY年MM月DD日') || '未入力'}
            </Typography>
          </Box>
        </Paper>
      </Box>
    )
  },
}
