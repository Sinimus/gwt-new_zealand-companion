import { useEffect } from 'react';
import { useLocation } from 'react-router';

const APP_TITLE = 'GWT New Zealand Companion';

export const SCREEN_TITLES: Readonly<Record<string, string>> = {
  '/setup': 'Setup',
  '/codex': 'Codex',
  '/tools': 'Tools',
  '/scoring': 'Scoring',
};

export function useDocumentTitle() {
  const { pathname } = useLocation();
  useEffect(() => {
    const screen = SCREEN_TITLES[pathname];
    document.title = screen ? `${screen} · ${APP_TITLE}` : APP_TITLE;
  }, [pathname]);
}
