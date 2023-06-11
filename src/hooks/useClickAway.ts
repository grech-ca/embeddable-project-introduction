import { useEffect, useRef } from 'preact/compat';

export const useClickAway = <T extends HTMLElement = HTMLElement>(callback: () => void) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const eventListener = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (target.contains(ref.current)) callback();
    };

    document.addEventListener('click', eventListener);

    return () => document.removeEventListener('click', eventListener);
  }, [callback]);

  return ref;
};
