import { useEffect } from 'preact/compat';

export const useEscape = (callback: () => void) => {
  useEffect(() => {
    const eventListener = (e: KeyboardEvent) => {
      if (e.key === 'Escape') callback();
    };

    document.addEventListener('keyup', eventListener);

    return () => document.removeEventListener('keyup', eventListener);
  }, [callback]);
};
