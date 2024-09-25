import type { AppLoadContext, EntryContext } from '@remix-run/cloudflare';
import { RemixServer } from '@remix-run/react';
import * as Sentry from '@sentry/remix';
import * as isbotModule from 'isbot';
import { renderToReadableStream } from 'react-dom/server';

export const handleError = Sentry.wrapHandleErrorWithSentry((error, { request }) => {
  // Custom handleError implementation
});

export default async function handleRequest(
  request: Request,
  code: number,
  headers: Headers,
  remixContext: EntryContext,
  loadContext: AppLoadContext,
) {
  let status = code;
  const body = await renderToReadableStream(<RemixServer context={remixContext} url={request.url} />, {
    signal: request.signal,
    onError(error: unknown) {
      // Log streaming rendering errors from inside the shell
      console.error(error);
      status = 500;
    },
  });

  if (isBotRequest(request.headers.get('user-agent'))) {
    await body.allReady;
  }

  headers.set('Content-Type', 'text/html');
  return new Response(body, { headers, status });
}

// We have some Remix apps in the wild already running with isbot@3 so we need
// to maintain backwards compatibility even though we want new apps to use
// isbot@4.  That way, we can ship this as a minor Semver update to @remix-run/dev.
function isBotRequest(userAgent: string | null) {
  if (!userAgent) {
    return false;
  }

  // isbot >= 3.8.0, >4
  if ('isbot' in isbotModule && typeof isbotModule.isbot === 'function') {
    return isbotModule.isbot(userAgent);
  }

  // isbot < 3.8.0
  if ('default' in isbotModule && typeof isbotModule.default === 'function') {
    return isbotModule.default(userAgent);
  }

  return false;
}
