import { useNavigate } from '@remix-run/react';
import json5 from 'json5';
import type { ChangeEvent, MouseEventHandler } from 'react';
import { useCallback, useRef } from 'react';
import { FileDrop } from 'react-file-drop';
import { RxUpload } from 'react-icons/rx';
import { useThemeStore } from '~/providers/theme';
import { themeValidator } from '../utils/themeValidator';

export function UploadTheme() {
  const navigate = useNavigate();
  const fileDropRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const setThemeFamily = useThemeStore((s) => s.setThemeFamily);

  const onFileInput = (event: ChangeEvent<HTMLInputElement>) => {
    onFiles(event.currentTarget.files);
  };

  const onFiles = (files: FileList | null) => {
    if (files === null || files.length > 1) {
      alert('Please upload only 1 file');
      return;
    }
    const file = files?.[0];
    if (!file) {
      alert('Unable to read file');
      return;
    }

    if (file.type !== 'application/json') {
      alert('Please upload a JSON file');
      return;
    }

    file.text().then((text) => {
      try {
        const data = json5.parse(text);
        const isThemeFamily = 'author' in data;
        const themeFamily = isThemeFamily ? data : { name: 'zed', author: 'zed', themes: [data] };

        if (themeValidator(themeFamily)) {
          console.debug('Theme schema is valid navigate to edit page');
          setThemeFamily(null, themeFamily);
          navigate('/themes/edit');
        } else {
          console.warn(themeValidator.errors);
          const message = themeValidator.errors?.map((e) => e.message).join('\n');
          alert(`File does not match Zed's theme schema!\n\nWe got the following errors:\n${message}`);
        }
      } catch (error) {
        console.warn('JSON parse error:', error);
        alert('Error parsing JSON file');
      }
    });

    if (fileDropRef.current) {
      fileDropRef.current.style.display = 'flex';
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const onClick: MouseEventHandler = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return (
    <>
      <FileDrop
        onDrop={onFiles}
        onTargetClick={() => fileInputRef.current?.click()}
        onFrameDragEnter={() => fileDropRef.current?.classList.remove('hidden')}
        onFrameDragLeave={() => fileDropRef.current?.classList.add('hidden')}
      >
        <div
          ref={fileDropRef}
          className="absolute inset-0 isolate z-10 hidden select-none items-center justify-center bg-zinc-600/80"
        >
          <h4 className="text-2xl font-bold text-white shadow-black drop-shadow-lg">Drop your schema here</h4>
        </div>
      </FileDrop>
      <input ref={fileInputRef} type="file" accept=".json" className="hidden" multiple={false} onChange={onFileInput} />
      <button type="button" className="flex items-center gap-2" onClick={onClick}>
        <RxUpload />
        <span>Upload theme</span>
      </button>
    </>
  );
}
