# ContextBridge V1.1.3

- Added three Ultimate Prompt modes: Continue, Merge Contexts, and Reconcile Branches.
- Added a small circular information button next to the prompt-mode selector.
- Clicking the information button explains the purpose of all three prompt modes.
- Prompt-mode names and explanations switch automatically with EN / VI.
- Selected prompt mode is remembered in Chrome local storage.
- Copy now copies the currently selected Ultimate Prompt.
- Export ZIP now includes English and Vietnamese versions of all three Ultimate Prompt modes plus `ULTIMATE_SELECTED.txt`.
- No changes to conversation capture, attachments, PDF generation, or authenticated data logic.

---

# ContextBridge V1.1.2

- Added a dedicated scrollable continuation-prompt clipboard inside the HUD.
- Added a one-click Copy button for the continuation prompt.
- The prompt automatically switches between English and Vietnamese with the main EN/VI dropdown.
- Added English and Vietnamese Ultimate Continuation prompts focused on project continuity, protocol recovery, version precedence, debugging, UI/UX continuity, security, and file awareness.
- Export ZIP now includes `handoff/prompts/ULTIMATE_CONTINUE_EN.txt`, `ULTIMATE_CONTINUE_VI.txt`, and a language-selected `ULTIMATE_CONTINUE.txt`.
- No changes to the conversation capture, image/file download, PDF, or authentication logic.

---

# ContextBridge V1.1.1

- Increased the default panel width to 560 px.
- Increased the minimum resizable panel width to 460 px and the maximum to 780 px.
- Moved the default floating ContextBridge chip upward.
- Added a one-time migration for the old narrow/default bottom-right layout.
- Added a visible pre-scan reminder to load/scroll through older turns.
- Expanded the English and Vietnamese Guide instructions before the Scan step.

---

# Changelog

## 1.1.0

- Rebuilt conversation capture around a two-layer strategy:
  - authenticated conversation-data capture first
  - current ChatGPT DOM fallback second
- Fixed exports that contained only accessibility labels such as "ChatGPT said" instead of the actual reply.
- Added current `section[data-turn="user|assistant"]` DOM fallback support.
- Added image extraction from `image_asset_pointer` conversation parts.
- Added uploaded-file extraction from message attachment metadata.
- Added generated sandbox-file download support for `sandbox:/mnt/data/...` links.
- Added structured per-message JSON under `outputs/structured/`.
- Replaced foreignObject/cross-origin PDF rendering with a local canvas renderer, preventing `Tainted canvases may not be exported` failures.
- Increased HUD typography for readability.
- Added developer copyright footer linked to Nguyen Khang's Facebook profile.
- Access token is memory-only and is never persisted or exported.
