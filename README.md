# OpenEvidence Enter Block

[OpenEvidence](https://www.openevidence.com/) でEnterキーを押すと即座に送信されてしまう問題を解決するTampermonkeyスクリプト。

## 問題

OpenEvidenceではEnterキーで質問が即送信され、改行を入力する手段がない。日本語IMEでは変換確定にもEnterを使うため、変換しただけで送信されてしまう。

## 解決

| キー | 動作 |
|------|------|
| Enter | 改行を挿入 |
| Cmd+Enter (Mac) | 送信 |
| Shift+Enter | 送信（デフォルト動作） |
| IME変換確定Enter | 変換確定のみ（改行なし・送信なし） |

## インストール

1. [Tampermonkey](https://www.tampermonkey.net/) をブラウザにインストール
2. 以下のリンクをクリックしてスクリプトをインストール:

   **[openevidence-enter-block.user.js をインストール](https://github.com/utsumitomki/openevidence-enter-block/raw/main/openevidence-enter-block.user.js)**

3. Tampermonkeyのインストール画面が表示されるので「インストール」をクリック

## 仕組み

OpenEvidenceはReactのイベント委譲を `document` 上で使用している。本スクリプトは `window` のキャプチャフェーズに `keydown` リスナーを登録することで、Reactのハンドラより先にEnterキーイベントを横取りし、送信ロジックへの到達を阻止する。

日本語IME入力時は `stopPropagation`（送信阻止）のみ実行し `preventDefault` を呼ばないことで、変換確定を正常に動作させつつ送信をブロックする。

## ライセンス

MIT
