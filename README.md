<div align="center">

# ContextBridge for ChatGPT

### Carry a long AI conversation into the next chat without rebuilding the context from zero.

A local-first Chrome extension that turns the current ChatGPT conversation into a portable ZIP archive with text, formatting, images, downloadable files, code, tables, PDF, JSON, and an AI-ready handoff pack.

**English / Tiếng Việt UI included**

</div>

---

## What problem does it solve?

Long project chats often accumulate decisions, screenshots, code versions, bugs, files, and terminology. Starting a fresh chat can mean explaining everything again.

ContextBridge creates two things at once:

1. A **full archive** for preservation.
2. A smaller **handoff pack** designed to help a new AI chat recover the recent working context quickly.

It does not claim to restore hidden model memory. It exports the visible conversation branch from the signed-in ChatGPT session. V1.1 uses read-only conversation data when available and falls back to the rendered page DOM when needed.

---

## Main output

One export creates a ZIP similar to:

```text
ContextBridge_Project_2026-09-28.zip
├── README_FIRST.txt
├── archive/
│   ├── conversation.html
│   ├── conversation.pdf
│   ├── conversation.md
│   └── conversation.json
├── handoff/
│   ├── CONTINUE.md
│   ├── context.json
│   └── prompts/
│       ├── ULTIMATE_CONTINUE.txt
│       ├── ULTIMATE_CONTINUE_EN.txt
│       └── ULTIMATE_CONTINUE_VI.txt
├── messages/
│   ├── user/
│   └── assistant/
├── outputs/
│   ├── text/
│   │   ├── user/
│   │   └── assistant/
│   ├── code/
│   │   ├── user/
│   │   └── assistant/
│   ├── tables/
│   │   ├── user/
│   │   └── assistant/
│   ├── links/
│   │   ├── user/
│   │   └── assistant/
│   ├── images/
│   │   ├── user/
│   │   └── assistant/
│   └── files/
│       ├── user/
│       └── assistant/
└── metadata/
    ├── manifest.json
    ├── export_report.txt
    ├── export_report_final.txt
    └── unresolved/
```

Images are exported as real image files. JSON stores references and metadata instead of embedding huge Base64 strings.

---

## Features

- Scans the current ChatGPT conversation.
- Uses authenticated conversation data first, which avoids losing older virtualized turns.
- Falls back to DOM scrolling/harvesting if conversation data is unavailable.
- Separates user and assistant messages.
- Preserves rich HTML in the browser archive.
- Exports Markdown and structured JSON.
- Creates a visual PDF snapshot of the conversation.
- Extracts images into separate user/assistant folders.
- Downloads user-uploaded images and file attachments when ChatGPT exposes their file identifiers.
- Downloads generated sandbox files referenced by `sandbox:/mnt/data/...` links when available.
- Extracts code blocks into individual source files.
- Extracts tables as CSV.
- Extracts links as CSV.
- Creates one HTML and Markdown file for every message.
- Creates `handoff/CONTINUE.md` with recent full messages and an index of earlier context.
- Creates `handoff/context.json` for machine-readable continuation.
- English and Vietnamese interface.
- Scrollable Ultimate Continuation prompt clipboard with one-click copy.
- The continuation prompt automatically follows the EN/VI language selector.
- Draggable floating chip.
- Resizable panel.
- Local-first. No backend required.

---

## Install

1. Download or clone this folder.
2. Open Chrome and go to:

```text
chrome://extensions
```

3. Turn on **Developer mode**.
4. Click **Load unpacked**.
5. Select the extracted `ContextBridge` version folder.
6. Open or refresh ChatGPT.

The floating **ContextBridge** chip should appear.

---

## Use

1. Open the ChatGPT conversation you want to preserve.
2. Click **ContextBridge**.
3. Choose the scope:
   - Entire conversation
   - Last 50 messages
4. Choose the handoff depth: 20, 50, or 100 recent messages.
5. Keep the desired export formats enabled.
6. Click **Scan chat**.
7. Review the message, image, file, and code counts.
8. Click **Export ZIP**.
9. Keep the ChatGPT tab open until the export completes.

For a new AI chat, start with:

```text
handoff/CONTINUE.md
```

Then paste the Ultimate Continuation prompt from the HUD clipboard or use:

```text
handoff/prompts/ULTIMATE_CONTINUE.txt
```

