import { Fragment } from 'preact';
import { useState, useMemo, createPortal, forwardRef, useImperativeHandle } from 'preact/compat';

import styles from './AnimatedText.module.scss';

export interface AnimatedTextProps {
  children?: string;
  shouldAnimate?: boolean;
}

export interface AnimatedTextRef {
  start: () => Promise<void>;
}

const delay = (duration: number) => new Promise(resolve => setTimeout(resolve, duration));

const CHAR_DELAY = 60;
const COMMA_DELAY = 600;

export const AnimatedText = forwardRef<AnimatedTextRef, AnimatedTextProps>(
  ({ children, shouldAnimate }, ref) => {
    const [count, setCount] = useState(0);

    const [textNodes, pauseIndices] = useMemo(() => {
      const nodes = children?.split(',') ?? [];
      const result = [];
      const pauseIndices: number[] = [];

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const isLastNode = i === nodes.length - 1;

        for (let k = 0; k < node.length; k++) {
          const char = node[k];
          const isLastChar = k === node.length - 1;

          result.push(<span key={`${i}-${k}`}>{char}</span>);

          if (isLastChar && !isLastNode) {
            const index = result.push(<span key={`${i}-${k}-comma`}>{`, `}</span>) - 1;
            pauseIndices.push(index);
          }
        }
      }

      return [result, pauseIndices];
    }, [children]);

    const startAnimation = async () => {
      await delay(100);
      for (let i = 0; i < textNodes.length; i++) {
        if (pauseIndices.includes(i)) await delay(COMMA_DELAY);

        setCount(prev => prev + 1);
        await delay(CHAR_DELAY);
      }
    };

    useImperativeHandle(ref, () => ({ start: startAnimation }));

    return (
      <Fragment>
        <p class={styles.AnimatedText}>{textNodes}</p>
        {createPortal(
          <style>
            {shouldAnimate
              ? `.${styles.AnimatedText} > span:nth-child(-n+${count}) { opacity: 1; }`
              : `.${styles.AnimatedText} > span { opacity: 1 }`}
          </style>,
          document.body,
        )}
      </Fragment>
    );
  },
);
