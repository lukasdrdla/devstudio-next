// This script runs before React hydration to prevent theme flash
// It's injected as an inline script in the <head> of the document

export const themeScript = `
(function() {
  const STORAGE_KEY = 'weware-theme';

  function getTheme() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'dark' || stored === 'light') return stored;
    } catch (e) {
      // localStorage might not be available
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  const theme = getTheme();

  // Add no-transitions class to prevent flash during initial load
  document.documentElement.classList.add('no-transitions');

  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
})();
`
