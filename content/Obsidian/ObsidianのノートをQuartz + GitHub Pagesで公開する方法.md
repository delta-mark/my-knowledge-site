## はじめに

ObsidianのノートをWebサイトとして公開したい場合、Obsidian公式のPublishサービスを使わずに、無料で実現する方法があります。この記事では、Quartz と GitHub Pages を組み合わせた仕組みの構築手順を解説します。

---

## 全体像

```
OneDrive（Vault）
└── Vault/
    └── Publish/        ← 公開したいノートだけ入れるフォルダ
          ↓ publish.bat（ワンクリックで実行）
GitHub（パブリックリポジトリ）
└── my-knowledge-site/
    └── content/        ← Publishフォルダのコピー
          ↓ GitHub Actions（自動ビルド）
    GitHub Pages        ← Webサイトとして公開
```

---

## 登場するツールとサービスの役割

| ツール/サービス | 役割 |
|---|---|
| Obsidian | ノートの編集 |
| OneDrive | Vaultの複数PC間同期 |
| Git | GitHubへのpush/pull操作 |
| Quartz | MarkdownをHTMLに変換するツール |
| GitHub | ファイルの保管・バージョン管理 |
| GitHub Actions | pushをトリガーにQuartzを自動実行 |
| GitHub Pages | 生成されたHTMLをWebとして公開 |

### Node.jsについて

QuartzはNode.js上で動作しますが、ビルドはGitHub Actionsのサーバー側で行われるため、手元のPCへのNode.jsのインストールは不要です。

---

## 事前準備

以下のツールとアカウントが必要です。

- **Obsidian**（インストール済み）
- **Git**（インストール必要）
- **GitHubアカウント**（無料）
- **OneDriveアカウント**（Windows標準）

---

## ステップ1：Gitのインストール（Windows）

1. `https://git-scm.com` からダウンロード
2. インストーラーを実行し、基本的にデフォルト設定で進める
3. 「Adjusting the name of the initial branch」の画面で `main` を設定する
4. 「Choose a credential helper」で `Git Credential Manager` を選択

インストール後、コマンドプロンプトでユーザー情報を設定：

```
git config --global user.name "GitHubのユーザー名"
git config --global user.email "GitHubに登録したメールアドレス"
```

---

## ステップ2：GitHubにQuartzリポジトリを作成

1. `https://quartz.jzhao.xyz` を参照してQuartzのリポジトリをGitHubにフォーク（またはテンプレートから作成）
2. リポジトリ名は任意（例：`my-knowledge-site`）
3. リポジトリをパブリックに設定する（GitHub Pagesの無料利用に必要）

---

## ステップ3：フォルダ構成の設定

OneDrive内に以下のフォルダ構成を作成します：

```
OneDrive/
└── Obsidian/
    ├── Vault/              ← ObsidianのVault
    │   └── Publish/        ← 公開したいノートだけ置くフォルダ
    └── my-knowledge-site/  ← GitHubからcloneしたQuartzリポジトリ
```

コマンドプロンプトで以下を実行してリポジトリをclone：

```
cd %USERPROFILE%\OneDrive\Obsidian
git clone https://github.com/GitHubユーザー名/my-knowledge-site.git
```

---

## ステップ4：GitHub Pagesの設定

1. GitHubのリポジトリページを開く
2. `Settings` → `Pages` を開く
3. `Source` を `GitHub Actions` に設定

次に、`.github/workflows/deploy.yaml` というファイルをリポジトリに追加します：

