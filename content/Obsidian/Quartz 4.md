## Quartz の設定をGitHubにpush
```
cd ローカルのQuartzのディレクトリ
git add .
git commit -m "add logo" 
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