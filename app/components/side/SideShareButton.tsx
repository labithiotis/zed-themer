import { useFetcher } from '@remix-run/react';
import { useEffect } from 'react';
import { useTheme } from '~/providers/theme';
import { useToast } from '../ui/use-toast';
import { btnStyles } from './Side';

export function SideShareButton({ edit }: { edit: boolean }) {
  const { toast } = useToast();
  const { themeFamily } = useTheme();
  const fetcher = useFetcher<{ shareUrl: string }>({ key: 'share-theme' });

  useEffect(() => {
    if (fetcher.data) {
      navigator.clipboard.writeText(fetcher.data.shareUrl);
      toast({ description: 'A shareable url has been copied to your clipboard.' });
    }
  }, [fetcher.data, toast]);

  const shareTheme = () => {
    if (edit) {
      fetcher.submit(
        { id: 'share-theme', theme: JSON.stringify(themeFamily) },
        { action: '/action/share', method: 'post' }
      );
    } else {
      navigator.clipboard.writeText(document.location.href);
      toast({ description: 'Link has been copied to your clipboard.' });
    }
  };

  return (
    <button className={btnStyles} onClick={shareTheme}>
      <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M4 12C4 13.3807 5.11929 14.5 6.5 14.5C7.88071 14.5 9 13.3807 9 12C9 10.6193 7.88071 9.5 6.5 9.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path d="M14 6.5L9 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M14 17.5L9 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path
          d="M16.5 21C17.8807 21 19 19.8807 19 18.5C19 17.1193 17.8807 16 16.5 16C15.1193 16 14 17.1193 14 18.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M18.665 6.74993C17.9746 7.94566 16.4457 8.35535 15.2499 7.66499C14.0542 6.97464 13.6445 5.44566 14.3349 4.24993C15.0252 3.0542 16.5542 2.64451 17.7499 3.33487"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      Share
    </button>
  );
}
