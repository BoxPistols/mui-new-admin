import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Box, Typography, Card, CardContent, Chip, Stack } from '@mui/material'

// ダミーのコンポーネントを作成
const DesignSystemOverview = () => {
  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        MUI v6 Admin Dashboard デザインシステム
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 4 }}>
        このプロジェクトは Material-UI v6 を基盤とした、モダンで拡張性の高い管理画面用デザインシステムです。
      </Typography>

      <Typography variant="h5" gutterBottom>
        主要コンポーネント
      </Typography>

      <Stack spacing={2} sx={{ mb: 4 }}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Layout
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
              <Chip label="MainGrid" variant="outlined" />
              <Chip label="Header" variant="outlined" />
              <Chip label="SideMenu" variant="outlined" />
              <Chip label="AppNavbar" variant="outlined" />
            </Stack>
          </CardContent>
        </Card>

        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Data Display
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
              <Chip label="StatCard" variant="outlined" />
              <Chip label="HighlightedCard" variant="outlined" />
            </Stack>
          </CardContent>
        </Card>

        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Inputs & Buttons
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
              <Chip label="Search" variant="outlined" />
              <Chip label="MenuButton" variant="outlined" />
            </Stack>
          </CardContent>
        </Card>
      </Stack>

      <Typography variant="h5" gutterBottom>
        特徴
      </Typography>
      <Stack spacing={1} sx={{ mb: 4 }}>
        <Chip label="レスポンシブデザイン" color="primary" />
        <Chip label="アクセシビリティ WCAG 2.1 AA準拠" color="primary" />
        <Chip label="Material Design 3" color="primary" />
        <Chip label="TypeScript対応" color="primary" />
        <Chip label="ダークモード対応" color="primary" />
      </Stack>

      <Typography variant="body2" color="text.secondary">
        各コンポーネントのStorybookページで詳細な使用方法、プロパティ、デザインパターンを確認できます。
      </Typography>
    </Box>
  )
}

const meta: Meta<typeof DesignSystemOverview> = {
  title: 'Introduction/デザインシステム概要',
  component: DesignSystemOverview,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'MUI v6 を基盤とした管理画面用デザインシステムの概要'
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {}