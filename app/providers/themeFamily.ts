import type { ThemeFamilyContent } from '~/themeFamily';
import { type PartialRecursive, merge } from '~/utils/helpers';

export function createThemeFamily(theme: PartialRecursive<ThemeFamilyContent>): ThemeFamilyContent {
  return merge(
    {
      name: '',
      author: '',
      themes: [
        {
          name: '',
          appearance: 'light',
          style: {
            background: '#ffffff',
            syntax: {},
            players: [],
          },
        },
      ],
    },
    theme,
  );
}
