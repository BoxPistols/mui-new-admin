import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import FormTextField from "./FormTextField";
import { Box, Stack } from "@mui/material";
import {
  Person,
  Email,
  Phone,
  Search,
  AttachMoney,
  Percent,
  Event,
  AccessTime,
} from "@mui/icons-material";

const meta: Meta<typeof FormTextField> = {
  title: "Forms/TextField",
  component: FormTextField,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "フォーム用のテキストフィールドコンポーネント。バリデーション、パスワード表示切替、必須項目表示などの機能を提供します。",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["outlined", "filled", "standard"],
      description: "テキストフィールドのスタイル",
    },
    size: {
      control: "select",
      options: ["small", "medium"],
      description: "テキストフィールドのサイズ",
    },
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "tel", "url", "search"],
      description: "インプットタイプ",
    },
    required: {
      control: "boolean",
      description: "必須項目かどうか",
    },
    disabled: {
      control: "boolean",
      description: "無効状態かどうか",
    },
    error: {
      control: "boolean",
      description: "エラー状態かどうか",
    },
    multiline: {
      control: "boolean",
      description: "複数行かどうか",
    },
    fullWidth: {
      control: "boolean",
      description: "幅いっぱいに表示するかどうか",
    },
    labelRequired: {
      control: "boolean",
      description: "ラベルに必須マーク（*）を表示するかどうか",
    },
  },
};

export default meta;
type Story = StoryObj<typeof FormTextField>;

// 基本的な使用例
export const Default: Story = {
  args: {
    label: "お名前",
    placeholder: "お名前を入力してください",
    variant: "outlined",
    fullWidth: true,
  },
};

// 必須項目
export const Required: Story = {
  args: {
    label: "メールアドレス",
    placeholder: "example@company.com",
    type: "email",
    required: true,
    labelRequired: true,
    variant: "outlined",
    fullWidth: true,
  },
};

// パスワードフィールド
export const Password: Story = {
  render: (args) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <FormTextField
        {...args}
        type="password"
        showPassword={showPassword}
        onTogglePassword={() => setShowPassword(!showPassword)}
      />
    );
  },
  args: {
    label: "パスワード",
    placeholder: "パスワードを入力してください",
    variant: "outlined",
    fullWidth: true,
    labelRequired: true,
  },
};

// エラー状態
export const WithError: Story = {
  args: {
    label: "メールアドレス",
    value: "invalid-email",
    error: true,
    helperText: "正しいメールアドレスを入力してください",
    variant: "outlined",
    fullWidth: true,
  },
};

// ヘルパーテキスト付き
export const WithHelperText: Story = {
  args: {
    label: "電話番号",
    placeholder: "090-1234-5678",
    type: "tel",
    helperText: "ハイフンありで入力してください",
    variant: "outlined",
    fullWidth: true,
  },
};

// 複数行テキスト
export const Multiline: Story = {
  args: {
    label: "お問い合わせ内容",
    placeholder: "お問い合わせ内容を入力してください",
    multiline: true,
    rows: 4,
    variant: "outlined",
    fullWidth: true,
  },
};

// 無効状態
export const Disabled: Story = {
  args: {
    label: "ユーザーID",
    value: "USER001",
    disabled: true,
    variant: "outlined",
    fullWidth: true,
  },
};

// アイコン付き
export const WithIcons: Story = {
  render: () => (
    <Stack spacing={3} sx={{ width: 300 }}>
      <FormTextField
        label="お名前"
        variant="outlined"
        fullWidth
        InputProps={{
          startAdornment: <Person sx={{ mr: 1, color: "action.active" }} />,
        }}
      />
      <FormTextField
        label="メールアドレス"
        type="email"
        variant="outlined"
        fullWidth
        InputProps={{
          startAdornment: <Email sx={{ mr: 1, color: "action.active" }} />,
        }}
      />
      <FormTextField
        label="電話番号"
        type="tel"
        variant="outlined"
        fullWidth
        InputProps={{
          startAdornment: <Phone sx={{ mr: 1, color: "action.active" }} />,
        }}
      />
      <FormTextField
        label="検索"
        variant="outlined"
        fullWidth
        InputProps={{
          startAdornment: <Search sx={{ mr: 1, color: "action.active" }} />,
        }}
      />
    </Stack>
  ),
};

