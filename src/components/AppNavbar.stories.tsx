import type { Meta, StoryObj } from '@storybook/react'
import AppNavbar from './AppNavbar'

const meta: Meta<typeof AppNavbar> = {
  title: 'Components/Navigation/AppNavbar',
  component: AppNavbar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# AppNavbar（アプリケーションナビゲーションバー）

モバイルデバイス専用のトップナビゲーションバーコンポーネントです。デスクトップでは非表示になり、SideMenuに置き換わります。

## 設計思想

### レスポンシブデザイン
- **モバイルファースト**: 小さな画面での使いやすさを最優先
- **適応的UI**: 画面サイズに応じて表示・非表示を切り替え
- **タッチフレンドリー**: 指での操作に適したボタンサイズ

### ユーザビリティ
- **ブランド認識**: カスタムアイコンとタイトルでアプリケーションを明確に識別
- **シンプルナビゲーション**: メニューボタンによる直感的なナビゲーション
- **一貫性**: デスクトップ版のSideMenuと統一されたデザイン言語

## 主な機能

- **ブランドアイデンティティ**: カスタムアイコンとダッシュボードタイトル
- **メニュートグル**: SideMenuMobileを開くためのハンバーガーメニュー
- **レスポンシブ表示**: md以上のブレークポイントで自動的に非表示

## 技術的特徴

- **固定ポジション**: スクロール時も常に上部に表示
- **Material-UI AppBar**: Material Designガイドラインに準拠
- **フレーム対応**: template-frame-heightに対応したマージン調整
- **テーマ統合**: background.paperとdividerカラーを使用

## アクセシビリティ

- **セマンティック構造**: 適切なHTML要素とaria-labelの使用
- **キーボードナビゲーション**: フォーカス管理とタブ順序の最適化
- **スクリーンリーダー対応**: 適切な見出し階層とラベル

## 使用場面

- **モバイルアプリケーション**: スマートフォンやタブレットでの主要ナビゲーション
- **PWA（Progressive Web App）**: ネイティブアプリ風のエクスペリエンス
- **レスポンシブWebアプリ**: 複数デバイス対応の管理画面
        `
      }
    }
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: '標準的なAppNavbarの表示。モバイルデバイスでのみ表示され、ブランドアイコンとメニューボタンを含みます。'
      }
    }
  }
}

export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'モバイルビューポートでの表示。実際のモバイルデバイスでの見た目を確認できます。'
      }
    }
  }
}