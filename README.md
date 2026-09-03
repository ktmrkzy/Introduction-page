# Introduction Page

勝村和也（Kazuya Katsumura）のプロフィール、スキル、活動歴、対外発表、経歴、外部リンクを紹介する静的ポートフォリオサイトです。

サイトの表示内容はHTMLに直接書き込まず、`datas/` 配下のJSONファイルから読み込んでいます。コードを大きく変更せずに、プロフィールや実績を更新できます。

## Features

- プロフィールと背景画像の表示
- プロフィール画像のスライドショー
- スキルカードと詳細モーダル
- 活動歴、対外発表、経歴の一覧表示
- 各一覧の詳細ページ
- GitHub、Email、LinkedIn、Noteなどの外部リンク
- PCとモバイルに対応したレスポンシブレイアウト

## Requirements

- モダンブラウザ（Google Chrome、Microsoft Edge、Firefoxなど）
- ローカル確認時は、JSONを取得できるHTTPサーバー

Node.jsなどのビルドツールや外部ライブラリは使用していません。

## Getting Started

`fetch()` でJSONを読み込むため、`index.html` をファイルとして直接開くのではなく、HTTPサーバー経由で表示してください。

### VS Codeで確認する場合

1. このフォルダーをVS Codeで開きます。
2. Live Serverなどの拡張機能で `index.html` を起動します。
3. 表示されたローカルURLをブラウザで開きます。

### Pythonで確認する場合

Python 3がインストールされていれば、プロジェクトのルートで次を実行します。

```powershell
python -m http.server 8000
```

ブラウザで <http://localhost:8000> を開きます。終了するときは、サーバーを起動したターミナルで `Ctrl+C` を押します。

## Project Structure

```text
.
├── index.html                  # トップページ
├── activities-detail.html      # 活動歴の詳細ページ
├── presentations-detail.html  # 対外発表の詳細ページ
├── experience-detail.html     # 経歴の詳細ページ
├── script.js                   # JSONの読み込みと画面描画
├── style/
│   └── style.css               # 共通スタイル
├── datas/                      # 表示データ
│   ├── profile.json            # サイト名、氏名、所属、紹介文など
│   ├── skills.json             # スキルと詳細説明
│   ├── activities.json         # 活動歴
│   ├── presentations.json     # 対外発表
│   ├── experience.json         # 経歴
│   ├── social.json             # 外部リンク
│   └── images.json             # プロフィール画像一覧
└── images/                     # ヒーロー、プロフィール、スキル画像
```

## Updating Content

JSONを編集したあと、ブラウザを再読み込みすると内容が反映されます。JSONの構文を壊すと該当データが表示されないため、文字列はダブルクォートで囲み、最後の項目にはカンマを付けないでください。

### Profile: `datas/profile.json`

| キー | 内容 |
| --- | --- |
| `siteName` | ナビゲーションに表示するサイト名 |
| `heroImage` | ヒーロー背景画像の相対パス |
| `name` | 氏名 |
| `title` | 肩書き |
| `affiliation` | 所属 |
| `hobbies` | 興味・趣味 |
| `comment` | プロフィール紹介文 |
| `footer` | フッターの表示文 |

### Skills: `datas/skills.json`

各スキルに `name`、`description`、`level`、`detail`、`image` を指定します。`image` が空文字の場合、詳細モーダルでは画像を表示しません。

```json
{
	"skills": [
		{
			"name": "Python",
			"description": "Python programming skills",
			"level": "Intermediate",
			"detail": "Experience using Python for data science.",
			"image": ""
		}
	]
}
```

### Lists: `activities.json`, `presentations.json`, `experience.json`

- トップページでは各一覧の先頭3件を表示します。
- 詳細ページでは全件を表示します。
- 配列の後ろにある項目が新しい項目として表示されるため、基本的に古い順に追加します。
- 活動歴は `date`、`title`、`description` を使用します。
- 対外発表は `date`、`title`、`description`、`venue` を使用します。
- 経歴は `period`、`title`、`description` を使用します。

### Links and Images

`datas/social.json` の `links` 配列に `name`、`icon`、`url`、`description` を追加すると、Linksセクションにリンクを追加できます。画像を追加する場合は、画像ファイルを `images/` 配下に置き、JSONではプロジェクトルートからの相対パスを指定します。

## Deployment

ビルドは不要です。リポジトリ内のHTML、CSS、JavaScript、JSON、画像ファイルをそのまま静的ホスティングへ配置できます。GitHub Pagesなどのサブパスで公開する場合も、現在の相対パス構成を維持してください。

## Troubleshooting

### JSONの内容が表示されない

- HTTPサーバー経由でページを開いているか確認します。
- 開発者ツールのConsoleでJSONのパスや構文エラーを確認します。
- ブラウザから `datas/profile.json` などのURLを直接開き、ファイルを取得できるか確認します。

### 画像が表示されない

JSONに指定したパスの大文字・小文字と、実際のファイル名が一致しているか確認します。パスはJSONファイルからではなく、サイトのルートから指定します。
