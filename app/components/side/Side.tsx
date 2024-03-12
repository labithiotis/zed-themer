import { ChangeEvent, useRef } from 'react';
import { FileDrop } from 'react-file-drop';
import ExitIcon from '~/assets/icons/exit.svg?react';
import ExternalIcon from '~/assets/icons/external_link.svg?react';
import { UiThemeToggle } from '~/components/UiThemeToggle.tsx';
import { theme, themeFamily, themeValidator } from '~/state/state.tsx';
import { SyntaxTokens, syntaxTokens } from '~/state/tokens.ts';
import { createShareThemeUrl } from '~/utils/themeLoader.tsx';
import { Player } from './Player.tsx';
import { Section } from './Section.tsx';
import { sections } from './sections.ts';
import { setStyleToken, setSyntaxToken, Token } from './Token.tsx';

export function Side() {
  const fileDropRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onFileInput = (event: ChangeEvent<HTMLInputElement>) => {
    onFiles(event.currentTarget.files);
  };

  const onFiles = (files: FileList | null) => {
    if (files === null || files.length > 1) {
      alert('Please upload only 1 file');
      return;
    }

    const file = files[0];
    if (file.type !== 'application/json') {
      alert('Please upload a JSON file');
      return;
    }

    file.text().then((text) => {
      const data = JSON.parse(text);
      const isThemeFamily = 'author' in data;
      const themeFamily = isThemeFamily ? data : { name: 'zed', author: 'zed', themes: [data] };

      if (themeValidator(themeFamily)) {
        theme.value = themeFamily.themes[0];
      } else {
        console.warn(themeValidator.errors);
        const message = themeValidator.errors?.map((e) => e.message).join('\n');
        alert(`File does not match Zed's theme schema!\n\nWe got the following errors:\n${message}`);
      }
    });

    fileDropRef.current?.classList.add('hidden');

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const saveTheme = () => {
    const fileName = 'schema';
    const json = JSON.stringify(themeFamily.value, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const href = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = href;
    link.download = fileName + '.json';
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  };

  return (
    <>
      <FileDrop
        onTargetClick={() => fileInputRef.current?.click()}
        onFrameDragEnter={() => fileDropRef.current?.classList.remove('hidden')}
        onFrameDragLeave={() => fileDropRef.current?.classList.add('hidden')}
        onDrop={onFiles}
      >
        <div
          ref={fileDropRef}
          className="absolute inset-0 isolate z-10 flex hidden select-none items-center justify-center bg-zinc-600/80"
        >
          <h4 className="text-2xl font-bold text-white shadow-black drop-shadow-lg">Drop your schema here</h4>
        </div>
      </FileDrop>
      <input type="file" className="hidden" ref={fileInputRef} accept=".json" multiple={false} onChange={onFileInput} />
      <div className="flex h-full w-96 min-w-[250px] flex-col overflow-hidden border-r border-zinc-300 bg-zinc-100 dark:border-neutral-600 dark:bg-neutral-800">
        <div className="text-zed-900 flex items-center p-2">
          <a
            className="text-zed-800 hover:text-zed-500 dark:text-zed-600 hover:dark:text-zed-400 flex-1 cursor-pointer select-none pl-1 text-lg font-semibold"
            href={'/themes'}
          >
            Zed Themes
          </a>
          <UiThemeToggle />
        </div>
        <div className="px-2">
          <input
            value={theme.value?.name}
            type="text"
            className="border-1 text-zed-800 w-full cursor-pointer rounded border border-solid border-transparent bg-transparent px-1 outline-none hover:border-zinc-300 hover:bg-zinc-200 focus:border-zinc-400 focus:text-black dark:text-zinc-300 dark:hover:border-zinc-600 dark:hover:bg-zinc-800 dark:focus:border-zinc-500 dark:focus:text-white"
            placeholder="name"
            onChange={(e) => {
              if (theme.value) {
                theme.value = {
                  ...theme.value,
                  name: e.currentTarget.value ?? '',
                };
              }
            }}
          />
        </div>
        <div className="flex-1 divide-y divide-neutral-300 overflow-scroll dark:divide-neutral-700">
          {sections.map((section) =>
            section.tokens.length ? (
              <Section key={section.name} name={section.name} items={section.tokens}>
                {(token) => (
                  <Token
                    key={token.token}
                    name={token.name}
                    color={theme.value?.style[token.token]}
                    description={token.description}
                    onChange={(color) => setStyleToken(token.token, color)}
                  />
                )}
              </Section>
            ) : null
          )}
          <Section name="Syntax" items={syntaxTokens as unknown as SyntaxTokens[]}>
            {(token) => (
              <Token
                key={token}
                name={token}
                syntax={token}
                color={theme.value?.style.syntax[token]?.color}
                description=""
                onChange={(color) => setSyntaxToken(token, { color })}
              />
            )}
          </Section>
          <Section name="Players" items={theme.value?.style.players ?? new Array(8).fill({})}>
            {(player, index) => <Player key={index} player={player} index={index} />}
          </Section>
        </div>
        <div className="border-t-1 flex select-none flex-col items-stretch divide-y divide-neutral-300 border-t-neutral-300 shadow-2xl shadow-black/60 dark:divide-neutral-700 dark:border-t-neutral-700 dark:shadow-white/75">
          <div className="flex ">
            <button
              className="text-zed-800 hover:text-zed-900 dark:text-zed-600 dark:hover:text-zed-200 flex flex-1 items-center gap-2 p-3 text-lg font-semibold hover:bg-neutral-200 dark:hover:bg-neutral-700"
              onClick={() => {
                navigator.clipboard.writeText(createShareThemeUrl());
                alert('A shareable url has been copied to your clipboard.');
              }}
            >
              <ExitIcon width={16} height={16} />
              Share Theme
            </button>
            <button
              onClick={saveTheme}
              className="text-zed-800 hover:text-zed-900 dark:text-zed-600 dark:hover:text-zed-200 flex flex-1 items-center gap-2 p-3 text-lg font-semibold hover:bg-neutral-200 dark:hover:bg-neutral-700"
            >
              <ExitIcon width={16} height={16} />
              Save Theme
            </button>
          </div>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="text-zed-800 hover:text-zed-900 dark:text-zed-600 dark:hover:text-zed-200 flex items-center justify-center gap-2 p-3 text-lg font-semibold hover:bg-neutral-200 dark:hover:bg-neutral-700"
          >
            <ExternalIcon width={15} height={15} style={{ marginTop: -2 }} />
            Upload existing theme
          </button>
          <div className="flex flex-col justify-center bg-neutral-200 p-3 dark:bg-neutral-900">
            <a
              className="text-zed-800 hover:text-zed-500 dark:text-zed-600 dark:hover:text-zed-200"
              href="https://zed.dev"
              target="_blank"
              rel="noopener noreferrer"
            >
              zed.dev
            </a>
            <a
              className="text-zed-800 hover:text-zed-500 dark:text-zed-600 dark:hover:text-zed-200"
              href="https://github.com/labithiotis/zed-themes/discussions"
              target="_blank"
              rel="noopener noreferrer"
            >
              suggestion
            </a>
            <a
              className="text-zed-800 hover:text-zed-500 dark:text-zed-600 dark:hover:text-zed-200"
              href="https://www.buymeacoffee.com/labithiotis"
              target="_blank"
              rel="noopener noreferrer"
            >
              support ♥︎
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