// 数値入力
export const NumberInputs: Story = {
  render: () => (
    <Stack spacing={3} sx={{ width: 300 }}>
      <FormTextField
        label="価格"
        type="number"
        variant="outlined"
        fullWidth
        InputProps={{
          startAdornment: (
            <AttachMoney sx={{ mr: 1, color: "action.active" }} />
          ),
          endAdornment: "円",
        }}
      />
      <FormTextField
        label="割引率"
        type="number"
        variant="outlined"
        fullWidth
        inputProps={{ min: 0, max: 100 }}
        InputProps={{
          endAdornment: <Percent sx={{ ml: 1, color: "action.active" }} />,
        }}
      />
      <FormTextField
        label="数量"
        type="number"
        variant="outlined"
        fullWidth
        inputProps={{ min: 1 }}
        helperText="1以上の数値を入力してください"
      />
    </Stack>
  ),
};

// バリアント比較
export const Variants: Story = {
  render: () => (
    <Stack spacing={3} sx={{ width: 300 }}>
      <FormTextField
        label="Outlined（推奨）"
        variant="outlined"
        fullWidth
        placeholder="アウトライン"
      />
      <FormTextField
        label="Filled"
        variant="filled"
        fullWidth
        placeholder="フィルド"
      />
      <FormTextField
        label="Standard"
        variant="standard"
        fullWidth
        placeholder="スタンダード"
      />
    </Stack>
  ),
};

// サイズ比較
export const Sizes: Story = {
  render: () => (
    <Stack spacing={3} sx={{ width: 300 }}>
      <FormTextField
        label="Small"
        size="small"
        variant="outlined"
        fullWidth
        placeholder="Small size"
      />
      <FormTextField
        label="Medium"
        size="medium"
        variant="outlined"
        fullWidth
        placeholder="Medium size"
      />
    </Stack>
  ),
};

// フォーム例
export const FormExample: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      message: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange =
      (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
          ...prev,
          [field]: event.target.value,
        }));
      };

    return (
      <Box sx={{ width: 400, p: 2 }}>
        <Stack spacing={3}>
          <FormTextField
            label="お名前"
            value={formData.name}
            onChange={handleChange("name")}
            variant="outlined"
            fullWidth
            required
            labelRequired
            InputProps={{
              startAdornment: <Person sx={{ mr: 1, color: "action.active" }} />,
            }}
          />

          <FormTextField
            label="メールアドレス"
            type="email"
            value={formData.email}
            onChange={handleChange("email")}
            variant="outlined"
            fullWidth
            required
            labelRequired
            InputProps={{
              startAdornment: <Email sx={{ mr: 1, color: "action.active" }} />,
            }}
          />

          <FormTextField
            label="電話番号"
            type="tel"
            value={formData.phone}
            onChange={handleChange("phone")}
            variant="outlined"
            fullWidth
            helperText="ハイフンありで入力してください"
            InputProps={{
              startAdornment: <Phone sx={{ mr: 1, color: "action.active" }} />,
            }}
          />

          <FormTextField
            label="パスワード"
            type="password"
            value={formData.password}
            onChange={handleChange("password")}
            variant="outlined"
            fullWidth
            required
            labelRequired
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
          />

          <FormTextField
            label="パスワード確認"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange("confirmPassword")}
            variant="outlined"
            fullWidth
            required
            labelRequired
            showPassword={showConfirmPassword}
            onTogglePassword={() =>
              setShowConfirmPassword(!showConfirmPassword)
            }
            error={
              formData.confirmPassword !== "" &&
              formData.password !== formData.confirmPassword
            }
            helperText={
              formData.confirmPassword !== "" &&
              formData.password !== formData.confirmPassword
                ? "パスワードが一致しません"
                : undefined
            }
          />

          <FormTextField
            label="メッセージ"
            value={formData.message}
            onChange={handleChange("message")}
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            placeholder="ご質問やご要望がございましたらお聞かせください"
          />
        </Stack>
      </Box>
    );
  },
};