The HUD prompt and the language-selected file follow the current EN/VI setting.

If the new chat needs more detail, add:

```text
archive/conversation.md
archive/conversation.json
```

Then add only the relevant files/images from `outputs/` when needed.

---

## Archive vs Handoff

### `archive/`
Designed for preservation and complete reference.

- HTML is the highest-fidelity format.
- PDF is a visual snapshot.
- Markdown is portable and easy for AI systems to read.
- JSON preserves structure and references.

### `handoff/`
Designed for continuing work in a new chat.

`CONTINUE.md` contains:

- conversation metadata
- an index of older messages
- full recent messages
- output inventory
- a bootstrap instruction for the next AI

It is deterministic. ContextBridge V1 does not secretly send the conversation to an external AI to summarize it.

---

## Privacy and safety

- ContextBridge does not ask for your ChatGPT password.
- It does not read or export browser cookies.
- For reliable full-chat capture, V1.1 can observe the short-lived Bearer token that the signed-in ChatGPT page already uses and make read-only requests to ChatGPT's own conversation/file endpoints.
- That token is kept in memory only: it is not written to Chrome storage, logs, ZIP exports, or third-party servers.
- If authenticated conversation capture is unavailable, ContextBridge falls back to the rendered DOM.
- It does not bypass authentication or account security.
- Export generation happens locally in the browser.
- The final archive is downloaded to your device.
- Some assets may require normal signed/authenticated ChatGPT URLs to be fetched while the tab is open.
- Failed assets are recorded instead of being silently omitted.

Review `metadata/export_report.txt` after important exports.

---

## Known limitations

ChatGPT is a third-party service and both its web DOM and undocumented internal conversation endpoints can change. ContextBridge therefore uses an API-first + DOM-fallback design rather than depending on only one extraction path.

Some attachments may be:

- protected behind temporary URLs
- expired
- represented by UI cards without a directly downloadable URL
- hosted on a domain not included in the extension's host permissions

When a file cannot be downloaded, ContextBridge saves a `.url.txt` reference and records the failure.

The PDF is a visual archive generated from locally drawn text and successfully downloaded images. This deliberately avoids cross-origin canvas tainting. Advanced ChatGPT UI styling may still be simplified. Use `conversation.html` when richer formatting matters most.

---

## Developer

**Nguyen Khang Pham**

- GitHub: https://github.com/khangkhangkhan-g
- Email: nguyenkhangpham1306@gmail.com

ContextBridge is an independent project and is not affiliated with, sponsored by, or developed by OpenAI.


## V1.0.1 scanner fix

- Removed the old assumption that ChatGPT message nodes must live inside `<main>`.
- Added support for current `data-message-author-role`, `conversation-turn-*`, `data-turn-key`, `data-conversation-role`, and user-bubble renderer variants.
- Scans while scrolling so virtualized/older turns can be harvested instead of only reading the DOM at one moment.
- Adds compact diagnostics if no turns are detected.


---

## V1.1 reliability notes

When scanning succeeds through the preferred path, the HUD reports:

```text
Source: authenticated conversation data
```

This path can recover the active conversation branch even when old turns are no longer mounted in the DOM. It also exposes file/image metadata needed to download assets.

If the HUD reports `Source: DOM fallback`, the export can still work, but asset and very-long-chat completeness depends on what the current page exposes.

For best results after updating the extension, reload it in `chrome://extensions` and then hard-refresh the ChatGPT tab with `Ctrl+Shift+R` before scanning.


## Source prompt copies

The built-in continuation prompts are also included in `prompts/ULTIMATE_CONTINUE_EN.txt` and `prompts/ULTIMATE_CONTINUE_VI.txt` for easy review and reuse.

## Ultimate Prompt modes

ContextBridge includes three continuation modes in the HUD:

- **Continue / Tiếp tục** - continue one previous conversation or project in a new chat.
- **Merge Contexts / Gộp ngữ cảnh** - load two unrelated ContextBridge packages into the same workspace while keeping project-local rules isolated.
- **Reconcile Branches / Hợp nhất nhánh** - combine two packages that share a common history, analyze only post-branch changes, detect conflicts/regressions, and reconstruct one reconciled current state.

Use the small **i** information button next to the selector for an in-app explanation of all three modes. The selector and explanations follow the main EN / VI language setting.
