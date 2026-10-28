# ComfyUI比較表

公開URL: https://comfyui-cost-table.earthkey.workers.dev/

動画・画像・AIモデル・3Dモデル生成の比較サイト。純粋な静的HTML/CSS/JavaScriptです。

## 公開と更新

- `node build.mjs`: 明示した公開ファイルだけをdistへコピーし、動画表からindex.htmlを生成します。
- `npm run preview`: Cloudflare Workersをローカルプレビューします。
- `npm run deploy`: ビルド後、認証済みWranglerでWorkers Static Assetsへ公開します。
- `vercel.json`: 旧Vercel URLからCloudflareへ、パスを保つ恒久リダイレクトです。
- 構成・公開ファイルの正本は別途管理しています。生成されたindex.htmlとdistを直接編集しないでください。

## 3D料金データ

`3d-models.json`がデータ、HTMLにはJavaScript無効時の固定表も保持しています。更新時は両方を同期し、10件の件数、出典、追加料金、確認日、PC/スマホの表示を確認してください。品質順位は未測定です。
fal直接料金とComfyUIパートナーノード料金を混ぜないでください。SAMのunit課金、Rodinのtier、TRELLIS 2の解像度別価格に注意してください。

## 画像方針

既存のOG画像WebPを使用しています。モデル生成例と誤認させる画像は追加していません。3Dページも共通OG画像を利用しています。

## セキュリティ

生成APIを実行しません。APIキーは不要です。公開ファイルはbuild.mjsのホワイトリストに限定し、認証情報や管理資料を配信しません。

## 品質・用途別推奨

3d-models.jsonのquality_researchに出典と用途別推奨、各qualityに強み・注意点・根拠・適用範囲を保持します。外部評価は単画像モデルの参考値で、複数画像APIや旧版へ転用しません。HTMLには用途カードと品質欄の固定表示もあるので、データと同時に更新してください。当サイト独自の生成品質・変形・印刷・採用率は未測定です。スコアと価格の単純な割り算によるランキングは作りません。
