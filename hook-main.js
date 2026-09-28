(() => {
  if (window.__contextBridgeAuthHookInstalled) return;
  window.__contextBridgeAuthHookInstalled = true;

  const emit = (value) => {
    try {
      if (typeof value !== 'string' || !value.startsWith('Bearer ')) return;
      const token = value.slice(7).trim();
      if (!token) return;
      document.documentElement?.setAttribute('data-contextbridge-auth', token);
      document.dispatchEvent(new Event('contextbridge:auth-token'));
      document.documentElement?.removeAttribute('data-contextbridge-auth');
    } catch (_) {}
  };

  const readAuth = (headers) => {
    try {
      if (!headers) return null;
      if (headers instanceof Headers) return headers.get('authorization') || headers.get('Authorization');
      if (Array.isArray(headers)) {
        for (const pair of headers) {
          if (Array.isArray(pair) && String(pair[0]).toLowerCase() === 'authorization') return pair[1];
        }
      }
      if (typeof headers === 'object') return headers.authorization || headers.Authorization || null;
    } catch (_) {}
    return null;
  };

  const originalFetch = window.fetch;
  if (typeof originalFetch === 'function') {
    window.fetch = function(input, init) {
      try {
        let auth = readAuth(init && init.headers);
        if (!auth && input && typeof input === 'object') auth = readAuth(input.headers);
        emit(auth);
      } catch (_) {}
      return originalFetch.apply(this, arguments);
    };
  }

  const originalSetRequestHeader = XMLHttpRequest.prototype.setRequestHeader;
  XMLHttpRequest.prototype.setRequestHeader = function(name, value) {
    try {
      if (String(name).toLowerCase() === 'authorization') emit(value);
    } catch (_) {}
    return originalSetRequestHeader.apply(this, arguments);
  };
})();
