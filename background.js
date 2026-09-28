chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (!message || message.type !== "CB_FETCH_ASSET" || !message.url) return;

  (async () => {
    try {
      const response = await fetch(message.url, { credentials: "include", cache: "no-store" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const length = Number(response.headers.get("content-length") || 0);
      if (length > 30 * 1024 * 1024) throw new Error("Asset exceeds 30 MB background-fetch limit");
      const buffer = await response.arrayBuffer();
      if (buffer.byteLength > 30 * 1024 * 1024) throw new Error("Asset exceeds 30 MB background-fetch limit");
      const bytes = new Uint8Array(buffer);
      let binary = "";
      const CHUNK = 0x8000;
      for (let i = 0; i < bytes.length; i += CHUNK) {
        binary += String.fromCharCode(...bytes.subarray(i, i + CHUNK));
      }
      sendResponse({
        ok: true,
        base64: btoa(binary),
        mime: response.headers.get("content-type") || "application/octet-stream",
        disposition: response.headers.get("content-disposition") || ""
      });
    } catch (error) {
      sendResponse({ ok: false, error: String(error?.message || error) });
    }
  })();
  return true;
});
