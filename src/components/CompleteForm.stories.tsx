import {
  Alert,
  Box,
  Button,
  Divider,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react'
import dayjs, { type Dayjs } from 'dayjs'
import { useState } from 'react'
import FormAutocomplete from './FormAutocomplete'
import FormCheckboxGroup from './FormCheckboxGroup'
import { FormDatePicker, FormTimePicker } from './FormDateTimePicker'
import FormRadioGroup from './FormRadioGroup'
import FormSelect from './FormSelect'
import { FormSwitch, FormSwitchGroup } from './FormSwitch'
import FormTextField from './FormTextField'

const meta: Meta = {
  title: 'Forms/CompleteForm',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '全てのフォームコンポーネントを組み合わせた完全なフォーム例。実際のアプリケーションで使用されるような複雑なフォームの実装例を示します。',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj

// 簡単な登録フォーム
export const SimpleRegistrationForm: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeTerms: false,
    })
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [errors, setErrors] = useState<Record<string, string>>({})

    const validateForm = () => {
      const newErrors: Record<string, string> = {}

      if (!formData.name.trim()) {
        newErrors.name = 'お名前を入力してください'
      }

      if (!formData.email.trim()) {
        newErrors.email = 'メールアドレスを入力してください'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = '正しいメールアドレスを入力してください'
      }

      if (!formData.password) {
        newErrors.password = 'パスワードを入力してください'
      } else if (formData.password.length < 8) {
        newErrors.password = 'パスワードは8文字以上で入力してください'
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'パスワードが一致しません'
      }

      if (!formData.agreeTerms) {
        newErrors.agreeTerms = '利用規約への同意が必要です'
      }

      setErrors(newErrors)
      return Object.keys(newErrors).length === 0
    }

    const handleSubmit = () => {
      if (validateForm()) {
        alert('登録が完了しました！')
      }
    }

    const handleChange =
      (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
          ...prev,
          [field]: event.target.value,
        }))
        if (errors[field]) {
          setErrors((prev) => ({ ...prev, [field]: '' }))
        }
      }

    return (
      <Box sx={{ width: 500, p: 3 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h5" sx={{ mb: 3, textAlign: 'center' }}>
            ユーザー登録
          </Typography>

          <Stack spacing={3}>
            <FormTextField
              label="お名前"
              value={formData.name}
              onChange={handleChange('name')}
              required
              labelRequired
              error={!!errors.name}
              helperText={errors.name}
              placeholder="山田太郎"
            />

            <FormTextField
              label="メールアドレス"
              type="email"
              value={formData.email}
              onChange={handleChange('email')}
              required
              labelRequired
              error={!!errors.email}
              helperText={errors.email}
              placeholder="example@company.com"
            />

            <FormTextField
              label="パスワード"
              type="password"
              value={formData.password}
              onChange={handleChange('password')}
              required
              labelRequired
              error={!!errors.password}
              helperText={errors.password || '8文字以上で入力してください'}
              showPassword={showPassword}
              onTogglePassword={() => setShowPassword(!showPassword)}
            />

            <FormTextField
              label="パスワード確認"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange('confirmPassword')}
              required
              labelRequired
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              showPassword={showConfirmPassword}
              onTogglePassword={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
            />

            <FormSwitch
              label="利用規約に同意する"
              checked={formData.agreeTerms}
              onChange={(checked) => {
                setFormData((prev) => ({ ...prev, agreeTerms: checked }))
                if (errors.agreeTerms) {
                  setErrors((prev) => ({ ...prev, agreeTerms: '' }))
                }
              }}
              required
              labelRequired
              error={!!errors.agreeTerms}
              helperText={errors.agreeTerms}
            />

            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={handleSubmit}
              sx={{ mt: 2 }}
            >
              登録する
            </Button>
          </Stack>
        </Paper>
      </Box>
    )
  },
}

