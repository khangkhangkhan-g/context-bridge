(() => {
  const store = (self.__ContextBridgeAuth = self.__ContextBridgeAuth || { token: null });
  document.addEventListener('contextbridge:auth-token', (event) => {
    const token = (event && event.detail) || document.documentElement?.getAttribute('data-contextbridge-auth');
    if (typeof token === 'string' && token) store.token = token;
  });
})();
