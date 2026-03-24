～デジタルガーデンを無料で育てる静的サイトジェネレーター～
![[Pasted image 20260325000819.png]]
## はじめに

Quartz は、Markdown コンテンツを完全に機能する Web サイトへと変換する、高速で多機能な静的サイトジェネレーターです。 学生・開発者・教師を問わず、個人ノートやデジタルガーデンを Web 上に公開するために広く使われています。作者は Jacky Zhao 氏で、GitHub 上でオープンソースとして公開されています。

## Quartz 4 が生まれた背景

Quartz は、Obsidian Publish の無料代替として作られました。 Obsidian Publish は月額料金が発生するのに対し、Quartz を使えば GitHub Pages や Cloudflare Pages などの無料ホスティングサービスを組み合わせて、費用をかけずに同等のサイトを構築できます。

Quartz v4 は、エンドユーザーの拡張性と使いやすさを重視してゼロから書き直されたバージョンです。それ以前のバージョン（v3）は Hugo をベースとしていましたが、v4 では TypeScript と esbuild を中心とした独自のビルドシステムへと刷新されました。

## 主な機能

Quartz には、Obsidian との互換性、全文検索、グラフビュー、Wikiリンク、トランスクルージョン（他ノートの埋め込み）、バックリンク、LaTeX、シンタックスハイライト、ポップオーバープレビュー、Docker サポート、国際化（i18n）、コメント機能など、多彩な機能が最初から搭載されています。

特筆すべき機能をいくつか挙げます。

**グラフビュー**：ノート間のリンク関係を視覚的なネットワーク図として表示します。Obsidian のグラフビューに近い体験を Web 上で再現できます。

**ポップオーバープレビュー**：リンクにカーソルを合わせると、リンク先のページ内容をポップアップで確認できます。

**Wikiリンク対応**：`[[ページ名]]` 形式の Obsidian 式リンクをそのまま Web 上でも有効な内部リンクとして扱います。

## 技術的な仕組み

Quartz は静的サイトジェネレーターです。`npx quartz build` を実行すると、TypeScript で書かれた Quartz 本体を esbuild でトランスパイル・バンドルし、Markdown コンテンツを処理してHTMLファイルとして出力します。

設定は `quartz.config.ts`（サイト全体の設定）と `quartz.layout.ts`（レイアウト）の2つの TypeScript ファイルで管理します。プラグインシステムを通じて、コンテンツのパース・フィルタリング・ページ生成の各段階をカスタマイズできます。

## セットアップの流れ

Node.js v22 以上と npm v10.9.2 以上が必要です。以下のコマンドを順に実行することでセットアップできます。

```bash
git clone https://github.com/jackyzha0/quartz.git
cd quartz
npm i
npx quartz create
```

あとは `content/` フォルダに Markdown ファイルを置き、`npx quartz build --serve` でローカルプレビューを確認しながら開発できます。

## デジタルガーデンとの相性

Quartz を選ぶ理由として、Obsidian からそのまま編集できる利便性と、無料でホスティングできるコスト面が挙げられます。また、機能を拡張・改善するコミュニティが非常に活発で、新機能のマージがほぼ毎日行われています。 [Be-far](https://be-far.com/Projects/Obsidian/digital-garden)

「デジタルガーデン」とは、完成された記事ではなく成長途中の思考メモや学習記録を公開する考え方です。バックリンクやグラフビューによってノート間のつながりを可視化できる Quartz は、この文化と特に相性が良いツールです。
## Quartz の設定をGitHubにpush
```
cd ローカルのQuartzのディレクトリ
git add .
git commit -m "何を変更したかのメッセージ" 
git push
```

## トップページの設置と編集

トップページは `content/index.md` というファイルが対応。

実際の運用としては、`index.md` をVault内のWeb公開用フォルダのトップディレクトリに置く。このファイルの内容がトップページの内容として反映される。

## テーマの適用

利用可能なテーマ一覧
https://github.com/saberzero1/quartz-themes

テーマの反映
```
cd ローカルのQuartzのディレクトリ
action.bat テーマ名
git add .
git commit -m "change theme"
git push
```

## サンプルサイト
**Quartz 4** は、ObsidianなどのMarkdownノートを美しく、高速なWebサイト（デジタルガーデン）として公開するための静的サイトジェネレーター。

数千人以上のユーザーが利用していると言われているが、特に公開されている代表的な事例や、構造が参考になるサイトをいくつかピックアップ。

---
### 1. 公式・ショーケースサイト

「Quartz 4 で何ができるか」を知るための標準的なサイト。

- **[Quartz 4 公式ドキュメント](https://quartz.jzhao.xyz/)**
	- 開発者のJacky Zhao氏自身によるサイト。Quartz 4の全機能（グラフビュー、バックリンク、検索など）が網羅されており、最も標準的な構成が確認できる。	  
- **[Jacky Zhao's Digital Garden](https://jzhao.xyz/)**
	- 開発者の個人サイト。Quartzのカスタマイズの極致とも言える内容で洗練されている。       

### 2. 学習・ナレッジベース（Digital Gardens）

Quartz 4 は、個人の学習記録や「デジタルガーデン」として使われることが多い。

- **[Rakshan Shetty's Brain](https://brain.rakshanshetty.in/)**    
	- Obsidianから特定のタグが付いたものだけを公開する「マルチサイト公開」の仕組みを解説・実践しているサイト。
- **[Juha-Matti Santala (Hamatti) Notes](https://notes.hamatti.org/)**    
    - テクノロジー、ゲーム（ポケモンTCGなど）、DIYなど多岐にわたるトピックをQuartzで整理している。 
- **[Christopher Klint's Blog](https://christopherklint.com/)**    
    - Cloudflare PagesとQuartzを組み合わせたモダンな構成のブログ・ナレッジベース。

### 3. 日本国内の活用事例

日本語環境での表示や、日本での活用法が参考になるサイト。

- **[ikorihn's Digital Garden](https://ikorihn.github.io/digitalgarden/)**    
    - GitHub Pagesで公開されている事例。Obsidianのメモを無料で公開する手順などもまとめられている。        
- **[かなを氏の仕様書ナレッジベース](https://note.com/kanawoo/n/n1de8e64b0032)**（※紹介記事）    
    - Obsidian × Quartz × Cursorを組み合わせ、社内の仕様書をAI活用可能なナレッジベースとして構築した事例。        

---
### Quartz 4 サイトの見分け方

多くのQuartzサイトには共通の特徴があるため、ネット上で以下の要素を見かけたらQuartz 4で構築されている可能性が高いと言える。

1. **右側のグラフビュー**: ノート同士のつながりが網羅的に表示されている。    
2. **バックリンク**: 記事の下部に「どの記事からリンクされているか」が表示されている。    
3. **ポップオーバープレビュー**: リンクにカーソルを合わせると、リンク先の内容が小窓で表示される。

## まとめ

Quartz 4 は、Markdown ノートを洗練された Web サイトへと変換するためのオープンソースツールです。Obsidian との高い互換性、豊富な標準機能、そして TypeScript によるカスタマイズ性の高さが特徴で、デジタルガーデンや個人ノートサイトの構築に適した選択肢のひとつです。無料で始められる点も、多くのユーザーに支持される理由となっています。