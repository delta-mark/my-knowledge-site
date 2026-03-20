import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "悪＠我記",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "ja-JP",
    baseUrl: "quartz.jzhao.xyz",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#f3ead3",       // 背景：温かい古紙のようなベージュ
          lightgray: "#e0d7c3",   // 検索バーや境界
          gray: "#89928b",        // 補助テキスト
          darkgray: "#4c566a",    // 本文：落ち着いたスレートグレー
          dark: "#2d353b",        // 見出し：深い森の緑黒
          secondary: "#35a77c",   // リンク：鮮やかなエメラルドグリーン
          tertiary: "#7fbbb3",    // ホバー：透明感のある青緑
          highlight: "rgba(143, 159, 169, 0.15)",
        },
        darkMode: {
          light: "#232a2e",       // 背景：Enchanted特有のより深い暗緑色
          lightgray: "#2d353b",   // 境界線
          gray: "#859289",        // 補助テキスト
          darkgray: "#d3c6aa",    // 本文：柔らかなアイボリー
          dark: "#e6e2cc",        // 見出し：輝くベージュ
          secondary: "#a7c080",   // リンク：幻想的な若草色
          tertiary: "#dbbc7f",    // ホバー：温かいアンバー（琥珀色）
          highlight: "rgba(143, 159, 169, 0.15)",
        },
      }
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
