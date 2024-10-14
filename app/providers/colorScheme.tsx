import { useFetcher } from '@remix-run/react';
import type React from 'react';
import { createContext, useCallback, useContext, useEffect, useRef } from 'react';
import { createStore, useStore } from 'zustand';

const prefersDarkMQ = '(prefers-color-scheme: dark)';

export type ColorScheme = 'dark' | 'light' | 'system';

type ColorSchemeProps = {
  colorScheme?: ColorScheme;
};

type ColorSchemeState = ColorSchemeProps & {
  setColorScheme(colorScheme: ColorScheme): void;
};

type ColorSchemeStore = ReturnType<typeof createColorSchemeStore>;

const ColorSchemeContext = createContext<ColorSchemeStore | null>(null);

const createColorSchemeStore = (initProps?: Partial<ColorSchemeProps>) => {
  const DEFAULT_PROPS: ColorSchemeProps = {
    colorScheme: 'system',
  };
  return createStore<ColorSchemeState>()((set) => ({
    ...DEFAULT_PROPS,
    ...initProps,
    setColorScheme: (colorScheme) => set({ colorScheme }),
  }));
};

export function useColorScheme<T>(selector: (state: ColorSchemeState) => T): T {
  const store = useContext(ColorSchemeContext);
  if (!store) throw new Error('Missing ColorSchemeContext.Provider in the tree');
  return useStore(store, selector);
}

export function ColorSchemeProvider({ children, ...props }: React.PropsWithChildren<{ colorScheme?: ColorScheme }>) {
  const storeRef = useRef<ColorSchemeStore>();
  if (!storeRef.current) {
    storeRef.current = createColorSchemeStore(props);
  }
  return (
    <ColorSchemeContext.Provider value={storeRef.current}>
      <ColorSchemeLoader>{children}</ColorSchemeLoader>
    </ColorSchemeContext.Provider>
  );
}

const ColorSchemeLoader = (props: React.PropsWithChildren) => {
  const colorScheme = useColorScheme((s) => s.colorScheme);
  const setColorScheme = useColorScheme((s) => s.setColorScheme);
  const fetcher = useFetcher<{ colorScheme: ColorScheme }>({
    key: 'color-scheme',
  });

  const peristColorScheme = useCallback(
    (colorScheme: ColorScheme) => {
      fetcher.submit({ colorScheme }, { action: '/action/color-scheme', method: 'post' });
    },
    [fetcher.submit],
  );

  // Persist color scheme to server on change
  useEffect(() => {
    if (colorScheme) {
      const el = document.documentElement.classList;
      colorScheme === 'dark' ? el.add('dark') : el.remove('dark');
      peristColorScheme(colorScheme);
    }
  }, [colorScheme, peristColorScheme]);

  // Add event listener for media color-scheme changes
  useEffect(() => {
    const mediaQuery = matchMedia(prefersDarkMQ);
    const handleChange = () => {
      setColorScheme(mediaQuery.matches ? 'dark' : 'light');
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [setColorScheme]);

  return <>{props.children}</>;
};
