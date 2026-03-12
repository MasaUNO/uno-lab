# Uno Lab - University of Tokyo Website

東京大学宇野研究室（Fluid-rock Interaction Laboratory）のウェブサイト

## 概要

このプロジェクトは、React + React Router + TailwindCSS で構築された研究室のウェブサイトです。
TinaCMS を使用したコンテンツ管理システムの統合が可能な設計になっています。

## 技術スタック

- **React 18.3** - UIライブラリ
- **React Router 7** - ルーティング
- **TailwindCSS 4** - スタイリング
- **Vite** - ビルドツール
- **TinaCMS** - コンテンツ管理システム（統合準備済み）
- **Motion (Framer Motion)** - アニメーション
- **React Slick** - カルーセル
- **Lucide React** - アイコン

## ページ構成

- **Home** - 全画面ヒーロー、自動スライダー、最新ニュース、研究テーマ、ギャラリー
- **About** - 研究室の紹介
- **Research** - 研究テーマと研究手法の一覧
- **Members** - メンバー一覧
- **News** - ニュース一覧
- **Publications** - 年代別出版物リスト
- **Gallery** - 写真ギャラリー
- **Prospective Students** - 入学希望者向け情報
- **Contact** - お問い合わせフォーム

各研究テーマ、研究手法、メンバー、ニュースには個別の詳細ページがあります。

## 開発

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# ビルド
npm run build
```

## TinaCMS 統合手順

このプロジェクトは TinaCMS との統合準備ができています。完全な統合を行うには：

### 1. TinaCMS の初期化

```bash
npx @tinacms/cli init
```

### 2. `.tina/config.ts` の設定

プロジェクトルートに `.tina` フォルダと設定ファイルを作成し、コンテンツスキーマを定義します。

### 3. GitHub との連携設定

- GitHub リポジトリを作成
- Personal Access Token を生成
- TinaCMS Cloud でプロジェクトを作成

### 4. 環境変数の設定

`.env` ファイルに以下を追加：

```
TINA_PUBLIC_CLIENT_ID=your_client_id
TINA_TOKEN=your_token
GITHUB_PERSONAL_ACCESS_TOKEN=your_github_token
```

### 5. Vercel へのデプロイ

- Vercel プロジェクトを作成
- 環境変数を設定
- GitHub リポジトリと連携

## データ構造

現在、モックデータは `/src/app/data/mockData.ts` に保存されています。
TinaCMS を統合した後、これらのデータは `/content` フォルダ内の Markdown ファイルから取得されるようになります。

## カスタマイズ

### 画像の変更

Unsplash からの画像を使用しています。実際の研究室の写真に置き換える場合は、
各ページおよび `mockData.ts` 内の画像 URL を更新してください。

### スタイリング

- `/src/styles/theme.css` - カラーテーマとデザイントークン
- `/src/styles/index.css` - グローバルスタイルとカスタムCSS

### コンテンツの編集

現在はハードコーディングされたデータを使用していますが、TinaCMS 統合後は
管理画面から直接編集可能になります。

## ライセンス

© 2026 Uno Lab, University of Tokyo. All rights reserved.
