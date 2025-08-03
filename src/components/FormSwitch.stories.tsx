import { Box, Divider, Paper, Stack, Typography } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { FormSwitch, FormSwitchGroup } from './FormSwitch'

const meta: Meta<typeof FormSwitch> = {
  title: 'Forms/Switch',
  component: FormSwitch,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'スイッチコンポーネント。ON/OFFの切り替えに使用します。単体使用とグループ使用が可能です。',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    labelPlacement: {
      control: 'select',
      options: ['start', 'end', 'top', 'bottom'],
      description: 'ラベルの配置位置',
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
type Story = StoryObj<typeof FormSwitch>

// 基本的な使用例
export const Default: Story = {
  render: () => {
    const [checked, setChecked] = useState(false)

    return (
      <FormSwitch
        label="メール通知を受け取る"
        checked={checked}
        onChange={setChecked}
      />
    )
  },
}

// 必須項目
export const Required: Story = {
  render: () => {
    const [checked, setChecked] = useState(false)

    return (
      <FormSwitch
        label="利用規約に同意する"
        checked={checked}
        onChange={setChecked}
        required
        labelRequired
      />
    )
  },
}

// エラー状態
export const WithError: Story = {
  render: () => {
    const [checked, setChecked] = useState(false)

    return (
      <FormSwitch
        label="利用規約に同意する"
        checked={checked}
        onChange={setChecked}
        error
        helperText="利用規約への同意が必要です"
        required
        labelRequired
      />
    )
  },
}

// ヘルパーテキスト付き
export const WithHelperText: Story = {
  render: () => {
    const [checked, setChecked] = useState(true)

    return (
      <FormSwitch
        label="プッシュ通知"
        checked={checked}
        onChange={setChecked}
        helperText="重要なお知らせをプッシュ通知で受信します"
      />
    )
  },
}

// 無効状態
export const Disabled: Story = {
  render: () => {
    return (
      <Stack spacing={2}>
        <FormSwitch label="無効状態（OFF）" checked={false} disabled />
        <FormSwitch label="無効状態（ON）" checked={true} disabled />
      </Stack>
    )
  },
}

// ラベル配置
export const LabelPlacement: Story = {
  render: () => {
    const [checked, setChecked] = useState(true)

    return (
      <Stack spacing={3} sx={{ width: 300 }}>
        <FormSwitch
          label="End（デフォルト）"
          checked={checked}
          onChange={setChecked}
          labelPlacement="end"
        />
        <FormSwitch
          label="Start"
          checked={checked}
          onChange={setChecked}
          labelPlacement="start"
        />
        <FormSwitch
          label="Top"
          checked={checked}
          onChange={setChecked}
          labelPlacement="top"
        />
        <FormSwitch
          label="Bottom"
          checked={checked}
          onChange={setChecked}
          labelPlacement="bottom"
        />
      </Stack>
    )
  },
}

// スイッチグループ
export const SwitchGroup: Story = {
  render: () => {
    const [values, setValues] = useState({
      email: true,
      sms: false,
      push: true,
      newsletter: false,
    })

    const switches = [
      { name: 'email', label: 'メール通知' },
      { name: 'sms', label: 'SMS通知' },
      { name: 'push', label: 'プッシュ通知' },
      { name: 'newsletter', label: 'ニュースレター' },
    ]

    const handleChange = (name: string, checked: boolean) => {
      setValues((prev) => ({
        ...prev,
        [name]: checked,
      }))
    }

    return (
      <FormSwitchGroup
        label="通知設定"
        switches={switches}
        values={values}
        onChange={handleChange}
        helperText="受信したい通知を選択してください"
      />
    )
  },
}

// 一部無効なスイッチグループ
export const PartiallyDisabledGroup: Story = {
  render: () => {
    const [values, setValues] = useState({
      email: true,
      sms: false,
      push: true,
      premium: false,
    })

    const switches = [
      { name: 'email', label: 'メール通知' },
      { name: 'sms', label: 'SMS通知' },
      { name: 'push', label: 'プッシュ通知' },
      { name: 'premium', label: 'プレミアム機能', disabled: true },
    ]

    const handleChange = (name: string, checked: boolean) => {
      setValues((prev) => ({
        ...prev,
        [name]: checked,
      }))
    }

    return (
      <FormSwitchGroup
        label="通知設定"
        switches={switches}
        values={values}
        onChange={handleChange}
        helperText="プレミアム機能は有料プランでご利用いただけます"
      />
    )
  },
}

// 複数のスイッチ
export const MultipleSwitches: Story = {
  render: () => {
    const [notifications, setNotifications] = useState({
      email: true,
      sms: false,
      push: true,
    })

    const [privacy, setPrivacy] = useState({
      profile: false,
      activity: true,
      location: false,
    })

    const [features, setFeatures] = useState({
      darkMode: false,
      autoSave: true,
      analytics: false,
    })

    const notificationSwitches = [
      { name: 'email', label: 'メール通知' },
      { name: 'sms', label: 'SMS通知' },
      { name: 'push', label: 'プッシュ通知' },
    ]

    const privacySwitches = [
      { name: 'profile', label: 'プロフィール公開' },
      { name: 'activity', label: 'アクティビティ公開' },
      { name: 'location', label: '位置情報の使用' },
    ]

    const featureSwitches = [
      { name: 'darkMode', label: 'ダークモード' },
      { name: 'autoSave', label: '自動保存' },
      { name: 'analytics', label: '使用状況の分析' },
    ]

    const handleNotificationChange = (name: string, checked: boolean) => {
      setNotifications((prev) => ({ ...prev, [name]: checked }))
    }

    const handlePrivacyChange = (name: string, checked: boolean) => {
      setPrivacy((prev) => ({ ...prev, [name]: checked }))
    }

    const handleFeatureChange = (name: string, checked: boolean) => {
      setFeatures((prev) => ({ ...prev, [name]: checked }))
    }

    return (
      <Stack spacing={4} sx={{ width: 400 }}>
        <FormSwitchGroup
          label="通知設定"
          switches={notificationSwitches}
          values={notifications}
          onChange={handleNotificationChange}
          helperText="受信したい通知を選択してください"
        />

        <FormSwitchGroup
          label="プライバシー設定"
          switches={privacySwitches}
          values={privacy}
          onChange={handlePrivacyChange}
          helperText="公開する情報を選択してください"
        />

        <FormSwitchGroup
          label="機能設定"
          switches={featureSwitches}
          values={features}
          onChange={handleFeatureChange}
          helperText="使用する機能を選択してください"
        />
      </Stack>
    )
  },
}

// フォーム例
export const FormExample: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      agreeTerms: false,
      agreePrivacy: false,
      agreeMarketing: false,
      notifications: {
        email: true,
        sms: false,
        push: false,
      },
      preferences: {
        darkMode: false,
        autoSave: true,
        analytics: true,
      },
    })

    const notificationSwitches = [
      { name: 'email', label: 'メール通知' },
      { name: 'sms', label: 'SMS通知' },
      { name: 'push', label: 'プッシュ通知' },
    ]

    const preferenceSwitches = [
      { name: 'darkMode', label: 'ダークモード' },
      { name: 'autoSave', label: '自動保存' },
      { name: 'analytics', label: '使用状況分析' },
    ]

    const handleSingleChange = (field: string) => (checked: boolean) => {
      setFormData((prev) => ({
        ...prev,
        [field]: checked,
      }))
    }

    const handleGroupChange =
      (group: string) => (name: string, checked: boolean) => {
        setFormData((prev) => ({
          ...prev,
          [group]: {
            ...(prev[group as keyof typeof prev] as Record<string, boolean>),
            [name]: checked,
          },
        }))
      }

    const hasErrors = {
      terms: !formData.agreeTerms,
      privacy: !formData.agreePrivacy,
    }

    return (
      <Box sx={{ width: 600, p: 3 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 3 }}>
            アカウント設定
          </Typography>

          <Stack spacing={4}>
            {/* 必須の同意項目 */}
            <Box>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                利用規約
              </Typography>
              <Stack spacing={2}>
                <FormSwitch
                  label="利用規約に同意する"
                  checked={formData.agreeTerms}
                  onChange={handleSingleChange('agreeTerms')}
                  required
                  labelRequired
                  error={hasErrors.terms}
                  helperText={
                    hasErrors.terms ? '利用規約への同意が必要です' : undefined
                  }
                />

                <FormSwitch
                  label="プライバシーポリシーに同意する"
                  checked={formData.agreePrivacy}
                  onChange={handleSingleChange('agreePrivacy')}
                  required
                  labelRequired
                  error={hasErrors.privacy}
                  helperText={
                    hasErrors.privacy
                      ? 'プライバシーポリシーへの同意が必要です'
                      : undefined
                  }
                />

                <FormSwitch
                  label="マーケティング情報の受信に同意する（任意）"
                  checked={formData.agreeMarketing}
                  onChange={handleSingleChange('agreeMarketing')}
                  helperText="お得な情報やキャンペーンのご案内を受信します"
                />
              </Stack>
            </Box>

            <Divider />

            {/* 通知設定 */}
            <FormSwitchGroup
              label="通知設定"
              switches={notificationSwitches}
              values={formData.notifications}
              onChange={handleGroupChange('notifications')}
              helperText="受信したい通知方法を選択してください"
            />

            <Divider />

            {/* 機能設定 */}
            <FormSwitchGroup
              label="機能設定"
              switches={preferenceSwitches}
              values={formData.preferences}
              onChange={handleGroupChange('preferences')}
              helperText="アプリの動作を設定してください"
            />
          </Stack>

          <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              設定内容:
            </Typography>
            <Typography variant="body2">
              利用規約: {formData.agreeTerms ? '同意済み' : '未同意'}
            </Typography>
            <Typography variant="body2">
              プライバシーポリシー:{' '}
              {formData.agreePrivacy ? '同意済み' : '未同意'}
            </Typography>
            <Typography variant="body2">
              マーケティング: {formData.agreeMarketing ? '同意済み' : '未同意'}
            </Typography>
            <Typography variant="body2">
              メール通知: {formData.notifications.email ? 'ON' : 'OFF'}
            </Typography>
            <Typography variant="body2">
              ダークモード: {formData.preferences.darkMode ? 'ON' : 'OFF'}
            </Typography>
            <Typography variant="body2">
              自動保存: {formData.preferences.autoSave ? 'ON' : 'OFF'}
            </Typography>
          </Box>
        </Paper>
      </Box>
    )
  },
}
