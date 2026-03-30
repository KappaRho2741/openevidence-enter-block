# OpenEvidence Enter Block

Tampermonkey userscript that prevents accidental submission on [OpenEvidence](https://www.openevidence.com/) when pressing Enter.

## Problem

OpenEvidence submits your query when you press Enter, with no way to insert a newline. This is especially frustrating with Japanese IME, where Enter is used to confirm character conversion.

## Solution

| Key | Action |
|-----|--------|
| Enter | Insert newline |
| Cmd+Enter (Mac) | Submit |
| Shift+Enter | Submit (default behavior) |
| IME Enter | Confirm conversion (no newline, no submit) |

## Install

1. Install [Tampermonkey](https://www.tampermonkey.net/) for your browser
2. Click the link below to install the script:

   **[Install openevidence-enter-block.user.js](https://github.com/utsumitomki/openevidence-enter-block/raw/main/openevidence-enter-block.user.js)**

3. Tampermonkey will prompt you to install — click "Install"

## How it works

OpenEvidence uses React with event delegation on `document`. The script registers a `keydown` listener on `window` in the capture phase, which fires before React's handler. Enter key events are intercepted and prevented from reaching React's submission logic.

For IME input, the script uses `stopPropagation` without `preventDefault`, allowing character conversion to complete normally while still blocking submission.

## License

MIT