// 詳細プロフィールフォーム
export const DetailedProfileForm: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      // 基本情報
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      birthDate: null as Dayjs | null,
      gender: '',

      // 住所情報
      country: null as { label: string; value: string } | null,
      prefecture: '',
      city: '',
      address: '',
      zipCode: '',

      // 職業情報
      occupation: '',
      company: '',
      experience: '',
      skills: [] as { label: string; value: string }[],

      // 興味・趣味
      interests: [] as string[],
      hobbies: '',

      // 設定
      notifications: {
        email: true,
        sms: false,
        push: true,
      },
      privacy: {
        profilePublic: false,
        activityPublic: false,
      },

      // 同意事項
      agreeTerms: false,
      agreePrivacy: false,
      agreeMarketing: false,
    })

    // オプションデータ
    const countryOptions = [
      { label: '日本', value: 'jp' },
      { label: 'アメリカ', value: 'us' },
      { label: 'カナダ', value: 'ca' },
    ]

    const genderOptions = [
      { value: 'male', label: '男性' },
      { value: 'female', label: '女性' },
      { value: 'other', label: 'その他' },
      { value: 'not_specified', label: '回答しない' },
    ]

    const occupationOptions = [
      { value: 'engineer', label: 'エンジニア' },
      { value: 'designer', label: 'デザイナー' },
      { value: 'manager', label: 'マネージャー' },
      { value: 'student', label: '学生' },
      { value: 'other', label: 'その他' },
    ]

    const experienceOptions = [
      { value: '0-1', label: '1年未満' },
      { value: '1-3', label: '1-3年' },
      { value: '3-5', label: '3-5年' },
      { value: '5-10', label: '5-10年' },
      { value: '10+', label: '10年以上' },
    ]

    const skillOptions = [
      { label: 'JavaScript', value: 'javascript' },
      { label: 'TypeScript', value: 'typescript' },
      { label: 'React', value: 'react' },
      { label: 'Vue.js', value: 'vue' },
      { label: 'Python', value: 'python' },
      { label: 'Java', value: 'java' },
    ]

    const interestOptions = [
      { value: 'technology', label: 'テクノロジー' },
      { value: 'design', label: 'デザイン' },
      { value: 'business', label: 'ビジネス' },
      { value: 'sports', label: 'スポーツ' },
      { value: 'music', label: '音楽' },
      { value: 'travel', label: '旅行' },
    ]

    const notificationSwitches = [
      { name: 'email', label: 'メール通知' },
      { name: 'sms', label: 'SMS通知' },
      { name: 'push', label: 'プッシュ通知' },
    ]

    const privacySwitches = [
      { name: 'profilePublic', label: 'プロフィール公開' },
      { name: 'activityPublic', label: 'アクティビティ公開' },
    ]

    const handleTextChange =
      (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [field]: event.target.value }))
      }

    const handleSelectChange = (field: string) => (value: string | number) => {
      setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const handleNotificationChange = (name: string, checked: boolean) => {
      setFormData((prev) => ({
        ...prev,
        notifications: { ...prev.notifications, [name]: checked },
      }))
    }

    const handlePrivacyChange = (name: string, checked: boolean) => {
      setFormData((prev) => ({
        ...prev,
        privacy: { ...prev.privacy, [name]: checked },
      }))
    }

    return (
      <Box sx={{ width: 700, p: 3 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h5" sx={{ mb: 4, textAlign: 'center' }}>
            詳細プロフィール登録
          </Typography>

          <Stack spacing={4}>
            {/* 基本情報 */}
            <Box>
              <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                基本情報
              </Typography>
              <Stack spacing={3}>
                <Stack direction="row" spacing={2}>
                  <FormTextField
                    label="姓"
                    value={formData.lastName}
                    onChange={handleTextChange('lastName')}
                    required
                    labelRequired
                    placeholder="山田"
                  />
                  <FormTextField
                    label="名"
                    value={formData.firstName}
                    onChange={handleTextChange('firstName')}
                    required
                    labelRequired
                    placeholder="太郎"
                  />
                </Stack>

                <Stack direction="row" spacing={2}>
                  <FormTextField
                    label="メールアドレス"
                    type="email"
                    value={formData.email}
                    onChange={handleTextChange('email')}
                    required
                    labelRequired
                    placeholder="example@company.com"
                  />
                  <FormTextField
                    label="電話番号"
                    type="tel"
                    value={formData.phone}
                    onChange={handleTextChange('phone')}
                    placeholder="090-1234-5678"
                  />
                </Stack>

                <Stack direction="row" spacing={2}>
                  <FormDatePicker
                    label="生年月日"
                    value={formData.birthDate}
                    onChange={(value) =>
                      setFormData((prev) => ({ ...prev, birthDate: value }))
                    }
                    maxDate={dayjs().subtract(13, 'year')}
                  />
                  <Box sx={{ flex: 1 }}>
                    <FormRadioGroup
                      label="性別"
                      value={formData.gender}
                      options={genderOptions}
                      onChange={(value) =>
                        setFormData((prev) => ({ ...prev, gender: value }))
                      }
                      row
                    />
                  </Box>
                </Stack>
              </Stack>
            </Box>

            <Divider />

            {/* 住所情報 */}
            <Box>
              <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                住所情報
              </Typography>
              <Stack spacing={3}>
                <Stack direction="row" spacing={2}>
                  <FormAutocomplete
                    label="国"
                    options={countryOptions}
                    value={formData.country}
                    onChange={(_, value) =>
                      setFormData((prev) => ({ ...prev, country: value }))
                    }
                    placeholder="国を選択"
                  />
                  <FormTextField
                    label="都道府県"
                    value={formData.prefecture}
                    onChange={handleTextChange('prefecture')}
                    placeholder="東京都"
                  />
                </Stack>

                <Stack direction="row" spacing={2}>
                  <FormTextField
                    label="市区町村"
                    value={formData.city}
                    onChange={handleTextChange('city')}
                    placeholder="渋谷区"
                  />
                  <FormTextField
                    label="郵便番号"
                    value={formData.zipCode}
                    onChange={handleTextChange('zipCode')}
                    placeholder="150-0001"
                  />
                </Stack>

                <FormTextField
                  label="住所"
                  value={formData.address}
                  onChange={handleTextChange('address')}
                  placeholder="神南1-1-1"
                />
              </Stack>
            </Box>

            <Divider />

            {/* 職業情報 */}
            <Box>
              <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                職業情報
              </Typography>
              <Stack spacing={3}>
                <Stack direction="row" spacing={2}>
                  <FormSelect
                    label="職業"
                    value={formData.occupation}
                    options={occupationOptions}
                    onChange={handleSelectChange('occupation')}
                    placeholder="職業を選択"
                  />
                  <FormSelect
                    label="経験年数"
                    value={formData.experience}
                    options={experienceOptions}
                    onChange={handleSelectChange('experience')}
                    placeholder="経験年数を選択"
                  />
                </Stack>

                <FormTextField
                  label="会社名"
                  value={formData.company}
                  onChange={handleTextChange('company')}
                  placeholder="株式会社サンプル"
                />

                <FormAutocomplete
                  label="スキル"
                  options={skillOptions}
                  value={formData.skills}
                  onChange={(_, value) =>
                    setFormData((prev) => ({ ...prev, skills: value }))
                  }
                  multiple
                  placeholder="スキルを選択"
                  helperText="保有しているスキルを選択してください"
                />
              </Stack>
            </Box>

            <Divider />

            {/* 興味・趣味 */}
            <Box>
              <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                興味・趣味
              </Typography>
              <Stack spacing={3}>
                <FormCheckboxGroup
                  label="興味のある分野"
                  value={formData.interests}
                  options={interestOptions}
                  onChange={(value) =>
                    setFormData((prev) => ({ ...prev, interests: value }))
                  }
                  row
                />

                <FormTextField
                  label="趣味"
                  value={formData.hobbies}
                  onChange={handleTextChange('hobbies')}
                  multiline
                  rows={3}
                  placeholder="読書、映画鑑賞、プログラミングなど"
                />
              </Stack>
            </Box>

            <Divider />

            {/* 設定 */}
            <Box>
              <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                通知・プライバシー設定
              </Typography>
              <Stack spacing={3}>
                <FormSwitchGroup
                  label="通知設定"
                  switches={notificationSwitches}
                  values={formData.notifications}
                  onChange={handleNotificationChange}
                />

                <FormSwitchGroup
                  label="プライバシー設定"
                  switches={privacySwitches}
                  values={formData.privacy}
                  onChange={handlePrivacyChange}
                />
              </Stack>
            </Box>

            <Divider />

            {/* 同意事項 */}
            <Box>
              <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                同意事項
              </Typography>
              <Stack spacing={2}>
                <FormSwitch
                  label="利用規約に同意する"
                  checked={formData.agreeTerms}
                  onChange={(checked) =>
                    setFormData((prev) => ({ ...prev, agreeTerms: checked }))
                  }
                  required
                  labelRequired
                />

                <FormSwitch
                  label="プライバシーポリシーに同意する"
                  checked={formData.agreePrivacy}
                  onChange={(checked) =>
                    setFormData((prev) => ({ ...prev, agreePrivacy: checked }))
                  }
                  required
                  labelRequired
                />

                <FormSwitch
                  label="マーケティング情報の受信に同意する"
                  checked={formData.agreeMarketing}
                  onChange={(checked) =>
                    setFormData((prev) => ({
                      ...prev,
                      agreeMarketing: checked,
                    }))
                  }
                  helperText="お得な情報やキャンペーンのご案内を受信します（任意）"
                />
              </Stack>
            </Box>

            <Button
              variant="contained"
              size="large"
              fullWidth
              sx={{ mt: 3 }}
              onClick={() => alert('プロフィールが保存されました！')}
            >
              プロフィールを保存
            </Button>
          </Stack>
        </Paper>
      </Box>
    )
  },
}

// イベント登録フォーム
export const EventRegistrationForm: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      eventName: '',
      eventType: '',
      description: '',
      eventDate: null as Dayjs | null,
      startTime: null as Dayjs | null,
      endTime: null as Dayjs | null,
      location: '',
      capacity: '',
      fee: '',
      categories: [] as string[],
      isOnline: false,
      requiresApproval: false,
      allowsGuests: true,
      notifications: {
        email: true,
        reminder: true,
      },
    })

    const eventTypeOptions = [
      { value: 'conference', label: 'カンファレンス' },
      { value: 'workshop', label: 'ワークショップ' },
      { value: 'meetup', label: 'ミートアップ' },
      { value: 'seminar', label: 'セミナー' },
      { value: 'networking', label: 'ネットワーキング' },
    ]

    const categoryOptions = [
      { value: 'technology', label: 'テクノロジー' },
      { value: 'business', label: 'ビジネス' },
      { value: 'design', label: 'デザイン' },
      { value: 'marketing', label: 'マーケティング' },
      { value: 'startup', label: 'スタートアップ' },
      { value: 'career', label: 'キャリア' },
    ]

    const notificationSwitches = [
      { name: 'email', label: '参加者への通知メール' },
      { name: 'reminder', label: 'リマインダー送信' },
    ]

    const handleTextChange =
      (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [field]: event.target.value }))
      }

    const handleNotificationChange = (name: string, checked: boolean) => {
      setFormData((prev) => ({
        ...prev,
        notifications: { ...prev.notifications, [name]: checked },
      }))
    }

    return (
      <Box sx={{ width: 600, p: 3 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h5" sx={{ mb: 4, textAlign: 'center' }}>
            イベント登録
          </Typography>

          <Stack spacing={4}>
            {/* 基本情報 */}
            <Box>
              <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                イベント基本情報
              </Typography>
              <Stack spacing={3}>
                <FormTextField
                  label="イベント名"
                  value={formData.eventName}
                  onChange={handleTextChange('eventName')}
                  required
                  labelRequired
                  placeholder="React勉強会 #1"
                />

                <FormSelect
                  label="イベント種別"
                  value={formData.eventType}
                  options={eventTypeOptions}
                  onChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      eventType: value as string,
                    }))
                  }
                  required
                  labelRequired
                  placeholder="種別を選択"
                />

                <FormTextField
                  label="イベント説明"
                  value={formData.description}
                  onChange={handleTextChange('description')}
                  multiline
                  rows={4}
                  placeholder="イベントの詳細説明を入力してください"
                />

                <FormCheckboxGroup
                  label="カテゴリ"
                  value={formData.categories}
                  options={categoryOptions}
                  onChange={(value) =>
                    setFormData((prev) => ({ ...prev, categories: value }))
                  }
                  row
                  helperText="該当するカテゴリを選択してください"
                />
              </Stack>
            </Box>

            <Divider />

            {/* 日時・場所 */}
            <Box>
              <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                日時・場所
              </Typography>
              <Stack spacing={3}>
                <FormDatePicker
                  label="開催日"
                  value={formData.eventDate}
                  onChange={(value) =>
                    setFormData((prev) => ({ ...prev, eventDate: value }))
                  }
                  required
                  labelRequired
                  minDate={dayjs()}
                />

                <Stack direction="row" spacing={2}>
                  <FormTimePicker
                    label="開始時刻"
                    value={formData.startTime}
                    onChange={(value) =>
                      setFormData((prev) => ({ ...prev, startTime: value }))
                    }
                    required
                    labelRequired
                  />
                  <FormTimePicker
                    label="終了時刻"
                    value={formData.endTime}
                    onChange={(value) =>
                      setFormData((prev) => ({ ...prev, endTime: value }))
                    }
                    required
                    labelRequired
                    minTime={formData.startTime ?? undefined}
                  />
                </Stack>

                <FormTextField
                  label="開催場所"
                  value={formData.location}
                  onChange={handleTextChange('location')}
                  required={!formData.isOnline}
                  labelRequired={!formData.isOnline}
                  disabled={formData.isOnline}
                  placeholder="東京都渋谷区..."
                />

                <FormSwitch
                  label="オンライン開催"
                  checked={formData.isOnline}
                  onChange={(checked) =>
                    setFormData((prev) => ({ ...prev, isOnline: checked }))
                  }
                  helperText="オンライン開催の場合はZoomリンクなどを後で設定します"
                />
              </Stack>
            </Box>

            <Divider />

            {/* 参加設定 */}
            <Box>
              <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                参加設定
              </Typography>
              <Stack spacing={3}>
                <Stack direction="row" spacing={2}>
                  <FormTextField
                    label="定員"
                    type="number"
                    value={formData.capacity}
                    onChange={handleTextChange('capacity')}
                    placeholder="50"
                    inputProps={{ min: 1 }}
                  />
                  <FormTextField
                    label="参加費"
                    type="number"
                    value={formData.fee}
                    onChange={handleTextChange('fee')}
                    placeholder="0"
                    inputProps={{ min: 0 }}
                    InputProps={{ endAdornment: '円' }}
                  />
                </Stack>

                <Stack spacing={2}>
                  <FormSwitch
                    label="参加承認が必要"
                    checked={formData.requiresApproval}
                    onChange={(checked) =>
                      setFormData((prev) => ({
                        ...prev,
                        requiresApproval: checked,
                      }))
                    }
                    helperText="主催者による参加承認を必要とします"
                  />

                  <FormSwitch
                    label="ゲスト参加を許可"
                    checked={formData.allowsGuests}
                    onChange={(checked) =>
                      setFormData((prev) => ({
                        ...prev,
                        allowsGuests: checked,
                      }))
                    }
                    helperText="会員以外の参加を許可します"
                  />
                </Stack>

                <FormSwitchGroup
                  label="通知設定"
                  switches={notificationSwitches}
                  values={formData.notifications}
                  onChange={handleNotificationChange}
                />
              </Stack>
            </Box>

            <Alert severity="info" sx={{ mt: 2 }}>
              イベント登録後、詳細設定や画像のアップロードが可能になります。
            </Alert>

            <Button
              variant="contained"
              size="large"
              fullWidth
              sx={{ mt: 3 }}
              onClick={() => alert('イベントが登録されました！')}
            >
              イベントを登録
            </Button>
          </Stack>
        </Paper>
      </Box>
    )
  },
}
