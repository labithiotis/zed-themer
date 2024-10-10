import { useCallback, useState } from 'react';
import { HexAlphaColorPicker } from 'react-colorful';
import { useTheme } from '~/providers/theme';
import { cn } from '~/utils';
import { debounce } from '~/utils/debounce';
import { playerTokens } from '../../providers/tokens';
import type { PlayerColorContent } from '../../themeFamily';
import TokenleInput from './TokenleInput';

type PlayerProps = {
  index: number;
  player: PlayerColorContent;
  edit: boolean;
};

export function Player({ index, player, edit }: PlayerProps) {
  return (
    <div className="flex flex-col px-3 py-1">
      <p className="text-zinc-600 dark:text-zinc-200">Player {index + 1}</p>
      {playerTokens.map((token) => (
        <PlayerToken key={token} index={index} player={player} token={token} edit={edit} />
      ))}
    </div>
  );
}

function PlayerToken({
  index,
  player,
  token,
  edit,
}: PlayerProps & {
  token: keyof PlayerColorContent;
}) {
  const { dispatch } = useTheme();
  const [showColor, setShowColor] = useState(false);

  const setPlayerToken = useCallback(
    debounce((index: number, token: keyof PlayerColorContent, color: unknown) => {
      dispatch({ type: 'setPlayerToken', index, token, color });
    }, 25),
    [],
  );

  return (
    <div className="flex flex-col px-2 py-1">
      <div className="flex flex-row items-center gap-2">
        <button
          type="button"
          className={cn(
            'color-preview h-9 min-h-9 w-9 min-w-9 rounded border outline-none active:translate-y-[0px] active:scale-100',
            {
              'cursor-pointer hover:scale-[1.05] hover:pb-[1px] hover:translate-y-[-1px]': edit,
            },
          )}
          style={{
            color: player[token] ? (player[token] ?? undefined) : 'transparent',
            borderColor: player[token] ? `color-mix(in xyz, ${player[token]} 70%, black)` : '#808080',
          }}
          onClick={() => setShowColor(!showColor)}
          aria-label="Player token color preivew toggle color picker"
          disabled={!edit}
        />
        <div className="flex w-full flex-col text-sm text-zinc-800 dark:text-zinc-300">
          <button
            type="button"
            className={cn('text-left', {
              'hover:cursor-pointer hover:text-zinc-600 dark:hover:text-zinc-200': edit,
            })}
            onClick={() => setShowColor(!showColor)}
            aria-label="Player token name toggle color picker"
            disabled={!edit}
          >
            {token}
          </button>
          <div className="flex items-center gap-2 pr-2">
            <div className="flex-1">
              <TokenleInput
                value={player[token] ?? ''}
                className={cn(
                  'border-1 h-[22px] w-full rounded border border-solid border-transparent bg-transparent px-1 text-zinc-600 outline-none focus:border-zinc-400 focus:text-black dark:text-zinc-500 dark:focus:border-zinc-500 dark:focus:text-white',
                  {
                    'cursor-pointer hover:border-zinc-300 hover:bg-zinc-200 dark:hover:border-zinc-600 dark:hover:bg-zinc-800':
                      edit,
                  },
                )}
                type="text"
                placeholder="unset"
                onChange={(e) => setPlayerToken(index, token, e.currentTarget.value?.trim())}
                onClear={() => setPlayerToken(index, token, null)}
                disabled={!edit}
              />
            </div>
          </div>
        </div>
      </div>
      {showColor && (
        <div className="flex flex-1 flex-col py-2">
          <HexAlphaColorPicker color={player[token] ?? ''} onChange={(color) => setPlayerToken(index, token, color)} />
        </div>
      )}
    </div>
  );
}
