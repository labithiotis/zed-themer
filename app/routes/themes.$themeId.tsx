import { LoaderFunctionArgs, TypedResponse, json } from '@remix-run/cloudflare';
import { useLoaderData, useSearchParams } from '@remix-run/react';
import { useEffect } from 'react';
import invariant from 'tiny-invariant';
import { Preview } from '~/components/preview/Preview';
import { Side } from '~/components/side/Side';
import { useTheme } from '~/providers/theme';
import { ThemeFamilyContent } from '../themeFamily';

type LoaderData = {
  theme?: ThemeFamilyContent;
};

export const loader = async ({ context, params }: LoaderFunctionArgs): Promise<TypedResponse<LoaderData>> => {
  const themesKv = context.env?.zed_themes;
  const sharesKv = context.env?.zed_shares;

  invariant(params.themeId);

  const theme = (await themesKv?.get(params.themeId)) ?? (await sharesKv?.get(params.themeId));

  return json({ theme: theme ? JSON.parse(theme) : undefined });
};

export default function ThemeById() {
  const [searchParams] = useSearchParams();
  const data = useLoaderData<typeof loader>();
  const { theme, themeFamily, dispatch } = useTheme();

  useEffect(() => {
    const dataTheme = data?.theme;
    if (dataTheme && dataTheme?.name !== themeFamily?.name) {
      dispatch({ type: 'set', themeFamily: dataTheme, themeName: searchParams.get('name') });
    }
  }, [data, themeFamily, dispatch, searchParams]);

  return (
    <div className="flex h-full min-w-[1024] overflow-hidden bg-stone-300 dark:bg-stone-900">
      <Side edit={false} />
      {!!theme && <Preview />}
    </div>
  );
}
