# ContextBridge Trust & Safety

ContextBridge is designed as a local-first conversation archiver and handoff utility.

## What it does

- Reads the visible conversation branch from the signed-in ChatGPT session.
- Prefers read-only conversation data from ChatGPT's own authenticated web endpoints for reliability.
- Falls back to DOM capture when that path is unavailable.
- Resolves images and files that the current signed-in session is already allowed to access.
- Builds archive files locally in browser memory and downloads one ZIP to the user's device.

## Authentication handling

To make complete long-chat and attachment export practical, ContextBridge can observe the short-lived Bearer token that the ChatGPT web app itself sends with authenticated requests.

The token is:

- kept in memory only;
- never written to `chrome.storage`;
- never placed in exported JSON/Markdown/HTML/PDF/ZIP files;
- never logged by ContextBridge;
- never sent to a ContextBridge server or another third party.

Reloading the page or browser naturally replaces/invalidates it as ChatGPT rotates session credentials.

## What it does not do

- It does not ask for or store a ChatGPT password.
- It does not export cookies.
- It does not bypass login, 2FA, access controls, or account security.
- It does not upload the conversation to a ContextBridge backend.
- It does not attempt to expose hidden system/developer prompts or hidden chain-of-thought/reasoning. API-derived messages marked as hidden or reasoning/analysis are excluded from the user archive.

## Compatibility

ChatGPT's internal web endpoints and DOM are not a public extension API and can change. ContextBridge therefore uses two independent capture paths and records diagnostics in every export.

## User responsibility

Conversation exports may contain sensitive personal, business, academic, or confidential material. Store and share the ZIP carefully.
