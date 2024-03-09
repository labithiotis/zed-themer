import { createCookieSessionStorage } from '@remix-run/node';
import { UiTheme } from './UiThemeToggle.tsx';

const store = createCookieSessionStorage({
  cookie: {
    secure: true,
    httpOnly: true,
    name: 'ui-theme',
    secrets: ['ui-theme-secret-key'],
    sameSite: 'lax',
    path: '/',
  },
});

export async function themeSession(request: Request) {
  const session = await store.getSession(request.headers.get('Cookie'));
  return {
    setTheme: (theme: UiTheme) => session.set('theme', theme),
    getTheme: () => session.get('theme') as UiTheme | undefined,
    commit: () => store.commitSession(session),
  };
}
