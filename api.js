(() => {
  const BASE = 'https://chatgpt.com/backend-api';
  const authStore = () => (self.__ContextBridgeAuth = self.__ContextBridgeAuth || { token: null });

  class ContextBridgeApiError extends Error {
    constructor(message, status = 0) {
      super(message);
      this.name = 'ContextBridgeApiError';
      this.status = status;
    }
  }

  const parseConversationId = (href = location.href) => {
    const url = String(href || '');
    const m = url.match(/(?:https?:\/\/)?(?:www\.)?chatgpt\.com\/(?:g\/[^/]+\/)?c\/([0-9a-f-]{36})(?:[/?#]|$)/i);
    return m ? m[1] : null;
  };

  const waitForToken = (timeout = 4500) => new Promise(resolve => {
    const store = authStore();
    if (store.token) return resolve(store.token);
    const onToken = (event) => {
      const token = (event && event.detail) || document.documentElement?.getAttribute('data-contextbridge-auth');
      if (typeof token === 'string' && token) {
        cleanup();
        store.token = token;
        resolve(token);
      }
    };
    const timer = setTimeout(() => { cleanup(); resolve(authStore().token || null); }, timeout);
    const cleanup = () => {
      clearTimeout(timer);
      document.removeEventListener('contextbridge:auth-token', onToken);
    };
    document.addEventListener('contextbridge:auth-token', onToken);
  });

  async function getAccessToken() {
    const store = authStore();
    if (store.token) return store.token;

    try {
      const r = await fetch('https://chatgpt.com/api/auth/session', {
        credentials: 'include',
        headers: { accept: 'application/json' }
      });
      if (r.ok) {
        const j = await r.json();
        if (j && typeof j.accessToken === 'string' && j.accessToken) {
          store.token = j.accessToken;
          return j.accessToken;
        }
      }
    } catch (_) {}

    const token = await waitForToken();
    if (token) return token;
    throw new ContextBridgeApiError('Authenticated conversation access was not captured. Refresh this ChatGPT tab once, wait for the conversation to finish loading, then Scan again. DOM fallback will still be attempted.', 0);
  }

  const authedFetch = (path, token, init = {}) => fetch(`${BASE}${path}`, {
    credentials: 'include',
    ...init,
    headers: {
      accept: 'application/json',
      authorization: `Bearer ${token}`,
      ...(init.headers || {})
    }
  });

  async function authedJson(path, token) {
    const r = await authedFetch(path, token);
    if (!r.ok) throw new ContextBridgeApiError(`GET ${path} -> ${r.status} ${r.statusText}`, r.status);
    return r.json();
  }

  async function fetchConversation(conversationId, token) {
    return authedJson(`/conversation/${encodeURIComponent(conversationId)}`, token);
  }

  const signedModes = [
    { credentials: 'include', referrerPolicy: 'origin', auth: false },
    { credentials: 'include', referrerPolicy: 'origin', auth: true },
    { credentials: 'omit', referrerPolicy: 'no-referrer', auth: false }
  ];

  const isChatGptHost = (url) => {
    try { return new URL(url).hostname.endsWith('chatgpt.com'); } catch (_) { return false; }
  };

  async function fetchSigned(url, token, expectedMime = '', log = []) {
    for (const mode of signedModes) {
      if (mode.auth && !isChatGptHost(url)) continue;
      try {
        const headers = { accept: '*/*' };
        if (mode.auth) headers.authorization = `Bearer ${token}`;
        const r = await fetch(url, { credentials: mode.credentials, referrerPolicy: mode.referrerPolicy, headers });
        if (!r.ok) { log.push(`signed ${r.status}`); continue; }
        const bytes = new Uint8Array(await r.arrayBuffer());
        return {
          bytes,
          mime: (r.headers.get('content-type') || expectedMime || 'application/octet-stream').split(';')[0].trim(),
          disposition: r.headers.get('content-disposition') || ''
        };
      } catch (error) {
        log.push(String(error && error.message || error));
      }
    }
    return null;
  }

  async function fetchFile(filePointer, conversationId, token) {
    const id = String(filePointer || '').replace(/^sediment:\/\//, '');
    if (!id) throw new ContextBridgeApiError('Missing file id');
    const eid = encodeURIComponent(id);
    const cid = encodeURIComponent(conversationId || '');
    const paths = [
      `/files/download/${eid}?inline=true&check_context_scopes_for_conversation_id=${cid}`,
      `/files/download/${eid}`,
      `/files/download/${eid}?inline=true`,
      `/files/download/${eid}?inline=false`,
      `/files/download/${eid}?conversation_id=${cid}&inline=true`,
      `/files/download/${eid}?conversation_id=${cid}&inline=false`,
      `/files/${eid}/download?conversation_id=${cid}`,
      `/files/${eid}/download`
    ];
    const attempts = [];
    for (const path of paths) {
      try {
        const r = await authedFetch(path, token);
        if (!r.ok) { attempts.push(`${path}:${r.status}`); continue; }
        const body = await r.json();
        if (!body || !body.download_url) { attempts.push(`${path}:no-url`); continue; }
        const got = await fetchSigned(body.download_url, token, body.mime_type || '', attempts);
        if (got) return {
          ...got,
          fileName: body.file_name || body.name || '',
          sourceUrl: body.download_url
        };
      } catch (error) {
        attempts.push(`${path}:${String(error && error.message || error)}`);
      }
    }
    throw new ContextBridgeApiError(`Could not download ${id}. ${attempts.slice(-5).join('; ')}`);
  }

  async function fetchSandboxFile(conversationId, messageId, sandboxPath, token) {
    const path = `/conversation/${encodeURIComponent(conversationId)}/interpreter/download` +
      `?message_id=${encodeURIComponent(messageId)}` +
      `&sandbox_path=${encodeURIComponent(sandboxPath)}`;
    const r = await authedFetch(path, token);
    if (!r.ok) throw new ContextBridgeApiError(`Sandbox download metadata -> ${r.status}`, r.status);
    const body = await r.json();
    if (!body || !body.download_url) throw new ContextBridgeApiError('Sandbox file has no download URL');
    const attempts = [];
    const got = await fetchSigned(body.download_url, token, body.mime_type || '', attempts);
    if (!got) throw new ContextBridgeApiError(`Sandbox download failed. ${attempts.join('; ')}`);
    return { ...got, fileName: body.file_name || '', sourceUrl: body.download_url };
  }

  async function scanApiConversation() {
    const conversationId = parseConversationId();
    if (!conversationId) throw new ContextBridgeApiError('This URL does not contain a ChatGPT conversation id.');
    const token = await getAccessToken();
    const raw = await fetchConversation(conversationId, token);
    return { conversationId, token, raw };
  }

  self.ContextBridgeApi = {
    parseConversationId,
    getAccessToken,
    fetchConversation,
    fetchFile,
    fetchSandboxFile,
    scanApiConversation,
    ContextBridgeApiError
  };
})();
