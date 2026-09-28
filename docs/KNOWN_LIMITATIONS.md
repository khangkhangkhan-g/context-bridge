# Known Limitations

1. ChatGPT's internal web endpoints and DOM can change, so compatibility updates may occasionally be required.
2. The preferred authenticated-data path requires the extension to be active when the ChatGPT page loads so it can observe the page's normal authenticated traffic. After updating/reloading the extension, hard-refresh the ChatGPT tab once.
3. If authenticated capture is unavailable, ContextBridge falls back to DOM harvesting; very old virtualized turns and attachment metadata may then be incomplete.
4. Protected, deleted, expired, or access-restricted files can still fail to download. Failures are recorded under `metadata/unresolved/` and in the export report.
5. The PDF intentionally uses a simplified local renderer to avoid cross-origin canvas security failures. HTML remains the richest reading/archive format.
6. ZIP entries use the standard non-Zip64 format. Extremely large archives above normal browser-memory limits are not recommended.
7. Very large conversations with many large images/files can consume substantial browser memory while the ZIP is assembled.
8. The handoff is deterministic, not an AI-generated semantic summary in V1.1.
9. Only the active visible conversation branch is exported. Abandoned regenerated branches are not intentionally included.