```yaml
name: Deploy Quartz site to GitHub Pages

on:
  push:
    branches:
      - main
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - name: Install dependencies
        run: npm ci
      - name: Build Quartz
        run: npx quartz build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: public

  deploy:
    needs: build
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

---

## ステップ5：publish.batの作成

`my-knowledge-site` フォルダ内に `publish.bat` というファイルを作成します。メモ帳で以下の内容を書いて保存してください：

```bat
@echo off
cd %USERPROFILE%\OneDrive\Obsidian\my-knowledge-site
robocopy "%USERPROFILE%\OneDrive\Obsidian\Vault\Publish" "%USERPROFILE%\OneDrive\Obsidian\my-knowledge-site\content" /MIR
git add content/
git commit -m "update notes"
git push
echo Done!
pause
```

### ポイント

- `%USERPROFILE%` は自動的に現在のユーザーのホームフォルダに変換されます。異なるPCでも同じbatファイルが使えます。
- `/MIR` オプションにより、Publishフォルダから削除したノートはWebサイトからも自動的に削除されます。
- `pause` により実行後にウィンドウが自動で閉じず、結果を確認できます。

---

## ステップ6：デスクトップにショートカットを作成

`publish.bat` を右クリック → 「ショートカットの作成」→ デスクトップに移動します。

以後はこのショートカットをダブルクリックするだけでサイトが更新されます。

---

## 日常の運用フロー

1. Obsidianで `Publish/` フォルダ内のノートを編集・保存
2. デスクトップの `publish.bat` ショートカットをダブルクリック
3. GitHub Actionsが自動的にビルド・デプロイ
4. `https://GitHubユーザー名.github.io/my-knowledge-site` でサイトが更新される

---

## 複数PCでの運用

別のPCで同じ環境を使う場合は以下の手順を行います：

1. GitをインストールしてGitHubのユーザー情報を設定
2. OneDriveにサインインする（Vaultとmy-knowledge-siteが自動同期される）
3. ObsidianでVaultを開く（OneDrive内のVaultフォルダを指定）
4. `publish.bat` のショートカットをデスクトップに作成
5. 初回の `publish.bat` 実行時にブラウザでGitHubにログイン

---

## テーマのカスタマイズ

### カラーテーマの変更

`quartz-themes` プロジェクト（`https://github.com/saberzero1/quartz-themes`）を使うと、ObsidianのテーマをQuartzに適用できます。

コマンドプロンプトで以下を実行：

```
cd %USERPROFILE%\OneDrive\Obsidian\my-knowledge-site
curl -s -S -o action.bat https://raw.githubusercontent.com/saberzero1/quartz-themes/master/action.bat
action.bat テーマ名
git add .
git commit -m "apply theme"
git push
```

### CSSのカスタマイズ

`quartz/styles/custom.scss` を編集することで、デザインを細かく調整できます。変更後は以下を実行します：

```
cd %USERPROFILE%\OneDrive\Obsidian\my-knowledge-site
git add quartz/styles/custom.scss
git commit -m "update styles"
git push
```

よく使うCSSの例：

```scss
/* コードブロックのpadding調整 */
body pre>code {
  padding: 16px !important;
}

/* テーブルの幅を100%に */
body table {
  width: 100% !important;
  margin: 1rem auto !important;
}

/* 数式ブロックのpadding */
.katex-display {
  padding: 1rem;
  border-radius: 8px;
}

/* 段落のテキストを均等割り付け */
article p, article li {
  text-align: justify;
}
```

---

## ロゴの設定

サイト名をロゴ画像に変更するには、`quartz/static/logo.png` に画像を置き、`custom.scss` に以下を追加します：

```scss
.page-title a {
  display: block;
  width: 200px;
  height: 50px;
  background-image: url('/リポジトリ名/static/logo.png');
  background-size: contain;
  background-repeat: no-repeat;
  text-indent: -9999px;
  overflow: hidden;
}
```

---

## Googleアナリティクスの設定

`quartz.config.ts` に以下を追加するだけで全ページに適用されます：

```typescript
analytics: {
  provider: "google",
  tagId: "G-XXXXXXXXXX"
}
```

---

## 数式の書き方

Quartzでは KaTeX による数式表示に対応しています。

**ブロック数式**（`$$` の前後に必ず改行を入れる）：

```
$$
E = mc^2
$$
```

**インライン数式**：

```
$E = mc^2$
```

---

## 独自ドメインの設定

ネットオウルなどで取得した独自ドメインをGitHub Pagesに設定できます。

1. GitHubのリポジトリの `Settings` → `Pages` でカスタムドメインを入力
2. ドメイン管理サービスのDNS設定でGitHubのサーバーを向ける
3. GitHub PagesがSSL証明書を自動発行（Let's Encrypt）

---

## まとめ

この構成の最大のメリットは、**ノートの更新からサイト公開まですべてが自動化される**点です。ノートを書いて `publish.bat` をダブルクリックするだけで、数分後にはWebサイトが更新されます。

また、OneDriveを使うことで複数のWindowsPC間でVaultを自動同期でき、どの端末からでも同じ運用が可能です。