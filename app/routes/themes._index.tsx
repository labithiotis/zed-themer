import { LoaderFunction, json } from '@remix-run/cloudflare';
import { useLoaderData, useRouteError } from '@remix-run/react';
import { UiThemeToggle } from '~/components/UiThemeToggle';
import { ThemesMetaData } from '../types';

type LoaderData = {
  themes: { id: string; name?: string; author?: string }[];
};

async function fetchAllThemesFromKV(ns?: KVNamespace) {
  const nsList = await ns?.list<ThemesMetaData>();
  return nsList?.keys.map((key) => ({ id: key.name, name: key.metadata?.name, author: key.metadata?.author }));
}

export const loader: LoaderFunction = async ({ context }) => {
  const themes = await fetchAllThemesFromKV(context.env?.themes);
  return json({ themes });
};

export default function Themes() {
  const { themes } = useLoaderData<LoaderData>();

  return (
    <div className="flex h-screen w-full content-stretch bg-stone-300 dark:bg-stone-900 dark:text-zinc-200">
      <div className="flex w-full flex-col px-6 py-4">
        <span className="mb-2 flex text-xl font-semibold text-zed-800 dark:text-zed-400">
          <span className="flex-1">Zed Themes</span>
          <UiThemeToggle />
        </span>
        <div className="flex w-full justify-center pb-6">
          <div className="grid w-full max-w-[1600px] gap-6 sm:grid-cols-2 md:grid-cols-3">
            {themes?.map((theme) => (
              <div key={theme.id} className="items flex min-h-6 flex-col gap-2">
                <div className="flex flex-col overflow-hidden">
                  <div className="flex">
                    <h4 className="flex-1 text-lg">{theme.name}</h4>
                    <a
                      href={'/download/themes/' + theme.id}
                      className="flex h-6 w-6 items-center justify-center rounded hover:bg-neutral-200 dark:hover:bg-neutral-800"
                      aria-label={`Download ${theme.name} zed theme`}
                    >
                      <svg
                        width="16px"
                        height="16px"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 3V16M12 16L16 11.625M12 16L8 11.625"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M15 21H9C6.17157 21 4.75736 21 3.87868 20.1213C3 19.2426 3 17.8284 3 15M21 15C21 17.8284 21 19.2426 20.1213 20.1213C19.8215 20.4211 19.4594 20.6186 19 20.7487"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  </div>

                  <p className="overflow-hidden text-ellipsis text-nowrap text-xs opacity-60">By {theme.author}</p>
                </div>
                <a
                  href={'/themes/' + theme.id}
                  className="h-full w-full flex-1 cursor-pointer rounded outline outline-2 outline-offset-4 outline-transparent transition-all hover:outline-zed-800 dark:hover:outline-neutral-600"
                >
                  <img
                    className="h-full w-full"
                    src={`/themes/preview.svg?id=${theme.id}`}
                    width="100%"
                    height="100%"
                    alt={`${theme.name} preview`}
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  return (
    <div>
      <h1>Themes Error</h1>
      <p>{error instanceof Error ? error?.message : 'Something went wrong'}</p>
      <pre>{error instanceof Error ? error?.stack : ''}</pre>
    </div>
  );
}
