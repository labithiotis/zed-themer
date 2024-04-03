import { useLocation, useNavigate } from '@remix-run/react';
import update from 'immutability-helper';
import { Dispatch, PropsWithChildren, createContext, useContext, useEffect, useReducer } from 'react';
import { AppearanceContent, HighlightStyleContent, PlayerColorContent, ThemeFamilyContent } from '../themeFamily';
import { StyleTokens, SyntaxTokens } from './tokens';

export const LOCAL_STORAGE_THEME_SYNC_KEY = '__theme__';

export type ColorHex = `#${string}`;

type State = {
  themeIndex: number | null;
  themeFamily: ThemeFamilyContent | null;
};

type Set = {
  type: 'set';
  themeFamily: ThemeFamilyContent;
  themeName?: string | null;
};

type SetIndex = {
  type: 'setIndex';
  index: number;
};

type SetThemeName = {
  type: 'setThemeName';
  name: string;
};

type SetThemeAppearance = {
  type: 'SetThemeAppearance';
  appearance: AppearanceContent;
};

type SetStyleToken = {
  type: 'setStyleToken';
  token: StyleTokens;
  color: unknown;
};

type SetSyntaxToken = {
  type: 'setSyntaxToken';
  token: SyntaxTokens;
  content: Partial<HighlightStyleContent>;
};

type SetPlayerToken = {
  type: 'setPlayerToken';
  index: number;
  token: keyof PlayerColorContent;
  color: unknown;
};

type Actions = Set | SetIndex | SetThemeName | SetThemeAppearance | SetStyleToken | SetSyntaxToken | SetPlayerToken;

function activeTheme(state: State) {
  if (state.themeIndex === null || state.themeFamily === null) return undefined;
  return state.themeFamily.themes[state.themeIndex];
}

const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case 'set': {
      const themeIndex = action.themeName ? action.themeFamily.themes.findIndex((t) => t.name === action.themeName) : 0;
      return update(state, {
        $set: {
          themeIndex: themeIndex === -1 ? 0 : themeIndex,
          themeFamily: action.themeFamily,
        },
      });
    }
    case 'setIndex': {
      return update(state, {
        themeIndex: { $set: action.index },
      });
    }
    case 'setThemeName': {
      if (state.themeIndex == null || state.themeFamily === null) {
        return state;
      }

      return update(state, {
        themeFamily: {
          themes: {
            [state.themeIndex]: { name: { $set: action.name } },
          },
        },
      });
    }
    case 'SetThemeAppearance': {
      if (state.themeIndex == null || state.themeFamily === null) {
        return state;
      }

      return update(state, {
        themeFamily: {
          themes: {
            [state.themeIndex]: { appearance: { $set: action.appearance } },
          },
        },
      });
    }
    case 'setStyleToken': {
      if (state.themeIndex == null || state.themeFamily === null || !isValidColor(action.color)) {
        return state;
      }

      return update(state, {
        themeFamily: {
          themes: {
            [state.themeIndex]: {
              style: {
                [action.token]: { $set: action.color },
              },
            },
          },
        },
      });
    }
    case 'setSyntaxToken': {
      if (
        state.themeIndex == null ||
        state.themeFamily === null ||
        (action.content.color && !isValidColor(action.content.color))
      ) {
        return state;
      }

      return update(state, {
        themeFamily: {
          themes: {
            [state.themeIndex]: {
              style: {
                syntax: {
                  [action.token]: { $merge: action.content ?? {} },
                },
              },
            },
          },
        },
      });
    }
    case 'setPlayerToken': {
      if (state.themeIndex == null || state.themeFamily === null || !isValidColor(action.color)) {
        return state;
      }

      return update(state, {
        themeFamily: {
          themes: {
            [state.themeIndex]: {
              style: {
                players: {
                  [action.index]: { [action.token]: { $set: action.color } },
                },
              },
            },
          },
        },
      });
    }
    default: {
      return state;
    }
  }
};

const initialState: State = {
  themeIndex: null,
  themeFamily: null,
};

const ThemeCtx = createContext<{ state: State; dispatch: Dispatch<Actions> }>({
  state: initialState,
  dispatch: () => undefined,
});

export const ThemeProvider = (props: PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_THEME_SYNC_KEY, JSON.stringify(state.themeFamily));
  }, [state]);

  return <ThemeCtx.Provider value={{ state, dispatch }}>{props.children}</ThemeCtx.Provider>;
};

export const useTheme = () => {
  const ctx = useContext(ThemeCtx);
  const location = useLocation();
  const navigate = useNavigate();
  const theme = activeTheme(ctx.state);
  const dispatch: typeof ctx.dispatch = (...args) => {
    // If we edit theme change the route to /edit and delay navigate to allow
    // reducer to sync state to localstorage.
    if (!location.pathname.includes('/themes/edit') && args[0].type !== 'set') {
      setTimeout(() => navigate('/themes/edit', { replace: true, preventScrollReset: true }), 1);
    }
    return ctx.dispatch(...args);
  };

  return { index: ctx.state.themeIndex, themeFamily: ctx.state.themeFamily, theme, dispatch };
};

const validateColor = /^#(?:[0-9a-fA-F]{3,4}){1,2}$/;
export const isValidColor = (color: unknown): color is ColorHex =>
  typeof color === 'string' ? validateColor.test(color) : false;
