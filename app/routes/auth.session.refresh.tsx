import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { parse } from 'cookie';
import { routes } from '~/utils/constants';
import { authCookieNames, createHeadersFromTokens } from '~/utils/supertokens/cookieHelpers.server';
import SuperTokensHelpers from '~/utils/supertokens/index.server';

export const loader: LoaderFunction = async ({ request }) => {
  const cookies = parse(request.headers.get('Cookie') ?? '');
  const refreshToken = cookies[authCookieNames.refresh] ?? '';
  const antiCsrfToken = cookies[authCookieNames.csrf];
  const newTokens = await SuperTokensHelpers.refreshToken({
    refreshToken,
    antiCsrfToken,
  });

  const url = new URL(request.url);
  const headers = createHeadersFromTokens(newTokens);
  headers.set('Location', newTokens.accessToken ? url.searchParams.get('returnUrl') || '/' : routes.login);
  return new Response(null, {
    status: newTokens.accessToken ? 307 : 303,
    headers,
  });
};

export const action = loader as ActionFunction;
